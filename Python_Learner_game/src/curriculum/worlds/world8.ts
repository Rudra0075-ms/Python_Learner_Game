import { Mission } from '../../types/game';

export const WORLD_8_MISSIONS: Mission[] = [
  {
    id: 'w8_m1',
    worldId: 8,
    title: 'Parsing the Gearhaven Ledger',
    chapterName: 'Data Serialization',
    order: 1,
    conceptTitle: 'JSON and Structured Data',
    conceptSummary: 'Represent complex game data using JSON-like key-value structures.',
    conceptDetails: 'JSON (JavaScript Object Notation) mirrors Python dictionaries. Game saves, inventory records, and network payloads are stored in this clean format.',
    exampleSnippet: `data = {"x": 2, "y": 1, "target": "portal"}
move_forward(data["x"])`,
    starterCode: `# Extract coordinate offsets from the ledger data:
ledger = {
    "forward_steps": 3,
    "key_name": "Brass Cog"
}

move_forward(ledger["forward_steps"])
collect()
`,
    solutionCode: `ledger = {
    "forward_steps": 3,
    "key_name": "Brass Cog"
}

move_forward(ledger["forward_steps"])
collect()`,
    hints: [
      'Access ledger["forward_steps"] to retrieve the integer 3.',
      'move_forward(3) navigates onto the Brass Cog tile.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve the Brass Cog' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'cog1', type: 'crystal', x: 3, y: 1, name: 'Brass Cog' },
      ],
    },
    xpReward: 370,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Brass Cog',
      star2: 'Data dictionary parsed',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w8_m2',
    worldId: 8,
    title: 'The CSV Parchment: split()',
    chapterName: 'String Splitting & CSV',
    order: 2,
    conceptTitle: 'Splitting Strings with split()',
    conceptSummary: 'Break delimited text lines into lists of values using the split() method.',
    conceptDetails: 'CSV (Comma-Separated Values) files format tables into text lines like `"steps,speed,target"`. Calling `"3,fast,relic".split(",")` yields `["3", "fast", "relic"]`. Convert numeric strings with `int()`.',
    exampleSnippet: `row = "2,3,north"
parts = row.split(",")
steps = int(parts[0])`,
    starterCode: `# Parse the CSV navigation entry:
csv_row = "4,emerald,west"
fields = csv_row.split(",")
paces = int(fields[0])

move_forward(paces)
collect()
`,
    solutionCode: `csv_row = "4,emerald,west"
fields = csv_row.split(",")
paces = int(fields[0])

move_forward(paces)
collect()`,
    hints: [
      'csv_row.split(",") creates ["4", "emerald", "west"].',
      'int(fields[0]) gives 4, moving 4 spaces to the workshop emerald.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Workshop Emerald' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'em1', type: 'gem', x: 4, y: 1, name: 'Workshop Emerald' },
      ],
    },
    xpReward: 380,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Workshop Emerald',
      star2: 'Uses split(",") and int() conversion',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w8_m3',
    worldId: 8,
    title: 'The Alchemist Log: f-strings',
    chapterName: 'String Formatting',
    order: 3,
    conceptTitle: 'Formatted String Literals (f-strings)',
    conceptSummary: 'Embed variables and expressions directly into strings using f\"...{var}...\".',
    conceptDetails: 'Introduced in Python 3.6, f-strings evaluate expressions inside curly braces `{}`. For example, `f\"Advancing {steps * 2} paces\"` interpolates computation cleanly into text.',
    exampleSnippet: `x = 3
say(f"Navigating to waypoint {x}")
move_forward(x)`,
    starterCode: `# Format status message using an f-string:
steps = 3
status = f"Dispatched unit across {steps} tiles"
say(status)

move_forward(steps)
collect()
`,
    solutionCode: `steps = 3
status = f"Dispatched unit across {steps} tiles"
say(status)

move_forward(steps)
collect()`,
    hints: [
      'f-strings evaluate expressions within curly brackets.',
      'say() announces the log status, then moves 3 paces to the gear.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Alchemical Gear' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'gear1', type: 'crystal', x: 3, y: 1, name: 'Alchemical Gear' },
      ],
    },
    xpReward: 390,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Alchemical Gear',
      star2: 'Demonstrates f-string formatting',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w8_m4',
    worldId: 8,
    title: 'Reading the Archive Scroll',
    chapterName: 'Iterating Lines',
    order: 4,
    conceptTitle: 'Iterating Multi-Line Data',
    conceptSummary: 'Loop over collections of lines to process streaming records sequentially.',
    conceptDetails: 'When reading files in Python, you iterate over lines using `for line in lines:`. Each line is stripped of whitespace using `.strip()` before processing.',
    exampleSnippet: `lines = ["1", "2", "1"]
for line in lines:
    move_forward(int(line.strip()))`,
    starterCode: `# Read steps from the archive scroll list:
scroll_lines = ["  2  ", "  2  "]

for raw_line in scroll_lines:
    dist = int(raw_line.strip())
    # Advance by dist:
    move_forward(dist)

collect()
`,
    solutionCode: `scroll_lines = ["  2  ", "  2  "]

for raw_line in scroll_lines:
    dist = int(raw_line.strip())
    move_forward(dist)

collect()`,
    hints: [
      'strip() removes unwanted spaces, and int() converts to a number.',
      'The loop executes twice (2 + 2 = 4 total paces) to reach the crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Archive Crystal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'ac1', type: 'crystal', x: 4, y: 1, name: 'Archive Crystal' },
      ],
    },
    xpReward: 400,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Archive Crystal',
      star2: 'Iterates and strips text lines',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w8_m5',
    worldId: 8,
    title: 'The Great Alchemical Filter',
    chapterName: 'Data Filtering',
    order: 5,
    conceptTitle: 'Filtering Records with Conditions',
    conceptSummary: 'Filter records from a dataset using list conditions or comprehensions.',
    conceptDetails: 'In data science and engineering, filtering invalid or inactive entries is a daily task. Use `if record[\"active\"]:` or list comprehensions `[x for x in data if condition]`.',
    exampleSnippet: `records = [{"steps": 3, "valid": True}, {"steps": 99, "valid": False}]
for r in records:
    if r["valid"]:
        move_forward(r["steps"])`,
    starterCode: `# Filter out corrupt records:
records = [
    {"steps": 1, "is_safe": True},
    {"steps": 99, "is_safe": False},
    {"steps": 2, "is_safe": True}
]

for item in records:
    if item["is_safe"]:
        move_forward(item["steps"])

collect()
`,
    solutionCode: `records = [
    {"steps": 1, "is_safe": True},
    {"steps": 99, "is_safe": False},
    {"steps": 2, "is_safe": True}
]

for item in records:
    if item["is_safe"]:
        move_forward(item["steps"])

collect()`,
    hints: [
      'The loop skips the dangerous 99-step record.',
      'It moves 1 step, then 2 steps (total 3 steps) and collects the gemstone.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Filtered Gemstone' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'fg1', type: 'gem', x: 3, y: 1, name: 'Filtered Gemstone' },
      ],
    },
    xpReward: 410,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Filtered Gemstone',
      star2: 'Filters structured records by boolean',
      star3: 'Under 14 lines',
      maxLinesForStar2: 14,
    },
  },
  {
    id: 'w8_m6',
    worldId: 8,
    title: 'Nested Manifests: Deep Dictionaries',
    chapterName: 'Nested Data Structures',
    order: 6,
    conceptTitle: 'Accessing Nested Structures',
    conceptSummary: 'Navigate multi-level dictionaries with chained keys: config[\"world\"][\"room\"].',
    conceptDetails: 'Real-world configurations are hierarchically nested. For example, `payload[\"player\"][\"stats\"][\"speed\"]` accesses the speed value three levels deep.',
    exampleSnippet: `cfg = {"level": {"target": {"x": 3}}}
dist = cfg["level"]["target"]["x"]
move_forward(dist)`,
    starterCode: `# Access nested configuration values:
manifest = {
    "gearhaven": {
        "vault": {
            "required_steps": 4
        }
    }
}

target_dist = manifest["gearhaven"]["vault"]["required_steps"]
move_forward(target_dist)
collect()
`,
    solutionCode: `manifest = {
    "gearhaven": {
        "vault": {
            "required_steps": 4
        }
    }
}

target_dist = manifest["gearhaven"]["vault"]["required_steps"]
move_forward(target_dist)
collect()`,
    hints: [
      'Chain keys ["gearhaven"]["vault"]["required_steps"] to retrieve 4.',
      'move_forward(4) carries you to the Vault Key.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve Vault Key' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'vk1', type: 'key', x: 4, y: 1, name: 'Vault Key' },
      ],
    },
    xpReward: 420,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Vault Key',
      star2: 'Accesses multi-level nested keys',
      star3: 'Flawless run',
    },
  },
  {
    id: 'w8_m7',
    worldId: 8,
    title: 'The Data Serializer: dict to log',
    chapterName: 'Serialization & Logging',
    order: 7,
    conceptTitle: 'Serializing Data to Formatted Output',
    conceptSummary: 'Convert data objects into formatted inspection logs.',
    conceptDetails: 'Data pipelines serialize raw objects into structured logs. Loop over dictionary items using `.items()` to print key-value pairs cleanly.',
    exampleSnippet: `d = {"x": 2, "y": 3}
for k, v in d.items():
    print(f"{k} = {v}")`,
    starterCode: `# Iterate over dictionary key-value pairs:
coordinates = {
    "step_one": 2,
    "step_two": 1
}

for leg, dist in coordinates.items():
    say(f"Navigating {leg}: {dist} paces")
    move_forward(dist)

collect()
`,
    solutionCode: `coordinates = {
    "step_one": 2,
    "step_two": 1
}

for leg, dist in coordinates.items():
    say(f"Navigating {leg}: {dist} paces")
    move_forward(dist)

collect()`,
    hints: [
      '.items() yields both the key and the value on each iteration.',
      'The loop navigates 2 + 1 = 3 paces total to the Steam Core.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Steam Core' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'sc1', type: 'crystal', x: 3, y: 1, name: 'Steam Core' },
      ],
    },
    xpReward: 430,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Steam Core',
      star2: 'Uses dict.items() iteration',
      star3: 'Under 12 lines of code',
      maxLinesForStar2: 12,
    },
  },
  {
    id: 'w8_m8',
    worldId: 8,
    title: 'The Chief Archivist Capstone',
    chapterName: 'World 8 Capstone Boss',
    order: 8,
    conceptTitle: 'The Alchemical Archives Capstone',
    conceptSummary: 'Parse an intricate multi-wing ledger to unlock the Master Scriptorium Portal.',
    conceptDetails: 'The Chief Archivist presents a multi-wing ledger cataloging all 3 archive wings. Write a loop iterating over wing manifests, collecting all 3 Alchemical Tomes, and entering the portal!',
    exampleSnippet: `wings = [{"paces": 2}, {"paces": 2}, {"paces": 2}]
for w in wings:
    move_forward(w["paces"])
    collect()
    turn_right()`,
    starterCode: `# Boss Trial: Parse wing records to harvest the Archives:
wing_manifests = [
    {"steps": 2, "name": "East Wing"},
    {"steps": 2, "name": "South Wing"},
    {"steps": 2, "name": "West Wing"}
]

for record in wing_manifests:
    move_forward(record["steps"])
    collect()
    turn_right()

jump() # Enter the Master Scriptorium Portal!
`,
    solutionCode: `wing_manifests = [
    {"steps": 2, "name": "East Wing"},
    {"steps": 2, "name": "South Wing"},
    {"steps": 2, "name": "West Wing"}
]

for record in wing_manifests:
    move_forward(record["steps"])
    collect()
    turn_right()

jump()`,
    hints: [
      'Iterate over wing_manifests, extracting record["steps"] on each pass.',
      'Collect the tome in each wing and turn right to face the next wing.',
      'A final jump() ascends into the central portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Alchemical Tomes' },
      { id: 'g2', type: 'reach_portal', description: 'Enter Master Scriptorium Portal' },
    ],
    map: {
      width: 5,
      height: 5,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'path', 'stone', 'stone'],
        ['path', 'water', 'path', 'stone', 'stone'],
        ['path', 'path', 'path', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'tome1', type: 'crystal', x: 2, y: 1, name: 'Tome of Fire' },
        { id: 'tome2', type: 'crystal', x: 2, y: 3, name: 'Tome of Water' },
        { id: 'tome3', type: 'crystal', x: 0, y: 3, name: 'Tome of Earth' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 490,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all tomes & enter portal',
      star2: 'Parses list of dictionaries',
      star3: 'Boss trial cleared flawlessly',
      maxLinesForStar2: 14,
    },
  },
  {
    id: 'w8_m9',
    worldId: 8,
    title: 'The Pathlib Navigation',
    chapterName: 'Modern File Paths',
    order: 9,
    conceptTitle: 'Joining Paths with Pathlib',
    conceptSummary: 'Use slash operator / or joinpath to build robust multiplatform paths.',
    conceptDetails: 'Python 3`s `pathlib.Path` represents filesystem paths as objects rather than fragile strings. Path joining with `/` works correctly across Windows, macOS, and Linux.',
    exampleSnippet: `parts = ["archives", "scrolls", "tome.txt"]
path_str = "/".join(parts)`,
    starterCode: `# Build file path string from archive folder segments:
segments = ["gearhaven", "vault", "runes.dat"]
full_path = "/".join(segments)

# Advance based on path segment count:
paces = len(segments) + 1 # 4 paces
move_forward(paces)
collect()
`,
    solutionCode: `segments = ["gearhaven", "vault", "runes.dat"]
full_path = "/".join(segments)

paces = len(segments) + 1
move_forward(paces)
collect()`,
    hints: [
      'segments has 3 items. 3 + 1 = 4 paces.',
      'move_forward(4) collects the Pathlib Compass.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Pathlib Compass' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'path', 'path', 'path', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'plc1', type: 'crystal', x: 4, y: 1, name: 'Pathlib Compass' },
      ],
    },
    xpReward: 500,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Pathlib Compass',
      star2: 'Joins file path segments',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w8_m10',
    worldId: 8,
    title: 'The Master Scriptorium Grand Boss Trial',
    chapterName: 'World 8 Capstone Boss',
    order: 10,
    conceptTitle: 'Full Data Serialization Pipeline',
    conceptSummary: 'Extract structured ledger items, compute total step distance, and unlock the Scriptorium Portal.',
    conceptDetails: 'The Chief Archivist challenges you to parse 3 ledger manifests. Execute the serial read loop and leap across the archive canal into the Scriptorium Portal!',
    exampleSnippet: `for manifest in [2, 2, 2]:
    move_forward(manifest)
    collect()
    turn_right()
jump()`,
    starterCode: `# Boss Trial: Read all 3 archive manifests:
archive_manifests = [2, 2, 2]

for stride in archive_manifests:
    move_forward(stride)
    collect()
    turn_right()

jump() # Leap into the Master Scriptorium Portal!
`,
    solutionCode: `archive_manifests = [2, 2, 2]

for stride in archive_manifests:
    move_forward(stride)
    collect()
    turn_right()

jump()`,
    hints: [
      'Loop over all 3 archive manifests.',
      'Collect the crystal in each room and turn right.',
      'jump() leaps over the canal into the center portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Scriptorium Seals' },
      { id: 'g2', type: 'reach_portal', description: 'Enter Master Scriptorium Portal' },
    ],
    map: {
      width: 5,
      height: 5,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'path', 'stone', 'stone'],
        ['path', 'water', 'path', 'stone', 'stone'],
        ['path', 'path', 'path', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'ss_n', type: 'crystal', x: 2, y: 1, name: 'North Scriptorium Seal' },
        { id: 'ss_e', type: 'crystal', x: 2, y: 3, name: 'East Scriptorium Seal' },
        { id: 'ss_s', type: 'crystal', x: 0, y: 3, name: 'South Scriptorium Seal' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 520,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all seals & enter portal',
      star2: 'Executes clean archive iteration',
      star3: 'Boss trial cleared with zero errors',
      maxLinesForStar2: 10,
    },
  },
];
