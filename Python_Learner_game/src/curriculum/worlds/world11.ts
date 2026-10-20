import { Mission } from '../../types/game';

export const WORLD_11_MISSIONS: Mission[] = [
  {
    id: 'w11_m1',
    worldId: 11,
    title: 'The Tower Generator: yield',
    chapterName: 'Generators & Iterables',
    order: 1,
    conceptTitle: 'Generators with yield',
    conceptSummary: 'Generators yield values on demand, computing lazily without loading everything into RAM.',
    conceptDetails: 'Unlike a function that returns a single complete list, a generator uses `yield` to emit items one by one. This is crucial for high-efficiency processing and streaming pipelines.',
    exampleSnippet: `def step_gen():
    yield 2
    yield 2

for s in step_gen():
    move_forward(s)`,
    starterCode: `# Use a generator function to produce step increments:
def distance_generator():
    yield 2
    yield 2

for dist in distance_generator():
    move_forward(dist)

collect()
`,
    solutionCode: `def distance_generator():
    yield 2
    yield 2

for dist in distance_generator():
    move_forward(dist)

collect()`,
    hints: [
      'The generator emits 2, then 2, moving a total of 4 spaces to the energy core.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect High Tower Energy Core' },
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
        { id: 'core_tower', type: 'crystal', x: 4, y: 1, name: 'Tower Energy Core' },
      ],
    },
    xpReward: 420,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Tower Core',
      star2: 'Uses generator with yield',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w11_m2',
    worldId: 11,
    title: 'The Alchemist Shorthand: List Comprehension',
    chapterName: 'List Comprehensions',
    order: 2,
    conceptTitle: 'List Comprehensions',
    conceptSummary: 'Construct transformed lists concisely in a single bracketed line.',
    conceptDetails: 'Syntax: `[expression for item in iterable if condition]`. It is faster and more idiomatic in Python than initializing an empty list and calling `.append()` inside a multi-line loop.',
    exampleSnippet: `doubled = [x * 2 for x in [1, 2]] # [2, 4]
move_forward(doubled[0])`,
    starterCode: `# Double every unit stride using a list comprehension:
strides = [1, 1, 1]
doubled_strides = [x * 1 for x in strides]
total_dist = sum(doubled_strides)

move_forward(total_dist)
collect()
`,
    solutionCode: `strides = [1, 1, 1]
doubled_strides = [x * 1 for x in strides]
total_dist = sum(doubled_strides)

move_forward(total_dist)
collect()`,
    hints: [
      'sum(doubled_strides) computes 3.',
      'move_forward(3) reaches the Comprehension Sapphire.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Comprehension Sapphire' },
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
        { id: 'cs1', type: 'gem', x: 3, y: 1, name: 'Comprehension Sapphire' },
      ],
    },
    xpReward: 430,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Comprehension Sapphire',
      star2: 'Constructs list comprehension',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w11_m3',
    worldId: 11,
    title: 'The Parallel Tapestry: zip()',
    chapterName: 'The zip Function',
    order: 3,
    conceptTitle: 'Pairing Iterables with zip()',
    conceptSummary: 'Iterate over multiple lists simultaneously in locked step using zip().',
    conceptDetails: '`zip([a, b], [x, y])` produces `(a, x)` and `(b, y)`. It terminates as soon as the shortest input iterable is exhausted, making parallel processing elegant.',
    exampleSnippet: `steps = [1, 2]
multipliers = [2, 1]
for s, m in zip(steps, multipliers):
    move_forward(s * m)`,
    starterCode: `# Iterate over pairs of directions and steps:
legs = [2, 1]
boosts = [1, 1]

for step_len, boost in zip(legs, boosts):
    move_forward(step_len * boost)

collect()
`,
    solutionCode: `legs = [2, 1]
boosts = [1, 1]

for step_len, boost in zip(legs, boosts):
    move_forward(step_len * boost)

collect()`,
    hints: [
      'zip pairs leg 2 with boost 1 (2 paces), and leg 1 with boost 1 (1 pace).',
      'Total distance is 3 paces to the Synchronized Topaz.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Synchronized Topaz' },
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
        { id: 'st1', type: 'gem', x: 3, y: 1, name: 'Synchronized Topaz' },
      ],
    },
    xpReward: 440,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Synchronized Topaz',
      star2: 'Uses zip() for parallel iteration',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w11_m4',
    worldId: 11,
    title: 'The Indexed Chronicle: enumerate()',
    chapterName: 'The enumerate Function',
    order: 4,
    conceptTitle: 'Enumerating with Index and Value',
    conceptSummary: 'Obtain index counters automatically with enumerate(iterable).',
    conceptDetails: 'Instead of manually tracking a loop counter `i = 0; i += 1`, use `for i, item in enumerate(items):`. It is cleaner, safer, and idiomatic Python.',
    exampleSnippet: `waypoints = ["a", "b", "c"]
for i, name in enumerate(waypoints):
    pass # i is 0, 1, 2`,
    starterCode: `# Find target item index using enumerate:
relics = ["stone", "stone", "stone", "crystal"]

for idx, relic in enumerate(relics):
    if relic == "crystal":
        move_forward(idx)
        collect()
        break
`,
    solutionCode: `relics = ["stone", "stone", "stone", "crystal"]

for idx, relic in enumerate(relics):
    if relic == "crystal":
        move_forward(idx)
        collect()
        break`,
    hints: [
      'enumerate pairs each item with its index (0, 1, 2, 3).',
      'At index 3, it finds "crystal", moves 3 spaces, and collects.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Enumerated Crystal' },
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
        { id: 'ec1', type: 'crystal', x: 3, y: 1, name: 'Enumerated Crystal' },
      ],
    },
    xpReward: 450,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Enumerated Crystal',
      star2: 'Uses enumerate() pairing',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w11_m5',
    worldId: 11,
    title: 'The Silent Spark: lambda',
    chapterName: 'Anonymous Functions',
    order: 5,
    conceptTitle: 'Lambda Anonymous Functions',
    conceptSummary: 'Define lightweight, single-expression anonymous functions inline.',
    conceptDetails: 'Syntax: `lambda arg1, arg2: expression`. Lambda functions are ideal for short throwaway transformations, key extractors in `sorted()`, and callbacks.',
    exampleSnippet: `calc = lambda x: x * 2
dist = calc(2) # 4
move_forward(dist)`,
    starterCode: `# Define an inline lambda function to scale distance:
stride_calc = lambda base: base + 2
paces = stride_calc(2) # 4 paces

move_forward(paces)
collect()
`,
    solutionCode: `stride_calc = lambda base: base + 2
paces = stride_calc(2)

move_forward(paces)
collect()`,
    hints: [
      'stride_calc(2) evaluates 2 + 2 = 4.',
      'move_forward(4) carries you to the Lambda Prism.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Lambda Prism' },
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
        { id: 'lp1', type: 'crystal', x: 4, y: 1, name: 'Lambda Prism' },
      ],
    },
    xpReward: 460,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Lambda Prism',
      star2: 'Demonstrates lambda syntax',
      star3: 'Under 6 lines of code',
      maxLinesForStar2: 6,
    },
  },
  {
    id: 'w11_m6',
    worldId: 11,
    title: 'The Cloak of Decorators: @wrapper',
    chapterName: 'Function Decorators',
    order: 6,
    conceptTitle: 'Decorators and Higher-Order Functions',
    conceptSummary: 'Wrap and enhance existing functions using the @decorator syntax.',
    conceptDetails: 'A decorator is a function that takes another function as an argument and returns a modified function. Python supports the `@decorator` syntax above function definitions.',
    exampleSnippet: `def log_call(func):
    def wrapper():
        print("Executing")
        return func()
    return wrapper`,
    starterCode: `# Define a decorator that adds logging around movement:
def announce(func):
    def wrapper():
        say("Incantation initialized")
        func()
    return wrapper

@announce
def perform_march():
    move_forward(3)
    collect()

perform_march()
`,
    solutionCode: `def announce(func):
    def wrapper():
        say("Incantation initialized")
        func()
    return wrapper

@announce
def perform_march():
    move_forward(3)
    collect()

perform_march()`,
    hints: [
      '@announce wraps perform_march(), announcing the spell before advancing.',
      'move_forward(3) and collect() claim the Decorated Scepter.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Decorated Scepter' },
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
        { id: 'ds1', type: 'gem', x: 3, y: 1, name: 'Decorated Scepter' },
      ],
    },
    xpReward: 470,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Decorated Scepter',
      star2: 'Uses @decorator syntax',
      star3: 'Flawless run',
    },
  },
  {
    id: 'w11_m7',
    worldId: 11,
    title: 'Dict Comprehensions: Key Mapping',
    chapterName: 'Dictionary Comprehensions',
    order: 7,
    conceptTitle: 'Dictionary Comprehensions',
    conceptSummary: 'Construct mapped key-value dictionaries with {k: v for k, v in iterable}.',
    conceptDetails: 'Just like list comprehensions, dictionary comprehensions transform pairs into mappings: `{k: v * 2 for k, v in items}` in a single declarative expression.',
    exampleSnippet: `names = ["north", "east"]
mapping = {name: i + 1 for i, name in enumerate(names)}`,
    starterCode: `# Build dictionary mapping distances using comprehension:
keys = ["stride"]
table = {k: 4 for k in keys}

dist = table["stride"]
move_forward(dist)
collect()
`,
    solutionCode: `keys = ["stride"]
table = {k: 4 for k in keys}

dist = table["stride"]
move_forward(dist)
collect()`,
    hints: [
      'table["stride"] evaluates to 4.',
      'move_forward(4) navigates to the Mapping Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Mapping Crystal' },
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
        { id: 'mc1', type: 'crystal', x: 4, y: 1, name: 'Mapping Crystal' },
      ],
    },
    xpReward: 480,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Mapping Crystal',
      star2: 'Creates dictionary comprehension',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w11_m8',
    worldId: 11,
    title: 'The Senior Sorcerer Boss Trial',
    chapterName: 'World 11 Capstone Boss',
    order: 8,
    conceptTitle: 'High Tower Metaprogramming Capstone',
    conceptSummary: 'Combine generators, comprehensions, and higher abstractions to ascend the Tower.',
    conceptDetails: 'You reach the apex of the High Tower of Abstraction. Write a generator-driven circuit to collect all 3 High Tower Runes and ascend through the Pinnacle Portal!',
    exampleSnippet: `def tower_pass():
    for _ in range(3):
        yield 2`,
    starterCode: `# Boss Trial: Generator-driven circuit across all 3 tower pinnacles:
def pinnacle_generator():
    for step in [2, 2, 2]:
        yield step

for paces in pinnacle_generator():
    move_forward(paces)
    collect()
    turn_right()

jump() # Ascend into the High Tower Pinnacle Portal!
`,
    solutionCode: `def pinnacle_generator():
    for step in [2, 2, 2]:
        yield step

for paces in pinnacle_generator():
    move_forward(paces)
    collect()
    turn_right()

jump()`,
    hints: [
      'The generator yields 2 for each of the 3 pinnacles.',
      'Collect the rune at each apex and turn right.',
      'jump() leaps into the pinnacle portal at the center.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 High Tower Runes' },
      { id: 'g2', type: 'reach_portal', description: 'Enter High Tower Pinnacle Portal' },
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
        { id: 'htr1', type: 'crystal', x: 2, y: 1, name: 'Alpha Pinnacle Rune' },
        { id: 'htr2', type: 'crystal', x: 2, y: 3, name: 'Beta Pinnacle Rune' },
        { id: 'htr3', type: 'crystal', x: 0, y: 3, name: 'Gamma Pinnacle Rune' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 540,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all runes & enter portal',
      star2: 'Generator function with yield',
      star3: 'Boss trial cleared flawlessly',
      maxLinesForStar2: 12,
    },
  },
  {
    id: 'w11_m9',
    worldId: 11,
    title: 'The Type Hint Sanctum',
    chapterName: 'Type Annotations',
    order: 9,
    conceptTitle: 'Function Type Hints & Annotations',
    conceptSummary: 'Annotate parameters and return values with type hints like str, int, and list[int].',
    conceptDetails: 'Python 3 supports type hints: `def calculate(x: int, y: int) -> int:`. While Python remains dynamically typed at runtime, type hints enable IDE autocomplete, static checking with mypy, and self-documenting architectures.',
    exampleSnippet: `def add(a: int, b: int) -> int:
    return a + b`,
    starterCode: `# Build typed step calculator:
def calculate_paces(base: int, bonus: int) -> int:
    return base + bonus

# Advance 4 paces:
paces: int = calculate_paces(2, 2)
move_forward(paces)
collect()
`,
    solutionCode: `def calculate_paces(base: int, bonus: int) -> int:
    return base + bonus

paces: int = calculate_paces(2, 2)
move_forward(paces)
collect()`,
    hints: [
      'calculate_paces(2, 2) evaluates to 4.',
      'move_forward(4) collects the Type Glyph.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Type Glyph' },
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
        { id: 'tg1', type: 'crystal', x: 4, y: 1, name: 'Type Glyph' },
      ],
    },
    xpReward: 550,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Type Glyph',
      star2: 'Includes type annotations on function',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w11_m10',
    worldId: 11,
    title: 'The Dataclass Blueprint',
    chapterName: 'Dataclasses',
    order: 10,
    conceptTitle: 'Clean Structured Models with @dataclass',
    conceptSummary: 'Create clean data holder classes with auto-generated __init__ and __repr__.',
    conceptDetails: 'Python`s `dataclasses` module eliminates tedious constructor boilerplate: `@dataclass class Hero: name: str; hp: int`. It automatically creates constructors, equality checks, and representation strings.',
    exampleSnippet: `class Waypoint:
    def __init__(self, x, steps):
        self.x = x
        self.steps = steps`,
    starterCode: `# Model structured waypoint with class definition:
class Waypoint:
    def __init__(self, name, paces):
        self.name = name
        self.paces = paces

wp = Waypoint("Alpha", 5)

move_forward(wp.paces)
collect()
`,
    solutionCode: `class Waypoint:
    def __init__(self, name, paces):
        self.name = name
        self.paces = paces

wp = Waypoint("Alpha", 5)

move_forward(wp.paces)
collect()`,
    hints: [
      'wp.paces is 5.',
      'move_forward(5) lands directly on the Dataclass Core.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Dataclass Core' },
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
        { id: 'dcc', type: 'crystal', x: 5, y: 1, name: 'Dataclass Core' },
      ],
    },
    xpReward: 560,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Dataclass Core',
      star2: 'Instantiates waypoint class',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
];
