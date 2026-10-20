import { ExecutionResult, MapData, Coordinates, Direction, GameStep } from '../types/game';
import { runFallbackPython } from './fallbackInterpreter';
import { PYODIDE_WORKER_CODE } from './pyodideWorkerCode';

export type EngineStatus = 'uninitialized' | 'loading' | 'ready' | 'fallback_ready' | 'error';

interface ActiveExecutionTracker {
  id: string;
  resolve: (res: ExecutionResult) => void;
  reject: (err: any) => void;
  timerId: any;
  startTime: number;
  map: MapData;
  playerPos: Coordinates;
  playerDir: Direction;
  accumulatedStdout: string[];
  accumulatedStderr: string[];
  onStreamStdout?: (text: string) => void;
  onStreamStderr?: (text: string) => void;
}

class PythonEngineManager {
  private worker: Worker | null = null;
  private status: EngineStatus = 'uninitialized';
  private statusListeners: ((status: EngineStatus) => void)[] = [];
  private activeExecution: ActiveExecutionTracker | null = null;
  private isInitializing = false;
  private initTimeoutId: any = null;

  constructor() {
    this.initEngine();
  }

  public getStatus(): EngineStatus {
    return this.status;
  }

  public isBusy(): boolean {
    return this.activeExecution !== null;
  }

  public onStatusChange(callback: (status: EngineStatus) => void): () => void {
    this.statusListeners.push(callback);
    callback(this.status);
    return () => {
      this.statusListeners = this.statusListeners.filter((cb) => cb !== callback);
    };
  }

  private setStatus(newStatus: EngineStatus) {
    if (this.status !== newStatus) {
      this.status = newStatus;
      this.statusListeners.forEach((cb) => cb(newStatus));
    }
  }

  public initEngine() {
    if (typeof window === 'undefined' || typeof Worker === 'undefined') {
      this.setStatus('fallback_ready');
      return;
    }

    if (this.worker || this.isInitializing) return;

    this.isInitializing = true;
    this.setStatus('loading');

    this.spawnWorker();

    // Fallback safeguard if Pyodide CDN download hangs over 8 seconds
    this.initTimeoutId = setTimeout(() => {
      if (this.status === 'loading') {
        console.info('Pyodide WebAssembly initialization pending; enabling offline Python fallback.');
        this.setStatus('fallback_ready');
      }
      this.isInitializing = false;
    }, 8000);
  }

  private spawnWorker() {
    try {
      if (this.worker) {
        try {
          this.worker.terminate();
        } catch (_) {}
        this.worker = null;
      }

      const blob = new Blob([PYODIDE_WORKER_CODE], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      this.worker = new Worker(workerUrl);

      this.worker.onmessage = this.handleWorkerMessage.bind(this);
      this.worker.onerror = this.handleWorkerError.bind(this);

      this.worker.postMessage({ type: 'INIT' });
    } catch (err) {
      console.warn('Unable to spawn Web Worker, using offline Python simulator:', err);
      this.setStatus('fallback_ready');
      this.isInitializing = false;
    }
  }

  private handleWorkerMessage(e: MessageEvent) {
    const data = e.data;
    if (!data) return;

    if (data.type === 'READY') {
      if (this.initTimeoutId) clearTimeout(this.initTimeoutId);
      this.setStatus('ready');
      this.isInitializing = false;
      return;
    }

    if (data.type === 'LOAD_ERROR') {
      if (this.initTimeoutId) clearTimeout(this.initTimeoutId);
      console.warn('Pyodide Worker load error, falling back:', data.error);
      this.setStatus('fallback_ready');
      this.isInitializing = false;
      return;
    }

    // Real-time stdout stream
    if (data.type === 'STREAM_STDOUT' && this.activeExecution && data.id === this.activeExecution.id) {
      this.activeExecution.accumulatedStdout.push(data.text);
      if (this.activeExecution.onStreamStdout) {
        this.activeExecution.onStreamStdout(data.text);
      }
      return;
    }

    // Real-time stderr stream
    if (data.type === 'STREAM_STDERR' && this.activeExecution && data.id === this.activeExecution.id) {
      this.activeExecution.accumulatedStderr.push(data.text);
      if (this.activeExecution.onStreamStderr) {
        this.activeExecution.onStreamStderr(data.text);
      }
      return;
    }

    // Completed execution result
    if (data.type === 'RESULT' && this.activeExecution && data.id === this.activeExecution.id) {
      const exec = this.activeExecution;
      this.activeExecution = null;
      if (exec.timerId) clearTimeout(exec.timerId);

      const executionTimeMs = Math.round(performance.now() - exec.startTime);
      const validated = this.validateStepsOnMap(
        data.steps || [],
        exec.map,
        exec.playerPos,
        exec.playerDir
      );

      // Merge streamed logs with final batch logs
      const finalStdout = data.stdout && data.stdout.length > 0 ? data.stdout : exec.accumulatedStdout;
      const finalStderr = data.stderr && data.stderr.length > 0 ? data.stderr : exec.accumulatedStderr;

      const result: ExecutionResult = {
        success: data.success,
        stdout: finalStdout,
        stderr: finalStderr,
        steps: validated.steps,
        error: data.error,
        finalPosition: validated.finalPosition,
        finalDirection: validated.finalDirection,
        collectedEntities: validated.collectedEntities,
        executionTimeMs,
      };

      exec.resolve(result);
    }
  }

  private handleWorkerError(err: ErrorEvent) {
    console.error('Python Worker error event:', err);
    if (this.activeExecution) {
      const exec = this.activeExecution;
      this.activeExecution = null;
      if (exec.timerId) clearTimeout(exec.timerId);

      const result: ExecutionResult = {
        success: false,
        stdout: exec.accumulatedStdout,
        stderr: [...exec.accumulatedStderr, `Worker error: ${err.message}`],
        steps: [],
        error: err.message,
        executionTimeMs: Math.round(performance.now() - exec.startTime),
      };
      exec.resolve(result);
    }
    // Re-spawn worker to keep environment healthy
    this.spawnWorker();
  }

  /**
   * Primary Execution Bridge: Executes Python code inside the Pyodide Web Worker.
   * Supports real-time stdout/stderr capture and cancellation.
   */
  public async execute(
    code: string,
    map: MapData,
    playerPos: Coordinates,
    playerDir: Direction,
    timeoutMs = 6000,
    onStreamStdout?: (text: string) => void,
    onStreamStderr?: (text: string) => void
  ): Promise<ExecutionResult> {
    const startTime = performance.now();

    // Determine ahead tile for see_ahead()
    const dirDeltas: Record<Direction, { dx: number; dy: number }> = {
      up: { dx: 0, dy: -1 },
      down: { dx: 0, dy: 1 },
      left: { dx: -1, dy: 0 },
      right: { dx: 1, dy: 0 },
    };
    const delta = dirDeltas[playerDir];
    const tx = playerPos.x + delta.dx;
    const ty = playerPos.y + delta.dy;
    let aheadTile = 'empty';
    if (tx >= 0 && tx < map.width && ty >= 0 && ty < map.height) {
      const ent = map.entities.find((e) => e.x === tx && e.y === ty && e.active !== false);
      if (ent) aheadTile = ent.type;
      else aheadTile = map.tiles[ty]?.[tx] || 'empty';
    } else {
      aheadTile = 'boundary';
    }

    // Cancel any previous in-flight execution first
    if (this.activeExecution) {
      this.cancelExecution('Superseded by new execution run.');
    }

    // 1. If Pyodide Web Worker is ready, execute isolated in worker
    if (this.status === 'ready' && this.worker) {
      const execId = `exec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      return new Promise<ExecutionResult>((resolve, reject) => {
        const timerId = setTimeout(() => {
          this.cancelExecution(`Execution timed out after ${Math.round(timeoutMs / 1000)}s! Infinite loop suspected.`);
        }, timeoutMs);

        this.activeExecution = {
          id: execId,
          resolve,
          reject,
          timerId,
          startTime,
          map,
          playerPos,
          playerDir,
          accumulatedStdout: [],
          accumulatedStderr: [],
          onStreamStdout,
          onStreamStderr,
        };

        try {
          const payload = {
            type: 'EXECUTE',
            id: String(execId),
            code: String(code),
            playerPos: { x: Number(playerPos.x) || 0, y: Number(playerPos.y) || 0 },
            playerDir: String(playerDir),
            aheadTile: String(aheadTile),
          };
          this.worker!.postMessage(payload);
        } catch (postErr: any) {
          console.warn('Failed to postMessage to worker, falling back immediately:', postErr);
          if (timerId) clearTimeout(timerId);
          this.activeExecution = null;
          // Run immediately via fallback engine
          const fallbackRes = runFallbackPython({
            code,
            map,
            playerPos,
            playerDir,
          });
          const executionTimeMs = Math.round(performance.now() - startTime);
          const validated = this.validateStepsOnMap(fallbackRes.steps, map, playerPos, playerDir);
          resolve({
            success: fallbackRes.success,
            stdout: fallbackRes.stdout,
            stderr: fallbackRes.stderr,
            steps: validated.steps.length > 0 ? validated.steps : fallbackRes.steps,
            error: fallbackRes.error,
            finalPosition: validated.finalPosition,
            finalDirection: validated.finalDirection,
            collectedEntities: validated.collectedEntities,
            executionTimeMs,
          });
        }
      });
    }

    // 2. Offline fallback engine (fast synchronous pure-JS interpreter)
    const fallbackRes = runFallbackPython({
      code,
      map,
      playerPos,
      playerDir,
    });

    const executionTimeMs = Math.round(performance.now() - startTime);
    const validated = this.validateStepsOnMap(fallbackRes.steps, map, playerPos, playerDir);

    // Stream lines immediately to callbacks if provided
    if (onStreamStdout) {
      fallbackRes.stdout.forEach((l) => onStreamStdout(l));
    }
    if (onStreamStderr) {
      fallbackRes.stderr.forEach((l) => onStreamStderr(l));
    }

    return {
      success: fallbackRes.success,
      stdout: fallbackRes.stdout,
      stderr: fallbackRes.stderr,
      steps: validated.steps.length > 0 ? validated.steps : fallbackRes.steps,
      error: fallbackRes.error,
      finalPosition: validated.finalPosition,
      finalDirection: validated.finalDirection,
      collectedEntities: validated.collectedEntities,
      executionTimeMs,
    };
  }

  /**
   * Runtime Cancellation: Immediately terminates the running Web Worker thread,
   * arresting runaway infinite loops (e.g. while True), returns partial output,
   * and spawns a fresh worker instance for subsequent runs.
   */
  public cancelExecution(reason = 'Execution was cancelled.'): ExecutionResult {
    if (this.activeExecution) {
      const { resolve, timerId, accumulatedStdout, accumulatedStderr, playerPos, playerDir } =
        this.activeExecution;

      if (timerId) clearTimeout(timerId);

      // Terminate the Web Worker immediately to stop runaway CPU execution
      if (this.worker) {
        try {
          this.worker.terminate();
        } catch (_) {}
        this.worker = null;
      }

      this.activeExecution = null;

      // Respawn a fresh worker so subsequent executions continue immediately
      this.spawnWorker();

      const result: ExecutionResult = {
        success: false,
        error: reason,
        stdout: accumulatedStdout,
        stderr: [...accumulatedStderr, `🛑 ${reason}`],
        steps: [],
        executionTimeMs: 0,
        finalPosition: playerPos,
        finalDirection: playerDir,
        collectedEntities: [],
      };

      resolve(result);
      return result;
    }

    return {
      success: false,
      stdout: [],
      stderr: [],
      steps: [],
      error: 'No active execution to cancel.',
      executionTimeMs: 0,
    };
  }

  /**
   * Validates game steps against the level map grid, detecting obstacle collisions,
   * item collections, door unlocks, and out-of-bounds attempts.
   */
  private validateStepsOnMap(
    rawSteps: GameStep[],
    map: MapData,
    initialPos: Coordinates,
    initialDir: Direction
  ) {
    let currentPos = { ...initialPos };
    let currentDir = initialDir;
    const collected: string[] = [];
    const validSteps: GameStep[] = [];

    const dirDeltas: Record<Direction, { dx: number; dy: number }> = {
      up: { dx: 0, dy: -1 },
      down: { dx: 0, dy: 1 },
      left: { dx: -1, dy: 0 },
      right: { dx: 1, dy: 0 },
    };

    const turnRightMap: Record<Direction, Direction> = {
      up: 'right',
      right: 'down',
      down: 'left',
      left: 'up',
    };

    const turnLeftMap: Record<Direction, Direction> = {
      up: 'left',
      left: 'down',
      down: 'right',
      right: 'up',
    };

    for (const step of rawSteps) {
      if (step.type === 'turn') {
        if (step.direction === 'right') {
          currentDir = turnRightMap[currentDir];
        } else if (step.direction === 'left') {
          currentDir = turnLeftMap[currentDir];
        }
        validSteps.push({
          type: 'turn',
          direction: currentDir,
          success: true,
        });
      } else if (step.type === 'move') {
        const delta = dirDeltas[currentDir];
        const nextX = currentPos.x + delta.dx;
        const nextY = currentPos.y + delta.dy;

        if (nextX >= 0 && nextX < map.width && nextY >= 0 && nextY < map.height) {
          const tile = map.tiles[nextY]?.[nextX];
          const gate = map.entities.find(
            (e) => e.type === 'gate' && e.x === nextX && e.y === nextY && e.active !== false
          );

          if (tile !== 'wall' && tile !== 'water' && !gate) {
            const from = { ...currentPos };
            currentPos = { x: nextX, y: nextY };
            validSteps.push({
              type: 'move',
              direction: currentDir,
              from,
              to: { ...currentPos },
              success: true,
            });
          } else {
            validSteps.push({
              type: 'move',
              direction: currentDir,
              from: { ...currentPos },
              to: { x: nextX, y: nextY },
              success: false,
              message: gate ? 'Blocked by locked gate!' : 'Blocked by obstacle!',
            });
          }
        } else {
          validSteps.push({
            type: 'move',
            direction: currentDir,
            from: { ...currentPos },
            to: { x: nextX, y: nextY },
            success: false,
            message: 'Out of map bounds!',
          });
        }
      } else if (step.type === 'collect') {
        const ent = map.entities.find(
          (e) => e.x === currentPos.x && e.y === currentPos.y && !collected.includes(e.id)
        );
        if (ent) {
          collected.push(ent.id);
          validSteps.push({
            type: 'collect',
            targetEntityId: ent.id,
            to: { ...currentPos },
            success: true,
            message: `Collected ${ent.name || ent.type}`,
          });
        } else {
          validSteps.push({
            type: 'collect',
            to: { ...currentPos },
            success: false,
            message: 'Nothing here to collect',
          });
        }
      } else if (step.type === 'jump') {
        const delta = dirDeltas[currentDir];
        const jx = currentPos.x + delta.dx * 2;
        const jy = currentPos.y + delta.dy * 2;
        if (jx >= 0 && jx < map.width && jy >= 0 && jy < map.height) {
          const from = { ...currentPos };
          currentPos = { x: jx, y: jy };
          validSteps.push({
            type: 'jump',
            direction: currentDir,
            from,
            to: { ...currentPos },
            success: true,
          });
        } else {
          validSteps.push({
            type: 'jump',
            direction: currentDir,
            success: false,
            message: 'Cannot jump out of bounds',
          });
        }
      } else if (step.type === 'open_door') {
        const delta = dirDeltas[currentDir];
        const targetX = currentPos.x + delta.dx;
        const targetY = currentPos.y + delta.dy;
        const gate = map.entities.find((e) => e.type === 'gate' && e.x === targetX && e.y === targetY);
        if (gate) {
          gate.active = false;
          validSteps.push({
            type: 'open_door',
            targetEntityId: gate.id,
            success: true,
            message: 'Runic gate unlocked!',
          });
        } else {
          validSteps.push({
            type: 'open_door',
            success: false,
            message: 'No gate directly ahead.',
          });
        }
      } else {
        validSteps.push({
          ...step,
          success: true,
        });
      }
    }

    return {
      steps: validSteps,
      finalPosition: currentPos,
      finalDirection: currentDir,
      collectedEntities: collected,
    };
  }
}

export const pythonEngine = new PythonEngineManager();
