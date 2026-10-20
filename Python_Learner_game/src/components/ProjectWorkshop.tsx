import React, { useState } from 'react';
import { pythonEngine } from '../python-runtime/pythonEngine';
import { ArrowLeft, Play, Terminal, Download, Sparkles, FolderGit2, CheckCircle2 } from 'lucide-react';

interface WorkshopProject {
  id: string;
  title: string;
  subtitle: string;
  difficulty: string;
  starterCode: string;
  description: string;
}

const WORKSHOP_PROJECTS: WorkshopProject[] = [
  {
    id: 'p1',
    title: 'Text Adventure RPG Engine',
    subtitle: 'Classic Command-Line Dungeon Explorer',
    difficulty: 'Intermediate',
    description: 'Build an interactive text RPG with rooms, inventories, and decision loops.',
    starterCode: `# Text Adventure RPG Engine
class Room:
    def __init__(self, name, description, items=None):
        self.name = name
        self.description = description
        self.items = items or []

class Player:
    def __init__(self, name):
        self.name = name
        self.inventory = []
        self.hp = 100

    def take_item(self, item):
        self.inventory.append(item)
        print(f"🎒 {self.name} obtained: {item}")

# Build World
entrance = Room("Forest Portal", "Ancient trees with glowing runes.", ["Oak Wand", "Health Potion"])
hero = Player("Scribe")

print(f"--- Welcome to {entrance.name} ---")
print(entrance.description)

for item in list(entrance.items):
    hero.take_item(item)

print(f"\\nInventory: {hero.inventory}")
print("Quest status: READY TO EXPLORE")
`,
  },
  {
    id: 'p2',
    title: 'Runic Password Strength Checker',
    subtitle: 'Security & String Analysis Tool',
    difficulty: 'Beginner',
    description: 'Analyze string passwords for length, uppercase, digits, and special characters.',
    starterCode: `# Password Strength Evaluator
def check_password_strength(password):
    score = 0
    feedback = []

    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Password is too short (min 8 chars)")

    if any(c.isupper() for c in password):
        score += 1
    else:
        feedback.append("Missing uppercase letter")

    if any(c.isdigit() for c in password):
        score += 1
    else:
        feedback.append("Missing numeric digit")

    if any(c in "!@#$%^&*" for c in password):
        score += 1
    else:
        feedback.append("Missing special symbol (!@#$%^&*)")

    ratings = ["Weak", "Moderate", "Strong", "Master Guardian"]
    rating = ratings[min(score - 1, 3)] if score > 0 else "Vulnerable"

    return rating, score, feedback

test_passwords = ["python", "Python2026", "Aethelia#99!"]
for p in test_passwords:
    rating, score, notes = check_password_strength(p)
    print(f"Key: {p:15} -> {rating:15} (Score {score}/4)")
`,
  },
  {
    id: 'p3',
    title: 'Turn-Based RPG Combat Simulator',
    subtitle: 'Math & State Simulation',
    difficulty: 'Advanced',
    description: 'Simulate a strategic battle between a hero and a clockwork boss with critical hits and armor mitigation.',
    starterCode: `# Turn-Based Battle Simulation
class Combatant:
    def __init__(self, name, hp, attack, defense):
        self.name = name
        self.hp = hp
        self.attack = attack
        self.defense = defense

    def is_alive(self):
        return self.hp > 0

    def strike(self, target):
        damage = max(1, self.attack - target.defense)
        target.hp = max(0, target.hp - damage)
        print(f"⚔️ {self.name} strikes {target.name} for {damage} damage! ({target.hp} HP remaining)")

hero = Combatant("Aethelgard", 60, 18, 5)
boss = Combatant("Clockwork Titan", 50, 14, 4)

print(f"🔥 Battle Commences: {hero.name} vs {boss.name}\\n")
turn = 1

while hero.is_alive() and boss.is_alive():
    print(f"-- Round {turn} --")
    hero.strike(boss)
    if boss.is_alive():
        boss.strike(hero)
    turn += 1

print("\\n🏆 Battle Concluded!")
winner = hero.name if hero.is_alive() else boss.name
print(f"Victor: {winner}")
`,
  },
];

interface ProjectWorkshopProps {
  onClose: () => void;
}

export const ProjectWorkshop: React.FC<ProjectWorkshopProps> = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState<WorkshopProject>(WORKSHOP_PROJECTS[0]);
  const [code, setCode] = useState(selectedProject.starterCode);
  const [stdout, setStdout] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const handleSelect = (proj: WorkshopProject) => {
    setSelectedProject(proj);
    setCode(proj.starterCode);
    setStdout([]);
  };

  const handleRun = async () => {
    setRunning(true);
    setStdout([]);
    try {
      const res = await pythonEngine.execute(
        code,
        { width: 1, height: 1, tiles: [['grass']], playerStart: { x: 0, y: 0 }, playerDirection: 'right', entities: [] },
        { x: 0, y: 0 },
        'right'
      );
      setStdout(res.stdout.length > 0 ? res.stdout : (res.stderr.length > 0 ? res.stderr : ['Code executed successfully with no output.']));
    } catch (err: any) {
      setStdout([err?.message || 'Execution error']);
    } finally {
      setRunning(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProject.id}_project.py`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
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
              <FolderGit2 className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Project Workshop</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Workshop
          </button>
        </div>

        {/* Content Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Projects Sidebar */}
          <div className="w-full md:w-72 bg-slate-950 border-r border-slate-800 p-4 overflow-y-auto space-y-2 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">
              Capstone Projects
            </span>
            {WORKSHOP_PROJECTS.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelect(proj)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-amber-500/80 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <h4 className="text-xs font-bold text-slate-100 mb-0.5">{proj.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">{proj.subtitle}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">
                    {proj.difficulty}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Code & Output Area */}
          <div className="flex-1 flex flex-col overflow-hidden p-4 gap-4 bg-slate-900">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">{selectedProject.title}</h3>
                <p className="text-xs text-slate-400">{selectedProject.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export .py</span>
                </button>
                <button
                  onClick={handleRun}
                  disabled={running}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg text-xs shadow-md transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{running ? 'Running...' : 'Run Project'}</span>
                </button>
              </div>
            </div>

            {/* Split Editor and Output */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
              <div className="flex-1 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono min-h-0">
                <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
                  <span>project_source.py</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full flex-1 p-4 bg-transparent text-slate-200 text-xs font-mono resize-none outline-none leading-relaxed"
                  spellCheck={false}
                />
              </div>

              <div className="flex-1 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono min-h-0">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Output Terminal</span>
                </div>
                <div className="p-4 flex-1 overflow-y-auto text-xs text-slate-200 space-y-1">
                  {stdout.length === 0 ? (
                    <span className="text-slate-600 italic">Click 'Run Project' to execute.</span>
                  ) : (
                    stdout.map((line, i) => (
                      <div key={i} className="whitespace-pre-wrap leading-relaxed text-slate-300">
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
