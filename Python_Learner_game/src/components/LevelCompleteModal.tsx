import React from 'react';
import { Star, Trophy, ArrowRight, RotateCcw, Map, CheckCircle2, Award } from 'lucide-react';
import { Mission } from '../types/game';

interface LevelCompleteModalProps {
  mission: Mission;
  starsEarned: number;
  xpEarned: number;
  onNextLevel: () => void;
  onReplay: () => void;
  onWorldMap: () => void;
  hasNextLevel: boolean;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  mission,
  starsEarned,
  xpEarned,
  onNextLevel,
  onReplay,
  onWorldMap,
  hasNextLevel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-hidden text-center">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/15 blur-3xl pointer-events-none rounded-full" />

        {/* Celebration Trophy Badge */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 shadow-lg">
          <Trophy className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-bold text-slate-100 mb-1">Mission Accomplished!</h2>
        <p className="text-sm text-slate-400 mb-5">{mission.title}</p>

        {/* Stars Earned */}
        <div className="flex items-center justify-center gap-3 mb-5">
          {[1, 2, 3].map((starIdx) => {
            const isEarned = starIdx <= starsEarned;
            return (
              <div
                key={starIdx}
                className={`transform transition-all duration-300 ${
                  isEarned ? 'scale-110 text-amber-400' : 'text-slate-700'
                }`}
              >
                <Star
                  className={`w-10 h-10 ${isEarned ? 'fill-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : ''}`}
                />
              </div>
            );
          })}
        </div>

        {/* Rewards Summary */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 mb-5 space-y-2.5 text-xs text-left">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Experience Points Earned</span>
            </span>
            <span className="font-mono font-bold text-emerald-400">+{xpEarned} XP</span>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{mission.starCriteria.star1}</span>
              </span>
              <span className="text-amber-400 font-semibold">★ 1</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${starsEarned >= 2 ? 'text-emerald-400' : 'text-slate-600'}`}
                />
                <span>{mission.starCriteria.star2}</span>
              </span>
              <span className={`font-semibold ${starsEarned >= 2 ? 'text-amber-400' : 'text-slate-600'}`}>★ 2</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${starsEarned >= 3 ? 'text-emerald-400' : 'text-slate-600'}`}
                />
                <span>{mission.starCriteria.star3}</span>
              </span>
              <span className={`font-semibold ${starsEarned >= 3 ? 'text-amber-400' : 'text-slate-600'}`}>★ 3</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {hasNextLevel ? (
            <button
              onClick={onNextLevel}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              <span>Continue to Next Mission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onWorldMap}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              <span>Continue to World Map</span>
              <Map className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onReplay}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <button
              onClick={onWorldMap}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
