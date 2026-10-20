import React, { useState, useEffect } from 'react';
import { Mission, ExecutionResult } from '../types/game';
import { Sparkles, MessageCircle, ChevronDown, ChevronUp, Lightbulb, BookOpen, AlertCircle, X } from 'lucide-react';

interface OllieTheOwlProps {
  mission: Mission;
  lastResult: ExecutionResult | null;
  lastError: string | null;
  isCompleted: boolean;
  onOpenCodex?: () => void;
  reducedMotion?: boolean;
}

export const OllieTheOwl: React.FC<OllieTheOwlProps> = ({
  mission,
  lastResult,
  lastError,
  isCompleted,
  onOpenCodex,
  reducedMotion = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [blink, setBlink] = useState(false);
  const [wingFlap, setWingFlap] = useState(false);

  // Periodic blinking and wing fluffing animation
  useEffect(() => {
    if (reducedMotion) return;

    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 4500);

    const flapInterval = setInterval(() => {
      setWingFlap(true);
      setTimeout(() => setWingFlap(false), 600);
    }, 8000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(flapInterval);
    };
  }, [reducedMotion]);

  // If a new error occurs or mission completes, auto-re-open Ollie
  useEffect(() => {
    if (lastError || isCompleted) {
      setIsDismissed(false);
      setIsExpanded(true);
    }
  }, [lastError, isCompleted, mission.id]);

  // Synthesize Ollie's contextual speech
  const getDialogue = (): { title: string; message: string; type: 'error' | 'celebrate' | 'hint' | 'tip' } => {
    if (isCompleted) {
      return {
        title: 'Hoo-ray! Brilliant Code!',
        message: `Outstanding spellcraft! You successfully completed "${mission.title}". The logic holds together with true Python elegance. Onto the next gateway!`,
        type: 'celebrate',
      };
    }

    if (lastError) {
      const lower = lastError.toLowerCase();

      if (lower.includes('unterminated string literal') || lower.includes('eol while scanning string literal')) {
        return {
          title: 'Syntax Tip: Missing Quotation Mark',
          message:
            "An unterminated string means Python was looking for a closing quotation mark (like \" or ') but reached the end of the line before finding it. Check where quotes open and close!",
          type: 'error',
        };
      }

      if (lower.includes('indentationerror') || lower.includes('unexpected indent') || lower.includes('unindent')) {
        return {
          title: 'Syntax Tip: Indentation Alignment',
          message:
            "In Python, spacing defines code blocks! Make sure the lines inside your loops, ifs, or functions are indented with 4 spaces consistently.",
          type: 'error',
        };
      }

      if (lower.includes('nameerror')) {
        return {
          title: 'Concept Tip: Unknown Name',
          message:
            "Python encountered a variable or function name it hasn't heard of yet. Check for spelling typos, or make sure you defined the variable before using it.",
          type: 'error',
        };
      }

      if (lower.includes('zerodivisionerror')) {
        return {
          title: 'Arithmetic Tip: Division by Zero',
          message:
            "Mathematical wards cannot divide by zero! Ensure your divisor variable or expression evaluates to a non-zero value.",
          type: 'error',
        };
      }

      if (lower.includes('time out') || lower.includes('infinite loop')) {
        return {
          title: 'Loop Warning: Infinite Cycle',
          message:
            "The execution timed out! In a while loop, always verify that your loop condition will eventually turn False, or use break.",
          type: 'error',
        };
      }

      return {
        title: 'Error Diagnostic',
        message: `Let's inspect what happened: "${lastError.slice(0, 160)}${lastError.length > 160 ? '...' : ''}". Check your syntax and line numbers carefully!`,
        type: 'error',
      };
    }

    // Default proactive lesson coaching
    return {
      title: `Ollie's Wisdom: ${mission.conceptTitle}`,
      message: `${mission.conceptSummary} Look at the example in your scroll if you need inspiration, then press Run to test your hypothesis.`,
      type: 'tip',
    };
  };

  const { title, message, type } = getDialogue();

  if (isDismissed) {
    return (
      <button
        onClick={() => {
          setIsDismissed(false);
          setIsExpanded(true);
        }}
        className="fixed bottom-3 right-3 z-30 flex items-center gap-2 px-3 py-2 bg-slate-900/95 hover:bg-slate-800 text-amber-300 border border-amber-500/40 rounded-full shadow-2xl transition-all hover:scale-105 text-xs font-semibold backdrop-blur-sm"
        title="Open Ollie the Code Owl mentor"
      >
        <span className="text-base select-none">🦉</span>
        <span>Ask Ollie</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 z-30 max-w-sm sm:max-w-md w-[calc(100vw-24px)] pointer-events-auto">
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Header Bar */}
        <div
          className={`flex items-center justify-between px-3.5 py-2 cursor-pointer select-none transition-colors ${
            type === 'error'
              ? 'bg-rose-950/70 border-b border-rose-900/60'
              : type === 'celebrate'
              ? 'bg-emerald-950/70 border-b border-emerald-900/60'
              : 'bg-slate-800/80 border-b border-slate-700/60'
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2.5">
            {/* SVG Owl Avatar */}
            <div className="relative w-8 h-8 shrink-0">
              <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
                {/* Perch Twig */}
                <path d="M6 44 Q 24 40 42 44" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
                <circle cx="36" cy="42" r="2.5" fill="#10B981" />

                {/* Owl Body */}
                <ellipse cx="24" cy="28" rx="14" ry="16" fill="#854D0E" />
                <ellipse cx="24" cy="30" rx="9" ry="12" fill="#FEF3C7" opacity="0.9" />

                {/* Feathers / Breast Pattern */}
                <path d="M 21 27 Q 24 29 27 27 M 20 32 Q 24 34 28 32 M 22 36 Q 24 38 26 36" stroke="#D97706" strokeWidth="1.2" fill="none" />

                {/* Wings */}
                <path
                  d="M 10 24 C 7 30 11 38 15 36"
                  stroke="#713F12"
                  strokeWidth="2.5"
                  fill="#78350F"
                  className={wingFlap ? '-translate-y-1 rotate-3 transition-transform' : ''}
                />
                <path
                  d="M 38 24 C 41 30 37 38 33 36"
                  stroke="#713F12"
                  strokeWidth="2.5"
                  fill="#78350F"
                  className={wingFlap ? '-translate-y-1 -rotate-3 transition-transform' : ''}
                />

                {/* Head */}
                <circle cx="24" cy="16" r="12" fill="#A16207" />

                {/* Ear Tufts */}
                <polygon points="15,6 18,12 13,13" fill="#713F12" />
                <polygon points="33,6 30,12 35,13" fill="#713F12" />

                {/* Scholar Hat */}
                <polygon points="16,9 24,5 32,9 24,12" fill="#1E3A8A" />
                <line x1="24" y1="8" x2="31" y2="13" stroke="#F59E0B" strokeWidth="1.2" />
                <circle cx="31" cy="13" r="1.5" fill="#F59E0B" />

                {/* Eyes Circles */}
                <circle cx="19" cy="16" r="5" fill="#FEF08A" />
                <circle cx="29" cy="16" r="5" fill="#FEF08A" />

                {/* Pupils with Blink */}
                {blink ? (
                  <>
                    <line x1="15" y1="16" x2="23" y2="16" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
                    <line x1="25" y1="16" x2="33" y2="16" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <circle cx="20" cy="16" r="2.8" fill="#1E1B4B" />
                    <circle cx="30" cy="16" r="2.8" fill="#1E1B4B" />
                    {/* Eye Glint */}
                    <circle cx="19" cy="15" r="1" fill="#FFFFFF" />
                    <circle cx="29" cy="15" r="1" fill="#FFFFFF" />
                  </>
                )}

                {/* Beak */}
                <polygon points="22,18 26,18 24,22" fill="#F59E0B" />

                {/* Feet */}
                <ellipse cx="20" cy="42" rx="2" ry="1.5" fill="#F59E0B" />
                <ellipse cx="28" cy="42" rx="2" ry="1.5" fill="#F59E0B" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <span>Ollie the Code Owl</span>
                <span className="text-[10px] text-slate-400 font-normal">· Mentor</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium truncate max-w-[200px]">{title}</div>
            </div>
          </div>

          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700/50"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700/50"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable Body */}
        {isExpanded && (
          <div className="p-3 text-xs space-y-2.5 bg-slate-950/80">
            <p className="text-slate-200 leading-relaxed font-sans">{message}</p>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
              {onOpenCodex ? (
                <button
                  onClick={onOpenCodex}
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Codex Spellbook</span>
                </button>
              ) : (
                <span className="text-slate-500">World {mission.worldId}</span>
              )}

              <span className="text-slate-500 font-mono text-[10px]">
                {type === 'error' ? 'Traceback Tutor' : 'Python 3.12'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
