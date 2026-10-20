import React, { useState } from 'react';
import { Terminal, AlertCircle, CheckCircle2, Clock, Trash2, ArrowRight } from 'lucide-react';
import { GameStep } from '../types/game';

interface ConsoleOutputProps {
  stdout: string[];
  stderr: string[];
  steps: GameStep[];
  executionTimeMs: number;
  engineStatus: string;
  onClear: () => void;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  stdout,
  stderr,
  steps,
  executionTimeMs,
  engineStatus,
  onClear,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'stdout' | 'steps' | 'errors'>('all');

  const hasErrors = stderr.length > 0;

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Console Header with Tabs */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              activeTab === 'all' ? 'bg-slate-800 text-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Output
          </button>
          <button
            onClick={() => setActiveTab('stdout')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              activeTab === 'stdout' ? 'bg-slate-800 text-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terminal ({stdout.length})
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              activeTab === 'steps' ? 'bg-slate-800 text-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Actions ({steps.length})
          </button>
          {hasErrors && (
            <button
              onClick={() => setActiveTab('errors')}
              className={`px-2.5 py-1 rounded font-medium text-rose-400 transition-colors ${
                activeTab === 'errors' ? 'bg-rose-950/60 text-rose-300' : 'hover:bg-rose-950/30'
              }`}
            >
              Errors ({stderr.length})
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {executionTimeMs > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{executionTimeMs}ms</span>
            </div>
          )}

          <button
            onClick={onClear}
            title="Clear Console"
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Output Stream */}
      <div className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-1.5 bg-slate-950">
        {stdout.length === 0 && stderr.length === 0 && steps.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-600 italic">
            Console output will appear here after running your code.
          </div>
        ) : (
          <>
            {/* Errors */}
            {(activeTab === 'all' || activeTab === 'errors') &&
              stderr.map((err, i) => (
                <div
                  key={`err-${i}`}
                  className="p-2 rounded bg-rose-950/40 border border-rose-900/60 text-rose-300 flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="whitespace-pre-wrap break-words">{err}</div>
                </div>
              ))}

            {/* Standard Output (Print/Say) */}
            {(activeTab === 'all' || activeTab === 'stdout') &&
              stdout.map((line, i) => (
                <div key={`out-${i}`} className="text-slate-300 flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-500 select-none">{'>'}</span>
                  <span className="whitespace-pre-wrap break-words">{line}</span>
                </div>
              ))}

            {/* Recorded Steps Timeline */}
            {(activeTab === 'all' || activeTab === 'steps') &&
              steps.map((st, i) => (
                <div
                  key={`step-${i}`}
                  className="flex items-center gap-2 py-0.5 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span className="text-slate-600 w-6 text-right select-none">{i + 1}.</span>
                  <span className="capitalize font-semibold text-emerald-400/90">{st.type}</span>
                  {st.direction && <span className="text-slate-400">({st.direction})</span>}
                  {st.from && st.to && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <span>({st.from.x}, {st.from.y})</span>
                      <ArrowRight className="w-3 h-3 text-slate-600" />
                      <span className="text-slate-200">({st.to.x}, {st.to.y})</span>
                    </span>
                  )}
                  {st.message && <span className="text-amber-300/90 italic">{st.message}</span>}
                </div>
              ))}
          </>
        )}
      </div>

      {/* Engine Status Line */}
      <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              engineStatus === 'ready'
                ? 'bg-emerald-500'
                : engineStatus === 'loading'
                ? 'bg-amber-500 animate-pulse'
                : 'bg-blue-400'
            }`}
          ></span>
          <span>
            {engineStatus === 'ready'
              ? 'Pyodide WebAssembly Python 3.12 Engine'
              : engineStatus === 'loading'
              ? 'Loading Pyodide WebAssembly...'
              : 'Built-in Fast Python Engine (Offline Ready)'}
          </span>
        </div>
        <span>Secure Local Sandboxed Worker</span>
      </div>
    </div>
  );
};
