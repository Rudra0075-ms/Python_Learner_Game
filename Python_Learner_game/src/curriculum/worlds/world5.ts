import { Mission } from '../../types/game';

export const WORLD_5_MISSIONS: Mission[] = [
  {
    id: 'w5_m1',
    worldId: 5,
    title: 'The First Invocation: def',
    chapterName: 'Reusable Spells',
    order: 1,
    conceptTitle: 'Defining Functions (def)',
    conceptSummary: 'Package repeated commands into named functions using the def keyword.',
    conceptDetails: 'In Python, a function is a named block of reusable code defined with `def function_name():`. Indent the statements inside the function body. Calling `function_name()` executes all enclosed commands at once.',
    exampleSnippet: `def advance_and_gather():
    move_forward()
    collect()

advance_and_gather()`,
    starterCode: `# Define a function named march_forward:
def march_forward():
    move_forward(2)
    collect()

# Invoke your function to retrieve the royal sigil!
march_forward()
`,
    solutionCode: `def march_forward():
    move_forward(2)
    collect()

march_forward()`,
    hints: [
      'Call march_forward() by writing its name followed by parentheses ().',
      'The function moves 2 steps forward and collects the sigil.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the Royal Sigil' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['wall', 'wall', 'wall', 'wall', 'wall'],
        ['stone', 'stone', 'stone', 'wall', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'sigil1', type: 'gem', x: 2, y: 1, name: 'Royal Sigil' },
      ],
    },
    xpReward: 310,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Royal Sigil',
      star2: 'Defines and calls a function',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w5_m2',
    worldId: 5,
    title: 'Spells with Parameters',
    chapterName: 'Arguments & Flexibility',
    order: 2,
    conceptTitle: 'Function Parameters',
    conceptSummary: 'Pass inputs into functions to adapt their actions dynamically.',
    conceptDetails: 'Parameters act as variables inside the function definition. When you call `def sprint(paces):`, passing `sprint(4)` sets `paces = 4` inside the body.',
    exampleSnippet: `def march(paces):
    move_forward(paces)

march(3)`,
    starterCode: `# Define a function that takes 'steps' as an argument:
def sprint(steps):
    move_forward(steps)
    collect()

# Sprint 4 paces to the royal scepter:
sprint(4)
`,
    solutionCode: `def sprint(steps):
    move_forward(steps)
    collect()

sprint(4)`,
    hints: [
      'sprint(4) will run move_forward(4) and collect the scepter.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve the Royal Scepter' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['path', 'path', 'path', 'path', 'path', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'scepter1', type: 'gem', x: 4, y: 1, name: 'Royal Scepter' },
      ],
    },
    xpReward: 320,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Royal Scepter',
      star2: 'Function with parameter used',
      star3: 'Completed in under 7 lines',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w5_m3',
    worldId: 5,
    title: 'Dual Parameter Maneuvers',
    chapterName: 'Multi-Parameter Functions',
    order: 3,
    conceptTitle: 'Multiple Function Arguments',
    conceptSummary: 'Functions can accept multiple parameters separated by commas.',
    conceptDetails: '`def navigate(walk_dist, jump_dist):` accepts two values. Inside the body, both parameters are accessible. Always match the order of arguments during calls.',
    exampleSnippet: `def traverse(walk_dist, jump_dist):
    move_forward(walk_dist)
    jump()

traverse(2, 1)`,
    starterCode: `# Guide the hero using two parameters: walk distance and item gathering:
def walk_and_gather(walk_steps, turns):
    move_forward(walk_steps)
    collect()
    if turns > 0:
        turn_right()

walk_and_gather(3, 1)
`,
    solutionCode: `def walk_and_gather(walk_steps, turns):
    move_forward(walk_steps)
    collect()
    if turns > 0:
        turn_right()

walk_and_gather(3, 1)`,
    hints: [
      'walk_and_gather(3, 1) steps forward 3 tiles, gathers the chalice, and turns right.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Golden Chalice' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['wall', 'wall', 'wall', 'wall', 'wall'],
        ['stone', 'stone', 'stone', 'stone', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'chalice1', type: 'gem', x: 3, y: 1, name: 'Golden Chalice' },
      ],
    },
    xpReward: 330,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Golden Chalice',
      star2: 'Dual parameters in function',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w5_m4',
    worldId: 5,
    title: 'The Altar of Return Values',
    chapterName: 'Output Values',
    order: 4,
    conceptTitle: 'The return Statement',
    conceptSummary: 'Send calculated results back to the caller using return.',
    conceptDetails: 'When a function encounters `return value`, it immediately exits and hands `value` back. You can assign that returned value to a variable or pass it directly to another function.',
    exampleSnippet: `def calculate_steps(a, b):
    return a * b

dist = calculate_steps(2, 2) # 4
move_forward(dist)`,
    starterCode: `# Calculate distance dynamically using a return value:
def get_distance():
    base = 2
    multiplier = 2
    return base * multiplier

steps = get_distance()
move_forward(steps)
collect()
`,
    solutionCode: `def get_distance():
    base = 2
    multiplier = 2
    return base * multiplier

steps = get_distance()
move_forward(steps)
collect()`,
    hints: [
      'get_distance() calculates 2 * 2 and returns 4.',
      'move_forward(steps) steps 4 tiles to the sapphire orb.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve Sapphire Orb' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['path', 'path', 'path', 'path', 'path', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'orb1', type: 'crystal', x: 4, y: 1, name: 'Sapphire Orb' },
      ],
    },
    xpReward: 340,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Sapphire Orb',
      star2: 'Uses return statement',
      star3: 'Under 9 lines of code',
      maxLinesForStar2: 9,
    },
  },
  {
    id: 'w5_m5',
    worldId: 5,
    title: 'Default Incantations',
    chapterName: 'Default Parameter Values',
    order: 5,
    conceptTitle: 'Default Arguments',
    conceptSummary: 'Provide default values for parameters that callers can optionally omit.',
    conceptDetails: '`def move_stride(dist=3):` sets `dist` to 3 if no argument is supplied. Calling `move_stride()` uses 3, whereas `move_stride(5)` overrides it with 5.',
    exampleSnippet: `def step(distance=2):
    move_forward(distance)

step() # moves 2 steps by default`,
    starterCode: `# Define a function with a default stride of 3:
def advance_citadel(stride=3):
    move_forward(stride)
    collect()

# Call with default argument:
advance_citadel()
`,
    solutionCode: `def advance_citadel(stride=3):
    move_forward(stride)
    collect()

advance_citadel()`,
    hints: [
      'Calling advance_citadel() without arguments automatically uses stride=3.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Harvest Citadel Amber' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['wall', 'wall', 'wall', 'wall', 'wall'],
        ['stone', 'stone', 'stone', 'stone', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'amber1', type: 'gem', x: 3, y: 1, name: 'Citadel Amber' },
      ],
    },
    xpReward: 350,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Citadel Amber',
      star2: 'Function uses default parameter',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w5_m6',
    worldId: 5,
    title: 'Modular Castle Circuits',
    chapterName: 'Composing Functions',
    order: 6,
    conceptTitle: 'Helper Functions & Composition',
    conceptSummary: 'Build complex behaviors by combining small, well-defined helper functions.',
    conceptDetails: 'Decomposition breaks large problems into manageable pieces. Create small helpers like `turn_around()` or `gather_corner()`, then combine them inside a main loop.',
    exampleSnippet: `def turn_around():
    turn_right()
    turn_right()

turn_around()`,
    starterCode: `# Build modular helper functions:
def step_and_take():
    move_forward(2)
    collect()

def turn_corner():
    turn_right()

for i in range(2):
    step_and_take()
    turn_corner()
`,
    solutionCode: `def step_and_take():
    move_forward(2)
    collect()

def turn_corner():
    turn_right()

for i in range(2):
    step_and_take()
    turn_corner()`,
    hints: [
      'The loop calls step_and_take() and turn_corner() twice.',
      'This navigates the L-shaped hallway collecting both royal rubies.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect both Royal Rubies' },
    ],
    map: {
      width: 4,
      height: 4,
      tiles: [
        ['wall', 'wall', 'wall', 'wall'],
        ['path', 'path', 'path', 'wall'],
        ['wall', 'wall', 'path', 'wall'],
        ['wall', 'wall', 'path', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'ruby1', type: 'crystal', x: 2, y: 1, name: 'First Ruby' },
        { id: 'ruby2', type: 'crystal', x: 2, y: 3, name: 'Second Ruby' },
      ],
    },
    xpReward: 360,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect both rubies',
      star2: 'Combines two helper functions',
      star3: 'Under 12 lines of code',
      maxLinesForStar2: 12,
    },
  },
  {
    id: 'w5_m7',
    worldId: 5,
    title: 'The Veil of Scope: Local vs Global',
    chapterName: 'Variable Scope',
    order: 7,
    conceptTitle: 'Local and Global Scope',
    conceptSummary: 'Variables created inside a function are local and vanish when the function finishes.',
    conceptDetails: 'A variable created inside a function exists only within that function (local scope). Global variables exist outside and can be read anywhere. To modify a global variable inside a function, use `global var_name`.',
    exampleSnippet: `total = 0
def add_to_total(amount):
    global total
    total += amount

add_to_total(3)
move_forward(total)`,
    starterCode: `# Access global variable distance:
speed = 2

def travel():
    # Double speed for this trial
    return speed * 2

dist = travel()
move_forward(dist)
collect()
`,
    solutionCode: `speed = 2

def travel():
    return speed * 2

dist = travel()
move_forward(dist)
collect()`,
    hints: [
      'travel() reads the global speed (2) and multiplies it by 2 to return 4.',
      'move_forward(4) reaches the prism crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Prism Crystal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'prism1', type: 'crystal', x: 4, y: 1, name: 'Prism Crystal' },
      ],
    },
    xpReward: 370,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Prism Crystal',
      star2: 'Demonstrates global and local variables',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w5_m8',
    worldId: 5,
    title: 'The Inscription of Docstrings',
    chapterName: 'Documentation & Contracts',
    order: 8,
    conceptTitle: 'Docstrings and Clean Code',
    conceptSummary: 'Document functions with triple-quoted strings (\"\"\"docstring\"\"\") for professional code.',
    conceptDetails: 'Python PEP 257 standards recommend documenting function purpose, parameters, and return types right below the `def` line using triple quotes. Python tools and `help()` inspect these docstrings at runtime.',
    exampleSnippet: `def leap_chasm():
    """Leap forward across the mystic fissure."""
    jump()

leap_chasm()`,
    starterCode: `# Add a docstring to document your fortress navigation function:
def unlock_chamber():
    """Unlock and claim the Grand Chamber Relic."""
    move_forward(3)
    collect()

unlock_chamber()
`,
    solutionCode: `def unlock_chamber():
    """Unlock and claim the Grand Chamber Relic."""
    move_forward(3)
    collect()

unlock_chamber()`,
    hints: [
      'Triple quotes """ encapsulate multiline documentation.',
      'Call unlock_chamber() to claim the relic.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Claim Grand Chamber Relic' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['wall', 'wall', 'wall', 'wall', 'wall'],
        ['stone', 'stone', 'stone', 'stone', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'gcr1', type: 'gem', x: 3, y: 1, name: 'Chamber Relic' },
      ],
    },
    xpReward: 380,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Chamber Relic',
      star2: 'Function includes docstring',
      star3: 'Clean formatting',
    },
  },
  {
    id: 'w5_m9',
    worldId: 5,
    title: 'Whispers of Recursion',
    chapterName: 'Recursive Invocations',
    order: 9,
    conceptTitle: 'Recursion (Functions Calling Themselves)',
    conceptSummary: 'A recursive function solves problems by calling itself until hitting a base case.',
    conceptDetails: 'Recursion requires two elements: 1) A base case that stops further recursion, and 2) a recursive step that moves closer to the base case. Without a base case, recursion produces a RecursionError (stack overflow).',
    exampleSnippet: `def countdown_walk(n):
    if n <= 0:
        return
    move_forward()
    countdown_walk(n - 1)

countdown_walk(3)`,
    starterCode: `# Use recursion to walk step-by-step:
def recursive_march(remaining):
    if remaining <= 0:
        collect()
        return
    move_forward(1)
    recursive_march(remaining - 1)

recursive_march(3)
`,
    solutionCode: `def recursive_march(remaining):
    if remaining <= 0:
        collect()
        return
    move_forward(1)
    recursive_march(remaining - 1)

recursive_march(3)`,
    hints: [
      'The base case is when remaining <= 0.',
      'Each call moves forward 1 step and calls recursive_march(remaining - 1).',
      'After 3 calls, it reaches the relic and collects it.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve the Echo Crystal' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['wall', 'wall', 'wall', 'wall', 'wall'],
        ['stone', 'stone', 'stone', 'stone', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'echo1', type: 'crystal', x: 3, y: 1, name: 'Echo Crystal' },
      ],
    },
    xpReward: 390,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Echo Crystal',
      star2: 'Uses recursive function with base case',
      star3: 'Flawless execution',
    },
  },
  {
    id: 'w5_m10',
    worldId: 5,
    title: 'The High Enchanter Boss Trial',
    chapterName: 'World 5 Capstone Boss',
    order: 10,
    conceptTitle: 'Grand Enchanter Synthesis',
    conceptSummary: 'Prove mastery over functions, arguments, and return values to ascend the Citadel.',
    conceptDetails: 'The High Enchanter tests your architectural skills. Write a function with parameters to clear each corridor of the Royal Citadel, collecting all 3 Royal Seals and entering the Throne Portal!',
    exampleSnippet: `def clear_corridor(length):
    move_forward(length)
    collect()
    turn_right()`,
    starterCode: `# Boss Trial: Write a function to navigate each corridor of the throne room:
def traverse_wing(paces):
    move_forward(paces)
    collect()
    turn_right()

# Clear all 3 corridors:
for length in [2, 2, 2]:
    traverse_wing(length)

jump() # Leap into the Throne Portal!
`,
    solutionCode: `def traverse_wing(paces):
    move_forward(paces)
    collect()
    turn_right()

for length in [2, 2, 2]:
    traverse_wing(length)

jump()`,
    hints: [
      'traverse_wing moves the given paces, collects the seal, and turns right.',
      'A loop with [2, 2, 2] clears all three wings of the hall.',
      'A final jump() carries you into the throne portal at the center.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Royal Citadel Seals' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the Throne Room Portal' },
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
        { id: 'seal1', type: 'crystal', x: 2, y: 1, name: 'Sun Seal' },
        { id: 'seal2', type: 'crystal', x: 2, y: 3, name: 'Moon Seal' },
        { id: 'seal3', type: 'crystal', x: 0, y: 3, name: 'Star Seal' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 450,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all seals & enter portal',
      star2: 'Uses reusable function with parameter',
      star3: 'Completed in under 12 lines',
      maxLinesForStar2: 12,
    },
  },
];
