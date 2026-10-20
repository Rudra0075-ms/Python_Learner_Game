/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  PlayerProgress,
  GameSettings,
  ActiveScreen,
  PlayerCustomization,
  Mission,
} from './types/game';
import { MISSIONS_DATA, getMissionById, getMissionsByWorld } from './curriculum/missionsData';
import { TitleScreen } from './components/TitleScreen';
import { WorldMap } from './components/WorldMap';
import { GamePlayScreen } from './components/GamePlayScreen';
import { CharacterCustomizer } from './components/CharacterCustomizer';
import { PythonCodex } from './components/PythonCodex';
import { ProgressDashboard } from './components/ProgressDashboard';
import { ChallengeArena } from './components/ChallengeArena';
import { ProjectWorkshop } from './components/ProjectWorkshop';
import { SettingsModal } from './components/SettingsModal';
import { playSound } from './audio/soundEffects';

const STORAGE_KEY_PROGRESS = 'python_quest_progress_v1';
const STORAGE_KEY_SETTINGS = 'python_quest_settings_v1';

const DEFAULT_CUSTOMIZATION: PlayerCustomization = {
  name: 'Hedwig',
  archetype: 'sorcerer',
  cloakColor: '#2563EB',
  skinTone: '#FCD34D',
  wandStyle: 'crystal',
  familiar: 'owl',
};

const DEFAULT_PROGRESS: PlayerProgress = {
  customization: DEFAULT_CUSTOMIZATION,
  xp: 0,
  level: 1,
  stars: 0,
  completedMissions: {},
  currentMissionId: 'w1_m1',
  unlockedWorldIds: [1],
  unlockedBadges: [],
  streakDays: 1,
  lastPlayedDate: new Date().toISOString(),
  totalExecutions: 0,
};

const DEFAULT_SETTINGS: GameSettings = {
  soundVolume: 0.5,
  sfxEnabled: true,
  animationSpeed: 'normal',
  editorFontSize: 'md',
  reducedMotion: false,
  theme: 'dark',
};

export default function App() {
  // Load progress from localStorage
  const [progress, setProgress] = useState<PlayerProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved progress:', e);
    }
    return DEFAULT_PROGRESS;
  });

  // Load settings from localStorage
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('title');
  const [activeMissionId, setActiveMissionId] = useState<string>(progress.currentMissionId || 'w1_m1');

  // Modals state
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showCodex, setShowCodex] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showWorkshop, setShowWorkshop] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Sync progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress:', e);
    }
  }, [progress]);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }, [settings]);

  // Handle Mission Completion
  const handleMissionComplete = (missionId: string, stars: number, xpEarned: number, bestCode: string) => {
    setProgress((prev) => {
      const existing = prev.completedMissions[missionId];
      const previousStars = existing?.stars || 0;
      const additionalStars = Math.max(0, stars - previousStars);

      const updatedCompleted = {
        ...prev.completedMissions,
        [missionId]: {
          stars: Math.max(previousStars, stars),
          bestCode,
          completedAt: new Date().toISOString(),
          xpEarned: existing ? existing.xpEarned : xpEarned,
        },
      };

      const newTotalXp = prev.xp + (existing ? 0 : xpEarned);
      const newLevel = Math.floor(newTotalXp / 300) + 1;
      const newTotalStars = prev.stars + additionalStars;

      // Unlock worlds if necessary
      const unlockedWorlds = new Set(prev.unlockedWorldIds);
      const currentMission = getMissionById(missionId);
      if (currentMission) {
        const worldMissions = getMissionsByWorld(currentMission.worldId);
        if (currentMission.order >= worldMissions.length && currentMission.worldId < 15) {
          unlockedWorlds.add(currentMission.worldId + 1);
        }
      }

      return {
        ...prev,
        xp: newTotalXp,
        level: newLevel,
        stars: newTotalStars,
        completedMissions: updatedCompleted,
        unlockedWorldIds: Array.from(unlockedWorlds),
      };
    });
  };

  const handleAwardXp = (amount: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 300) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  const handleUpdateSettings = (partial: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
    setActiveMissionId('w1_m1');
  };

  const handleSelectMission = (missionId: string) => {
    setActiveMissionId(missionId);
    setCurrentScreen('gameplay');
    playSound('click', settings.soundVolume, settings.sfxEnabled);
  };

  const activeMission: Mission = getMissionById(activeMissionId) || MISSIONS_DATA[0];

  return (
    <div className={`min-h-screen w-full bg-slate-950 text-slate-100 ${settings.reducedMotion ? 'motion-reduce' : ''}`}>
      {/* Active Screen Routing */}
      {currentScreen === 'title' && (
        <TitleScreen
          progress={progress}
          reducedMotion={settings.reducedMotion}
          onStartAdventure={() => {
            setCurrentScreen('gameplay');
            playSound('click', settings.soundVolume, settings.sfxEnabled);
          }}
          onOpenMap={() => {
            setCurrentScreen('world_map');
            playSound('click', settings.soundVolume, settings.sfxEnabled);
          }}
          onOpenCodex={() => setShowCodex(true)}
          onOpenCustomizer={() => setShowCustomizer(true)}
          onOpenDashboard={() => setShowDashboard(true)}
          onOpenWorkshop={() => setShowWorkshop(true)}
          onOpenChallenges={() => setShowChallenges(true)}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      {currentScreen === 'world_map' && (
        <WorldMap
          progress={progress}
          onSelectMission={handleSelectMission}
          onOpenCodex={() => setShowCodex(true)}
          onOpenCustomizer={() => setShowCustomizer(true)}
          onOpenDashboard={() => setShowDashboard(true)}
          onBackToTitle={() => {
            setCurrentScreen('title');
            playSound('click', settings.soundVolume, settings.sfxEnabled);
          }}
        />
      )}

      {currentScreen === 'gameplay' && (
        <GamePlayScreen
          mission={activeMission}
          progress={progress}
          reducedMotion={settings.reducedMotion}
          onMissionComplete={handleMissionComplete}
          onBackToMap={() => {
            setCurrentScreen('world_map');
            playSound('click', settings.soundVolume, settings.sfxEnabled);
          }}
          onNextMission={(nextId) => {
            const nextM = getMissionById(nextId);
            if (nextM) {
              setActiveMissionId(nextId);
            } else {
              setCurrentScreen('world_map');
            }
          }}
          onOpenCodex={() => setShowCodex(true)}
          onOpenSettings={() => setShowSettings(true)}
          soundVolume={settings.soundVolume}
          sfxEnabled={settings.sfxEnabled}
          onToggleSfx={() => handleUpdateSettings({ sfxEnabled: !settings.sfxEnabled })}
        />
      )}

      {/* Global Modals */}
      {showCustomizer && (
        <CharacterCustomizer
          customization={progress.customization}
          onSave={(newCust) => setProgress((p) => ({ ...p, customization: newCust }))}
          onClose={() => setShowCustomizer(false)}
        />
      )}

      {showCodex && (
        <PythonCodex
          onClose={() => setShowCodex(false)}
          onInsertCode={(code) => {
            // Can be picked up in editor if open
            setShowCodex(false);
          }}
        />
      )}

      {showDashboard && (
        <ProgressDashboard
          progress={progress}
          onClose={() => setShowDashboard(false)}
          onImportProgress={(imported) => setProgress(imported)}
        />
      )}

      {showChallenges && (
        <ChallengeArena
          onClose={() => setShowChallenges(false)}
          onAwardXp={handleAwardXp}
        />
      )}

      {showWorkshop && (
        <ProjectWorkshop
          onClose={() => setShowWorkshop(false)}
        />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          progress={progress}
          onImportProgress={(imp) => setProgress(imp)}
          onResetProgress={handleResetProgress}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
