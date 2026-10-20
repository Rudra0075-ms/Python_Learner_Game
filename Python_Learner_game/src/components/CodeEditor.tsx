import React, { useRef, useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, BookOpen, Square } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onRun: () => void;
  onStop?: () => void;
  onReset: () => void;
  isRunning?: boolean;
  fontSize?: 'sm' | 'md' | 'lg';
  onFontSizeChange?: (size: 'sm' | 'md' | 'lg') => void;
  onOpenCodex?: () => void;
  errorLine?: number | null;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onStop,
  onReset,
  isRunning = false,
  fontSize = 'md',
  onFontSizeChange,
  onOpenCodex,
  errorLine = null,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([code]);
  const [historyIdx, setHistoryIdx] = useState(0);

  const lines = code.split('\n');

  const fontClass = {
    sm: 'text-xs leading-5',
    md: 'text-sm leading-6',
    lg: 'text-base leading-7',
  }[fontSize];

  // Handle Tab, Enter auto-indent, and Shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Run on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    // Undo: Ctrl+Z
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        onChange(history[nextIdx]);
      }
      return;
    }

    // Redo: Ctrl+Y or Ctrl+Shift+Z
    if (((e.ctrlKey || e.metaKey) && e.key === 'y') || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z')) {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        onChange(history[nextIdx]);
      }
      return;
    }

    // Tab key: Insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      updateCodeWithHistory(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
      return;
    }

    // Enter key: Auto-indentation
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Find current line text before cursor
      const linesBeforeCursor = code.substring(0, start).split('\n');
      const currentLine = linesBeforeCursor[linesBeforeCursor.length - 1];
      const indentMatch = currentLine.match(/^[ ]*/);
      let indent = indentMatch ? indentMatch[0] : '';

      // If line ended with colon :, add 4 extra spaces!
      if (currentLine.trim().endsWith(':')) {
        indent += '    ';
      }

      const insertion = '\n' + indent;
      const newCode = code.substring(0, start) + insertion + code.substring(end);
      updateCodeWithHistory(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
      }, 0);
      return;
    }
  };

  const updateCodeWithHistory = (newCode: string) => {
    onChange(newCode);
    const newHist = history.slice(0, historyIdx + 1);
    newHist.push(newCode);
    if (newHist.length > 50) newHist.shift();
    setHistory(newHist);
    setHistoryIdx(newHist.length - 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200">main.py</span>
          <span className="text-slate-600">·</span>
          <span className="text-[11px] text-slate-500 font-mono">{lines.length} lines</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Font Size controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 p-0.5 rounded border border-slate-700/60 text-[11px]">
            {(['sm', 'md', 'lg'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => onFontSizeChange && onFontSizeChange(sz)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  fontSize === sz ? 'bg-slate-700 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sz.toUpperCase()}
              </button>
            ))}
          </div>

          {onOpenCodex && (
            <button
              onClick={onOpenCodex}
              title="Open Python Codex Guide"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Codex</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Copy Code"
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={onReset}
            title="Reset Starter Code"
            className="flex items-center gap-1 px-2.5 py-1.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {isRunning ? (
            <button
              onClick={onStop}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all animate-pulse"
              title="Interrupt and cancel Python execution"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={onRun}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              title="Execute Python code (Ctrl+Enter)"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Code</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="relative flex-1 flex overflow-hidden bg-slate-950 font-mono">
        {/* Line Numbers Column */}
        <div className="select-none py-3 px-3 bg-slate-950/80 border-r border-slate-800/80 text-right text-slate-600 font-mono text-xs w-12 shrink-0">
          {lines.map((_, i) => {
            const lineNum = i + 1;
            const isError = errorLine === lineNum;
            return (
              <div
                key={i}
                className={`h-6 flex items-center justify-end ${
                  isError ? 'text-rose-400 font-bold bg-rose-500/20 px-1 rounded' : ''
                }`}
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        {/* Text Area */}
        <div className="relative flex-1 h-full">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => updateCodeWithHistory(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className={`w-full h-full py-3 px-4 bg-transparent text-slate-200 resize-none outline-none font-mono ${fontClass} whitespace-pre overflow-auto`}
            style={{ tabSize: 4 }}
            placeholder="# Write your Python code here..."
          />
        </div>
      </div>

      {/* Editor Helper Footer */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950/90 border-t border-slate-800/60 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span>Shortcuts:</span>
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400">Ctrl+Enter</kbd>
          <span>Run</span>
          <span className="text-slate-700">·</span>
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400">Tab</kbd>
          <span>Indent 4 spaces</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400/80">
          <Sparkles className="w-3 h-3" />
          <span>Real Python 3</span>
        </div>
      </div>
    </div>
  );
};
