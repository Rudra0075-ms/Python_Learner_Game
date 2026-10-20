// Dedicated Pyodide WebAssembly Web Worker with structured-clone-safe messaging protocol
export const PYODIDE_WORKER_CODE = `
let pyodide = null;
let isInitializing = false;

// Convert any value or nested structure into plain, structured-clone-safe data.
// Strips PyProxies, functions, symbols, WebAssembly pointers, circular references, and Maps.
function toCloneSafe(val, depth = 0, seen = new WeakSet()) {
  if (depth > 12) return String(val);
  if (val === null || val === undefined) return val;

  const t = typeof val;
  if (t === "string" || t === "number" || t === "boolean") {
    return val;
  }
  if (t === "symbol" || t === "function") {
    return undefined;
  }
  if (t === "bigint") {
    return Number(val);
  }

  if (typeof val === "object") {
    if (seen.has(val)) {
      return "[Circular]";
    }
    seen.add(val);

    // If it is a PyProxy from Pyodide
    if (typeof val.toJs === "function") {
      try {
        const js = val.toJs({ dict_converter: Object.fromEntries });
        return toCloneSafe(js, depth + 1, seen);
      } catch (_) {
        return String(val);
      }
    }

    if (val instanceof Error) {
      return {
        name: String(val.name || "Error"),
        message: String(val.message || ""),
        stack: val.stack ? String(val.stack) : undefined
      };
    }

    if (Array.isArray(val)) {
      const arr = [];
      for (let i = 0; i < val.length; i++) {
        const item = toCloneSafe(val[i], depth + 1, seen);
        if (item !== undefined) arr.push(item);
      }
      return arr;
    }

    if (val instanceof Map) {
      const obj = {};
      for (const [k, v] of val.entries()) {
        const item = toCloneSafe(v, depth + 1, seen);
        if (item !== undefined) obj[String(k)] = item;
      }
      return obj;
    }

    if (val instanceof Set) {
      const arr = [];
      for (const v of val.values()) {
        const item = toCloneSafe(v, depth + 1, seen);
        if (item !== undefined) arr.push(item);
      }
      return arr;
    }

    // Plain object
    const plain = {};
    const keys = Object.keys(val);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const item = toCloneSafe(val[k], depth + 1, seen);
      if (item !== undefined) {
        plain[k] = item;
      }
    }
    return plain;
  }

  return String(val);
}

// Guaranteed safe postMessage that never throws DataCloneError
function safePostMessage(msg) {
  try {
    const cleanMsg = toCloneSafe(msg);
    self.postMessage(cleanMsg);
  } catch (err) {
    try {
      self.postMessage({
        id: String((msg && msg.id) || ""),
        type: "RESULT",
        success: false,
        error: "Message serialization error: " + (err && err.message ? err.message : String(err)),
        stdout: [],
        stderr: [String(err && err.message ? err.message : err)],
        steps: []
      });
    } catch (_) {
      // Last-ditch string-only notification
    }
  }
}

async function getPyodide() {
  if (pyodide) return pyodide;
  if (isInitializing) {
    while (isInitializing) {
      await new Promise(r => setTimeout(r, 80));
    }
    return pyodide;
  }

  isInitializing = true;
  try {
    if (typeof loadPyodide === "undefined") {
      importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");
    }
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
    });
    isInitializing = false;
    safePostMessage({ type: "READY" });
    return pyodide;
  } catch (err) {
    isInitializing = false;
    safePostMessage({ type: "LOAD_ERROR", error: String(err && err.message ? err.message : err) });
    throw err;
  }
}

self.onmessage = async (e) => {
  const data = e.data;
  if (!data) return;

  if (data.type === "INIT") {
    try {
      await getPyodide();
    } catch (err) {
      // Handled in getPyodide
    }
    return;
  }

  if (data.type === "EXECUTE") {
    const { id, code, playerPos, playerDir, aheadTile } = data;
    try {
      const py = await getPyodide();

      // Set environment parameters in Python globals
      py.globals.set("__pyquest_init_pos__", [Number(playerPos.x || 0), Number(playerPos.y || 0)]);
      py.globals.set("__pyquest_init_dir__", String(playerDir || "right"));
      py.globals.set("__pyquest_ahead_tile__", String(aheadTile || "empty"));

      // Register real-time stream handlers
      self.__streamStdout = (text) => {
        safePostMessage({
          type: "STREAM_STDOUT",
          id: String(id),
          text: typeof text === "string" ? text : String(text || "")
        });
      };
      self.__streamStderr = (text) => {
        safePostMessage({
          type: "STREAM_STDERR",
          id: String(id),
          text: typeof text === "string" ? text : String(text || "")
        });
      };

      // Construct environment setup using safe line joining with String.fromCharCode(10)
      // to avoid template string newline escaping pitfalls
      const setupScriptLines = [
        "import sys",
        "import json",
        "from js import self as js_self",
        "",
        "__pyquest_stdout_log__ = []",
        "__pyquest_stderr_log__ = []",
        "__pyquest_steps__ = []",
        "",
        "class __PyquestStreamOut:",
        "    def __init__(self, is_err=False):",
        "        self.is_err = is_err",
        "        self.buffer = ''",
        "",
        "    def isatty(self):",
        "        return False",
        "",
        "    def _emit(self, line):",
        "        line_str = str(line)",
        "        if self.is_err:",
        "            __pyquest_stderr_log__.append(line_str)",
        "            try:",
        "                js_self.__streamStderr(line_str)",
        "            except Exception:",
        "                pass",
        "        else:",
        "            __pyquest_stdout_log__.append(line_str)",
        "            try:",
        "                js_self.__streamStdout(line_str)",
        "            except Exception:",
        "                pass",
        "",
        "    def write(self, s):",
        "        if not s:",
        "            return",
        "        self.buffer += str(s)",
        "        lines = self.buffer.split(chr(10))",
        "        for line in lines[:-1]:",
        "            self._emit(line)",
        "        self.buffer = lines[-1]",
        "",
        "    def flush(self):",
        "        if self.buffer:",
        "            self._emit(self.buffer)",
        "            self.buffer = ''",
        "",
        "sys.stdout = __PyquestStreamOut(False)",
        "sys.stderr = __PyquestStreamOut(True)",
        "",
        "def move_forward(steps=1):",
        "    count = int(steps) if steps else 1",
        "    for _ in range(count):",
        "        __pyquest_steps__.append({'type': 'move'})",
        "",
        "def turn_left():",
        "    __pyquest_steps__.append({'type': 'turn', 'direction': 'left'})",
        "",
        "def turn_right():",
        "    __pyquest_steps__.append({'type': 'turn', 'direction': 'right'})",
        "",
        "def jump():",
        "    __pyquest_steps__.append({'type': 'jump'})",
        "",
        "def collect():",
        "    __pyquest_steps__.append({'type': 'collect'})",
        "",
        "def interact():",
        "    __pyquest_steps__.append({'type': 'interact'})",
        "",
        "def open_door(key=''):",
        "    __pyquest_steps__.append({'type': 'open_door', 'key': str(key)})",
        "",
        "def attack():",
        "    __pyquest_steps__.append({'type': 'attack'})",
        "",
        "def say(text):",
        "    msg = str(text)",
        "    __pyquest_steps__.append({'type': 'say', 'message': msg})",
        "    print('🧙 ' + msg)",
        "",
        "def get_position():",
        "    return tuple(__pyquest_init_pos__)",
        "",
        "def get_direction():",
        "    return str(__pyquest_init_dir__)",
        "",
        "def see_ahead():",
        "    return str(__pyquest_ahead_tile__)",
        "",
        "def __get_pyquest_batch_results_json__():",
        "    clean_out = [str(x) for x in __pyquest_stdout_log__]",
        "    clean_err = [str(x) for x in __pyquest_stderr_log__]",
        "    clean_steps = []",
        "    for s in __pyquest_steps__:",
        "        if isinstance(s, dict):",
        "            clean_steps.append({str(k): (str(v) if not isinstance(v, (int, float, bool)) else v) for k, v in s.items()})",
        "    return json.dumps({",
        "        'stdout': clean_out,",
        "        'stderr': clean_err,",
        "        'steps': clean_steps",
        "    })"
      ];

      const setupScript = setupScriptLines.join(String.fromCharCode(10));
      await py.runPythonAsync(setupScript);

      // Execute user code directly preserving exact formatting, indentation, and multiline structure
      try {
        await py.runPythonAsync(code);
      } catch (userErr) {
        // Flush remaining buffered output
        try {
          py.runPython("sys.stdout.flush(); sys.stderr.flush()");
        } catch (_) {}

        let batchResults = { stdout: [], stderr: [], steps: [] };
        try {
          const rawBatch = py.runPython("__get_pyquest_batch_results_json__()");
          batchResults = JSON.parse(String(rawBatch));
        } catch (_) {}

        const rawErr = userErr instanceof Error ? userErr.message : String(userErr);
        const filteredLines = rawErr
          .split("\\n")
          .filter(l => !l.includes("pyodide.ffi") && !l.includes("__PyquestStreamOut") && !l.includes("pyodide-py"));
        const cleanErr = filteredLines.join("\\n") || rawErr;

        safePostMessage({
          id: String(id),
          type: "RESULT",
          success: false,
          error: cleanErr,
          stdout: Array.isArray(batchResults.stdout) ? batchResults.stdout : [],
          stderr: (Array.isArray(batchResults.stderr) && batchResults.stderr.length > 0)
            ? [...batchResults.stderr, cleanErr]
            : [cleanErr],
          steps: Array.isArray(batchResults.steps) ? batchResults.steps : []
        });
        return;
      }

      try {
        py.runPython("sys.stdout.flush(); sys.stderr.flush()");
      } catch (_) {}

      let batchResults = { stdout: [], stderr: [], steps: [] };
      try {
        const rawBatch = py.runPython("__get_pyquest_batch_results_json__()");
        batchResults = JSON.parse(String(rawBatch));
      } catch (_) {}

      safePostMessage({
        id: String(id),
        type: "RESULT",
        success: true,
        stdout: Array.isArray(batchResults.stdout) ? batchResults.stdout : [],
        stderr: Array.isArray(batchResults.stderr) ? batchResults.stderr : [],
        steps: Array.isArray(batchResults.steps) ? batchResults.steps : []
      });

    } catch (workerErr) {
      safePostMessage({
        id: String(id),
        type: "RESULT",
        success: false,
        error: String(workerErr && workerErr.message ? workerErr.message : workerErr),
        stdout: [],
        stderr: [String(workerErr && workerErr.message ? workerErr.message : workerErr)],
        steps: []
      });
    }
  }
};
`;
