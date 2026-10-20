import { Mission } from '../../types/game';

export const WORLD_10_MISSIONS: Mission[] = [
  {
    id: 'w10_m1',
    worldId: 10,
    title: 'The Linear Search Trial',
    chapterName: 'Search Algorithms',
    order: 1,
    conceptTitle: 'Linear Search & Inspection',
    conceptSummary: 'Inspect each element in order until you locate the target value.',
    conceptDetails: 'Linear search has O(N) time complexity. Iterate through the array with a loop; as soon as the target element is encountered, compute its index and break immediately.',
    exampleSnippet: `items = ["rock", "torch", "gem", "stick"]
for i, item in enumerate(items):
    if item == "gem":
        move_forward(i)
        collect()
        break`,
    starterCode: `# Find the index of the arena trophy and move directly to it:
chests = ["empty", "empty", "trophy", "empty"]

for index in range(len(chests)):
    if chests[index] == "trophy":
        move_forward(index)
        collect()
        break
`,
    solutionCode: `chests = ["empty", "empty", "trophy", "empty"]

for index in range(len(chests)):
    if chests[index] == "trophy":
        move_forward(index)
        collect()
        break`,
    hints: [
      'The loop checks chests[index] == "trophy".',
      'When matched at index 2, move_forward(2) carries you to the trophy.',
      'break terminates the loop immediately.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Arena Trophy' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'trophy1', type: 'gem', x: 2, y: 1, name: 'Arena Trophy' },
      ],
    },
    xpReward: 400,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Arena Trophy',
      star2: 'Uses search algorithm with break',
      star3: 'Under 9 lines of code',
      maxLinesForStar2: 9,
    },
  },
  {
    id: 'w10_m2',
    worldId: 10,
    title: 'Seeking the Zenith: Find Maximum',
    chapterName: 'Extremum Search',
    order: 2,
    conceptTitle: 'Finding Maximum Value',
    conceptSummary: 'Track the largest value seen so far while iterating through a list.',
    conceptDetails: 'Initialize `max_val = items[0]`. Compare each subsequent item; if greater, update `max_val`. This simple pattern is foundational to greedy algorithms.',
    exampleSnippet: `values = [2, 5, 3]
best = max(values)
move_forward(best)`,
    starterCode: `# Identify maximum power conduit distance:
conduit_lengths = [1, 4, 2]
max_distance = conduit_lengths[0]

for length in conduit_lengths:
    if length > max_distance:
        max_distance = length

move_forward(max_distance)
collect()
`,
    solutionCode: `conduit_lengths = [1, 4, 2]
max_distance = conduit_lengths[0]

for length in conduit_lengths:
    if length > max_distance:
        max_distance = length

move_forward(max_distance)
collect()`,
    hints: [
      'The loop finds that 4 is the largest conduit length.',
      'move_forward(4) carries you across the arena to the Zenith Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Zenith Crystal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'zc1', type: 'crystal', x: 4, y: 1, name: 'Zenith Crystal' },
      ],
    },
    xpReward: 410,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Zenith Crystal',
      star2: 'Computes maximum iteratively',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w10_m3',
    worldId: 10,
    title: 'The Binary Bifurcation: O(log N)',
    chapterName: 'Binary Search',
    order: 3,
    conceptTitle: 'Binary Search Logic',
    conceptSummary: 'Halve the search space repeatedly on sorted data for logarithmic speed.',
    conceptDetails: 'On sorted arrays, binary search checks the midpoint: `mid = (low + high) // 2`. If target is smaller, search left; if larger, search right. It finds targets in O(log N) time.',
    exampleSnippet: `low = 0
high = 6
mid = (low + high) // 2 # 3
move_forward(mid)`,
    starterCode: `# Calculate target midpoint of sorted array [1, 2, 3, 4, 5, 6, 7]:
low = 0
high = 6
mid_index = (low + high) // 2

move_forward(mid_index)
collect()
`,
    solutionCode: `low = 0
high = 6
mid_index = (low + high) // 2

move_forward(mid_index)
collect()`,
    hints: [
      '(0 + 6) // 2 evaluates to 3.',
      'move_forward(3) navigates directly to the Logarithmic Rune.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Logarithmic Rune' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'lr1', type: 'crystal', x: 3, y: 1, name: 'Logarithmic Rune' },
      ],
    },
    xpReward: 420,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Logarithmic Rune',
      star2: 'Binary search midpoint calculation',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w10_m4',
    worldId: 10,
    title: 'The Swapping Stones: Bubble Logic',
    chapterName: 'Sorting Algorithms',
    order: 4,
    conceptTitle: 'Element Swapping and Sorting',
    conceptSummary: 'Swap adjacent out-of-order elements using Python tuple unpacking: a, b = b, a.',
    conceptDetails: 'In Python, swap elements without a temporary variable using `items[i], items[j] = items[j], items[i]`. Bubble sort repeatedly compares and swaps adjacent items until sorted.',
    exampleSnippet: `vals = [5, 2]
if vals[0] > vals[1]:
    vals[0], vals[1] = vals[1], vals[0]
move_forward(vals[0])`,
    starterCode: `# Sort a 2-element tuple to find the smaller step distance:
steps = [4, 3]
if steps[0] > steps[1]:
    steps[0], steps[1] = steps[1], steps[0]

# steps is now [3, 4]
move_forward(steps[0])
collect()
`,
    solutionCode: `steps = [4, 3]
if steps[0] > steps[1]:
    steps[0], steps[1] = steps[1], steps[0]

move_forward(steps[0])
collect()`,
    hints: [
      'The swap changes [4, 3] into [3, 4].',
      'steps[0] is 3. Moving 3 spaces reaches the Sorting Amber.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Sorting Amber' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'sa1', type: 'gem', x: 3, y: 1, name: 'Sorting Amber' },
      ],
    },
    xpReward: 430,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Sorting Amber',
      star2: 'Uses Python tuple swap syntax',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w10_m5',
    worldId: 10,
    title: 'The LIFO Pillar: Stacks',
    chapterName: 'Stack Data Structure',
    order: 5,
    conceptTitle: 'Stacks (Last-In, First-Out)',
    conceptSummary: 'A stack pushes items onto the top and pops the most recent item off first.',
    conceptDetails: 'In Python, a standard list acts as a stack. Use `stack.append(x)` to push and `stack.pop()` to remove and return the top item in O(1) time.',
    exampleSnippet: `stack = []
stack.append(1)
stack.append(3)
step = stack.pop() # 3
move_forward(step)`,
    starterCode: `# Use stack push and pop operations:
stack = []
stack.append(1)
stack.append(99) # Mistake pushed
stack.pop()      # Mistake removed!
stack.append(3)

dist = stack.pop()
move_forward(dist)
collect()
`,
    solutionCode: `stack = []
stack.append(1)
stack.append(99)
stack.pop()
stack.append(3)

dist = stack.pop()
move_forward(dist)
collect()`,
    hints: [
      'Popping 99 leaves [1]. Appending 3 and popping gives 3.',
      'move_forward(3) navigates onto the Stack Chalice.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Stack Chalice' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'sc1', type: 'gem', x: 3, y: 1, name: 'Stack Chalice' },
      ],
    },
    xpReward: 440,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Stack Chalice',
      star2: 'Uses append() and pop() stack operations',
      star3: 'Under 11 lines of code',
      maxLinesForStar2: 11,
    },
  },
  {
    id: 'w10_m6',
    worldId: 10,
    title: 'The FIFO Concourse: Queues',
    chapterName: 'Queue Data Structure',
    order: 6,
    conceptTitle: 'Queues (First-In, First-Out)',
    conceptSummary: 'A queue processes elements in arrival order: first in, first out.',
    conceptDetails: 'In a queue, elements enter at the rear and exit from the front (`queue.pop(0)`). Queues are fundamental to Breadth-First Search (BFS) and event processors.',
    exampleSnippet: `queue = [2, 1]
first = queue.pop(0) # 2
move_forward(first)`,
    starterCode: `# Process steps in first-in first-out order:
queue = [2, 2]
leg1 = queue.pop(0)
leg2 = queue.pop(0)

move_forward(leg1 + leg2)
collect()
`,
    solutionCode: `queue = [2, 2]
leg1 = queue.pop(0)
leg2 = queue.pop(0)

move_forward(leg1 + leg2)
collect()`,
    hints: [
      'Both legs are 2 paces. Total distance is 4 paces.',
      'move_forward(4) carries you to the Queue Crest.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Queue Crest' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'qc1', type: 'gem', x: 4, y: 1, name: 'Queue Crest' },
      ],
    },
    xpReward: 450,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Queue Crest',
      star2: 'Demonstrates FIFO queue extraction',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w10_m7',
    worldId: 10,
    title: 'The O(1) Glyph: Hash Lookup',
    chapterName: 'Hash Maps & Complexity',
    order: 7,
    conceptTitle: 'Hash Map Lookup Complexity',
    conceptSummary: 'Dictionaries provide instant O(1) constant-time key lookups.',
    conceptDetails: 'Searching a list takes O(N) because every item must be checked. A Python dict hashes keys to memory addresses, finding values in O(1) average time regardless of table size.',
    exampleSnippet: `lookup = {"gate": 3, "trap": 99}
move_forward(lookup["gate"])`,
    starterCode: `# Access O(1) hash map table:
rune_table = {
    "speed": 3,
    "hazard": 999
}

paces = rune_table["speed"]
move_forward(paces)
collect()
`,
    solutionCode: `rune_table = {
    "speed": 3,
    "hazard": 999
}

paces = rune_table["speed"]
move_forward(paces)
collect()`,
    hints: [
      'rune_table["speed"] retrieves 3 in O(1) time.',
      'move_forward(3) collects the Constant Time Rune.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Constant Time Rune' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'ctr1', type: 'crystal', x: 3, y: 1, name: 'Constant Time Rune' },
      ],
    },
    xpReward: 460,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Constant Time Rune',
      star2: 'O(1) dictionary key indexing',
      star3: 'Under 9 lines of code',
      maxLinesForStar2: 9,
    },
  },
  {
    id: 'w10_m8',
    worldId: 10,
    title: 'The Converging Sentinels: Two Pointers',
    chapterName: 'Two-Pointer Technique',
    order: 8,
    conceptTitle: 'The Two-Pointer Pattern',
    conceptSummary: 'Traverse an array using two pointers advancing from opposite ends.',
    conceptDetails: 'Left starts at index 0 and moves right; right starts at `len - 1` and moves left. This pattern checks palindromes and pair sums in linear O(N) time with O(1) space.',
    exampleSnippet: `left = 0
right = 4
dist = right - left # 4
move_forward(dist)`,
    starterCode: `# Calculate distance between left and right arena boundaries:
left_ptr = 0
right_ptr = 4
distance = right_ptr - left_ptr

move_forward(distance)
collect()
`,
    solutionCode: `left_ptr = 0
right_ptr = 4
distance = right_ptr - left_ptr

move_forward(distance)
collect()`,
    hints: [
      '4 - 0 = 4 tiles.',
      'move_forward(4) carries you to the Sentinel Gem.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Sentinel Gem' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'sg1', type: 'gem', x: 4, y: 1, name: 'Sentinel Gem' },
      ],
    },
    xpReward: 470,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Sentinel Gem',
      star2: 'Two-pointer offset calculation',
      star3: 'Flawless run',
    },
  },
  {
    id: 'w10_m9',
    worldId: 10,
    title: 'Grid Matrix Coordinates: 2D Arrays',
    chapterName: '2D Arrays & Matrices',
    order: 9,
    conceptTitle: 'Nested Grid Coordinates',
    conceptSummary: 'Navigate 2D row/column matrices: grid[row][col].',
    conceptDetails: 'Game maps are 2D arrays (lists of lists). `matrix[y][x]` references the cell at row y and column x. Navigating matrices requires combining row and column movements.',
    exampleSnippet: `grid = [
    [0, 0, 0],
    [0, 0, 3]
]
target = grid[1][2] # 3
move_forward(target)`,
    starterCode: `# Extract target coordinate from 2D arena matrix:
arena_grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 3]
]

paces = arena_grid[1][3]
move_forward(paces)
collect()
`,
    solutionCode: `arena_grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 3]
]

paces = arena_grid[1][3]
move_forward(paces)
collect()`,
    hints: [
      'arena_grid[1][3] extracts 3.',
      'move_forward(3) collects the Matrix Core.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Matrix Core' },
    ],
    map: {
      width: 5,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'mc1', type: 'crystal', x: 3, y: 1, name: 'Matrix Core' },
      ],
    },
    xpReward: 480,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Matrix Core',
      star2: '2D matrix coordinate lookup',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w10_m10',
    worldId: 10,
    title: 'The Colosseum Champion Boss Trial',
    chapterName: 'World 10 Capstone Boss',
    order: 10,
    conceptTitle: 'Algorithm Arena Colosseum Capstone',
    conceptSummary: 'Defeat the Arena Champion by executing an optimal algorithmic circuit.',
    conceptDetails: 'You face the Colosseum Champion in the central arena. Use an algorithmic loop to gather all 3 Champion Medallions from the colosseum perimeter and step into the Champion Portal!',
    exampleSnippet: `for _ in range(3):
    move_forward(2)
    collect()
    turn_right()`,
    starterCode: `# Boss Trial: Algorithm circuit across all 3 quadrants:
for quadrant in range(3):
    move_forward(2)
    collect()
    turn_right()

jump() # Enter the Champion Portal!
`,
    solutionCode: `for quadrant in range(3):
    move_forward(2)
    collect()
    turn_right()

jump()`,
    hints: [
      'The loop circles through all 3 colosseum corners.',
      'Collects each medallion and turns right.',
      'A final jump() carries you into the center portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Champion Medallions' },
      { id: 'g2', type: 'reach_portal', description: 'Enter Colosseum Champion Portal' },
    ],
    map: {
      width: 5,
      height: 5,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'water', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'cm1', type: 'crystal', x: 2, y: 1, name: 'North Medallion' },
        { id: 'cm2', type: 'crystal', x: 2, y: 3, name: 'East Medallion' },
        { id: 'cm3', type: 'crystal', x: 0, y: 3, name: 'South Medallion' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 520,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all medallions & reach portal',
      star2: 'Optimal loop complexity',
      star3: 'Boss trial cleared with zero errors',
      maxLinesForStar2: 8,
    },
  },
];
