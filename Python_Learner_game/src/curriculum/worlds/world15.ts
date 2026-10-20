import { Mission } from '../../types/game';

export const WORLD_15_MISSIONS: Mission[] = [
  {
    id: 'w15_m1',
    worldId: 15,
    title: 'The Quiz Engine Capstone',
    chapterName: 'Interactive CLI Systems',
    order: 1,
    conceptTitle: 'Building an Automated Quiz Evaluator',
    conceptSummary: 'Evaluate a dictionary of questions and answers to calculate total score and feedback.',
    conceptDetails: 'In this capstone, you build the core logic of a quiz engine. Given a list of questions and player responses, evaluate correct answers and compute step rewards based on the final score.',
    exampleSnippet: `score = sum(1 for q in quiz if q["ans"] == q["correct"])`,
    starterCode: `# Capstone 1: Quiz Engine Evaluator:
quiz_data = [
    {"user": "print", "correct": "print"},
    {"user": "for", "correct": "for"},
    {"user": "def", "correct": "def"},
]

score = sum(1 for q in quiz_data if q["user"] == q["correct"]) # 3

move_forward(score)
collect()
`,
    solutionCode: `quiz_data = [
    {"user": "print", "correct": "print"},
    {"user": "for", "correct": "for"},
    {"user": "def", "correct": "def"},
]

score = sum(1 for q in quiz_data if q["user"] == q["correct"])

move_forward(score)
collect()`,
    hints: [
      'All 3 questions were answered correctly, yielding score = 3.',
      'move_forward(3) collects the Quiz Engine Keystone.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Quiz Engine Keystone' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'path', 'wood_floor', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'qek', type: 'crystal', x: 3, y: 1, name: 'Quiz Engine Keystone' },
      ],
    },
    xpReward: 700,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Quiz Engine Keystone',
      star2: 'Computes quiz score with comprehension',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w15_m2',
    worldId: 15,
    title: 'The Expense Tracker Capstone',
    chapterName: 'Financial Logic & Ledgers',
    order: 2,
    conceptTitle: 'Budgeting & Ledger Balancing',
    conceptSummary: 'Sum ledger transactions by category and verify expenses remain within budget.',
    conceptDetails: 'Track income and expenditures across various categories. Sum purchases and assert that total spending stays strictly under the budget threshold.',
    exampleSnippet: `total_spent = sum(e["amount"] for e in expenses)
assert total_spent <= budget`,
    starterCode: `# Capstone 2: Expense Ledger Validator:
transactions = [
    {"category": "Gear", "amount": 2},
    {"category": "Potions", "amount": 2},
]

total_spent = sum(t["amount"] for t in transactions) # 4
budget = 5
assert total_spent <= budget, "Over budget!"

move_forward(total_spent)
collect()
`,
    solutionCode: `transactions = [
    {"category": "Gear", "amount": 2},
    {"category": "Potions", "amount": 2},
]

total_spent = sum(t["amount"] for t in transactions)
budget = 5
assert total_spent <= budget, "Over budget!"

move_forward(total_spent)
collect()`,
    hints: [
      '2 + 2 = 4, which is within the budget of 5.',
      'move_forward(4) collects the Ledger Seal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Ledger Seal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'path', 'path', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'ls1', type: 'crystal', x: 4, y: 1, name: 'Ledger Seal' },
      ],
    },
    xpReward: 710,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Ledger Seal',
      star2: 'Balances ledger transactions and asserts budget',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w15_m3',
    worldId: 15,
    title: 'The Contact Book Capstone',
    chapterName: 'Information Architecture',
    order: 3,
    conceptTitle: 'CRUD Operations with Dictionaries',
    conceptSummary: 'Create, Read, Update, and Search structured contact records.',
    conceptDetails: 'Manage a directory of guild members. Implement lookups, additions, and updates using dictionary keys with clean fallback handling.',
    exampleSnippet: `phonebook["Pythor"] = 5
val = phonebook.get("Pythor", 0)`,
    starterCode: `# Capstone 3: Guild Contact Book Registry:
guild_book = {
    "Pythor": {"rank": "Sage", "paces": 3},
    "Ollie": {"rank": "Mentor", "paces": 3},
}

target_paces = guild_book["Pythor"]["paces"] # 3

move_forward(target_paces)
collect()
`,
    solutionCode: `guild_book = {
    "Pythor": {"rank": "Sage", "paces": 3},
    "Ollie": {"rank": "Mentor", "paces": 3},
}

target_paces = guild_book["Pythor"]["paces"]

move_forward(target_paces)
collect()`,
    hints: [
      'Accessing guild_book["Pythor"]["paces"] gives 3.',
      'move_forward(3) collects the Directory Medallion.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Directory Medallion' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'path', 'wood_floor', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'dm1', type: 'crystal', x: 3, y: 1, name: 'Directory Medallion' },
      ],
    },
    xpReward: 720,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Directory Medallion',
      star2: 'Performs dictionary lookup',
      star3: 'Under 9 lines of code',
      maxLinesForStar2: 9,
    },
  },
  {
    id: 'w15_m4',
    worldId: 15,
    title: 'The Text RPG Battle Capstone',
    chapterName: 'Game State Machines',
    order: 4,
    conceptTitle: 'Turn-Based Combat System',
    conceptSummary: 'Simulate combat damage, health reduction, and victory detection with classes.',
    conceptDetails: 'Model RPG combat using object-oriented entities. Each attack subtracts damage from monster health until health drops to zero, triggering victory.',
    exampleSnippet: `monster_hp -= hero_atk
if monster_hp <= 0: return "Victory"`,
    starterCode: `# Capstone 4: Turn-Based RPG Battle Engine:
hero_atk = 25
monster_hp = 50

turns = 0
while monster_hp > 0:
    monster_hp -= hero_atk
    turns += 1

# 50 HP / 25 dmg = 2 turns
# Move 2 paces to claim the battle trophy:
move_forward(turns)
collect()
`,
    solutionCode: `hero_atk = 25
monster_hp = 50

turns = 0
while monster_hp > 0:
    monster_hp -= hero_atk
    turns += 1

move_forward(turns)
collect()`,
    hints: [
      'In 2 turns of 25 damage, the 50 HP monster is defeated.',
      'move_forward(2) collects the Champion Crest.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Champion Crest' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'wood_floor', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'cc1', type: 'crystal', x: 2, y: 1, name: 'Champion Crest' },
      ],
    },
    xpReward: 730,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Champion Crest',
      star2: 'Simulates turn-based combat loop',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w15_m5',
    worldId: 15,
    title: 'The Inventory System Capstone',
    chapterName: 'Inventory & Stock Management',
    order: 5,
    conceptTitle: 'Stock Tracking & Restocking Triggers',
    conceptSummary: 'Track item quantities, add/remove loot, and trigger low-stock alerts.',
    conceptDetails: 'Manage an adventurer inventory system. Use dictionary counting, cap thresholds, and verify available slots before collecting items.',
    exampleSnippet: `inv["potion"] = inv.get("potion", 0) + 1`,
    starterCode: `# Capstone 5: Inventory Loot Aggregator:
loot_bag = ["potion", "gem", "potion", "potion", "gem"]
potion_count = loot_bag.count("potion") # 3

# Advance by potion count:
move_forward(potion_count)
collect()
`,
    solutionCode: `loot_bag = ["potion", "gem", "potion", "potion", "gem"]
potion_count = loot_bag.count("potion")

move_forward(potion_count)
collect()`,
    hints: [
      'loot_bag.count("potion") evaluates to 3.',
      'move_forward(3) collects the Bag of Holding.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Bag of Holding' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'path', 'wood_floor', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'boh', type: 'crystal', x: 3, y: 1, name: 'Bag of Holding' },
      ],
    },
    xpReward: 740,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Bag of Holding',
      star2: 'Counts inventory items with .count()',
      star3: 'Under 6 lines of code',
      maxLinesForStar2: 6,
    },
  },
  {
    id: 'w15_m6',
    worldId: 15,
    title: 'The Algorithm Visualizer Capstone',
    chapterName: 'Algorithm State Tracing',
    order: 6,
    conceptTitle: 'Recording Algorithm Step Histories',
    conceptSummary: 'Record step-by-step state changes during execution to create visualizations.',
    conceptDetails: 'Visualizers record snapshots of data at every iteration: `history.append(list(data))`. This allows UI components to replay the algorithm frame by frame.',
    exampleSnippet: `snapshots = []
for i in range(3):
    snapshots.append(i * 2)`,
    starterCode: `# Capstone 6: Record algorithm step history:
history = []
for pace in [1, 2, 1]:
    history.append(pace)

total_distance = sum(history) # 4 paces
move_forward(total_distance)
collect()
`,
    solutionCode: `history = []
for pace in [1, 2, 1]:
    history.append(pace)

total_distance = sum(history)
move_forward(total_distance)
collect()`,
    hints: [
      'History records [1, 2, 1], summing to 4.',
      'move_forward(4) collects the Visualizer Orb.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Visualizer Orb' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'path', 'path', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'vo1', type: 'crystal', x: 4, y: 1, name: 'Visualizer Orb' },
      ],
    },
    xpReward: 750,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Visualizer Orb',
      star2: 'Records state history list',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w15_m7',
    worldId: 15,
    title: 'The Password Vault Capstone',
    chapterName: 'Cybersecurity & Validation',
    order: 7,
    conceptTitle: 'Password Strength & Rule Verification',
    conceptSummary: 'Enforce security requirements: minimum length, digits, and uppercase symbols.',
    conceptDetails: 'Write a password validator that checks length, capital letters, and numbers. Return boolean validation score to unlock secure vault gates.',
    exampleSnippet: `is_strong = len(pwd) >= 8 and any(c.isdigit() for c in pwd)`,
    starterCode: `# Capstone 7: Password Complexity Validator:
def validate_password(pwd):
    has_length = len(pwd) >= 8
    has_digit = any(c.isdigit() for c in pwd)
    return has_length and has_digit

assert validate_password("PythonQuest2026") == True

# Advance to unlock vault:
move_forward(5)
collect()
`,
    solutionCode: `def validate_password(pwd):
    has_length = len(pwd) >= 8
    has_digit = any(c.isdigit() for c in pwd)
    return has_length and has_digit

assert validate_password("PythonQuest2026") == True

move_forward(5)
collect()`,
    hints: [
      '"PythonQuest2026" satisfies both criteria.',
      'move_forward(5) reaches the Master Cipher Key.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Master Cipher Key' },
    ],
    map: {
      width: 7,
      height: 3,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'path', 'path', 'path', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'mck', type: 'crystal', x: 5, y: 1, name: 'Master Cipher Key' },
      ],
    },
    xpReward: 760,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Master Cipher Key',
      star2: 'Validates password complexity rules',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w15_m8',
    worldId: 15,
    title: 'The Grid Pathfinding Capstone',
    chapterName: '2D Spatial Navigation',
    order: 8,
    conceptTitle: 'Coordinate Distance & Waypoint Routing',
    conceptSummary: 'Calculate Manhattan distance and step deltas between coordinates.',
    conceptDetails: 'In 2D grid games, Manhattan distance between `(x1, y1)` and `(x2, y2)` equals `abs(x1 - x2) + abs(y1 - y2)`. Use distance calculations to navigate complex corridors.',
    exampleSnippet: `dist = abs(curr.x - target.x) + abs(curr.y - target.y)`,
    starterCode: `# Capstone 8: Manhattan Distance Waypoint Navigation:
start_x, start_y = 0, 1
target_x, target_y = 4, 1

dist_x = abs(target_x - start_x) # 4
move_forward(dist_x)
collect()
`,
    solutionCode: `start_x, start_y = 0, 1
target_x, target_y = 4, 1

dist_x = abs(target_x - start_x)
move_forward(dist_x)
collect()`,
    hints: [
      'abs(4 - 0) = 4 paces.',
      'move_forward(4) collects the Navigator Compass.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Navigator Compass' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'path', 'path', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'nc2', type: 'crystal', x: 4, y: 1, name: 'Navigator Compass' },
      ],
    },
    xpReward: 770,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Navigator Compass',
      star2: 'Computes coordinate distance with abs()',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w15_m9',
    worldId: 15,
    title: 'The Arcade Leaderboard Capstone',
    chapterName: 'Ranking Systems',
    order: 9,
    conceptTitle: 'Sorting & Slicing Top-N Records',
    conceptSummary: 'Sort complex player score records and retrieve the top champion rankings.',
    conceptDetails: 'Leaderboards sort player profiles by score descending: `sorted(players, key=lambda p: p["score"], reverse=True)[:N]`.',
    exampleSnippet: `top_3 = sorted(players, key=lambda p: p["score"], reverse=True)[:3]`,
    starterCode: `# Capstone 9: Arcade High Score Leaderboard:
leaderboard = [
    {"player": "Kaelen", "score": 850},
    {"player": "Hedwig", "score": 950},
    {"player": "Bran", "score": 700},
]

top_score = max(p["score"] for p in leaderboard) # 950
# Stride based on hundreds digit (9 // 2 = 4 paces):
paces = (top_score // 100) // 2 # 4 paces

move_forward(paces)
collect()
`,
    solutionCode: `leaderboard = [
    {"player": "Kaelen", "score": 850},
    {"player": "Hedwig", "score": 950},
    {"player": "Bran", "score": 700},
]

top_score = max(p["score"] for p in leaderboard)
paces = (top_score // 100) // 2

move_forward(paces)
collect()`,
    hints: [
      'Top score is Hedwig with 950. 9 // 2 = 4 paces.',
      'move_forward(4) collects the Grand Arcade Trophy.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Grand Arcade Trophy' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'path', 'path', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'gat', type: 'crystal', x: 4, y: 1, name: 'Grand Arcade Trophy' },
      ],
    },
    xpReward: 780,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Grand Arcade Trophy',
      star2: 'Finds top score record with max()',
      star3: 'Under 12 lines of code',
      maxLinesForStar2: 12,
    },
  },
  {
    id: 'w15_m10',
    worldId: 15,
    title: 'Code the World — The Grand Awakening',
    chapterName: 'The Ultimate Capstone',
    order: 10,
    conceptTitle: 'The Grand Python Synthesis',
    conceptSummary: 'Synthesize variables, loops, functions, OOP, and data structures to awaken the Core Engine and code the world!',
    conceptDetails: 'You have reached the heart of Gearhaven Megalopolis. Awaken the ancient Core Engine by executing a grand synthesis that powers all 3 core generators and leaps into the Transcendence Portal!',
    exampleSnippet: `for core in [2, 2, 2]:
    move_forward(core)
    collect()
    turn_right()
jump()`,
    starterCode: `# The Final Capstone: Awaken the 3 Core Power Generators:
generators = [2, 2, 2]

for energy in generators:
    move_forward(energy)
    collect()
    turn_right()

jump() # Ascend into the World Heart Portal and CODE THE WORLD!
`,
    solutionCode: `generators = [2, 2, 2]

for energy in generators:
    move_forward(energy)
    collect()
    turn_right()

jump()`,
    hints: [
      'The loop activates all 3 Core Power Generators.',
      'Collect each energy crystal and turn right.',
      'jump() leaps over the central power conduit into the World Heart Portal!',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Power all 3 Core Generators' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the World Heart Portal' },
    ],
    map: {
      width: 5,
      height: 5,
      tiles: [
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'wood_floor', 'wood_floor'],
        ['path', 'water', 'path', 'wood_floor', 'wood_floor'],
        ['path', 'path', 'path', 'wood_floor', 'wood_floor'],
        ['wood_floor', 'wood_floor', 'wood_floor', 'wood_floor', 'wood_floor'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'cg_n', type: 'crystal', x: 2, y: 1, name: 'North Core Crystal' },
        { id: 'cg_e', type: 'crystal', x: 2, y: 3, name: 'East Core Crystal' },
        { id: 'cg_s', type: 'crystal', x: 0, y: 3, name: 'South Core Crystal' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 1000,
    maxStars: 3,
    starCriteria: {
      star1: 'Awaken all 3 generators & enter portal',
      star2: 'Executes grand loop synthesis',
      star3: 'Completed the 150-Mission Master Pathway',
      maxLinesForStar2: 10,
    },
  },
];
