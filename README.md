# 🧙 Python Quest: Code the World!

> **Learn Python by going on an adventure.** Write code, solve missions, and progress through a game-inspired world.

Python Quest is an adventure-style Python learning game concept built with AI-assisted, or **vibe-coded**, development. Instead of learning only from static notes, players learn by writing Python code and using it to solve challenges in a game world.

> **Project status:** The GitHub repository was empty when this documentation was added. The description below reflects the project shown in the Google AI Studio preview and its intended experience; implementation details and run commands must be verified after the application source code is added.

## ✨ The idea

Imagine learning Python as a quest. A mentor introduces a concept, you write code in an editor, and the game checks whether your solution completes the objective.

The preview currently shows:
- A fantasy-inspired world and a 3D game area.
- A Python editor and execution console.
- Mission objectives and a solution-checking workflow.
- XP and progression elements.
- Mentor characters and contextual hints.

The goal is to make learning programming more active, visual, and approachable.

## 🎮 How a typical quest works

1. **Choose a mission** from the game world.
2. **Read the objective** and the mentor's explanation.
3. **Write Python code** in the editor.
4. **Run your code** and inspect the output or errors.
5. **Check your solution** against the mission requirements.
6. **Learn from mistakes**, adjust your code, and try again.
7. **Continue the adventure** as new concepts and challenges become available.

Exact controls and available missions may differ as the game develops.

## 🧠 Learning goals

The intended learning journey can cover:
- Python output and syntax
- Variables and data types
- Operators and expressions
- Conditions
- Loops
- Functions
- Lists and other collections
- Problem-solving through small coding challenges

These are learning goals, not a guarantee that every topic is already implemented.

## 🛠️ Technology

The current preview visibly identifies a **Three.js 3D realm** and a Python coding experience. The complete source code is not yet available in this repository, so the full framework, runtime, and dependency list cannot be confirmed.

Depending on the implementation, the project may use:
- JavaScript or TypeScript for application logic
- Three.js for 3D rendering
- A browser-based Python runtime such as Pyodide
- A Web Worker to isolate Python execution

Treat these as possible implementation choices until they are confirmed from the source files. See [USER_MANUAL.md](USER_MANUAL.md) for player guidance and troubleshooting.

## 🚀 Getting started

### Play the game

1. Open the published game link supplied by the project owner, if available.
2. Start a mission from the game map.
3. Read the objective and enter your Python solution.
4. Select **Run** to execute the code.
5. Select **Check Solution** to validate the mission.

A published game URL has not been included in this repository documentation yet.

### Run locally

The application source files and package manifest were not present when this README was added, so a verified local setup command cannot be provided yet.

Once the actual project source is uploaded:

1. Install a current supported version of Node.js if the project uses a Node-based frontend.
2. Clone the repository:
   ```bash
   git clone https://github.com/Rudra0075-ms/Python_Learner_Game.git
   cd Python_Learner_Game
   ```
3. Inspect the project files and follow the scripts in `package.json`, if present. For a typical npm project, dependencies are installed with:
   ```bash
   npm install
   ```
4. Run only the development command defined in the actual `package.json`. Do not assume `npm run dev` exists until the scripts have been checked.

If the app currently exists only in Google AI Studio, export or copy the real application source into this repository before expecting the clone to run.

## 📁 Repository structure

The documentation and ignore file are being established first. A possible structure for a web-based version is:

```text
Python_Learner_Game/
├── README.md
├── USER_MANUAL.md
├── .gitignore
├── package.json          # Add if the app uses npm
├── index.html            # If applicable
├── src/                  # Application source, if applicable
├── public/               # Static assets, if applicable
└── ...
```

This is a suggested structure, not a report of files that already exist.

## 🧪 Quality and safety notes

- Always test code execution and mission validation before treating a quest as complete.
- Display Python errors clearly so learners can understand and fix them.
- If a Web Worker is used, send only structured-clone-safe messages between contexts.
- Never commit API keys, passwords, private tokens, or local environment files.
- Do not award XP or mark a mission complete when execution fails or the solution is incorrect.
- Treat browser-based code execution as a feature that needs careful testing; it is not automatically a secure sandbox merely because it runs in a browser.

## 🤖 About the vibe-coded development

This project is **vibe-coded**: AI tools are used to help turn a natural-language idea into an interactive software experience. The goal is rapid experimentation and creative iteration, not to imply that generated code is automatically correct.

AI-generated code still needs human review, debugging, testing, accessibility checks, and clear documentation. The source should be inspected before making claims about architecture, security, or production readiness.

## 🗺️ Roadmap ideas

Possible future improvements include:
- A structured, beginner-to-intermediate Python curriculum
- More quests with gradually increasing difficulty
- Better feedback explaining why a solution passes or fails
- Reliable code execution, cancellation, and error handling
- Accessible controls and responsive layouts
- Progress saving and a clear way to resume a journey
- Automated tests for Python execution and mission validation

Roadmap items are proposals, not confirmed existing features.

## 📖 Documentation

- [User Manual](USER_MANUAL.md) — how to play, write code, run missions, and troubleshoot common issues.

## 👤 Project

Repository: https://github.com/Rudra0075-ms/Python_Learner_Game

Built through AI-assisted, vibe-coded development with the aim of making Python practice feel like an adventure.

---

**Learn the syntax. Solve the quest. Code the world.** 🐍
