import React, { useState } from 'react';
import { CODEX_ENTRIES, CodexEntry } from '../curriculum/codexData';
import { BookOpen, Search, Copy, Check, ArrowLeft, Sparkles, Terminal } from 'lucide-react';

interface PythonCodexProps {
  onClose: () => void;
  onInsertCode?: (code: string) => void;
}

export const PythonCodex: React.FC<PythonCodexProps> = ({ onClose, onInsertCode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Game Engine API',
    'Basics & Syntax',
    'Control Flow',
    'Data Structures',
    'Functions & Modules',
    'Object-Oriented Programming',
    'Error Handling',
  ];

  const filteredEntries = CODEX_ENTRIES.filter((entry) => {
    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.syntax.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
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
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">The Grand Python Codex</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Codex
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search concepts, commands (e.g. for, while, move_forward)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm">
              No codex entries found matching "{searchTerm}". Try a different keyword.
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-0.5">
                      {entry.category}
                    </span>
                    <h3 className="text-sm font-bold text-white">{entry.title}</h3>
                  </div>

                  {onInsertCode && (
                    <button
                      onClick={() => {
                        onInsertCode(entry.codeExample);
                        onClose();
                      }}
                      className="text-xs px-2.5 py-1 text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg self-start sm:self-auto transition-colors"
                    >
                      Paste to Editor
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{entry.explanation}</p>

                {/* Syntax Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-amber-300">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Syntax Format</span>
                  <div className="whitespace-pre-wrap">{entry.syntax}</div>
                </div>

                {/* Runnable / Example Code */}
                <div className="relative group rounded-lg overflow-hidden border border-slate-800">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                    <span className="font-mono">example.py</span>
                    <button
                      onClick={() => handleCopy(entry.codeExample, entry.id)}
                      className="flex items-center gap-1 hover:text-white"
                    >
                      {copiedId === entry.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
                    {entry.codeExample}
                  </pre>
                  {entry.outputExample && (
                    <div className="p-2.5 bg-slate-900/70 border-t border-slate-800 font-mono text-[11px] text-emerald-400 flex items-start gap-2">
                      <Terminal className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="whitespace-pre-wrap">{entry.outputExample}</div>
                    </div>
                  )}
                </div>

                {/* Tips */}
                {entry.tips && entry.tips.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Sage Tips</span>
                    <ul className="space-y-1 text-xs text-slate-400">
                      {entry.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 select-none">·</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
