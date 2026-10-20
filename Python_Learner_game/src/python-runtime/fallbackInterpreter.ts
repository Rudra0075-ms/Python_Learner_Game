import { Direction, Coordinates, GameStep, MapData } from '../types/game';

interface FallbackExecutionOptions {
  code: string;
  map: MapData;
  playerPos: Coordinates;
  playerDir: Direction;
}

export interface FallbackResult {
  success: boolean;
  stdout: string[];
  stderr: string[];
  steps: GameStep[];
  error?: string;
}

/**
 * Robust in-browser Python interpreter/simulator
 * Supports:
 * - game commands (move_forward, turn_left, turn_right, collect, jump, interact, open_door, attack, say)
 * - print() with multiple args, formatted strings, and arithmetic
 * - variables, expressions, and type assignments
 * - for loops with range() (e.g. for i in range(5), range(1, 10, 2))
 * - while loops with safeguard
 * - if / elif / else conditionals
 * - function definitions (def) and calls
 * - list indexing, append, len
 * - infinite loop / step limits
 */
export function runFallbackPython(options: FallbackExecutionOptions): FallbackResult {
  const { code, map } = options;
  const stdout: string[] = [];
  const stderr: string[] = [];
  const steps: GameStep[] = [];

  let currentPos = { ...options.playerPos };
  let currentDir = options.playerDir;
  let collectedEntities: string[] = [];

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

  const dirDeltas: Record<Direction, { dx: number; dy: number }> = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 },
  };

  let operationCount = 0;
  const MAX_OPERATIONS = 10000;

  // Custom environment scope
  const env: Record<string, any> = {
    True: true,
    False: false,
    None: null,
  };

  // Helper to execute game commands
  function executeCommand(name: string, args: any[] = []): any {
    operationCount++;
    if (operationCount > MAX_OPERATIONS) {
      throw new Error('Execution limit reached: potential infinite loop detected.');
    }

    if (name === 'move_forward') {
      const count = args.length > 0 && typeof args[0] === 'number' ? Math.max(1, Math.floor(args[0])) : 1;
      for (let i = 0; i < count; i++) {
        const delta = dirDeltas[currentDir];
        const nextX = currentPos.x + delta.dx;
        const nextY = currentPos.y + delta.dy;

        // Check map boundaries and walkable tile
        if (nextX >= 0 && nextX < map.width && nextY >= 0 && nextY < map.height) {
          const tile = map.tiles[nextY]?.[nextX];
          // Check if wall or closed gate
          const gate = map.entities.find(e => e.type === 'gate' && e.x === nextX && e.y === nextY && e.active !== false);
          if (tile !== 'wall' && tile !== 'water' && !gate) {
            const fromPos = { ...currentPos };
            currentPos = { x: nextX, y: nextY };
            steps.push({
              type: 'move',
              direction: currentDir,
              from: fromPos,
              to: { ...currentPos },
              success: true,
            });
          } else {
            steps.push({
              type: 'move',
              direction: currentDir,
              from: { ...currentPos },
              to: { x: nextX, y: nextY },
              success: false,
              message: gate ? 'Path is blocked by a locked rune gate!' : 'Path is blocked!',
            });
            break;
          }
        } else {
          steps.push({
            type: 'move',
            direction: currentDir,
            from: { ...currentPos },
            to: { x: nextX, y: nextY },
            success: false,
            message: 'Cannot move beyond map boundary!',
          });
          break;
        }
      }
      return null;
    }

    if (name === 'turn_left') {
      currentDir = turnLeftMap[currentDir];
      steps.push({
        type: 'turn',
        direction: currentDir,
        success: true,
      });
      return null;
    }

    if (name === 'turn_right') {
      currentDir = turnRightMap[currentDir];
      steps.push({
        type: 'turn',
        direction: currentDir,
        success: true,
      });
      return null;
    }

    if (name === 'collect') {
      // Find entity at current position
      const entity = map.entities.find(
        e => e.x === currentPos.x && e.y === currentPos.y && !collectedEntities.includes(e.id)
      );
      if (entity) {
        collectedEntities.push(entity.id);
        steps.push({
          type: 'collect',
          targetEntityId: entity.id,
          to: { ...currentPos },
          success: true,
          message: `Collected ${entity.name || entity.type}!`,
        });
        return entity.name || entity.type;
      } else {
        steps.push({
          type: 'collect',
          to: { ...currentPos },
          success: false,
          message: 'Nothing to collect here!',
        });
        return null;
      }
    }

    if (name === 'jump') {
      const delta = dirDeltas[currentDir];
      const jumpX = currentPos.x + delta.dx * 2;
      const jumpY = currentPos.y + delta.dy * 2;

      if (jumpX >= 0 && jumpX < map.width && jumpY >= 0 && jumpY < map.height) {
        const fromPos = { ...currentPos };
        currentPos = { x: jumpX, y: jumpY };
        steps.push({
          type: 'jump',
          direction: currentDir,
          from: fromPos,
          to: { ...currentPos },
          success: true,
        });
      } else {
        steps.push({
          type: 'jump',
          direction: currentDir,
          from: { ...currentPos },
          to: { x: jumpX, y: jumpY },
          success: false,
          message: 'Cannot jump out of bounds!',
        });
      }
      return null;
    }

    if (name === 'interact') {
      const delta = dirDeltas[currentDir];
      const targetX = currentPos.x + delta.dx;
      const targetY = currentPos.y + delta.dy;

      const entity = map.entities.find(
        e => (e.x === currentPos.x && e.y === currentPos.y) || (e.x === targetX && e.y === targetY)
      );

      if (entity) {
        steps.push({
          type: 'interact',
          targetEntityId: entity.id,
          success: true,
          message: `Interacted with ${entity.name || entity.type}!`,
        });
        return true;
      }
      return false;
    }

    if (name === 'open_door') {
      const delta = dirDeltas[currentDir];
      const targetX = currentPos.x + delta.dx;
      const targetY = currentPos.y + delta.dy;

      const gate = map.entities.find(
        e => e.type === 'gate' && (e.x === targetX && e.y === targetY)
      );

      if (gate) {
        gate.active = false;
        steps.push({
          type: 'open_door',
          targetEntityId: gate.id,
          success: true,
          message: 'Runic gate opened!',
        });
        return true;
      } else {
        steps.push({
          type: 'open_door',
          success: false,
          message: 'No gate directly ahead to open!',
        });
        return false;
      }
    }

    if (name === 'attack') {
      const delta = dirDeltas[currentDir];
      const targetX = currentPos.x + delta.dx;
      const targetY = currentPos.y + delta.dy;

      const monster = map.entities.find(
        e => (e.type === 'goblin' || e.type === 'golem') && e.x === targetX && e.y === targetY
      );

      if (monster) {
        collectedEntities.push(monster.id);
        steps.push({
          type: 'attack',
          targetEntityId: monster.id,
          success: true,
          message: `Defeated ${monster.name || monster.type}!`,
        });
        return true;
      }
      return false;
    }

    if (name === 'say') {
      const msg = args.map(a => String(a)).join(' ');
      stdout.push(`🧙 "${msg}"`);
      steps.push({
        type: 'say',
        message: msg,
        success: true,
      });
      return null;
    }

    if (name === 'print') {
      const line = args.map(a => (typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a))).join(' ');
      const subLines = line.split('\n');
      subLines.forEach(sl => stdout.push(sl));
      return null;
    }

    if (name === 'get_position') {
      return [currentPos.x, currentPos.y];
    }

    if (name === 'see_ahead') {
      const delta = dirDeltas[currentDir];
      const targetX = currentPos.x + delta.dx;
      const targetY = currentPos.y + delta.dy;
      if (targetX < 0 || targetX >= map.width || targetY < 0 || targetY >= map.height) {
        return 'boundary';
      }
      const entity = map.entities.find(e => e.x === targetX && e.y === targetY && !collectedEntities.includes(e.id));
      if (entity) return entity.type;
      return map.tiles[targetY]?.[targetX] || 'empty';
    }

    if (name === 'len') {
      const target = args[0];
      if (Array.isArray(target) || typeof target === 'string') return target.length;
      if (typeof target === 'object' && target !== null) return Object.keys(target).length;
      return 0;
    }

    if (name === 'range') {
      const start = args.length === 1 ? 0 : args[0];
      const stop = args.length === 1 ? args[0] : args[1];
      const step = args.length === 3 ? args[2] : 1;
      const res = [];
      if (step > 0) {
        for (let i = start; i < stop; i += step) res.push(i);
      } else if (step < 0) {
        for (let i = start; i > stop; i += step) res.push(i);
      }
      return res;
    }

    return null;
  }

  // Pre-process and execute Python lines
  try {
    const rawLines = code.split('\n');
    
    // Parse lines into structured blocks
    interface CodeLine {
      text: string;
      indent: number;
      lineNum: number;
    }

    const lines: CodeLine[] = [];
    rawLines.forEach((l, idx) => {
      const lineNum = idx + 1;
      const trimmed = l.trim();
      // Skip empty lines and full comment lines
      if (!trimmed || trimmed.startsWith('#')) return;
      const indentMatch = l.match(/^[ ]*/);
      const indent = indentMatch ? indentMatch[0].length : 0;
      lines.push({ text: trimmed, indent, lineNum });
    });

    function findTopLevelOp(expr: string, ops: string[]): { left: string; op: string; right: string } | null {
      let depth = 0;
      let inQuote = false;
      let quoteChar = '';
      for (let i = expr.length - 1; i >= 0; i--) {
        const ch = expr[i];
        if (inQuote) {
          if (ch === quoteChar && expr[i - 1] !== '\\') {
            inQuote = false;
          }
        } else if (ch === '"' || ch === "'") {
          inQuote = true;
          quoteChar = ch;
        } else if (ch === ')' || ch === ']' || ch === '}') {
          depth++;
        } else if (ch === '(' || ch === '[' || ch === '{') {
          depth--;
        } else if (depth === 0) {
          for (const op of ops) {
            if (expr.slice(i, i + op.length) === op) {
              if (op === '+' && (expr[i - 1] === '+' || expr[i + 1] === '=')) continue;
              if (op === '-' && (expr[i - 1] === '-' || expr[i + 1] === '=')) continue;
              const left = expr.slice(0, i).trim();
              const right = expr.slice(i + op.length).trim();
              if (left && right) {
                return { left, op, right };
              }
            }
          }
        }
      }
      return null;
    }

    // Simple block evaluator
    function evalExpression(expr: string, localEnv: Record<string, any>): any {
      expr = expr.trim();
      if (!expr) return null;

      // Check numbers
      if (/^-?\d+(\.\d+)?$/.test(expr)) {
        return Number(expr);
      }

      // String literal: "..." or '...'
      if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
        const raw = expr.slice(1, -1);
        return raw
          .replace(/\\n/g, '\n')
          .replace(/\\t/g, '\t')
          .replace(/\\r/g, '\r')
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'")
          .replace(/\\\\/g, '\\');
      }

      // Check f-strings: f"..." or f'...'
      if (expr.startsWith('f"') || expr.startsWith("f'")) {
        const inner = expr.slice(2, -1);
        return inner.replace(/\{([^}]+)\}/g, (_, sub) => {
          return String(evalExpression(sub, localEnv));
        });
      }

      // Check booleans
      if (expr === 'True') return true;
      if (expr === 'False') return false;
      if (expr === 'None') return null;

      // Check list literal [a, b, c]
      if (expr.startsWith('[') && expr.endsWith(']')) {
        const inner = expr.slice(1, -1).trim();
        if (!inner) return [];
        return splitArgs(inner).map(x => evalExpression(x, localEnv));
      }

      // Check dict literal { 'a': 1, 'b': 2 }
      if (expr.startsWith('{') && expr.endsWith('}')) {
        const inner = expr.slice(1, -1).trim();
        if (!inner) return {};
        const dictRes: Record<string, any> = {};
        const pairs = splitArgs(inner);
        for (const p of pairs) {
          const colonIdx = p.indexOf(':');
          if (colonIdx > 0) {
            const k = evalExpression(p.slice(0, colonIdx), localEnv);
            const v = evalExpression(p.slice(colonIdx + 1), localEnv);
            dictRes[String(k)] = v;
          }
        }
        return dictRes;
      }

      // Check comparisons
      const compRegex = /^(.+?)\s*(==|!=|<=|>=|<|>)\s*(.+)$/;
      const compMatch = expr.match(compRegex);
      if (compMatch) {
        const left = evalExpression(compMatch[1], localEnv);
        const op = compMatch[2];
        const right = evalExpression(compMatch[3], localEnv);
        if (op === '==') return left === right;
        if (op === '!=') return left !== right;
        if (op === '<') return left < right;
        if (op === '>') return left > right;
        if (op === '<=') return left <= right;
        if (op === '>=') return left >= right;
      }

      // Logical and / or / not
      if (expr.startsWith('not ')) {
        return !evalExpression(expr.slice(4), localEnv);
      }
      if (expr.includes(' and ')) {
        const parts = expr.split(' and ');
        return parts.every(p => Boolean(evalExpression(p, localEnv)));
      }
      if (expr.includes(' or ')) {
        const parts = expr.split(' or ');
        return parts.some(p => Boolean(evalExpression(p, localEnv)));
      }

      // Arithmetic / String operations using top-level operators
      const addOp = findTopLevelOp(expr, ['+', '-']);
      if (addOp) {
        const left = evalExpression(addOp.left, localEnv);
        const right = evalExpression(addOp.right, localEnv);
        if (addOp.op === '+') {
          if (typeof left === 'string' || typeof right === 'string') {
            return String(left) + String(right);
          }
          return Number(left) + Number(right);
        }
        return Number(left) - Number(right);
      }

      const mulOp = findTopLevelOp(expr, ['*', '/', '%']);
      if (mulOp) {
        const left = evalExpression(mulOp.left, localEnv);
        const right = evalExpression(mulOp.right, localEnv);
        if (mulOp.op === '*') {
          if (typeof left === 'string' && typeof right === 'number') {
            return left.repeat(Math.max(0, right));
          }
          return Number(left) * Number(right);
        }
        if (mulOp.op === '/') {
          if (Number(right) === 0) throw new Error('ZeroDivisionError: division by zero');
          return Number(left) / Number(right);
        }
        if (mulOp.op === '%') {
          if (Number(right) === 0) throw new Error('ZeroDivisionError: integer modulo by zero');
          return Number(left) % Number(right);
        }
      }

      // Function calls: name(args)
      const callMatch = expr.match(/^([a-zA-Z_]\w*)\s*\((.*)\)$/);
      if (callMatch) {
        const fnName = callMatch[1];
        const rawArgs = callMatch[2].trim();
        const parsedArgs = rawArgs ? splitArgs(rawArgs).map(a => evalExpression(a, localEnv)) : [];

        // Check local functions
        if (typeof localEnv[fnName] === 'function') {
          return localEnv[fnName](...parsedArgs);
        }
        return executeCommand(fnName, parsedArgs);
      }

      // Member method calls like list.append(x)
      const methodMatch = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\s*\((.*)\)$/);
      if (methodMatch) {
        const objName = methodMatch[1];
        const methodName = methodMatch[2];
        const rawArgs = methodMatch[3].trim();
        const obj = localEnv[objName];
        const parsedArgs = rawArgs ? splitArgs(rawArgs).map(a => evalExpression(a, localEnv)) : [];
        if (Array.isArray(obj)) {
          if (methodName === 'append') {
            obj.push(parsedArgs[0]);
            return null;
          }
          if (methodName === 'pop') return obj.pop();
        }
        if (obj && typeof obj === 'object' && typeof obj[methodName] === 'function') {
          return obj[methodName](...parsedArgs);
        }
      }

      // Member property lookup: obj.prop
      const propMatch = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)$/);
      if (propMatch) {
        const obj = localEnv[propMatch[1]];
        if (obj && typeof obj === 'object') {
          return obj[propMatch[2]];
        }
      }

      // Variable or index lookup
      const indexMatch = expr.match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
      if (indexMatch) {
        const obj = localEnv[indexMatch[1]];
        const key = evalExpression(indexMatch[2], localEnv);
        if (obj && (typeof obj === 'object' || typeof obj === 'string')) {
          return obj[key];
        }
      }

      // Direct variable
      if (expr in localEnv) {
        return localEnv[expr];
      }
      if (expr in env) {
        return env[expr];
      }

      return expr;
    }

    function splitArgs(str: string): string[] {
      const parts: string[] = [];
      let current = '';
      let depth = 0;
      let inQuote = false;
      let quoteChar = '';

      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (inQuote) {
          current += char;
          if (char === quoteChar && str[i - 1] !== '\\') {
            inQuote = false;
          }
        } else if (char === '"' || char === "'") {
          inQuote = true;
          quoteChar = char;
          current += char;
        } else if (char === '(' || char === '[' || char === '{') {
          depth++;
          current += char;
        } else if (char === ')' || char === ']' || char === '}') {
          depth--;
          current += char;
        } else if (char === ',' && depth === 0) {
          parts.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      if (current.trim()) {
        parts.push(current.trim());
      }
      return parts;
    }

    // Execute line sequence recursively
    function executeBlock(startIdx: number, baseIndent: number, localEnv: Record<string, any>): number {
      let idx = startIdx;

      while (idx < lines.length) {
        const lineObj = lines[idx];
        if (lineObj.indent < baseIndent) {
          return idx; // Exit block
        }

        const text = lineObj.text;
        operationCount++;
        if (operationCount > MAX_OPERATIONS) {
          throw new Error('Execution stopped: loop exceeded 10,000 operations.');
        }

        // Check for compound statements missing colon: for, while, if, elif, else, def, class, try, finally
        if (/^(for\s+|while\s+|if\s+|elif\s+|else$|def\s+|class\s+|try$|finally$|with\s+)/.test(text) && !text.endsWith(':')) {
          throw new Error(`SyntaxError: expected ':' (detected at line ${lineObj.lineNum})`);
        }

        // For loop: for var in iterable:
        const forMatch = text.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+(.+):$/);
        if (forMatch) {
          const varName = forMatch[1];
          const iterableExpr = forMatch[2];
          const iterable = evalExpression(iterableExpr, localEnv);

          // Find end of this block
          const blockStart = idx + 1;
          let blockEnd = blockStart;
          while (blockEnd < lines.length && lines[blockEnd].indent > lineObj.indent) {
            blockEnd++;
          }

          if (Array.isArray(iterable) || typeof iterable === 'string') {
            const items = Array.isArray(iterable) ? iterable : iterable.split('');
            for (const item of items) {
              localEnv[varName] = item;
              let subIdx = blockStart;
              while (subIdx < blockEnd) {
                subIdx = executeBlock(subIdx, lines[blockStart].indent, localEnv);
              }
            }
          }
          idx = blockEnd;
          continue;
        }

        // While loop: while condition:
        const whileMatch = text.match(/^while\s+(.+):$/);
        if (whileMatch) {
          const condExpr = whileMatch[1];
          const blockStart = idx + 1;
          let blockEnd = blockStart;
          while (blockEnd < lines.length && lines[blockEnd].indent > lineObj.indent) {
            blockEnd++;
          }

          let whileIter = 0;
          while (Boolean(evalExpression(condExpr, localEnv))) {
            whileIter++;
            if (whileIter > 1000) {
              throw new Error(`Line ${lineObj.lineNum}: Infinite while loop detected (>1,000 iterations).`);
            }
            let subIdx = blockStart;
            while (subIdx < blockEnd) {
              subIdx = executeBlock(subIdx, lines[blockStart].indent, localEnv);
            }
          }
          idx = blockEnd;
          continue;
        }

        // If / Elif / Else
        const ifMatch = text.match(/^if\s+(.+):$/);
        if (ifMatch) {
          const cond = Boolean(evalExpression(ifMatch[1], localEnv));
          const blockStart = idx + 1;
          let blockEnd = blockStart;
          while (blockEnd < lines.length && lines[blockEnd].indent > lineObj.indent) {
            blockEnd++;
          }

          if (cond) {
            let subIdx = blockStart;
            while (subIdx < blockEnd) {
              subIdx = executeBlock(subIdx, lines[blockStart].indent, localEnv);
            }
            // Skip any connected elif/else blocks
            let skipIdx = blockEnd;
            while (
              skipIdx < lines.length &&
              lines[skipIdx].indent === lineObj.indent &&
              (lines[skipIdx].text.startsWith('elif ') || lines[skipIdx].text.startsWith('else:'))
            ) {
              skipIdx++;
              while (skipIdx < lines.length && lines[skipIdx].indent > lineObj.indent) {
                skipIdx++;
              }
            }
            idx = skipIdx;
            continue;
          } else {
            // Condition was false, check if next line is elif or else
            idx = blockEnd;
            while (idx < lines.length && lines[idx].indent === lineObj.indent) {
              const nextLine = lines[idx];
              if (nextLine.text.startsWith('elif ')) {
                const elifMatch = nextLine.text.match(/^elif\s+(.+):$/);
                const elifBlockStart = idx + 1;
                let elifBlockEnd = elifBlockStart;
                while (elifBlockEnd < lines.length && lines[elifBlockEnd].indent > nextLine.indent) {
                  elifBlockEnd++;
                }

                if (elifMatch && Boolean(evalExpression(elifMatch[1], localEnv))) {
                  let subIdx = elifBlockStart;
                  while (subIdx < elifBlockEnd) {
                    subIdx = executeBlock(subIdx, lines[elifBlockStart].indent, localEnv);
                  }
                  // Skip remaining elif/else
                  let afterElif = elifBlockEnd;
                  while (
                    afterElif < lines.length &&
                    lines[afterElif].indent === lineObj.indent &&
                    (lines[afterElif].text.startsWith('elif ') || lines[afterElif].text.startsWith('else:'))
                  ) {
                    afterElif++;
                    while (afterElif < lines.length && lines[afterElif].indent > lineObj.indent) {
                      afterElif++;
                    }
                  }
                  idx = afterElif;
                  break;
                } else {
                  idx = elifBlockEnd;
                }
              } else if (nextLine.text.startsWith('else:')) {
                const elseBlockStart = idx + 1;
                let elseBlockEnd = elseBlockStart;
                while (elseBlockEnd < lines.length && lines[elseBlockEnd].indent > nextLine.indent) {
                  elseBlockEnd++;
                }
                let subIdx = elseBlockStart;
                while (subIdx < elseBlockEnd) {
                  subIdx = executeBlock(subIdx, lines[elseBlockStart].indent, localEnv);
                }
                idx = elseBlockEnd;
                break;
              } else {
                break;
              }
            }
            continue;
          }
        }

        // Try / Except block
        if (text === 'try:') {
          const tryStart = idx + 1;
          let tryEnd = tryStart;
          while (tryEnd < lines.length && lines[tryEnd].indent > lineObj.indent) {
            tryEnd++;
          }
          const exceptIdx = tryEnd;
          const hasExcept = exceptIdx < lines.length && lines[exceptIdx].indent === lineObj.indent && lines[exceptIdx].text.startsWith('except');

          try {
            let sIdx = tryStart;
            while (sIdx < tryEnd) {
              sIdx = executeBlock(sIdx, lines[tryStart].indent, localEnv);
            }
            if (hasExcept) {
              let exceptEnd = exceptIdx + 1;
              while (exceptEnd < lines.length && lines[exceptEnd].indent > lines[exceptIdx].indent) {
                exceptEnd++;
              }
              idx = exceptEnd;
            } else {
              idx = tryEnd;
            }
          } catch (tErr) {
            if (hasExcept) {
              const exceptStart = exceptIdx + 1;
              let exceptEnd = exceptStart;
              while (exceptEnd < lines.length && lines[exceptEnd].indent > lines[exceptIdx].indent) {
                exceptEnd++;
              }
              let sIdx = exceptStart;
              while (sIdx < exceptEnd) {
                sIdx = executeBlock(sIdx, lines[exceptStart].indent, localEnv);
              }
              idx = exceptEnd;
            } else {
              throw tErr;
            }
          }
          continue;
        }

        // Class definition: class Name:
        const classMatch = text.match(/^class\s+([a-zA-Z_]\w*)(?:\((.*?)\))?:$/);
        if (classMatch) {
          const className = classMatch[1];
          const classBodyStart = idx + 1;
          let classBodyEnd = classBodyStart;
          while (classBodyEnd < lines.length && lines[classBodyEnd].indent > lineObj.indent) {
            classBodyEnd++;
          }

          localEnv[className] = function (...initArgs: any[]) {
            const instance: Record<string, any> = { __class__: className };
            const classScope: Record<string, any> = { ...localEnv, self: instance };
            let cIdx = classBodyStart;
            while (cIdx < classBodyEnd) {
              cIdx = executeBlock(cIdx, lines[classBodyStart].indent, classScope);
            }
            if (typeof classScope['__init__'] === 'function') {
              classScope['__init__'](instance, ...initArgs);
            }
            Object.keys(classScope).forEach((key) => {
              if (typeof classScope[key] === 'function' && key !== '__init__') {
                instance[key] = (...mArgs: any[]) => classScope[key](instance, ...mArgs);
              }
            });
            return instance;
          };

          idx = classBodyEnd;
          continue;
        }

        // Function definition: def name(params):
        const defMatch = text.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*?)\):$/);
        if (defMatch) {
          const fnName = defMatch[1];
          const params = defMatch[2].split(',').map(p => p.trim()).filter(Boolean);
          const fnBodyStart = idx + 1;
          let fnBodyEnd = fnBodyStart;
          while (fnBodyEnd < lines.length && lines[fnBodyEnd].indent > lineObj.indent) {
            fnBodyEnd++;
          }

          // Register function in localEnv
          localEnv[fnName] = (...passedArgs: any[]) => {
            const fnScope: Record<string, any> = { ...localEnv };
            params.forEach((param, pIdx) => {
              fnScope[param] = passedArgs[pIdx] !== undefined ? passedArgs[pIdx] : null;
            });
            let fIdx = fnBodyStart;
            while (fIdx < fnBodyEnd) {
              const lineInside = lines[fIdx];
              if (lineInside.text.startsWith('return ')) {
                const retExpr = lineInside.text.slice(7).trim();
                return evalExpression(retExpr, fnScope);
              }
              fIdx = executeBlock(fIdx, lines[fnBodyStart].indent, fnScope);
            }
            return null;
          };

          idx = fnBodyEnd;
          continue;
        }

        // Member assignment: obj.prop = expr
        const memberAssign = text.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (memberAssign && !text.includes('==')) {
          const obj = localEnv[memberAssign[1]];
          if (obj && typeof obj === 'object') {
            obj[memberAssign[2]] = evalExpression(memberAssign[3], localEnv);
          }
          idx++;
          continue;
        }

        // Variable assignment: var = expr
        const assignMatch = text.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (assignMatch && !text.includes('==')) {
          const varName = assignMatch[1];
          const valExpr = assignMatch[2];
          localEnv[varName] = evalExpression(valExpr, localEnv);
          idx++;
          continue;
        }

        // Augmented assignment: var += expr, var -= expr
        const augMatch = text.match(/^([a-zA-Z_]\w*)\s*(\+=|-=|\*=|\/=)\s*(.+)$/);
        if (augMatch) {
          const varName = augMatch[1];
          const op = augMatch[2];
          const val = evalExpression(augMatch[3], localEnv);
          const current = localEnv[varName] || 0;
          if (op === '+=') localEnv[varName] = current + val;
          if (op === '-=') localEnv[varName] = current - val;
          if (op === '*=') localEnv[varName] = current * val;
          if (op === '/=') localEnv[varName] = val !== 0 ? current / val : 0;
          idx++;
          continue;
        }

        // Regular expression / standalone command call: e.g. move_forward(), print("hi")
        evalExpression(text, localEnv);
        idx++;
      }

      return idx;
    }

    executeBlock(0, 0, env);

    return {
      success: true,
      stdout,
      stderr,
      steps,
    };
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    stderr.push(errorMsg);
    return {
      success: false,
      stdout,
      stderr,
      steps,
      error: errorMsg,
    };
  }
}
