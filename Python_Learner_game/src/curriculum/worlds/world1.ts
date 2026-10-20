import { Mission } from '../../types/game';

export const WORLD_1_MISSIONS: Mission[] = [
  {
    id: 'w1_m1',
    worldId: 1,
    title: 'First Steps of the Scribe',
    chapterName: 'The Call to Code',
    order: 1,
    conceptTitle: 'Movement & Sequences',
    conceptSummary: 'Commands in Python execute from top to bottom, one line at a time.',
    conceptDetails: 'In Python Quest, you instruct your adventurer using command functions. Every command ends with parentheses `()`. To walk ahead, invoke `move_forward()`. Order matters: the computer executes each line sequentially.',
    exampleSnippet: `# Step forward twice
move_forward()
move_forward()`,
    starterCode: `# Guide your hero along the ancient stone path!
# Move forward 3 times to reach the portal.

move_forward()
`,
    solutionCode: `move_forward()
move_forward()
move_forward()`,
    hints: [
      'The portal is 3 steps ahead of you.',
      'Call move_forward() three times on separate lines.',
    ],
    goals: [
      { id: 'g1', type: 'reach_portal', description: 'Reach the ancient glowing portal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['grass', 'path', 'path', 'path', 'portal', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 1, y: 1 },
      playerDirection: 'right',
      entities: [],
      portalPosition: { x: 4, y: 1 },
    },
    xpReward: 100,
    maxStars: 3,
    starCriteria: {
      star1: 'Reach the portal',
      star2: 'Complete in 4 or fewer lines',
      star3: 'First-try execution without syntax error',
      maxLinesForStar2: 4,
    },
  },
  {
    id: 'w1_m2',
    worldId: 1,
    title: 'The Whispering Crystal',
    chapterName: 'Gathering Power',
    order: 2,
    conceptTitle: 'Collecting Items & Interaction',
    conceptSummary: 'Use collect() to gather gems, rune crystals, and quest artifacts.',
    conceptDetails: 'Crystals contain ancient computational ether. Walk onto the tile where the crystal rests and call `collect()` to store it in your ether pouch before proceeding to the portal.',
    exampleSnippet: `move_forward()
collect() # Collects item on your current tile`,
    starterCode: `# Step forward to the crystal, collect it, then step into the portal!
move_forward()
collect()
`,
    solutionCode: `move_forward()
move_forward()
collect()
move_forward()`,
    hints: [
      'The crystal is located at tile 2 (two steps ahead).',
      'Move forward twice, call collect(), then step forward once more to the portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the blue ether crystal' },
      { id: 'g2', type: 'reach_portal', description: 'Step through the portal' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'portal', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'c1', type: 'crystal', x: 2, y: 1, name: 'Ether Crystal' },
      ],
      portalPosition: { x: 3, y: 1 },
    },
    xpReward: 120,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect crystal and reach portal',
      star2: 'Use 5 or fewer lines',
      star3: 'Flawless run',
      maxLinesForStar2: 5,
    },
  },
  {
    id: 'w1_m3',
    worldId: 1,
    title: 'The Crossroads Turn',
    chapterName: 'Orientation & Turning',
    order: 3,
    conceptTitle: 'Turning Left & Right',
    conceptSummary: 'Control your facing direction with turn_left() and turn_right().',
    conceptDetails: 'Your adventurer moves in the direction they are currently facing. Use `turn_right()` to pivot 90 degrees clockwise, or `turn_left()` to pivot 90 degrees counter-clockwise before walking forward.',
    exampleSnippet: `move_forward()
turn_right()
move_forward()`,
    starterCode: `# Walk to the corner, turn right, and reach the portal!
move_forward()
move_forward()
# Which way should you turn?
`,
    solutionCode: `move_forward()
move_forward()
turn_right()
move_forward()
move_forward()`,
    hints: [
      'Walk forward 2 steps to the corner.',
      'Turn right to face downward, then move forward 2 steps to the portal.',
    ],
    goals: [
      { id: 'g1', type: 'reach_portal', description: 'Reach the portal at the end of the path' },
    ],
    map: {
      width: 5,
      height: 5,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'grass', 'grass'],
        ['grass', 'grass', 'path', 'grass', 'grass'],
        ['grass', 'grass', 'portal', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [],
      portalPosition: { x: 2, y: 3 },
    },
    xpReward: 140,
    maxStars: 3,
    starCriteria: {
      star1: 'Reach the portal',
      star2: 'Complete in 6 or fewer lines',
      star3: 'No collisions with trees',
      maxLinesForStar2: 6,
    },
  },
  {
    id: 'w1_m4',
    worldId: 1,
    title: 'The Rune of Variables',
    chapterName: 'Variables & Data',
    order: 4,
    conceptTitle: 'Variables and Assignment',
    conceptSummary: 'Variables store values using the assignment operator (=).',
    conceptDetails: 'In Python, a variable is like a named satchel that holds information. For example, `distance = 4` stores the number 4. You can pass a variable to `move_forward(distance)` to walk that many tiles at once!',
    exampleSnippet: `distance = 4
move_forward(distance)`,
    starterCode: `# Store the distance in a variable and move across the stone bridge!
distance = 4

# Pass distance to move_forward:
move_forward(distance)
collect()
`,
    solutionCode: `distance = 4
move_forward(distance)
collect()`,
    hints: [
      'The variable distance is already set to 4.',
      'Use move_forward(distance) and then collect() the gem!',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the golden sun gem' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['water', 'water', 'water', 'water', 'water', 'water'],
        ['bridge', 'bridge', 'bridge', 'bridge', 'bridge', 'bridge'],
        ['water', 'water', 'water', 'water', 'water', 'water'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'g1', type: 'gem', x: 4, y: 1, name: 'Sun Gem' },
      ],
      portalPosition: { x: 5, y: 1 },
    },
    xpReward: 150,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect the Sun Gem',
      star2: 'Use variable "distance"',
      star3: 'Efficient 3-line code',
      maxLinesForStar2: 4,
    },
  },
  {
    id: 'w1_m5',
    worldId: 1,
    title: 'The Speaking Scroll',
    chapterName: 'Output & Print',
    order: 5,
    conceptTitle: 'The print() Function & Strings',
    conceptSummary: 'Print messages and speak text aloud in the console with print() or say().',
    conceptDetails: 'Strings are sequences of characters surrounded by quotes `"Hello"` or `\'Hello\'`. The `print()` command sends text to the scroll console, while `say("text")` makes your hero speak out loud!',
    exampleSnippet: `print("Awaken, magic!")
say("I am ready.")`,
    starterCode: `# Speak the sacred password "Python" to unlock the mystic gate!
password = "Python"

# Call say() with the password:
say(password)
move_forward(3)
`,
    solutionCode: `password = "Python"
say(password)
move_forward(3)`,
    hints: [
      'say(password) announces the secret word to the ruins.',
      'Then move forward 3 paces into the gate.',
    ],
    goals: [
      { id: 'g1', type: 'reach_portal', description: 'Recite password and step into the gate' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['wall', 'wall', 'wall', 'wall', 'wall'],
        ['path', 'path', 'path', 'portal', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [],
      portalPosition: { x: 3, y: 1 },
    },
    xpReward: 160,
    maxStars: 3,
    starCriteria: {
      star1: 'Recite password and reach portal',
      star2: 'Use say() with variable',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w1_m6',
    worldId: 1,
    title: 'Arithmetic of the Ancients',
    chapterName: 'Operators & Math',
    order: 6,
    conceptTitle: 'Arithmetic Operators (+, -, *)',
    conceptSummary: 'Python evaluates math expressions: addition (+), subtraction (-), and multiplication (*).',
    conceptDetails: 'Compute tile distances dynamically. If a chasm requires 2 paces plus 3 paces, write `total_steps = 2 + 3` or `2 * 2`. Python computes the result instantly before passing it to movement.',
    exampleSnippet: `a = 3
b = 2
move_forward(a + b)`,
    starterCode: `# Calculate total steps to jump over the spike traps:
steps = 2 + 2
move_forward(steps)
collect()
`,
    solutionCode: `steps = 2 + 2
move_forward(steps)
collect()`,
    hints: [
      'The crystal is 4 tiles away.',
      '2 + 2 evaluates to 4.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the ancient rune crystal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'path', 'path', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'c1', type: 'crystal', x: 4, y: 1, name: 'Math Crystal' },
      ],
    },
    xpReward: 170,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect crystal',
      star2: 'Use an arithmetic expression (+ or *)',
      star3: 'Fast execution',
    },
  },
  {
    id: 'w1_m7',
    worldId: 1,
    title: 'The Chasm Leap',
    chapterName: 'Jumping & Obstacles',
    order: 7,
    conceptTitle: 'The jump() Command',
    conceptSummary: 'jump() leaps 2 tiles forward, skipping over rivers, traps, or water.',
    conceptDetails: 'Sometimes walking forward would plunge you into water or spikes. Use `jump()` to clear 2 tiles in a single bound in your current facing direction.',
    exampleSnippet: `move_forward()
jump() # Clears a 1-tile gap!
move_forward()`,
    starterCode: `# Move to the edge of the water stream, then leap across!
move_forward()
jump()
move_forward()
`,
    solutionCode: `move_forward()
jump()
move_forward()
collect()`,
    hints: [
      'Step forward to tile 1 (facing right).',
      'Jump over the water tile at x=2 onto tile x=3.',
      'Step forward to collect the gem at x=4.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Jump water and collect the moonstone' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['grass', 'grass', 'water', 'grass', 'grass', 'grass'],
        ['path', 'path', 'water', 'path', 'path', 'grass'],
        ['grass', 'grass', 'water', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'm1', type: 'gem', x: 4, y: 1, name: 'Moonstone' },
      ],
    },
    xpReward: 180,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect the moonstone',
      star2: 'Use jump() command',
      star3: 'No water drowning',
    },
  },
  {
    id: 'w1_m8',
    worldId: 1,
    title: 'Types of the Realm',
    chapterName: 'Data Types',
    order: 8,
    conceptTitle: 'Integers, Strings & Booleans',
    conceptSummary: 'Python recognizes different data types: int (whole numbers), str (text), and bool (True/False).',
    conceptDetails: 'Notice that `"5"` in quotes is text (str), whereas `5` without quotes is a number (int). `has_key = True` is a boolean. Combine them properly to solve environmental puzzles.',
    exampleSnippet: `steps = 3        # int
spell = "Aloha"  # str
ready = True     # bool`,
    starterCode: `# Set steps as an integer (not a string in quotes!)
steps = 3
move_forward(steps)
collect()
`,
    solutionCode: `steps = 3
move_forward(steps)
collect()`,
    hints: [
      'Make sure steps = 3 is an integer, so move_forward understands it.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the wisdom scroll' },
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
        { id: 's1', type: 'scroll', x: 3, y: 1, name: 'Scroll of Types' },
      ],
    },
    xpReward: 190,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect wisdom scroll',
      star2: 'Use int variable',
      star3: 'Complete without error',
    },
  },
  {
    id: 'w1_m9',
    worldId: 1,
    title: 'The Runic Key Gate',
    chapterName: 'Keys & Interaction',
    order: 9,
    conceptTitle: 'Item Interaction & Doors',
    conceptSummary: 'Collect keys and unlock gates with open_door() and interact().',
    conceptDetails: 'Locked gates bar passage through ancient dungeons. First collect the golden key from the altar, then approach the gate and call `open_door()`.',
    exampleSnippet: `collect() # Pick up key
move_forward()
open_door() # Unlocks gate ahead!`,
    starterCode: `# 1. Walk to the key and collect it
# 2. Turn right, face the gate, and call open_door()
# 3. Step through to the portal!

move_forward()
collect()
turn_right()
open_door()
move_forward()
`,
    solutionCode: `move_forward()
collect()
turn_right()
open_door()
move_forward()`,
    hints: [
      'Move forward to collect the key.',
      'Turn right to face the rune gate.',
      'Call open_door(), then walk into the exit portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Pick up the golden key' },
      { id: 'g2', type: 'reach_portal', description: 'Unlock gate and reach the portal' },
    ],
    map: {
      width: 4,
      height: 4,
      tiles: [
        ['stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'stone', 'stone'],
        ['stone', 'portal', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'k1', type: 'key', x: 1, y: 1, name: 'Golden Rune Key' },
        { id: 'door1', type: 'gate', x: 1, y: 2, name: 'Runic Gate', active: true },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 200,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect key & unlock gate',
      star2: '5 lines of code or fewer',
      star3: 'No bump into stone walls',
      maxLinesForStar2: 5,
    },
  },
  {
    id: 'w1_m10',
    worldId: 1,
    title: 'Trial of the Forest Guardian',
    chapterName: 'World 1 Boss Trial',
    order: 10,
    conceptTitle: 'World 1 Capstone Synthesis',
    conceptSummary: 'Synthesize variables, turns, collection, and leaping to triumph.',
    conceptDetails: 'The guardian forest shrine requires collecting three magical seeds scattered across stepping stones, jumping over rushing rapids, and unlocking the central gateway.',
    exampleSnippet: `# Combine movement, turns, collect, and jump
path_length = 2
move_forward(path_length)
collect()`,
    starterCode: `# Collect all 3 elemental seeds and reach the summit portal!
move_forward(2)
collect()
turn_right()
move_forward(2)
collect()
turn_right()
move_forward(2)
collect()
turn_right()
jump()
`,
    solutionCode: `move_forward(2)
collect()
turn_right()
move_forward(2)
collect()
turn_right()
move_forward(2)
collect()
turn_right()
jump()`,
    hints: [
      'Travel in a clockwise circuit around the shrine.',
      'Collect each seed at the corners, then jump up into the summit portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 elemental seeds' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the summit portal' },
    ],
    map: {
      width: 5,
      height: 5,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['portal', 'path', 'path', 'grass', 'grass'],
        ['path', 'water', 'path', 'grass', 'grass'],
        ['path', 'path', 'path', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 's1', type: 'flower', x: 2, y: 1, name: 'Sun Seed' },
        { id: 's2', type: 'flower', x: 2, y: 3, name: 'Rain Seed' },
        { id: 's3', type: 'flower', x: 0, y: 3, name: 'Earth Seed' },
      ],
      portalPosition: { x: 0, y: 1 },
    },
    xpReward: 300,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all seeds and reach portal',
      star2: 'Complete in 10 or fewer lines',
      star3: 'Boss trial cleared with zero errors',
      maxLinesForStar2: 10,
    },
  },
];
