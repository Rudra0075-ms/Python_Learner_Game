import React, { useState, useEffect } from 'react';
import { Mission, GameStep, ExecutionResult, PlayerCustomization, PlayerProgress } from '../types/game';
import { getNextMission } from '../curriculum/missionsData';
import { pythonEngine, EngineStatus } from '../python-runtime/pythonEngine';
import { GameCanvas } from '../game/engine/GameCanvas';
import { ThreeGameView } from '../game/engine/ThreeGameView';
import { OllieTheOwl } from './OllieTheOwl';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';
import { LevelCompleteModal } from './LevelCompleteModal';
import { playSound } from '../audio/soundEffects';
import {
  Map,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Circle,
  HelpCircle,
  Volume2,
  VolumeX,
  Play,
  Square,
  RotateCcw,
  CheckCheck,
  Settings,
  BookOpen,
  ArrowLeft,
  Eye,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

interface GamePlayScreenProps {
  mission: Mission;
  progress: PlayerProgress;
  onMissionComplete: (missionId: string, stars: number, xp: number, bestCode: string) => void;
  onBackToMap: () => void;
  onNextMission: (nextMissionId: string) => void;
  onOpenCodex: () => void;
  onOpenSettings: () => void;
  soundVolume: number;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
  reducedMotion?: boolean;
}

export const GamePlayScreen: React.FC<GamePlayScreenProps> = ({
  mission,
  progress,
  onMissionComplete,
  onBackToMap,
  onNextMission,
  onOpenCodex,
  onOpenSettings,
  soundVolume,
  sfxEnabled,
  onToggleSfx,
  reducedMotion = false,
}) => {
  const [code, setCode] = useState(mission.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isPlayingSteps, setIsPlayingSteps] = useState(false);
  const [steps, setSteps] = useState<GameStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [stdout, setStdout] = useState<string[]>([]);
  const [stderr, setStderr] = useState<string[]>([]);
  const [executionTime, setExecutionTime] = useState(0);
  const [engineStatus, setEngineStatus] = useState<EngineStatus>(pythonEngine.getStatus());

  // Modals & Panels
  const [showHintModal, setShowHintModal] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [showCheckFeedbackModal, setShowCheckFeedbackModal] = useState(false);
  const [checkFeedback, setCheckFeedback] = useState<{
    allPassed: boolean;
    goals: { id: string; description: string; passed: boolean }[];
    details: string;
  } | null>(null);

  const [starsAwarded, setStarsAwarded] = useState(1);
  const [activeTab, setActiveTab] = useState<'editor' | 'console'>('editor');
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [lastExecResult, setLastExecResult] = useState<ExecutionResult | null>(null);

  // Subscribe to engine status
  useEffect(() => {
    return pythonEngine.onStatusChange((status) => {
      setEngineStatus(status);
    });
  }, []);

  // Reset state when mission changes
  useEffect(() => {
    setCode(mission.starterCode);
    setSteps([]);
    setCurrentStepIndex(-1);
    setStdout([]);
    setStderr([]);
    setIsPlayingSteps(false);
    setShowVictoryModal(false);
    setShowCheckFeedbackModal(false);
    setCheckFeedback(null);
    setErrorLine(null);
    setHintIndex(0);
  }, [mission]);

  // Execute Code through Python Engine with Real-Time Streaming
  const handleRunCode = async (): Promise<ExecutionResult | null> => {
    setIsRunning(true);
    setIsPlayingSteps(false);
    setCurrentStepIndex(-1);
    setStdout([]);
    setStderr([]);
    setErrorLine(null);

    playSound('click', soundVolume, sfxEnabled);

    try {
      const res: ExecutionResult = await pythonEngine.execute(
        code,
        mission.map,
        mission.map.playerStart,
        mission.map.playerDirection,
        6000,
        (text) => setStdout((prev) => [...prev, text]),
        (text) => setStderr((prev) => [...prev, text])
      );

      setStdout(res.stdout);
      setStderr(res.stderr);
      setSteps(res.steps);
      setExecutionTime(res.executionTimeMs);
      setLastExecResult(res);

      if (!res.success && res.error) {
        playSound('error', soundVolume, sfxEnabled);
        setActiveTab('console');
        const lineMatch = res.error.match(/line (\d+)/i);
        if (lineMatch) {
          setErrorLine(parseInt(lineMatch[1], 10));
        }
        return res;
      } else {
        if (res.steps.length > 0) {
          setCurrentStepIndex(-1);
          setIsPlayingSteps(true);
        } else {
          evaluateSuccessConditions(res);
        }
        return res;
      }
    } catch (err: any) {
      playSound('error', soundVolume, sfxEnabled);
      setStderr([err?.message || 'Execution error']);
      setActiveTab('console');
      return null;
    } finally {
      setIsRunning(false);
    }
  };

  // Immediate Runtime Cancellation Handler
  const handleStopCode = () => {
    playSound('click', soundVolume, sfxEnabled);
    pythonEngine.cancelExecution('Execution interrupted by player.');
    setIsRunning(false);
  };

  // Evaluate Level Goals & Conditions
  const evaluateSuccessConditions = (res?: ExecutionResult) => {
    const executedSteps = res ? res.steps : steps;
    const executedStdout = res ? res.stdout : stdout;
    const executedStderr = res ? res.stderr : stderr;

    const lastPos =
      executedSteps.length > 0 && executedSteps[executedSteps.length - 1].to
        ? executedSteps[executedSteps.length - 1].to!
        : mission.map.playerStart;

    const collected = executedSteps
      .filter((s) => s.type === 'collect' && s.success && s.targetEntityId)
      .map((s) => s.targetEntityId!);

    const openedGates = executedSteps.filter((s) => s.type === 'open_door' && s.success).length;

    let allGoalsMet = true;
    const goalResults: { id: string; description: string; passed: boolean }[] = [];

    for (const goal of mission.goals) {
      let passed = false;
      if (goal.type === 'reach_portal') {
        const portal = mission.map.portalPosition;
        passed = !!(portal && lastPos.x === portal.x && lastPos.y === portal.y);
      } else if (goal.type === 'collect_all') {
        const totalCollectibles = mission.map.entities.filter(
          (e) =>
            e.type === 'crystal' ||
            e.type === 'gem' ||
            e.type === 'coin' ||
            e.type === 'flower' ||
            e.type === 'potion' ||
            e.type === 'key'
        );
        passed = totalCollectibles.length === 0 || collected.length >= totalCollectibles.length;
      } else if (goal.type === 'open_gate') {
        passed = openedGates > 0;
      } else if (goal.type === 'output_match') {
        passed = executedStdout.some((line) => line.includes(String(goal.targetValue || '')));
      } else {
        passed = true;
      }

      goalResults.push({ id: goal.id, description: goal.description, passed });
      if (!passed) allGoalsMet = false;
    }

    if (executedStderr.length > 0) {
      allGoalsMet = false;
    }

    return { allGoalsMet, goalResults, lastPos, collected };
  };

  // Called after animation steps finish on the canvas
  const handleExecutionComplete = () => {
    setIsPlayingSteps(false);
    const { allGoalsMet } = evaluateSuccessConditions();

    if (allGoalsMet) {
      let earnedStars = 1;
      const codeLines = code.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#')).length;

      if (mission.starCriteria.maxLinesForStar2 && codeLines <= mission.starCriteria.maxLinesForStar2) {
        earnedStars++;
      } else if (codeLines <= 6) {
        earnedStars++;
      }

      if (stderr.length === 0) {
        earnedStars++;
      }

      earnedStars = Math.min(3, Math.max(1, earnedStars));
      setStarsAwarded(earnedStars);

      playSound('level_complete', soundVolume, sfxEnabled);
      setShowVictoryModal(true);
      onMissionComplete(mission.id, earnedStars, mission.xpReward, code);
    }
  };

  // "Check Solution" Handler: Actively tests current code and provides validation feedback
  const handleCheckSolution = async () => {
    playSound('click', soundVolume, sfxEnabled);

    const execResult = await handleRunCode();
    if (!execResult) return;

    const { allGoalsMet, goalResults, lastPos, collected } = evaluateSuccessConditions(execResult);

    let detailsMsg = '';
    if (allGoalsMet) {
      detailsMsg = 'Outstanding! Your Python incantation satisfies every quest condition.';
    } else {
      const failedGoals = goalResults.filter((g) => !g.passed);
      detailsMsg = `Pending goals: ${failedGoals.map((g) => g.description).join(', ')}.`;
      if (mission.map.portalPosition && (lastPos.x !== mission.map.portalPosition.x || lastPos.y !== mission.map.portalPosition.y)) {
        detailsMsg += ` Hero ended at (${lastPos.x}, ${lastPos.y}); target portal is at (${mission.map.portalPosition.x}, ${mission.map.portalPosition.y}).`;
      }
    }

    setCheckFeedback({
      allPassed: allGoalsMet,
      goals: goalResults,
      details: detailsMsg,
    });

    if (!allGoalsMet) {
      setShowCheckFeedbackModal(true);
    }
  };

  // Full Reset Button Handler
  const handleReset = () => {
    playSound('click', soundVolume, sfxEnabled);
    setCode(mission.starterCode);
    setSteps([]);
    setCurrentStepIndex(-1);
    setIsPlayingSteps(false);
    setStdout([]);
    setStderr([]);
    setErrorLine(null);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Bar Contract: 3 Zones */}
      <header className="flex items-center justify-between gap-8 px-5 py-2.5 bg-slate-950 border-b border-slate-800 shrink-0 z-20">
        {/* Zone 1: Brand & Back to Map */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMap}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>
          <div className="h-5 w-px bg-slate-800" />
          <span className="text-sm font-bold text-white whitespace-nowrap shrink-0 truncate max-w-xs sm:max-w-md">
            World {mission.worldId} · {mission.title}
          </span>
        </div>

        {/* Zone 2: Navigation / Mission Context */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
          <span className="text-amber-400">{mission.chapterName}</span>
          <span aria-hidden="true">·</span>
          <span>{mission.conceptTitle}</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-mono">+{mission.xpReward} XP</span>
        </nav>

        {/* Zone 3: Functional Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Hint Button */}
          <button
            onClick={() => setShowHintModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Hint</span>
          </button>

          {/* Check Solution Button */}
          <button
            onClick={handleCheckSolution}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:text-sky-200 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-lg transition-colors"
            title="Validate code against level goals"
          >
            <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Check Solution</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title="Reset code and hero position"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Run / Stop Button */}
          {isRunning ? (
            <button
              onClick={handleStopCode}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm transition-all animate-pulse"
              title="Stop and cancel active Python execution"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={handleRunCode}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run</span>
            </button>
          )}

          <div className="h-5 w-px bg-slate-800" />

          {/* Audio & Settings */}
          <button
            onClick={onToggleSfx}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title={sfxEnabled ? 'Mute SFX' : 'Enable SFX'}
          >
            {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          <button
            onClick={onOpenSettings}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Gameplay Work Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-3 gap-3">
        {/* Left Side: Game Canvas & Mission Objectives */}
        <div className="flex-1 flex flex-col gap-3 min-h-[340px] lg:min-h-0">
          {/* Mission Objective & Story Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-md flex items-start gap-3 shrink-0">
            <img
              src="/src/assets/images/mentor_sage_portrait_1792500206332.jpg"
              alt="Pythor the Sage"
              className="w-11 h-11 rounded-lg object-cover border border-amber-500/40 shrink-0 shadow"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-bold text-amber-400">Sage Pythor</span>
                <span className="text-[11px] text-slate-400 font-mono">Objective</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">{mission.conceptSummary}</p>

              {/* Goals list with live checklist */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {mission.goals.map((g) => (
                  <div key={g.id} className="flex items-center gap-1.5 text-slate-300">
                    <Circle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                    <span>{g.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Anime Realm / 2D Game Canvas */}
          <div className="flex-1 min-h-0">
            {viewMode === '3d' ? (
              <ThreeGameView
                map={mission.map}
                steps={steps}
                currentStepIndex={currentStepIndex}
                onStepChange={(idx) => setCurrentStepIndex(idx)}
                onExecutionComplete={handleExecutionComplete}
                customization={progress.customization}
                soundVolume={soundVolume}
                sfxEnabled={sfxEnabled}
                isPlaying={isPlayingSteps}
                onTogglePlay={() => setIsPlayingSteps(!isPlayingSteps)}
                onReset={handleReset}
                reducedMotion={reducedMotion}
                onSwitchTo2D={() => setViewMode('2d')}
              />
            ) : (
              <GameCanvas
                map={mission.map}
                steps={steps}
                currentStepIndex={currentStepIndex}
                onStepChange={(idx) => setCurrentStepIndex(idx)}
                onExecutionComplete={handleExecutionComplete}
                customization={progress.customization}
                soundVolume={soundVolume}
                sfxEnabled={sfxEnabled}
                isPlaying={isPlayingSteps}
                onTogglePlay={() => setIsPlayingSteps(!isPlayingSteps)}
                onReset={handleReset}
                onSwitchTo3D={() => setViewMode('3d')}
              />
            )}
          </div>
        </div>

        {/* Right Side: Code Editor & Console */}
        <div className="flex-1 flex flex-col gap-3 min-h-[360px] lg:min-h-0">
          {/* Segmented Switcher for Editor and Console */}
          <div className="flex items-center justify-between bg-slate-900 p-1 border border-slate-800 rounded-lg shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'editor' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Python Editor
              </button>
              <button
                onClick={() => setActiveTab('console')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'console' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Execution Console {stderr.length > 0 && <span className="text-rose-400 font-bold ml-1">!</span>}
              </button>
            </div>

            <button
              onClick={() => setShowSolutionModal(true)}
              className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Canonical Solution</span>
            </button>
          </div>

          {/* Main Code View Area */}
          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {activeTab === 'editor' ? (
              <div className="flex-1 h-full min-h-0">
                <CodeEditor
                  code={code}
                  onChange={(newCode) => setCode(newCode)}
                  onRun={handleRunCode}
                  onStop={handleStopCode}
                  onReset={handleReset}
                  isRunning={isRunning}
                  onOpenCodex={onOpenCodex}
                  errorLine={errorLine}
                />
              </div>
            ) : (
              <div className="flex-1 h-full min-h-0">
                <ConsoleOutput
                  stdout={stdout}
                  stderr={stderr}
                  steps={steps}
                  executionTimeMs={executionTime}
                  engineStatus={engineStatus}
                  onClear={() => {
                    setStdout([]);
                    setStderr([]);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Graduated Hints Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Lightbulb className="w-5 h-5" />
                <span>Sage Advice · Hint {hintIndex + 1} of {mission.hints.length}</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {hintIndex + 1}/{mission.hints.length}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              {mission.hints[hintIndex]}
            </p>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHintIndex(Math.max(0, hintIndex - 1))}
                  disabled={hintIndex === 0}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 rounded-lg bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={() => setHintIndex(Math.min(mission.hints.length - 1, hintIndex + 1))}
                  disabled={hintIndex === mission.hints.length - 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-30 rounded-lg transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setShowHintModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Check Solution Validation Feedback Modal */}
      {showCheckFeedbackModal && checkFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 text-sky-400 font-bold mb-3">
              <CheckCheck className="w-5 h-5" />
              <span>Solution Verification</span>
            </div>

            <p className="text-xs text-slate-300 mb-4">{checkFeedback.details}</p>

            <div className="space-y-2 mb-5">
              {checkFeedback.goals.map((g) => (
                <div
                  key={g.id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                    g.passed
                      ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-800 text-rose-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {g.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{g.description}</span>
                  </span>
                  <span className="font-semibold">{g.passed ? 'PASSED' : 'PENDING'}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setShowCheckFeedbackModal(false);
                  setShowSolutionModal(true);
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                Inspect Solution
              </button>
              <button
                onClick={() => setShowCheckFeedbackModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Canonical Solution Modal */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Canonical Python Solution</h3>
            <p className="text-xs text-slate-400 mb-4">
              Here is the standard Python incantation for this trial:
            </p>

            <pre className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto mb-5 leading-relaxed">
              {mission.solutionCode}
            </pre>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setCode(mission.solutionCode);
                  setShowSolutionModal(false);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-colors"
              >
                Load Solution into Editor
              </button>
              <button
                onClick={() => setShowSolutionModal(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Level Complete Modal with Continue Button */}
      {showVictoryModal && (() => {
        const nextM = getNextMission(mission.id);
        return (
          <LevelCompleteModal
            mission={mission}
            starsEarned={starsAwarded}
            xpEarned={mission.xpReward}
            onNextLevel={() => {
              setShowVictoryModal(false);
              if (nextM) {
                onNextMission(nextM.id);
              } else {
                onBackToMap();
              }
            }}
            onReplay={() => {
              setShowVictoryModal(false);
              handleReset();
            }}
            onWorldMap={() => {
              setShowVictoryModal(false);
              onBackToMap();
            }}
            hasNextLevel={!!nextM}
          />
        );
      })()}

      {/* Ollie the Code Owl Mentor */}
      <OllieTheOwl
        mission={mission}
        lastResult={lastExecResult}
        lastError={stderr.length > 0 ? stderr.join('\n') : null}
        isCompleted={showVictoryModal}
        onOpenCodex={onOpenCodex}
        reducedMotion={reducedMotion}
      />
    </div>
  );
};
