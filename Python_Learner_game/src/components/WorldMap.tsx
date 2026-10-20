import React, { useState } from 'react';
import { WORLDS_DATA } from '../curriculum/worldsData';
import { getMissionsByWorld } from '../curriculum/missionsData';
import { WorldInfo, Mission, PlayerProgress } from '../types/game';
import { Lock, Star, ChevronRight, Sparkles, BookOpen, User, Trophy, Play } from 'lucide-react';

interface WorldMapProps {
  progress: PlayerProgress;
  onSelectMission: (missionId: string) => void;
  onOpenCodex: () => void;
  onOpenCustomizer: () => void;
  onOpenDashboard: () => void;
  onBackToTitle: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  progress,
  onSelectMission,
  onOpenCodex,
  onOpenCustomizer,
  onOpenDashboard,
  onBackToTitle,
}) => {
  const [selectedWorld, setSelectedWorld] = useState<WorldInfo | null>(WORLDS_DATA[0]);

  const missionsInSelectedWorld = selectedWorld ? getMissionsByWorld(selectedWorld.id) : [];

  const getWorldStars = (worldId: number) => {
    const worldMissions = getMissionsByWorld(worldId);
    let count = 0;
    worldMissions.forEach((m) => {
      const completed = progress.completedMissions[m.id];
      if (completed) count += completed.stars;
    });
    return count;
  };

  const isWorldUnlocked = (worldId: number) => {
    return progress.unlockedWorldIds.includes(worldId) || worldId === 1;
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-950 flex flex-col text-slate-100 overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between gap-8 px-6 py-3 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToTitle}
            className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Python Quest</span>
          </button>
        </div>

        {/* Player Stats Bar */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Level</span>
            <span className="font-mono font-bold text-amber-400">{progress.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">XP</span>
            <span className="font-mono font-bold text-emerald-400">{progress.xp}</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="font-mono font-bold">{progress.stars}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCodex}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Codex</span>
          </button>

          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Stats</span>
          </button>

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Hero</span>
          </button>
        </div>
      </header>

      {/* Main World Atlas Content */}
      <div className="flex-1 flex flex-col lg:flex-row p-4 md:p-6 gap-6 max-w-7xl mx-auto w-full">
        {/* Left / Center: Interactive Map & Worlds Grid */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
            <img
              src="/src/assets/images/world_map_fantasy_1792500206562.jpg"
              alt="Aethelia World Map"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-80 group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">Interactive Realm Map</p>
                <h1 className="text-xl sm:text-2xl font-bold text-white">The Kingdom of Aethelia</h1>
                <p className="text-xs text-slate-300 max-w-md hidden sm:block">
                  Journey from the ancient Verdian Forest through looping rivers, cavern vaults, and clockwork cities to master the code of the realm.
                </p>
              </div>
            </div>
          </div>

          {/* Worlds Carousel / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WORLDS_DATA.map((world) => {
              const unlocked = isWorldUnlocked(world.id);
              const stars = getWorldStars(world.id);
              const isSelected = selectedWorld?.id === world.id;

              return (
                <button
                  key={world.id}
                  onClick={() => setSelectedWorld(world)}
                  className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500/80 shadow-lg ring-1 ring-amber-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  } ${!unlocked ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">World {world.id}</span>
                      {!unlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                    </div>
                    {unlocked && (
                      <div className="flex items-center gap-1 text-xs text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-mono font-semibold">{stars}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-slate-100 text-sm mb-1">{world.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{world.subtitle}</p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/60 pt-2">
                    <span>{world.theme}</span>
                    <span>{world.missionsCount} Trials</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Drawer: Selected World Missions */}
        {selectedWorld && (
          <div className="w-full lg:w-96 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col h-auto max-h-[800px]">
            <div className="mb-4 pb-4 border-b border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs uppercase tracking-wider font-mono text-amber-400">
                  World {selectedWorld.id}
                </span>
                <span className="text-xs text-slate-400">{selectedWorld.theme}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{selectedWorld.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{selectedWorld.lore}</p>

              <div className="flex items-center gap-4 text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">Title Badge</span>
                  <span className="text-slate-200 font-medium">{selectedWorld.badgeName}</span>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <span className="text-slate-500 block text-[10px]">Stars Earned</span>
                  <span className="text-amber-400 font-mono font-semibold">{getWorldStars(selectedWorld.id)} / {selectedWorld.missionsCount * 3}</span>
                </div>
              </div>
            </div>

            {/* Mission List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Curriculum Missions
              </h4>

              {missionsInSelectedWorld.map((mission, idx) => {
                const completed = progress.completedMissions[mission.id];
                const stars = completed?.stars || 0;
                // Unlocked if previous mission completed or it's the very first
                const isUnlocked = idx === 0 || !!progress.completedMissions[missionsInSelectedWorld[idx - 1]?.id];

                return (
                  <button
                    key={mission.id}
                    disabled={!isUnlocked}
                    onClick={() => onSelectMission(mission.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      !isUnlocked
                        ? 'opacity-40 cursor-not-allowed bg-slate-950/40 border-slate-800/40'
                        : completed
                        ? 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-200 hover:border-slate-700'
                        : 'bg-emerald-950/20 hover:bg-emerald-900/30 border-emerald-900/50 text-emerald-200 hover:border-emerald-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                          completed
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : isUnlocked
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-600'
                        }`}
                      >
                        {isUnlocked ? mission.order : <Lock className="w-3.5 h-3.5" />}
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{mission.title}</h4>
                        <span className="text-[11px] text-slate-400">{mission.conceptTitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {completed ? (
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${s <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                            />
                          ))}
                        </div>
                      ) : (
                        isUnlocked && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>Play</span>
                          </span>
                        )
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
