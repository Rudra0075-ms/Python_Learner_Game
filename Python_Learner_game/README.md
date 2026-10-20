# Python Quest: Code the World 🐍✨

**Python Quest: Code the World** is a free, interactive, browser-based Python learning adventure game. Players master Python from absolute fundamentals to advanced metaprogramming by writing real Python code that controls their fantasy hero across 12 magical worlds and 110 coding trials.

---

## 🌟 Key Features

- **100% Free & Open Source:** Zero subscriptions, zero paywalls, zero ads, and zero credit cards required.
- **Real Python 3 WebAssembly Execution:** Code executes locally in the player's browser using Pyodide (CPython 3.12 WebAssembly) with automatic fallback to an offline pure-JavaScript Python engine.
- **Zero Paid Cloud Dependencies:** Runs entirely as a static client-side web application. No server-side Python runtime, no database subscription, and no external AI API key required to play the full curriculum.
- **12 Thematic Worlds & 110 Missions:**
  1. *Python Awakening* — Sequences, movement, and the `collect()` command.
  2. *Forest of Decisions* — `if`, `elif`, and `else` conditionals.
  3. *The Looping River* — `for` loops, `range()`, and `while` loop currents.
  4. *Collection Caverns* — Lists, slicing, sets, and dictionaries.
  5. *The Function Kingdom* — Reusable `def`, parameters, return values, and recursion.
  6. *Object-Oriented Castle* — Classes, `self`, inheritance, encapsulation, and `super()`.
  7. *The Error Dungeon* — `try`, `except`, `else`, `finally`, and custom exceptions.
  8. *File & Data Workshop* — JSON parsing, CSV string splitting, and f-strings.
  9. *Module Mountains* — `import math`, `random`, `time`, and module aliases.
  10. *The Algorithm Arena* — Linear search, binary search, sorting, stacks, and matrices.
  11. *The Advanced Engineer* — Generators with `yield`, list/dict comprehensions, `zip`, `enumerate`, and decorators.
  12. *The Master Builder* — Grand capstone projects, ciphers, state machines, and the World Engine.
- **Procedural Audio Synthesizer:** Dynamic game SFX synthesized live via the standard Web Audio API (zero audio files to download or fail).
- **Responsive HTML5 Canvas Engine:** High-DPI 2D canvas with animated avatars, cloaks, familiars, collectibles, particles, and responsive layout for mobile, tablet, and desktop.
- **Local Progress & Data Portability:** Auto-saves progress to `localStorage`. Includes a JSON save export/import tool to transfer progress between devices without an account, plus an in-canvas Certificate of Completion generator.

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Setup & Launch

```bash
# Clone the repository
git clone https://github.com/your-username/python-quest.git
cd python-quest

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📦 Production Build

To build the static distribution bundle:

```bash
npm run build
```

The compiled static files are generated in the `/dist` directory:
- `dist/index.html`
- `dist/assets/*.js`
- `dist/assets/*.css`

All asset links are relative (`./assets/...`), allowing the bundle to be served from any root domain, subdirectory, or static web server.

---

## 🌐 Free Static Hosting Deployment Guide

Because **Python Quest** has zero backend requirements, it can be hosted permanently for free on any static host.

### Option 1: GitHub Pages

1. Push your code to a GitHub repository.
2. In your repository, go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Create `.github/workflows/deploy.yml` with:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Option 2: Cloudflare Pages

1. Link your GitHub repository in the Cloudflare Dashboard (**Workers & Pages > Create application > Pages**).
2. Set Build Settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Click **Save and Deploy**.

### Option 3: Netlify / Vercel

- **Build Command:** `npm run build`
- **Publish / Output Directory:** `dist`
- Deploy with 1 click.

---

## ⚙️ Architecture & Runtime Details

- **Pyodide WebAssembly Engine:** Loads from the public jsDelivr CDN (`https://cdn.jsdelivr.net/pyodide/v0.26.4/full/`). Downloads approximately 6–10 MB of compressed WebAssembly upon initial load, cached automatically by the browser's HTTP cache.
- **Offline Fallback Engine:** If the player is completely offline or the CDN is blocked by school firewall policies, Python Quest automatically switches to `fallback_ready` mode, running our in-browser Python interpreter.
- **Infinite Loop Safeguards:** All executions run with a strict 6-second timeout limit and max operation counter to prevent runaway `while True` scripts from freezing the browser UI.

---

## 📋 Honest Limitations Disclosures

1. **Initial Pyodide Download:** The first time Pyodide loads on a new device, ~6–10 MB of WebAssembly assets must be fetched over the internet. Once cached, subsequent visits load from browser storage.
2. **Browser Sandbox:** Python standard libraries that require low-level POSIX sockets (e.g. raw TCP networking) or operating system process spawning (`subprocess.Popen`) cannot execute in WebAssembly inside a browser tab.
3. **Local Storage Scoping:** Progress is tied to the browser profile's `localStorage`. Use the built-in **Export Save** button in the Adventurer Dashboard to backup or transfer saves across devices.

---

## 📜 License

MIT License — see `LICENSE` for details.
