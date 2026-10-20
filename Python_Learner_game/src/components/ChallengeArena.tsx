import React, { useState } from 'react';
import { pythonEngine } from '../python-runtime/pythonEngine';
import { ArrowLeft, Play, Trophy, Clock, CheckCircle2, XCircle, Code2, Sparkles } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Apprentice' | 'Adept' | 'Master';
  description: string;
  starterCode: string;
  solutionCode: string;
  testFunctionCall: string;
  expectedResult: any;
}

const ARENA_CHALLENGES: Challenge[] = [
  {
    id: 'ch1',
    title: 'Sum of All Crystals',
    difficulty: 'Apprentice',
    description: 'Write a function sum_crystals(gem_values) that returns the total sum of all gem values in the list.',
    starterCode: `def sum_crystals(gem_values):
    # Calculate and return total sum
    total = 0
    for gem in gem_values:
        total += gem
    return total
`,
    solutionCode: `def sum_crystals(gem_values):
    return sum(gem_values)`,
    testFunctionCall: 'sum_crystals([10, 20, 30, 40])',
    expectedResult: 100,
  },
  {
    id: 'ch2',
    title: 'Filter Even Stepping Stones',
    difficulty: 'Apprentice',
    description: 'Write a function get_even_stones(numbers) that returns only the even numbers from the list.',
    starterCode: `def get_even_stones(numbers):
    evens = []
    for num in numbers:
        if num % 2 == 0:
            evens.append(num)
    return evens
`,
    solutionCode: `def get_even_stones(numbers):
    return [n for n in numbers if n % 2 == 0]`,
    testFunctionCall: 'get_even_stones([1, 2, 3, 4, 5, 6])',
    expectedResult: [2, 4, 6],
  },
  {
    id: 'ch3',
    title: 'Reverse the Ancient Inscription',
    difficulty: 'Adept',
    description: 'Write a function reverse_spell(text) that reverses a given string.',
    starterCode: `def reverse_spell(text):
    # Return the string reversed
    return text[::-1]
`,
    solutionCode: `def reverse_spell(text):
    return text[::-1]`,
    testFunctionCall: 'reverse_spell("PYTHON")',
    expectedResult: 'NOHTYP',
  },
  {
    id: 'ch4',
    title: 'Highest Mana Gem',
    difficulty: 'Adept',
    description: 'Write a function find_max_gem(gems) that returns the highest value without using max().',
    starterCode: `def find_max_gem(gems):
    if not gems:
        return 0
    highest = gems[0]
    for g in gems:
        if g > highest:
            highest = g
    return highest
`,
    solutionCode: `def find_max_gem(gems):
    highest = gems[0]
    for g in gems:
        if g > highest:
            highest = g
    return highest`,
    testFunctionCall: 'find_max_gem([14, 88, 32, 95, 21])',
    expectedResult: 95,
  },
];

interface ChallengeArenaProps {
  onClose: () => void;
  onAwardXp: (xp: number) => void;
}

export const ChallengeArena: React.FC<ChallengeArenaProps> = ({ onClose, onAwardXp }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(ARENA_CHALLENGES[0]);
  const [code, setCode] = useState(selectedChallenge.starterCode);
  const [running, setRunning] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [passed, setPassed] = useState<boolean | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const handleSelectChallenge = (ch: Challenge) => {
    setSelectedChallenge(ch);
    setCode(ch.starterCode);
    setTestOutput(null);
    setPassed(null);
  };

  const handleRunTests = async () => {
    setRunning(true);
    setTestOutput(null);
    setPassed(null);

    try {
      // Append test call and verification
      const harness = `
${code}

__test_val__ = ${selectedChallenge.testFunctionCall}
print("Test Result:", __test_val__)
`;
      const res = await pythonEngine.execute(
        harness,
        { width: 1, height: 1, tiles: [['grass']], playerStart: { x: 0, y: 0 }, playerDirection: 'right', entities: [] },
        { x: 0, y: 0 },
        'right'
      );

      const out = res.stdout.join('\n');
      setTestOutput(out || (res.stderr.length > 0 ? res.stderr.join('\n') : 'Executed successfully.'));

      // Check if test passed
      const expectedStr = typeof selectedChallenge.expectedResult === 'object'
        ? JSON.stringify(selectedChallenge.expectedResult)
        : String(selectedChallenge.expectedResult);

      if (out.includes(expectedStr)) {
        setPassed(true);
        if (!completedChallenges.includes(selectedChallenge.id)) {
          setCompletedChallenges([...completedChallenges, selectedChallenge.id]);
          onAwardXp(150);
        }
      } else {
        setPassed(false);
      }
    } catch (err: any) {
      setTestOutput(err?.message || 'Execution error');
      setPassed(false);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Challenge Arena</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Passed: {completedChallenges.length} / {ARENA_CHALLENGES.length}
            </span>
            <button
              onClick={onClose}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Exit Arena
            </button>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Challenges List Sidebar */}
          <div className="w-full md:w-72 bg-slate-950 border-r border-slate-800 p-4 overflow-y-auto space-y-2 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">
              Arena Trials
            </span>
            {ARENA_CHALLENGES.map((ch) => {
              const isSelected = selectedChallenge.id === ch.id;
              const isDone = completedChallenges.includes(ch.id);

              return (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChallenge(ch)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-amber-500/80 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-100">{ch.title}</span>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{ch.difficulty}</span>
                    <span className="text-amber-400 font-mono">+150 XP</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Challenge Editor & Test Runner */}
          <div className="flex-1 flex flex-col overflow-hidden p-4 gap-4 bg-slate-900">
            {/* Challenge Info */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shrink-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white">{selectedChallenge.title}</h3>
                <span className="text-xs font-mono text-emerald-400">{selectedChallenge.difficulty}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">{selectedChallenge.description}</p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <span>Target Test: </span>
                <span className="text-amber-300">{selectedChallenge.testFunctionCall}</span>
                <span> → Expected: </span>
                <span className="text-emerald-300">
                  {typeof selectedChallenge.expectedResult === 'object'
                    ? JSON.stringify(selectedChallenge.expectedResult)
                    : String(selectedChallenge.expectedResult)}
                </span>
              </div>
            </div>

            {/* Code Editor Area */}
            <div className="flex-1 flex flex-col min-h-0 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs">
                <span className="text-slate-400">arena_solution.py</span>
                <button
                  onClick={handleRunTests}
                  disabled={running}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg text-xs shadow-md transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{running ? 'Testing...' : 'Run Test Suite'}</span>
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full flex-1 p-4 bg-transparent text-slate-200 text-xs font-mono resize-none outline-none leading-relaxed"
                spellCheck={false}
              />

              {/* Test Results Banner */}
              {testOutput !== null && (
                <div
                  className={`p-3 border-t text-xs flex items-center justify-between ${
                    passed
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="font-semibold">
                      {passed ? 'All Test Cases Passed! (+150 XP)' : 'Test Failed. Check your logic and retry.'}
                    </span>
                  </div>
                  <pre className="font-mono text-[11px] text-slate-300">{testOutput}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
