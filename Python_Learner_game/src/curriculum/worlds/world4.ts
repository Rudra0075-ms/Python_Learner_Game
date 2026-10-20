import { Mission } from '../../types/game';

export const WORLD_4_MISSIONS: Mission[] = [
  {
    id: 'w4_m1',
    worldId: 4,
    title: 'The Inventory List',
    chapterName: 'Python Lists',
    order: 1,
    conceptTitle: 'Lists and Indexing',
    conceptSummary: 'Lists store ordered items in square brackets [item1, item2].',
    conceptDetails: 'In Python, lists are indexed starting at 0: `crystals[0]` is the first item, `crystals[1]` is the second. You can iterate through lists directly with `for item in list:`.',
    exampleSnippet: `steps = [1, 2, 1]
for s in steps:
    move_forward(s)`,
    starterCode: `# Walk along the path defined by step distances in the list:
moves = [2, 1, 2]

for dist in moves:
    move_forward(dist)

collect()
`,
    solutionCode: `moves = [2, 1, 2]
for dist in moves:
    move_forward(dist)
collect()`,
    hints: [
      'The moves list has 3 numbers: 2, 1, and 2 (total 5 steps).',
      'The loop walks each distance sequentially to reach the cave amethyst.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the Cave Amethyst' },
    ],
    map: {
      width: 7,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'path', 'path', 'path', 'path', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'amethyst1', type: 'crystal', x: 5, y: 1, name: 'Cave Amethyst' },
      ],
    },
    xpReward: 300,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Cave Amethyst',
      star2: 'Iterates through list',
      star3: '5 lines or fewer',
      maxLinesForStar2: 5,
    },
  },
  {
    id: 'w4_m2',
    worldId: 4,
    title: 'Slicing the Crystal Vein',
    chapterName: 'List Slicing',
    order: 2,
    conceptTitle: 'List Slicing [start:end]',
    conceptSummary: 'Extract a portion of a list using slice notation: list[start:end].',
    conceptDetails: '`gems[0:2]` extracts items from index 0 up to (but not including) index 2. Slicing never modifies the original list, returning a new sublist.',
    exampleSnippet: `all_steps = [1, 1, 1, 10, 20]
safe_steps = all_steps[0:3] # [1, 1, 1]
for s in safe_steps:
    move_forward(s)`,
    starterCode: `# Slice the safe steps from the survey list:
survey = [2, 2, 999]
safe = survey[0:2]

for dist in safe:
    move_forward(dist)

collect()
`,
    solutionCode: `survey = [2, 2, 999]
safe = survey[0:2]
for dist in safe:
    move_forward(dist)
collect()`,
    hints: [
      'survey[0:2] grabs the first two numbers (2 and 2).',
      'Moving 2 + 2 = 4 tiles reaches the vein sapphire.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Vein Sapphire' },
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
        { id: 'vein_saph', type: 'gem', x: 4, y: 1, name: 'Vein Sapphire' },
      ],
    },
    xpReward: 310,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Vein Sapphire',
      star2: 'Uses list slice [0:2]',
      star3: 'Avoids trap value 999',
    },
  },
  {
    id: 'w4_m3',
    worldId: 4,
    title: "The Miner's Bag: append & pop",
    chapterName: 'List Methods',
    order: 3,
    conceptTitle: 'List Methods: append() and pop()',
    conceptSummary: 'Add items with list.append(item) and remove the last item with list.pop().',
    conceptDetails: 'Lists in Python are dynamic and mutable. Use `.append()` to pack more items into your satchel as you delve deeper into the subterranean tunnels.',
    exampleSnippet: `bag = []
bag.append("Ruby")
bag.append("Topaz")
print(len(bag)) # 2`,
    starterCode: `# Pack step counts into your move bag:
moves = []
moves.append(2)
moves.append(2)

for m in moves:
    move_forward(m)

collect()
`,
    solutionCode: `moves = []
moves.append(2)
moves.append(2)
for m in moves:
    move_forward(m)
collect()`,
    hints: [
      'moves.append(2) twice creates [2, 2].',
      'Moving 4 total spaces collects the Ruby.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Cavern Ruby' },
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
        { id: 'ruby_cav', type: 'gem', x: 4, y: 1, name: 'Cavern Ruby' },
      ],
    },
    xpReward: 320,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Cavern Ruby',
      star2: 'Uses list.append()',
      star3: 'Flawless run',
    },
  },
  {
    id: 'w4_m4',
    worldId: 4,
    title: 'The Immutable Tuple',
    chapterName: 'Tuples',
    order: 4,
    conceptTitle: 'Tuples (item1, item2)',
    conceptSummary: 'Tuples are ordered collections enclosed in parentheses () that cannot be altered.',
    conceptDetails: 'Unlike lists, tuples are immutable — once created, their values cannot be changed or appended. They are perfect for fixed coordinates and constants like `target_coord = (3, 1)`.',
    exampleSnippet: `target = (4, 1)
x_dist = target[0]
move_forward(x_dist)`,
    starterCode: `# Extract the target X-distance from the rune tuple:
target_waypoint = (4, 1)
x_steps = target_waypoint[0]

move_forward(x_steps)
collect()
`,
    solutionCode: `target_waypoint = (4, 1)
x_steps = target_waypoint[0]
move_forward(x_steps)
collect()`,
    hints: [
      'target_waypoint[0] accesses the first element: 4.',
      'Pass x_steps to move_forward.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Waypoint Crystal' },
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
        { id: 'waypoint_c', type: 'crystal', x: 4, y: 1, name: 'Waypoint Crystal' },
      ],
    },
    xpReward: 330,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Waypoint Crystal',
      star2: 'Accesses tuple index [0]',
      star3: 'Under 5 lines',
      maxLinesForStar2: 5,
    },
  },
  {
    id: 'w4_m5',
    worldId: 4,
    title: 'Purifying the Crystal Set',
    chapterName: 'Python Sets',
    order: 5,
    conceptTitle: 'Sets & Uniqueness',
    conceptSummary: 'Sets are unordered collections of unique elements with no duplicates.',
    conceptDetails: 'Creating a set with `{1, 2, 2, 3}` automatically removes duplicate elements, leaving `{1, 2, 3}`. Use `len(set)` to count distinct artifact types.',
    exampleSnippet: `raw_ores = ["Gold", "Gold", "Iron", "Gold"]
unique_ores = set(raw_ores) # {"Gold", "Iron"}`,
    starterCode: `# Count unique crystal types to determine steps:
raw_gems = ["ruby", "ruby", "sapphire", "ruby", "emerald"]
unique_count = len(set(raw_gems)) # 3 unique gems

move_forward(unique_count)
collect()
`,
    solutionCode: `raw_gems = ["ruby", "ruby", "sapphire", "ruby", "emerald"]
unique_count = len(set(raw_gems))
move_forward(unique_count)
collect()`,
    hints: [
      'set(raw_gems) yields 3 unique gems.',
      'len(set) evaluates to 3.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the Prismatic Gem' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'path', 'path', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'prism_gem', type: 'gem', x: 3, y: 1, name: 'Prismatic Gem' },
      ],
    },
    xpReward: 340,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Prismatic Gem',
      star2: 'Uses set() to remove duplicates',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w4_m6',
    worldId: 4,
    title: 'The Runic Ledger: Dictionaries',
    chapterName: 'Key-Value Mapping',
    order: 6,
    conceptTitle: 'Python Dictionaries (dict)',
    conceptSummary: 'Dictionaries map keys to values using curly braces: {"key": value}.',
    conceptDetails: 'Dictionaries provide rapid lookup. `cave_map = {"distance": 4}` allows retrieving the value using `cave_map["distance"]`.',
    exampleSnippet: `d = {"steps": 3, "item": "gem"}
move_forward(d["steps"])`,
    starterCode: `# Look up the required distance in the map dictionary:
cave_map = {
    "gem_distance": 4
}

dist = cave_map["gem_distance"]
move_forward(dist)
collect()
`,
    solutionCode: `cave_map = {
    "gem_distance": 4
}
dist = cave_map["gem_distance"]
move_forward(dist)
collect()`,
    hints: [
      'Access dictionary values with bracket notation: cave_map["gem_distance"].',
      'Then pass dist to move_forward.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve cavern diamond' },
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
        { id: 'diamond1', type: 'gem', x: 4, y: 1, name: 'Cavern Diamond' },
      ],
    },
    xpReward: 350,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect diamond',
      star2: 'Uses dictionary lookup',
      star3: 'Zero syntax errors',
    },
  },
  {
    id: 'w4_m7',
    worldId: 4,
    title: 'Updating the Vault Ledger',
    chapterName: 'Modifying Dictionaries',
    order: 7,
    conceptTitle: 'Modifying and Adding Dictionary Keys',
    conceptSummary: 'Assign to a key to add or update values: dict[key] = new_value.',
    conceptDetails: 'You can update dictionary records as you explore. For example, `inventory["torches"] += 1` updates the existing tally directly.',
    exampleSnippet: `vault = {"unlocked": False}
vault["unlocked"] = True
vault["steps"] = 3`,
    starterCode: `# Configure vault navigation in the dictionary:
nav = {"stride": 1}
nav["stride"] = 4

move_forward(nav["stride"])
collect()
`,
    solutionCode: `nav = {"stride": 1}
nav["stride"] = 4
move_forward(nav["stride"])
collect()`,
    hints: [
      'nav["stride"] = 4 updates the distance.',
      'Moving 4 tiles reaches the ancient chest.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Vault Chest' },
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
        { id: 'vault_ch', type: 'chest', x: 4, y: 1, name: 'Vault Chest' },
      ],
    },
    xpReward: 360,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Vault Chest',
      star2: 'Updates dictionary key',
      star3: 'Clean syntax',
    },
  },
  {
    id: 'w4_m8',
    worldId: 4,
    title: 'Iterating Over Artifacts',
    chapterName: 'Collection Loops',
    order: 8,
    conceptTitle: 'Iterating Through Collections',
    conceptSummary: 'Loop directly over items in a list without needing indices.',
    conceptDetails: '`for step in [2, 1, 1]:` assigns each item in the list directly to the loop variable `step` in order.',
    exampleSnippet: `path_segments = [1, 2, 1]
for seg in path_segments:
    move_forward(seg)`,
    starterCode: `# Walk each segment in the list:
segments = [1, 2, 1]

for s in segments:
    move_forward(s)

collect()
`,
    solutionCode: `segments = [1, 2, 1]
for s in segments:
    move_forward(s)
collect()`,
    hints: [
      '1 + 2 + 1 = 4 total steps.',
      'Collects the Deep Cavern Crystal at tile 4.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Deep Cavern Crystal' },
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
        { id: 'deep_c', type: 'crystal', x: 4, y: 1, name: 'Deep Cavern Crystal' },
      ],
    },
    xpReward: 370,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Deep Cavern Crystal',
      star2: 'Iterates directly over list elements',
      star3: '5 lines or fewer',
      maxLinesForStar2: 5,
    },
  },
  {
    id: 'w4_m9',
    worldId: 4,
    title: 'Vault Inventory Counting',
    chapterName: 'Searching & Counting',
    order: 9,
    conceptTitle: 'Counting Items with len()',
    conceptSummary: 'Use len(collection) to determine how many elements exist.',
    conceptDetails: '`len(["a", "b", "c"])` returns 3. Dynamic lists can be sized with `len()` to dynamically compute distances in game logic.',
    exampleSnippet: `inventory = ["map", "torch", "key", "potion"]
steps = len(inventory) # 4
move_forward(steps)`,
    starterCode: `# Use the length of the tool belt to walk the bridge:
tools = ["pickaxe", "chisel", "rope", "lamp"]
distance = len(tools)

move_forward(distance)
collect()
`,
    solutionCode: `tools = ["pickaxe", "chisel", "rope", "lamp"]
distance = len(tools)
move_forward(distance)
collect()`,
    hints: [
      'len(tools) evaluates to 4.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Miner Relic' },
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
        { id: 'miner_relic', type: 'gem', x: 4, y: 1, name: 'Miner Relic' },
      ],
    },
    xpReward: 380,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Miner Relic',
      star2: 'Uses len() function',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w4_m10',
    worldId: 4,
    title: 'Trial of the Crystal Hoarder Golem',
    chapterName: 'World 4 Boss Trial',
    order: 10,
    conceptTitle: 'World 4 Capstone: The Vault Manifest',
    conceptSummary: 'Synthesize lists, dictionaries, and iteration to solve the master cavern vault.',
    conceptDetails: 'The Hoarder Golem will only open the vault portal if you navigate using the dictionary of coordinates. Extract the path steps from the manifest dictionary, collect all crystals, and step into the portal!',
    exampleSnippet: `manifest = {"first": 2, "second": 2}
move_forward(manifest["first"])`,
    starterCode: `# Extract path directions from the vault manifest:
vault_manifest = {
    "steps_1": 2,
    "steps_2": 2
}

move_forward(vault_manifest["steps_1"])
collect()
turn_right()
move_forward(vault_manifest["steps_2"])
collect()
`,
    solutionCode: `vault_manifest = {
    "steps_1": 2,
    "steps_2": 2
}
move_forward(vault_manifest["steps_1"])
collect()
turn_right()
move_forward(vault_manifest["steps_2"])
collect()`,
    hints: [
      'Move 2 steps forward to tile (2, 1) and collect crystal 1.',
      'Turn right and move 2 steps down to tile (2, 3) to collect crystal 2.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect both Hoarder Crystals' },
    ],
    map: {
      width: 4,
      height: 5,
      tiles: [
        ['stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'path', 'stone'],
        ['stone', 'stone', 'path', 'stone'],
        ['stone', 'stone', 'path', 'stone'],
        ['stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'hc1', type: 'crystal', x: 2, y: 1, name: 'Hoarder Ruby' },
        { id: 'hc2', type: 'crystal', x: 2, y: 3, name: 'Hoarder Emerald' },
      ],
    },
    xpReward: 420,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect both Hoarder crystals',
      star2: 'Uses dictionary coordinates',
      star3: 'Boss trial cleared flawlessly',
    },
  },
];
