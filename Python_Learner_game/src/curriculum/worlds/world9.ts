import { Mission } from '../../types/game';

export const WORLD_9_MISSIONS: Mission[] = [
  {
    id: 'w9_m1',
    worldId: 9,
    title: 'The Alchemist Import: math',
    chapterName: 'Standard Modules',
    order: 1,
    conceptTitle: 'Importing Python Modules',
    conceptSummary: 'Extend Python with standard library modules using the import keyword.',
    conceptDetails: 'The `import` statement provides access to modules like `math` and `random`. `import math` allows calling `math.sqrt(16)` to calculate square roots directly.',
    exampleSnippet: `import math
steps = int(math.sqrt(16)) # 4
move_forward(steps)`,
    starterCode: `# Calculate distance using Python arithmetic / math operations:
steps = int(16 ** 0.5) # Equivalent to math.sqrt(16)
move_forward(steps)
collect()
`,
    solutionCode: `steps = int(16 ** 0.5)
move_forward(steps)
collect()`,
    hints: [
      '16 ** 0.5 computes 4.0, which int() converts to 4 steps.',
      'move_forward(4) carries you across the frozen pass to the Frost Diamond.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Frost Peak Diamond' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['ice', 'ice', 'ice', 'ice', 'ice', 'ice'],
        ['ice', 'ice', 'ice', 'ice', 'ice', 'ice'],
        ['ice', 'ice', 'ice', 'ice', 'ice', 'ice'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'ice1', type: 'crystal', x: 4, y: 1, name: 'Frost Peak Diamond' },
      ],
    },
    xpReward: 380,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Frost Diamond',
      star2: 'Calculates distance mathematically',
      star3: 'Under 5 lines of code',
      maxLinesForStar2: 5,
    },
  },
  {
    id: 'w9_m2',
    worldId: 9,
    title: 'Rounding the Ice Floes: floor & ceil',
    chapterName: 'Mathematical Functions',
    order: 2,
    conceptTitle: 'Rounding with floor and ceil',
    conceptSummary: 'math.floor rounds down to the nearest integer; math.ceil rounds up.',
    conceptDetails: 'Floating-point measurements must be converted to whole grid tiles. `math.floor(3.8)` gives 3, while `math.ceil(3.2)` gives 4.',
    exampleSnippet: `import math
dist = math.floor(3.9) # 3
move_forward(dist)`,
    starterCode: `# Calculate whole tile steps from fractional sensor readings:
sensor_val = 3.8
# Use integer floor conversion:
paces = int(sensor_val // 1)

move_forward(paces)
collect()
`,
    solutionCode: `sensor_val = 3.8
paces = int(sensor_val // 1)
move_forward(paces)
collect()`,
    hints: [
      '3.8 // 1 evaluates to 3.0, converted to 3 by int().',
      'Move forward 3 paces onto the Glacier Sapphire.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Glacier Sapphire' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'ice', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'sapphire1', type: 'gem', x: 3, y: 1, name: 'Glacier Sapphire' },
      ],
    },
    xpReward: 390,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Glacier Sapphire',
      star2: 'Performs integer floor conversion',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w9_m3',
    worldId: 9,
    title: 'The Shifting Snows: random',
    chapterName: 'Randomness & Probability',
    order: 3,
    conceptTitle: 'The random Module',
    conceptSummary: 'Generate pseudorandom numbers or select random elements from sequences.',
    conceptDetails: 'The `random` module provides functions like `random.choice(items)` to pick random options, or `random.randint(min, max)` to generate integers within a range.',
    exampleSnippet: `import random
options = [2, 3]
step = random.choice(options)`,
    starterCode: `# Pick the safe path from survey possibilities:
survey_choices = [3]
step_dist = survey_choices[0]

move_forward(step_dist)
collect()
`,
    solutionCode: `survey_choices = [3]
step_dist = survey_choices[0]
move_forward(step_dist)
collect()`,
    hints: [
      'Selecting index 0 yields 3 paces.',
      'move_forward(3) safely crosses the crevasse.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Snow Pearl' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'ice', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'pearl1', type: 'crystal', x: 3, y: 1, name: 'Snow Pearl' },
      ],
    },
    xpReward: 400,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Snow Pearl',
      star2: 'Extracts value from choice collection',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w9_m4',
    worldId: 9,
    title: 'Selective Invocations: from ... import',
    chapterName: 'Selective Imports',
    order: 4,
    conceptTitle: 'from module import name',
    conceptSummary: 'Import specific functions directly into your namespace without module prefixes.',
    conceptDetails: 'Writing `from math import sqrt` allows calling `sqrt(9)` directly instead of having to write `math.sqrt(9)`. This keeps math formulas clean and readable.',
    exampleSnippet: `from math import sqrt
paces = int(sqrt(9)) # 3
move_forward(paces)`,
    starterCode: `# Compute distance with power exponentiation:
distance = int(9 ** 0.5) # Equivalent to sqrt(9)

move_forward(distance)
collect()
`,
    solutionCode: `distance = int(9 ** 0.5)
move_forward(distance)
collect()`,
    hints: [
      '9 ** 0.5 is 3.0, converted to 3 by int().',
      'Move forward 3 paces to collect the Blizzard Ruby.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Blizzard Ruby' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'ice', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'ruby1', type: 'gem', x: 3, y: 1, name: 'Blizzard Ruby' },
      ],
    },
    xpReward: 410,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Blizzard Ruby',
      star2: 'Selective import pattern',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w9_m5',
    worldId: 9,
    title: 'The Alias of Frost: import ... as',
    chapterName: 'Module Aliases',
    order: 5,
    conceptTitle: 'Module Aliasing with as',
    conceptSummary: 'Rename imported modules with concise aliases for convenience.',
    conceptDetails: 'When a module name is long or used frequently, alias it: `import math as m`. In data science, `import numpy as np` and `import pandas as pd` are universal standards.',
    exampleSnippet: `import math as m
dist = m.gcd(12, 8) # 4
move_forward(dist)`,
    starterCode: `# Calculate greatest common divisor:
# gcd(8, 4) is 4
paces = 4

move_forward(paces)
collect()
`,
    solutionCode: `paces = 4
move_forward(paces)
collect()`,
    hints: [
      'The greatest common factor of 8 and 4 is 4.',
      'move_forward(4) carries you across the frozen lake to the Frost Prism.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Frost Prism' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'ice', 'ice', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'fp1', type: 'crystal', x: 4, y: 1, name: 'Frost Prism' },
      ],
    },
    xpReward: 420,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Frost Prism',
      star2: 'Demonstrates module aliasing',
      star3: 'Under 5 lines of code',
      maxLinesForStar2: 5,
    },
  },
  {
    id: 'w9_m6',
    worldId: 9,
    title: 'Chronicles of Time',
    chapterName: 'Time & Intervals',
    order: 6,
    conceptTitle: 'The time Module & Chronometry',
    conceptSummary: 'Measure elapsed duration and calculate interval timers.',
    conceptDetails: 'The `time` module measures program speed with `time.time()` and pauses execution with `time.sleep()`. In algorithms, profiling execution timestamps reveals performance bottlenecks.',
    exampleSnippet: `intervals = [1, 1, 1]
total = sum(intervals)
move_forward(total)`,
    starterCode: `# Sum interval delays to determine total travel distance:
delays = [1, 2]
total_distance = sum(delays)

move_forward(total_distance)
collect()
`,
    solutionCode: `delays = [1, 2]
total_distance = sum(delays)
move_forward(total_distance)
collect()`,
    hints: [
      'sum(delays) computes 1 + 2 = 3.',
      'move_forward(3) reaches the Chrono Amber.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Chrono Amber' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'ice', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'amber1', type: 'gem', x: 3, y: 1, name: 'Chrono Amber' },
      ],
    },
    xpReward: 430,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Chrono Amber',
      star2: 'Uses sum() aggregation',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w9_m7',
    worldId: 9,
    title: 'The Frost Treasury: collections',
    chapterName: 'Specialized Collections',
    order: 7,
    conceptTitle: 'Standard Containers & Dictionaries',
    conceptSummary: 'Harness high-performance built-in container types like Counter and defaultdict.',
    conceptDetails: 'Python collections provide specialized data structures: `Counter` tallies elements automatically, `deque` offers double-ended queues, and `defaultdict` simplifies grouped lookups.',
    exampleSnippet: `gems = ["ice", "ice", "ice", "ruby"]
count_ice = gems.count("ice") # 3
move_forward(count_ice)`,
    starterCode: `# Count matching gem frequencies to determine steps:
survey = ["frost", "frost", "frost", "rock"]
frost_count = survey.count("frost")

move_forward(frost_count)
collect()
`,
    solutionCode: `survey = ["frost", "frost", "frost", "rock"]
frost_count = survey.count("frost")
move_forward(frost_count)
collect()`,
    hints: [
      'survey.count("frost") returns 3.',
      'move_forward(3) collects the Glacial Star.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Glacial Star' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'ice', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'star1', type: 'crystal', x: 3, y: 1, name: 'Glacial Star' },
      ],
    },
    xpReward: 440,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Glacial Star',
      star2: 'Uses container frequency counting',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w9_m8',
    worldId: 9,
    title: 'The Frost Summit Boss Trial',
    chapterName: 'World 9 Capstone Boss',
    order: 8,
    conceptTitle: 'Module Mountain Summit Capstone',
    conceptSummary: 'Synthesize standard module operations to claim the 3 Peak Crystals and ascend the Frost Portal.',
    conceptDetails: 'The Blizzard Sphinx tests your standard library fluency. Write a loop utilizing math formulas and collection operations to gather all 3 Frost Summit Runes and enter the summit portal!',
    exampleSnippet: `for i in range(3):
    step = int(4 ** 0.5) # 2
    move_forward(step)
    collect()
    turn_right()`,
    starterCode: `# Boss Trial: Calculate stride using math exponentiation:
stride = int(4 ** 0.5) # 2 steps

for pass_idx in range(3):
    move_forward(stride)
    collect()
    turn_right()

jump() # Ascend into the Frost Peak Portal!
`,
    solutionCode: `stride = int(4 ** 0.5)

for pass_idx in range(3):
    move_forward(stride)
    collect()
    turn_right()

jump()`,
    hints: [
      'stride is calculated as 2 paces.',
      'The loop clears all 3 summit corners collecting the runes.',
      'jump() leaps over the crevasse into the center portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Frost Summit Runes' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the Frost Summit Portal' },
    ],
    map: {
      width: 5,
      height: 5,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'stone', 'stone'],
        ['ice', 'water', 'ice', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'fs1', type: 'crystal', x: 2, y: 1, name: 'North Frost Rune' },
        { id: 'fs2', type: 'crystal', x: 2, y: 3, name: 'East Frost Rune' },
        { id: 'fs3', type: 'crystal', x: 0, y: 3, name: 'South Frost Rune' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 510,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all runes & enter portal',
      star2: 'Calculates stride with math formulas',
      star3: 'Boss trial cleared with zero errors',
      maxLinesForStar2: 12,
    },
  },
  {
    id: 'w9_m9',
    worldId: 9,
    title: 'The Time & Datetime Dial',
    chapterName: 'Time & Chronometry',
    order: 9,
    conceptTitle: 'Importing datetime & timedelta',
    conceptSummary: 'Measure elapsed days, hours, and timestamps with the datetime standard module.',
    conceptDetails: 'The `datetime` module handles calendar arithmetic. Calculating date differences returns `timedelta` objects with `.days` and `.seconds` properties.',
    exampleSnippet: `days_passed = 3
move_forward(days_passed)`,
    starterCode: `# Calculate days elapsed between expedition milestones:
day_start = 1
day_end = 5
duration_days = day_end - day_start # 4 days

move_forward(duration_days)
collect()
`,
    solutionCode: `day_start = 1
day_end = 5
duration_days = day_end - day_start

move_forward(duration_days)
collect()`,
    hints: [
      '5 - 1 = 4 days duration.',
      'move_forward(4) collects the Chronometer Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Chronometer Crystal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'ice', 'ice', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'cmc', type: 'crystal', x: 4, y: 1, name: 'Chronometer Crystal' },
      ],
    },
    xpReward: 520,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Chronometer Crystal',
      star2: 'Calculates time differences',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w9_m10',
    worldId: 9,
    title: 'The Frost Summit Grand Boss Trial',
    chapterName: 'World 9 Capstone Boss',
    order: 10,
    conceptTitle: 'Standard Library Mastery',
    conceptSummary: 'Synthesize standard module methods into a single climbing traversal loop.',
    conceptDetails: 'Ascend to the frozen crown of Mount Frostfänge. Traverse all 3 summit pinnacles using modular step counts and leap across the icy chasm into the Summit Portal!',
    exampleSnippet: `for summit in [2, 2, 2]:
    move_forward(summit)
    collect()
    turn_right()
jump()`,
    starterCode: `# Boss Trial: Ascend all 3 frozen mountain pinnacles:
pinnacle_paces = [2, 2, 2]

for paces in pinnacle_paces:
    move_forward(paces)
    collect()
    turn_right()

jump() # Leap into the Frozen Crown Portal!
`,
    solutionCode: `pinnacle_paces = [2, 2, 2]

for paces in pinnacle_paces:
    move_forward(paces)
    collect()
    turn_right()

jump()`,
    hints: [
      'The loop clears all 3 summit spires.',
      'Collect each peak relic and turn right.',
      'jump() leaps over the crevasse into the portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Peak Relics' },
      { id: 'g2', type: 'reach_portal', description: 'Enter Frozen Crown Portal' },
    ],
    map: {
      width: 5,
      height: 5,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'stone', 'stone'],
        ['ice', 'water', 'ice', 'stone', 'stone'],
        ['ice', 'ice', 'ice', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'pr_n', type: 'crystal', x: 2, y: 1, name: 'North Peak Relic' },
        { id: 'pr_e', type: 'crystal', x: 2, y: 3, name: 'East Peak Relic' },
        { id: 'pr_s', type: 'crystal', x: 0, y: 3, name: 'South Peak Relic' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 540,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all relics & enter portal',
      star2: 'Executes summit stride loop',
      star3: 'Boss trial cleared with zero errors',
      maxLinesForStar2: 10,
    },
  },
];
