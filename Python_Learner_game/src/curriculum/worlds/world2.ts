import { Mission } from '../../types/game';

export const WORLD_2_MISSIONS: Mission[] = [
  {
    id: 'w2_m1',
    worldId: 2,
    title: 'The If Gate',
    chapterName: 'Branching Paths',
    order: 1,
    conceptTitle: 'Conditional Statements: if',
    conceptSummary: 'if statements execute a block of code only when a condition is True.',
    conceptDetails: 'In Python, conditionals control logic. The syntax is `if condition:` followed by an indented block. In Python, indentation (typically 4 spaces) defines which lines belong inside the condition.',
    exampleSnippet: `energy = 10
if energy > 5:
    move_forward()`,
    starterCode: `# Check if you have enough energy to advance:
energy = 10

if energy > 5:
    move_forward(3)
    collect()
`,
    solutionCode: `energy = 10
if energy > 5:
    move_forward(3)
    collect()`,
    hints: [
      'energy is 10, which is greater than 5. The indented code will run!',
      'Make sure lines under the if statement are indented.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the emerald crystal' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'path', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'c1', type: 'crystal', x: 3, y: 1, name: 'Emerald Crystal' },
      ],
    },
    xpReward: 210,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect emerald crystal',
      star2: 'Uses if condition',
      star3: 'Proper indentation',
    },
  },
  {
    id: 'w2_m2',
    worldId: 2,
    title: 'The Forked Creek: if and else',
    chapterName: 'Binary Choice',
    order: 2,
    conceptTitle: 'if and else Branching',
    conceptSummary: 'else executes when the if condition evaluates to False.',
    conceptDetails: 'When a condition is not met, the `else:` block takes over. Only one branch will ever execute. This allows your adventurer to adapt to changing terrain dynamically!',
    exampleSnippet: `path_clear = True
if path_clear:
    move_forward()
else:
    turn_right()`,
    starterCode: `# If bridge_is_open is True, go straight; else turn right!
bridge_is_open = True

if bridge_is_open:
    move_forward(3)
    collect()
else:
    turn_right()
    move_forward(2)
`,
    solutionCode: `bridge_is_open = True
if bridge_is_open:
    move_forward(3)
    collect()
else:
    turn_right()
    move_forward(2)`,
    hints: [
      'bridge_is_open is True, so the if block executes.',
      'The hero will move forward 3 tiles and collect the gem.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Cross bridge and collect gem' },
    ],
    map: {
      width: 5,
      height: 4,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'bridge', 'bridge', 'path', 'grass'],
        ['path', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'g1', type: 'gem', x: 3, y: 1, name: 'River Pearl' },
      ],
    },
    xpReward: 220,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect River Pearl',
      star2: 'Includes if/else block',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w2_m3',
    worldId: 2,
    title: 'The Three-Way Rune: elif',
    chapterName: 'Multiple Alternatives',
    order: 3,
    conceptTitle: 'The elif Keyword (Else If)',
    conceptSummary: 'Chain multiple conditions using elif to test several possibilities.',
    conceptDetails: 'When there are more than two choices, `elif` (short for else if) tests subsequent conditions if earlier ones evaluated to False. Only the first matching branch runs.',
    exampleSnippet: `rune_color = "blue"
if rune_color == "red":
    turn_left()
elif rune_color == "blue":
    move_forward(2)
else:
    turn_right()`,
    starterCode: `# Check the rune_color and take the blue path!
rune_color = "blue"

if rune_color == "red":
    turn_left()
    move_forward(2)
elif rune_color == "blue":
    move_forward(3)
    collect()
else:
    turn_right()
    move_forward(2)
`,
    solutionCode: `rune_color = "blue"
if rune_color == "red":
    turn_left()
    move_forward(2)
elif rune_color == "blue":
    move_forward(3)
    collect()
else:
    turn_right()
    move_forward(2)`,
    hints: [
      'rune_color == "blue" matches the elif branch.',
      'The character will move forward 3 spaces and collect the sapphire.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Take the blue path to the sapphire' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'path', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 's1', type: 'gem', x: 3, y: 1, name: 'Sapphire' },
      ],
    },
    xpReward: 230,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Sapphire',
      star2: 'Uses elif condition',
      star3: 'Flawless run',
    },
  },
  {
    id: 'w2_m4',
    worldId: 2,
    title: 'The Dual Guardian Seal: and / or',
    chapterName: 'Logical Operators',
    order: 4,
    conceptTitle: 'Logical Operators: and, or, not',
    conceptSummary: 'Combine conditions using and (both True) and or (at least one True).',
    conceptDetails: 'The gate unlocks only if you have BOTH the key AND sufficient mana: `if has_key and mana >= 50:`. Use `not` to invert a boolean check (`not is_locked`).',
    exampleSnippet: `has_key = True
mana = 60
if has_key and mana >= 50:
    open_door()`,
    starterCode: `# You need both has_key = True AND mana >= 50 to pass through:
has_key = True
mana = 75

if has_key and mana >= 50:
    move_forward(3)
    collect()
`,
    solutionCode: `has_key = True
mana = 75
if has_key and mana >= 50:
    move_forward(3)
    collect()`,
    hints: [
      'Both conditions are True (has_key is True, mana 75 >= 50).',
      'The if block will safely execute.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the Guardian Seal' },
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
        { id: 'seal1', type: 'crystal', x: 3, y: 1, name: 'Guardian Seal' },
      ],
    },
    xpReward: 240,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Guardian Seal',
      star2: 'Uses "and" operator',
      star3: 'Clean syntax',
    },
  },
  {
    id: 'w2_m5',
    worldId: 2,
    title: 'Sensors of the Shaman: see_ahead()',
    chapterName: 'Environmental Sensing',
    order: 5,
    conceptTitle: 'Probing Tiles with see_ahead()',
    conceptSummary: 'Inspect what lies ahead before walking to avoid pit traps and monsters.',
    conceptDetails: '`see_ahead()` returns the type of tile or entity directly in front of you (e.g. "water", "wall", "gem", or "empty"). Combine it with `if` to make intelligent decisions!',
    exampleSnippet: `ahead = see_ahead()
if ahead == "water":
    jump()
else:
    move_forward()`,
    starterCode: `# Inspect ahead! If it is water, leap over it; otherwise move forward!
ahead = see_ahead()

if ahead == "water":
    jump()
else:
    move_forward()

collect()
`,
    solutionCode: `ahead = see_ahead()
if ahead == "water":
    jump()
else:
    move_forward()
collect()`,
    hints: [
      'There is water right in front of you, so see_ahead() returns "water".',
      'The hero will jump() 2 tiles right onto the treasure!',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Avoid water and collect ancient potion' },
    ],
    map: {
      width: 4,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass'],
        ['path', 'water', 'path', 'grass'],
        ['grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'p1', type: 'potion', x: 2, y: 1, name: 'Elixir of Life' },
      ],
    },
    xpReward: 250,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect elixir safely',
      star2: 'Use see_ahead() condition',
      star3: 'No water drowning',
    },
  },
  {
    id: 'w2_m6',
    worldId: 2,
    title: 'The Truthy Bog',
    chapterName: 'Truthy and Falsy Values',
    order: 6,
    conceptTitle: 'Truthy and Falsy Evaluations',
    conceptSummary: 'In Python, non-zero numbers and non-empty strings are Truthy, while 0, "", and None are Falsy.',
    conceptDetails: 'You do not always need `== True`. If a variable has content (like `spell_scroll = "Ember"` or `gold = 5`), Python treats it directly as True in an `if` statement!',
    exampleSnippet: `mana = 10
if mana:  # Truthy because 10 != 0
    move_forward()`,
    starterCode: `# Check if the mana orb is active (truthy):
mana = 5

if mana:
    move_forward(3)
    collect()
`,
    solutionCode: `mana = 5
if mana:
    move_forward(3)
    collect()`,
    hints: [
      'mana is 5, which is truthy. The indented block will execute.',
      'Step forward 3 spaces and collect the mana orb.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the Mana Orb' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'path', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'mana_orb', type: 'crystal', x: 3, y: 1, name: 'Mana Orb' },
      ],
    },
    xpReward: 260,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Mana Orb',
      star2: 'Uses truthy evaluation',
      star3: 'Clean 4-line code',
      maxLinesForStar2: 4,
    },
  },
  {
    id: 'w2_m7',
    worldId: 2,
    title: 'The Inverted Ward: not operator',
    chapterName: 'Logical Negation',
    order: 7,
    conceptTitle: 'The not Operator',
    conceptSummary: 'Invert any boolean expression using the not keyword.',
    conceptDetails: 'If `is_locked` is False, then `not is_locked` evaluates to True. Use negation to write clear, expressive rules.',
    exampleSnippet: `is_blocked = False
if not is_blocked:
    move_forward(2)`,
    starterCode: `# If the path is not blocked, proceed to the ancient gate!
is_blocked = False

if not is_blocked:
    move_forward(3)
    collect()
`,
    solutionCode: `is_blocked = False
if not is_blocked:
    move_forward(3)
    collect()`,
    hints: [
      'not False evaluates to True.',
      'The hero will march forward 3 paces and harvest the rune.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Harvest the Ward Rune' },
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
        { id: 'ward_rune', type: 'crystal', x: 3, y: 1, name: 'Ward Rune' },
      ],
    },
    xpReward: 270,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Ward Rune',
      star2: 'Uses not keyword',
      star3: 'Flawless run',
    },
  },
  {
    id: 'w2_m8',
    worldId: 2,
    title: 'The Either-Or Crossroads',
    chapterName: 'Disjunction (or)',
    order: 8,
    conceptTitle: 'The or Operator',
    conceptSummary: 'An or expression is True if at least ONE of its operands is True.',
    conceptDetails: 'To enter the sanctuary, you need either the Silver Key OR Master Clearance: `if has_silver_key or has_clearance:`. Only one needs to be True!',
    exampleSnippet: `has_key = False
has_pass = True
if has_key or has_pass:
    move_forward()`,
    starterCode: `# Check if either token grants access:
has_silver_key = False
has_master_pass = True

if has_silver_key or has_master_pass:
    move_forward(3)
    collect()
`,
    solutionCode: `has_silver_key = False
has_master_pass = True
if has_silver_key or has_master_pass:
    move_forward(3)
    collect()`,
    hints: [
      'Because has_master_pass is True, the or condition is satisfied!',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve the Sanctuary Gem' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'path', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'sanc_gem', type: 'gem', x: 3, y: 1, name: 'Sanctuary Gem' },
      ],
    },
    xpReward: 280,
    maxStars: 3,
    starCriteria: {
      star1: 'Retrieve Sanctuary Gem',
      star2: 'Uses or operator',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w2_m9',
    worldId: 2,
    title: 'Nested Thickets: Nested if',
    chapterName: 'Nested Decisions',
    order: 9,
    conceptTitle: 'Nested Conditionals',
    conceptSummary: 'Place an if statement inside another if statement to evaluate hierarchical checks.',
    conceptDetails: 'First check if you have entered the grove (`if in_grove:`). Then, indented further, check if the inner shrine is unlocked (`if shrine_open:`). Each level of indentation represents a deeper tier of decision.',
    exampleSnippet: `if in_grove:
    if shrine_open:
        move_forward()`,
    starterCode: `# Evaluate nested conditions to reach the forest heart:
in_grove = True
shrine_open = True

if in_grove:
    if shrine_open:
        move_forward(3)
        collect()
`,
    solutionCode: `in_grove = True
shrine_open = True
if in_grove:
    if shrine_open:
        move_forward(3)
        collect()`,
    hints: [
      'Both in_grove and shrine_open are True.',
      'The inner indented block will run.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Harvest the Forest Heart' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'path', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'heart1', type: 'crystal', x: 3, y: 1, name: 'Forest Heart' },
      ],
    },
    xpReward: 290,
    maxStars: 3,
    starCriteria: {
      star1: 'Harvest Forest Heart',
      star2: 'Uses nested if statements',
      star3: 'Accurate indentation',
    },
  },
  {
    id: 'w2_m10',
    worldId: 2,
    title: 'Trial of the Whispering Sphinx',
    chapterName: 'World 2 Boss Trial',
    order: 10,
    conceptTitle: 'World 2 Capstone: The Riddle Matrix',
    conceptSummary: 'Synthesize conditionals, sensors, and operators to navigate the branching labyrinth.',
    conceptDetails: 'The Whispering Sphinx presents 3 consecutive choice gates. Use `see_ahead()` to detect obstacles: leap if water is ahead, turn if a wall blocks the path, and step forward into the exit portal!',
    exampleSnippet: `if see_ahead() == "water":
    jump()
else:
    move_forward()`,
    starterCode: `# The Sphinx Maze Trial:
# 1. Step to the first crossing
# 2. Check see_ahead(): if water, jump!
# 3. Collect the Sphinx Emblem and step into the portal!

move_forward()
if see_ahead() == "water":
    jump()
else:
    move_forward()

collect()
move_forward()
`,
    solutionCode: `move_forward()
if see_ahead() == "water":
    jump()
else:
    move_forward()
collect()
move_forward()`,
    hints: [
      'Step to tile 1.',
      'see_ahead() sees water at tile 2, so jump() clears it to tile 3.',
      'Collect the emblem at tile 3 and step to portal at tile 4!',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the Sphinx Emblem' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the Sphinx Summit Portal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'water', 'path', 'portal', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'emblem1', type: 'crystal', x: 3, y: 1, name: 'Sphinx Emblem' },
      ],
      portalPosition: { x: 4, y: 1 },
    },
    xpReward: 350,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect emblem & reach portal',
      star2: 'Uses conditional see_ahead check',
      star3: 'Boss trial cleared flawlessly',
      maxLinesForStar2: 8,
    },
  },
];
