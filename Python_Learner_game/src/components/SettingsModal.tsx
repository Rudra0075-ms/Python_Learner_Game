import React, { useState } from 'react';
import { GameSettings, PlayerProgress } from '../types/game';
import { Settings, Volume2, VolumeX, Gauge, Type, Download, Upload, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  progress: PlayerProgress;
  onImportProgress: (imported: PlayerProgress) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  progress,
  onImportProgress,
  onResetProgress,
  onClose,
}) => {
  const [resetConfirm, setResetConfirm] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  // Export JSON save
  const handleExport = () => {
    const dataStr = JSON.stringify({ progress, settings }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `python_quest_save_${progress.customization.name.toLowerCase()}.json`;
    link.click();
  };

  // Import JSON save
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(false);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.progress && parsed.progress.customization) {
          onImportProgress(parsed.progress);
          if (parsed.settings) onUpdateSettings(parsed.settings);
          setImportSuccess(true);
          setTimeout(() => setImportSuccess(false), 2500);
        } else {
          setImportError('Invalid save file format.');
        }
      } catch (err) {
        setImportError('Failed to parse save file JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Game Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>

        {/* Settings Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Audio Settings */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sound & Audio</h3>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  {settings.sfxEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  <span>Sound Effects</span>
                </div>
                <button
                  onClick={() => onUpdateSettings({ sfxEnabled: !settings.sfxEnabled })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    settings.sfxEnabled ? 'bg-emerald-600' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.sfxEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Volume</span>
                  <span className="font-mono">{Math.round(settings.soundVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.soundVolume}
                  onChange={(e) => onUpdateSettings({ soundVolume: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Animation & Speed */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Execution & Display</h3>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-300 block">Game Animation Speed</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['slow', 'normal', 'fast', 'instant'] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => onUpdateSettings({ animationSpeed: spd })}
                      className={`py-1.5 text-xs font-medium rounded-lg border capitalize transition-all ${
                        settings.animationSpeed === spd
                          ? 'bg-slate-800 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 block">Editor Font Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sm', 'md', 'lg'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => onUpdateSettings({ editorFontSize: sz })}
                      className={`py-1.5 text-xs font-medium rounded-lg border uppercase transition-all ${
                        settings.editorFontSize === sz
                          ? 'bg-slate-800 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {sz === 'sm' ? 'Small' : sz === 'md' ? 'Medium' : 'Large'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Data & Backup */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Save Data & Backup</h3>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExport}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Export Save (.json)</span>
                </button>

                <label className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>Import Save</span>
                  <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              {importSuccess && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800">
                  <Check className="w-3.5 h-3.5" />
                  <span>Save file restored successfully!</span>
                </div>
              )}
              {importError && (
                <div className="text-xs text-rose-400 flex items-center gap-1.5 bg-rose-950/40 p-2 rounded-lg border border-rose-800">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{importError}</span>
                </div>
              )}

              {/* Reset Data Danger Zone */}
              <div className="pt-3 border-t border-slate-800/80">
                {!resetConfirm ? (
                  <button
                    onClick={() => setResetConfirm(true)}
                    className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Reset all game progress...
                  </button>
                ) : (
                  <div className="p-3 bg-rose-950/30 border border-rose-900/60 rounded-lg space-y-2">
                    <p className="text-xs text-rose-300">
                      Are you sure you want to reset all completed missions and stars? This cannot be undone.
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onResetProgress();
                          setResetConfirm(false);
                        }}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded"
                      >
                        Yes, Reset Progress
                      </button>
                      <button
                        onClick={() => setResetConfirm(false)}
                        className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Privacy & Engine info */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-950 p-3 rounded-lg border border-slate-800/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Python Quest runs 100% inside your browser. No personal data, tracking cookies, or server-side execution are used.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
