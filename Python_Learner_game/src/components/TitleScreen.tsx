import React from 'react';
import { PlayerProgress } from '../types/game';
import { WORLDS_DATA } from '../curriculum/worldsData';
import { useLenisScroll } from '../hooks/useLenisScroll';
import {
  Play,
  Map,
  BookOpen,
  User,
  Trophy,
  Settings,
  Sparkles,
  Star,
  Award,
  Code2,
  ChevronDown,
  Layers,
  Terminal,
  Shield,
  Zap,
} from 'lucide-react';

interface TitleScreenProps {
  progress: PlayerProgress;
  onStartAdventure: () => void;
  onOpenMap: () => void;
  onOpenCodex: () => void;
  onOpenCustomizer: () => void;
  onOpenDashboard: () => void;
  onOpenWorkshop: () => void;
  onOpenChallenges: () => void;
  onOpenSettings: () => void;
  reducedMotion?: boolean;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  progress,
  onStartAdventure,
  onOpenMap,
  onOpenCodex,
  onOpenCustomizer,
  onOpenDashboard,
  onOpenWorkshop,
  onOpenChallenges,
  onOpenSettings,
  reducedMotion = false,
}) => {
  const completedCount = Object.keys(progress.completedMissions).length;
  const hasStarted = completedCount > 0;

  // Initialize Lenis smooth scrolling for landing page
  useLenisScroll({ enabled: true, reducedMotion });

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Background Cover Image with atmospheric gradient overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/title_hero_cover_1792500206195.jpg"
          alt="Python Quest: Code the World"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-30 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between gap-8 px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>Python Quest</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button onClick={onOpenMap} className="hover:text-amber-400 transition-colors">
            World Map
          </button>
          <button onClick={onOpenCodex} className="hover:text-amber-400 transition-colors">
            Codex
          </button>
          <button onClick={onOpenChallenges} className="hover:text-amber-400 transition-colors">
            Arena
          </button>
          <button onClick={onOpenWorkshop} className="hover:text-amber-400 transition-colors">
            Workshop
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Centerpiece */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-16 max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Python 3.12 WebAssembly Engine · Free & Offline-Ready</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          PYTHON QUEST
          <span className="block text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 mt-1 font-bold">
            Code the World
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mb-8 leading-relaxed">
          Embark on a grand fantasy adventure where writing real Python code commands your hero in an anime-inspired 3D realm.
          Master variables, loops, functions, data structures, and algorithms across 12 distinct worlds under the guidance of Ollie the Code Owl.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center mb-8">
          <button
            onClick={onStartAdventure}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{hasStarted ? 'Continue Adventure' : 'Start Adventure'}</span>
          </button>

          <button
            onClick={onOpenMap}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm rounded-xl transition-all"
          >
            <Map className="w-4 h-4 text-amber-400" />
            <span>World Map</span>
          </button>
        </div>

        {/* Player Profile Quick Ribbon */}
        {hasStarted && (
          <div className="flex items-center gap-6 p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-300 shadow-lg mb-8">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Hero:</span>
              <span className="font-semibold text-white">{progress.customization.name}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Level:</span>
              <span className="font-mono font-bold text-amber-400">{progress.level}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-mono font-bold text-amber-400">{progress.stars}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono font-bold text-emerald-400">{progress.xp} XP</span>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 text-slate-500 text-xs animate-bounce mt-4">
          <span>Explore Curriculum & 3D Worlds</span>
          <ChevronDown className="w-4 h-4 text-amber-400" />
        </div>
      </main>

      {/* Feature Pillar Highlights */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <span className="text-xl">🦉</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">Ollie the Code Owl</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your animated in-game mentor provides contextual guidance, real-time syntax diagnosis, and encouraging hints tailored to your mistakes.
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Three.js 3D Fantasy Realm</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Experience dynamic camera follow, atmospheric lighting, particle portals, and stylized anime scenery, with instant fallback to classic 2D.
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Real Python 3.12 Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Executes Python in sandboxed WebAssembly with full support for classes, loops, recursion, data structures, and standard libraries.
            </p>
          </div>
        </div>
      </section>

      {/* 12 Fantasy Worlds Chronicle */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Mastery Pathway</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">12 Distinct Fantasy Coding Worlds</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            From your first print incantation to advanced algorithms and practical software capstones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORLDS_DATA.map((w) => (
            <div
              key={w.id}
              onClick={onOpenMap}
              className="p-5 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-amber-400">World {w.id}</span>
                <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {w.missionsCount} Missions
                </span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {w.title}
              </h4>
              <p className="text-xs text-slate-400 italic mb-2">{w.subtitle}</p>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{w.lore}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Tiles Strip */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <button onClick={onOpenCustomizer} className="hover:text-slate-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Customize Hero</span>
            </button>
            <button onClick={onOpenCodex} className="hover:text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Python Codex</span>
            </button>
            <button onClick={onOpenWorkshop} className="hover:text-slate-200 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Project Workshop</span>
            </button>
            <button onClick={onOpenDashboard} className="hover:text-slate-200 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-purple-400" />
              <span>Achievements</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500">
            <span>Runs 100% locally in your browser with Pyodide WebAssembly · No account or API key needed</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
