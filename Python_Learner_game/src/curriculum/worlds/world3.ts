import { Mission } from '../../types/game';

export const WORLD_3_MISSIONS: Mission[] = [
  {
    id: 'w3_m1',
    worldId: 3,
    title: 'The Great March of for',
    chapterName: 'Repetition & Loops',
    order: 1,
    conceptTitle: 'The for Loop and range()',
    conceptSummary: 'Repeat actions multiple times without writing duplicate lines of code.',
    conceptDetails: 'Instead of writing `move_forward()` five times, write `for i in range(5):` followed by an indented `move_forward()`. The loop executes the indented code 5 times automatically!',
    exampleSnippet: `for i in range(5):
    move_forward()`,
    starterCode: `# Cross the 5 stepping stones using range(5):
for i in range(5):
    move_forward()

collect()
`,
    solutionCode: `for i in range(5):
    move_forward()
collect()`,
    hints: [
      'The loop for i in range(5): repeats move_forward() five times.',
      'Then collect() gathers the river pearl at tile 5.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the river pearl at the end' },
    ],
    map: {
      width: 7,
      height: 3,
      tiles: [
        ['water', 'water', 'water', 'water', 'water', 'water', 'water'],
        ['bridge', 'bridge', 'bridge', 'bridge', 'bridge', 'bridge', 'bridge'],
        ['water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'pearl1', type: 'crystal', x: 5, y: 1, name: 'River Pearl' },
      ],
    },
    xpReward: 260,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect river pearl',
      star2: 'Uses for loop with range',
      star3: 'Less than 5 lines',
      maxLinesForStar2: 4,
    },
  },
  {
    id: 'w3_m2',
    worldId: 3,
    title: 'Harvest of the Coin Trail',
    chapterName: 'Looping Collectibles',
    order: 2,
    conceptTitle: 'Looping with Actions Inside',
    conceptSummary: 'Execute multiple commands inside each iteration of a loop.',
    conceptDetails: 'You can put as many indented lines inside a for loop as you want! In each loop pass, the hero can both step forward AND collect a coin.',
    exampleSnippet: `for step in range(3):
    move_forward()
    collect()`,
    starterCode: `# There are 4 gold coins in a row.
# Use a for loop to move and collect each one!

for step in range(4):
    move_forward()
    collect()
`,
    solutionCode: `for step in range(4):
    move_forward()
    collect()`,
    hints: [
      'Indent both move_forward() and collect() under the for loop.',
      'range(4) will run 4 times, gathering all 4 coins!',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 4 gold coins' },
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
        { id: 'c1', type: 'coin', x: 1, y: 1, name: 'Coin 1' },
        { id: 'c2', type: 'coin', x: 2, y: 1, name: 'Coin 2' },
        { id: 'c3', type: 'coin', x: 3, y: 1, name: 'Coin 3' },
        { id: 'c4', type: 'coin', x: 4, y: 1, name: 'Coin 4' },
      ],
    },
    xpReward: 270,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all 4 coins',
      star2: 'Completed in 4 lines of code',
      star3: 'Single for loop used',
      maxLinesForStar2: 4,
    },
  },
  {
    id: 'w3_m3',
    worldId: 3,
    title: 'The Staircase of Spirals',
    chapterName: 'Pattern Loops',
    order: 3,
    conceptTitle: 'Staircase Patterns with Loops',
    conceptSummary: 'Combine directional turns inside a loop to navigate repeating staircases.',
    conceptDetails: 'Staircase terrain ascends in rhythmic steps: step forward, turn left, step forward, turn right. By enclosing this pattern in a `for` loop, you conquer mountains with minimal code!',
    exampleSnippet: `for step in range(3):
    move_forward()
    turn_left()
    move_forward()
    turn_right()`,
    starterCode: `# Ascend the 2 stair steps to reach the mountain portal!
for step in range(2):
    move_forward()
    turn_left()
    move_forward()
    turn_right()
`,
    solutionCode: `for step in range(2):
    move_forward()
    turn_left()
    move_forward()
    turn_right()`,
    hints: [
      'Each stair step is 1 move forward + turn left + 1 move forward + turn right.',
      'Repeating this 2 times delivers you directly to the summit portal.',
    ],
    goals: [
      { id: 'g1', type: 'reach_portal', description: 'Climb the spiral stairs to the portal' },
    ],
    map: {
      width: 4,
      height: 4,
      tiles: [
        ['grass', 'grass', 'portal', 'grass'],
        ['grass', 'path', 'path', 'grass'],
        ['path', 'path', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 2 },
      playerDirection: 'right',
      entities: [],
      portalPosition: { x: 2, y: 0 },
    },
    xpReward: 280,
    maxStars: 3,
    starCriteria: {
      star1: 'Reach the summit portal',
      star2: '6 lines of code or fewer',
      star3: 'Flawless stair ascent',
      maxLinesForStar2: 6,
    },
  },
  {
    id: 'w3_m4',
    worldId: 3,
    title: 'The While Sentinel',
    chapterName: 'Indefinite Looping',
    order: 4,
    conceptTitle: 'The while Loop',
    conceptSummary: 'while loops continue running as long as a boolean condition remains True.',
    conceptDetails: 'When you do not know in advance how many steps a path has, use `while condition:`. For example, `while see_ahead() != "wall":` keeps walking until an obstacle appears.',
    exampleSnippet: `while see_ahead() != "wall":
    move_forward()
collect()`,
    starterCode: `# Walk until you hit the stone wall, then collect the glowing urn!
while see_ahead() != "wall":
    move_forward()

collect()
`,
    solutionCode: `while see_ahead() != "wall":
    move_forward()
collect()`,
    hints: [
      'The while loop automatically steps until see_ahead() detects "wall".',
      'Make sure not to write an infinite loop! see_ahead() ensures safe stopping.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the glowing urn' },
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
        { id: 'urn1', type: 'gem', x: 4, y: 1, name: 'Glowing Urn' },
      ],
    },
    xpReward: 290,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect urn',
      star2: 'Uses while loop',
      star3: '4 lines or fewer',
      maxLinesForStar2: 4,
    },
  },
  {
    id: 'w3_m5',
    worldId: 3,
    title: 'The Stepping Stone Counter',
    chapterName: 'Loop Accumulators',
    order: 5,
    conceptTitle: 'Counters and Accumulators',
    conceptSummary: 'Track counts and totals across loop iterations using variable accumulation.',
    conceptDetails: 'An accumulator pattern uses a variable initialized before the loop (like `count = 0`), and increments it inside the loop (`count += 1`).',
    exampleSnippet: `steps_taken = 0
for i in range(4):
    move_forward()
    steps_taken += 1`,
    starterCode: `# Count your strides as you march toward the river jewel:
strides = 0
for i in range(4):
    move_forward()
    strides += 1

collect()
`,
    solutionCode: `strides = 0
for i in range(4):
    move_forward()
    strides += 1
collect()`,
    hints: [
      'strides += 1 increments strides on each step.',
      'After 4 steps, collect() grabs the jewel.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the River Jewel' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['water', 'water', 'water', 'water', 'water', 'water'],
        ['bridge', 'bridge', 'bridge', 'bridge', 'bridge', 'water'],
        ['water', 'water', 'water', 'water', 'water', 'water'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'jewel1', type: 'gem', x: 4, y: 1, name: 'River Jewel' },
      ],
    },
    xpReward: 300,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect River Jewel',
      star2: 'Uses counter accumulation (+=)',
      star3: 'Zero syntax errors',
    },
  },
  {
    id: 'w3_m6',
    worldId: 3,
    title: 'Breaking the Rapids: break',
    chapterName: 'Loop Control: break',
    order: 6,
    conceptTitle: 'The break Statement',
    conceptSummary: 'Exit a loop immediately when a certain condition is met using break.',
    conceptDetails: 'Sometimes you need to stop looping before all iterations finish. When `break` executes, Python immediately exits the loop and moves to the code below it.',
    exampleSnippet: `for i in range(10):
    if see_ahead() == "wall":
        break
    move_forward()`,
    starterCode: `# Stop moving when you reach the crystal altar!
for step in range(10):
    if see_ahead() == "crystal":
        move_forward()
        collect()
        break
    move_forward()
`,
    solutionCode: `for step in range(10):
    if see_ahead() == "crystal":
        move_forward()
        collect()
        break
    move_forward()`,
    hints: [
      'see_ahead() detects the crystal before moving onto it.',
      'When found, it moves onto it, collects, and breaks!',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the Altar Crystal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['water', 'water', 'water', 'water', 'water', 'water'],
        ['bridge', 'bridge', 'bridge', 'bridge', 'bridge', 'water'],
        ['water', 'water', 'water', 'water', 'water', 'water'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'altar_c', type: 'crystal', x: 3, y: 1, name: 'Altar Crystal' },
      ],
    },
    xpReward: 310,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Altar Crystal',
      star2: 'Uses break statement',
      star3: 'Under 8 lines',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w3_m7',
    worldId: 3,
    title: 'Skipping Whirlpools: continue',
    chapterName: 'Loop Control: continue',
    order: 7,
    conceptTitle: 'The continue Statement',
    conceptSummary: 'Skip the rest of the current loop iteration and jump to the next one.',
    conceptDetails: 'Unlike `break` which halts the entire loop, `continue` only skips the rest of the current iteration, proceeding directly to the next loop cycle.',
    exampleSnippet: `for i in range(5):
    if i == 2:
        continue # Skip iteration 2
    print(i)`,
    starterCode: `# Move across the trail and collect the end artifact:
for i in range(4):
    move_forward()

collect()
`,
    solutionCode: `for i in range(4):
    move_forward()
collect()`,
    hints: [
      'Walk 4 tiles across the stones to collect the Water Stone.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the Water Stone' },
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
        { id: 'water_st', type: 'crystal', x: 4, y: 1, name: 'Water Stone' },
      ],
    },
    xpReward: 320,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Water Stone',
      star2: 'Clean loop structure',
      star3: 'Under 5 lines',
      maxLinesForStar2: 4,
    },
  },
  {
    id: 'w3_m8',
    worldId: 3,
    title: 'Leaping Steps: range(start, stop, step)',
    chapterName: 'Custom Step Sequences',
    order: 8,
    conceptTitle: 'range() with 3 Arguments',
    conceptSummary: 'Specify start, stop, and step increments using range(start, stop, step).',
    conceptDetails: '`range(0, 6, 2)` produces `0, 2, 4` (jumping by 2 each time!). This is ideal for alternating tiles, leaps, and skipping hazard grids.',
    exampleSnippet: `for i in range(0, 6, 2):
    print(f"Index {i}")`,
    starterCode: `# Leap across the lily pads by steps of 2:
for i in range(2):
    jump()

collect()
`,
    solutionCode: `for i in range(2):
    jump()
collect()`,
    hints: [
      'Two consecutive jumps leap 2 tiles each, crossing from x=0 to x=2, then to x=4.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Lily Pad Sapphire' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['water', 'water', 'water', 'water', 'water', 'water'],
        ['bridge', 'water', 'bridge', 'water', 'bridge', 'water'],
        ['water', 'water', 'water', 'water', 'water', 'water'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'lily_gem', type: 'gem', x: 4, y: 1, name: 'Lily Pad Sapphire' },
      ],
    },
    xpReward: 330,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect sapphire safely',
      star2: 'Uses loop with jump',
      star3: 'No falling into water',
    },
  },
  {
    id: 'w3_m9',
    worldId: 3,
    title: 'Nested Courtyards: Loop in Loop',
    chapterName: 'Nested Loops',
    order: 9,
    conceptTitle: 'Nested Loops',
    conceptSummary: 'An inner loop executes completely for every single iteration of the outer loop.',
    conceptDetails: 'Nested loops are how 2D game grids are traversed. An outer loop iterates through rows, while an inner loop iterates through columns.',
    exampleSnippet: `for row in range(2):
    for col in range(2):
        move_forward()`,
    starterCode: `# Patrol the 2x2 courtyard using nested loops:
for row in range(2):
    for step in range(2):
        move_forward()
    turn_right()

collect()
`,
    solutionCode: `for row in range(2):
    for step in range(2):
        move_forward()
    turn_right()
collect()`,
    hints: [
      'The inner loop moves forward 2 paces.',
      'Then turn_right() pivots before the next sweep.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect the Courtyard Emblem' },
    ],
    map: {
      width: 4,
      height: 4,
      tiles: [
        ['grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'grass'],
        ['grass', 'grass', 'path', 'grass'],
        ['grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'court_emblem', type: 'crystal', x: 2, y: 2, name: 'Courtyard Emblem' },
      ],
    },
    xpReward: 340,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Courtyard Emblem',
      star2: 'Uses nested for loops',
      star3: 'Proper nested indentation',
    },
  },
  {
    id: 'w3_m10',
    worldId: 3,
    title: 'Trial of the River Leviathan',
    chapterName: 'World 3 Boss Trial',
    order: 10,
    conceptTitle: 'World 3 Capstone: The Loop Cascade',
    conceptSummary: 'Combine loops, turns, and collections to conquer the swirling whirlpool river.',
    conceptDetails: 'Navigate around the Great Leviathan whirlpool in a 4-sided circuit. A single `for side in range(4):` loop can step forward 2 paces, collect an ancient relic, and turn right!',
    exampleSnippet: `for side in range(4):
    move_forward(2)
    collect()
    turn_right()`,
    starterCode: `# Complete the full 4-sided river circuit:
for side in range(4):
    move_forward(2)
    collect()
    turn_right()

jump()
`,
    solutionCode: `for side in range(4):
    move_forward(2)
    collect()
    turn_right()
jump()`,
    hints: [
      'The loop circles all 4 sides of the whirlpool.',
      'At each corner it gathers a relic and turns right.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Gather all 4 Leviathan Pearls' },
    ],
    map: {
      width: 5,
      height: 5,
      tiles: [
        ['grass', 'grass', 'grass', 'grass', 'grass'],
        ['path', 'path', 'path', 'grass', 'grass'],
        ['path', 'water', 'path', 'grass', 'grass'],
        ['path', 'path', 'path', 'grass', 'grass'],
        ['grass', 'grass', 'grass', 'grass', 'grass'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'p1', type: 'coin', x: 2, y: 1, name: 'North Pearl' },
        { id: 'p2', type: 'coin', x: 2, y: 3, name: 'East Pearl' },
        { id: 'p3', type: 'coin', x: 0, y: 3, name: 'South Pearl' },
        { id: 'p4', type: 'coin', x: 0, y: 1, name: 'West Pearl' },
      ],
    },
    xpReward: 400,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all 4 Leviathan Pearls',
      star2: 'Uses single 4-iteration for loop',
      star3: 'Boss trial cleared with zero errors',
      maxLinesForStar2: 7,
    },
  },
];
