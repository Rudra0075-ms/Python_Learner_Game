import React, { useRef, useState } from 'react';
import { PlayerProgress } from '../types/game';
import { WORLDS_DATA } from '../curriculum/worldsData';
import { Trophy, Star, Award, Zap, CheckCircle2, Flame, ArrowLeft, Download, ShieldCheck, Upload, FileText } from 'lucide-react';

interface ProgressDashboardProps {
  progress: PlayerProgress;
  onClose: () => void;
  onImportProgress?: (imported: PlayerProgress) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ progress, onClose, onImportProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [certGenerated, setCertGenerated] = useState(false);

  const completedCount = Object.keys(progress.completedMissions).length;
  const xpForNextLevel = progress.level * 300;
  const xpCurrentLevelProgress = progress.xp % 300;
  const xpPercent = Math.min(100, Math.round((xpCurrentLevelProgress / 300) * 100));

  const badges = [
    { id: 'b1', name: 'First Incantation', desc: 'Completed your very first mission.', earned: completedCount >= 1 },
    { id: 'b2', name: 'Rune Wayfinder', desc: 'Earned 5 total stars across missions.', earned: progress.stars >= 5 },
    { id: 'b3', name: 'Loop Weaver', desc: 'Conquered repeating patterns in World 3.', earned: !!progress.completedMissions['w3_m1'] },
    { id: 'b4', name: 'Cavern Hoarder', desc: 'Collected over 10 magical gems.', earned: progress.stars >= 9 },
    { id: 'b5', name: 'Spell Architect', desc: 'Defined your first custom Python function.', earned: !!progress.completedMissions['w5_m1'] },
    { id: 'b6', name: 'Grand Archmage', desc: 'Achieved Level 3 mastery in Python.', earned: progress.level >= 3 },
  ];

  // Draw and Download Certificate of Completion
  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    // Background parchment
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 1200, 800);

    // Decorative outer gold borders
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, 1120, 720);

    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 1090, 690);

    // Header Title
    ctx.fillStyle = '#FBBF24';
    ctx.font = 'bold 36px Cinzel, serif, "Plus Jakarta Sans"';
    ctx.textAlign = 'center';
    ctx.fillText('KINGDOM OF AETHELIA · GUILD OF CODERS', 600, 140);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CERTIFICATE OF PYTHON MASTERY', 600, 220);

    // Subtitle
    ctx.fillStyle = '#94A3B8';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('This royal decree hereby certifies that the adventurer', 600, 290);

    // Hero Name
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 64px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(progress.customization.name.toUpperCase(), 600, 380);

    // Body decree
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      `has successfully commanded real Python 3 code, solving algorithmic trials`,
      600,
      450
    );
    ctx.fillText(
      `earning ${progress.stars} Stars and ${progress.xp} Experience Points across the realm.`,
      600,
      490
    );

    // Seal and signatures
    ctx.fillStyle = '#D97706';
    ctx.beginPath();
    ctx.arc(600, 600, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('PYTHON', 600, 595);
    ctx.fillText('QUEST', 600, 615);

    // Date
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    ctx.fillStyle = '#94A3B8';
    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Issued: ${today}`, 250, 680);
    ctx.fillText('Master Sage Pythor', 950, 680);

    setCertGenerated(true);

    // Download image trigger
    const link = document.createElement('a');
    link.download = `Python_Quest_Certificate_${progress.customization.name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExportSave = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `python_quest_save_${progress.customization.name.toLowerCase()}.json`);
    dlAnchor.click();
    setImportStatus('Save file exported successfully!');
    setTimeout(() => setImportStatus(null), 4000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (typeof parsed === 'object' && parsed !== null && parsed.completedMissions && typeof parsed.level === 'number') {
          if (onImportProgress) {
            onImportProgress(parsed as PlayerProgress);
          } else {
            localStorage.setItem('python_quest_progress_v1', JSON.stringify(parsed));
            window.location.reload();
          }
          setImportStatus('Progress imported successfully!');
          setTimeout(() => setImportStatus(null), 4000);
        } else {
          setImportStatus('Invalid save file format.');
          setTimeout(() => setImportStatus(null), 4000);
        }
      } catch (err) {
        setImportStatus('Error reading JSON file.');
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
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
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Adventurer Progress & Achievements</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] text-slate-500 font-medium block mb-1">Player Level</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-white">{progress.level}</span>
                <span className="text-xs text-amber-400">Archmage</span>
              </div>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] text-slate-500 font-medium block mb-1">Total Stars</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-amber-400">{progress.stars}</span>
                <span className="text-xs text-slate-500">★</span>
              </div>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] text-slate-500 font-medium block mb-1">Missions Cleared</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-emerald-400">{completedCount}</span>
                <span className="text-xs text-slate-500">Trials</span>
              </div>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] text-slate-500 font-medium block mb-1">Experience (XP)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-sky-400">{progress.xp}</span>
                <span className="text-xs text-slate-500">XP</span>
              </div>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">Level {progress.level} Progress</span>
              <span className="font-mono text-slate-400">
                {xpCurrentLevelProgress} / 300 XP to Level {progress.level + 1}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* World Mastery Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Curriculum Mastery by World
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WORLDS_DATA.slice(0, 6).map((world) => {
                const totalMissions = world.missionsCount;
                let worldCompleted = 0;
                Object.keys(progress.completedMissions).forEach((mId) => {
                  if (mId.startsWith(`w${world.id}_`)) worldCompleted++;
                });
                const pct = Math.min(100, Math.round((worldCompleted / totalMissions) * 100));

                return (
                  <div key={world.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium text-slate-200">
                        World {world.id}: {world.title}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievement Badges Showcase */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Adventurer Badges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    badge.earned
                      ? 'bg-slate-950/90 border-amber-500/40 text-slate-200'
                      : 'bg-slate-950/30 border-slate-800/40 opacity-40 text-slate-500'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      badge.earned ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-600'
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{badge.name}</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Generator Banner */}
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-amber-400 block mb-0.5">
                Official Credential
              </span>
              <h4 className="text-sm font-bold text-white mb-1">Guild Certificate of Completion</h4>
              <p className="text-xs text-slate-300 max-w-md">
                Generate and download an official high-resolution certificate inscribed with your hero's name, level, and completed stars.
              </p>
            </div>

            <button
              onClick={generateCertificate}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Download Certificate</span>
            </button>
          </div>

          {/* Save File Management Card */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-sky-400 block mb-0.5">
                Local Persistence & Portability
              </span>
              <h4 className="text-sm font-bold text-white mb-1">Save File Backup & Import</h4>
              <p className="text-xs text-slate-400 max-w-md">
                Export your entire campaign progress as a standalone JSON backup, or restore a previous save file without an account or server.
              </p>
              {importStatus && (
                <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{importStatus}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleImportFile}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
                title="Restore progress from a saved JSON file"
              >
                <Upload className="w-3.5 h-3.5 text-sky-400" />
                <span>Import Save</span>
              </button>
              <button
                onClick={handleExportSave}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
                title="Save campaign progress to your device"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Save</span>
              </button>
            </div>
          </div>

          {/* Hidden Canvas for Certificate Generation */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};
