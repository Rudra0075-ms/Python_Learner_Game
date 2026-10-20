import { Mission } from '../../types/game';

export const WORLD_12_MISSIONS: Mission[] = [
  {
    id: 'w12_m1',
    worldId: 12,
    title: 'The Assert Gatekeeper',
    chapterName: 'Defensive Assertions',
    order: 1,
    conceptTitle: 'The assert Statement',
    conceptSummary: 'Use assert condition, message to verify program invariants and prevent bugs.',
    conceptDetails: 'In Python, `assert` tests a boolean condition. If true, execution continues normally. If false, an `AssertionError` is raised immediately, halting corrupted operations before they spread.',
    exampleSnippet: `assert paces > 0, "Distance must be positive!"
move_forward(paces)`,
    starterCode: `# Verify that step count is positive before advancing:
paces = 3
assert paces > 0, "Paces must be positive!"

move_forward(paces)
collect()
`,
    solutionCode: `paces = 3
assert paces > 0, "Paces must be positive!"

move_forward(paces)
collect()`,
    hints: [
      'The assert passes because 3 > 0.',
      'move_forward(paces) brings you right to the Proving Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Proving Crystal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'path', 'path', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'pc1', type: 'crystal', x: 3, y: 1, name: 'Proving Crystal' },
      ],
    },
    xpReward: 500,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Proving Crystal',
      star2: 'Includes valid assert invariant',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w12_m2',
    worldId: 12,
    title: 'The Test Runner Function',
    chapterName: 'Unit Testing Foundations',
    order: 2,
    conceptTitle: 'Writing Pure Test Functions',
    conceptSummary: 'A test function compares an actual function output against an expected return value.',
    conceptDetails: 'Automated tests call a target function with known inputs and assert that the result equals expected outputs. Testing before deploying catches regressions instantly.',
    exampleSnippet: `def add(a, b): return a + b
assert add(2, 3) == 5, "Test failed!"`,
    starterCode: `# Build and test a calculate_steps function:
def calculate_steps(multiplier):
    return multiplier * 2

# Unit test:
assert calculate_steps(2) == 4, "Calculation error"

steps = calculate_steps(2)
move_forward(steps)
collect()
`,
    solutionCode: `def calculate_steps(multiplier):
    return multiplier * 2

assert calculate_steps(2) == 4, "Calculation error"

steps = calculate_steps(2)
move_forward(steps)
collect()`,
    hints: [
      'calculate_steps(2) returns 4.',
      'move_forward(4) reaches the Test Rune.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Tested Rune' },
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
        { id: 'tr1', type: 'crystal', x: 4, y: 1, name: 'Tested Rune' },
      ],
    },
    xpReward: 510,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Tested Rune',
      star2: 'Validates unit test assertion',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w12_m3',
    worldId: 12,
    title: 'Testing Edge Cases',
    chapterName: 'Boundary Conditions',
    order: 3,
    conceptTitle: 'Zero, Empty & Boundary Verification',
    conceptSummary: 'Ensure your spells handle 0, negative numbers, and boundary limits safely.',
    conceptDetails: 'Most bugs happen at the boundaries of data (e.g., empty lists, 0 steps, maximum thresholds). Professional engineers always write tests for boundary edge cases.',
    exampleSnippet: `def clamp(val, min_v, max_v):
    return max(min_v, min(val, max_v))
assert clamp(-5, 0, 10) == 0`,
    starterCode: `# Test boundary clamp logic:
def safe_steps(desired, max_allowed):
    if desired <= 0:
        return 1
    if desired > max_allowed:
        return max_allowed
    return desired

assert safe_steps(0, 5) == 1
assert safe_steps(10, 3) == 3

stride = safe_steps(10, 3) # Evaluates to 3
move_forward(stride)
collect()
`,
    solutionCode: `def safe_steps(desired, max_allowed):
    if desired <= 0:
        return 1
    if desired > max_allowed:
        return max_allowed
    return desired

assert safe_steps(0, 5) == 1
assert safe_steps(10, 3) == 3

stride = safe_steps(10, 3)
move_forward(stride)
collect()`,
    hints: [
      'safe_steps clamps desires to between 1 and max_allowed.',
      'safe_steps(10, 3) gives 3, moving your hero directly to the boundary crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Boundary Crystal' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'path', 'path', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'bc1', type: 'crystal', x: 3, y: 1, name: 'Boundary Crystal' },
      ],
    },
    xpReward: 520,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Boundary Crystal',
      star2: 'Tests zero and max boundary conditions',
      star3: 'Under 14 lines of code',
      maxLinesForStar2: 14,
    },
  },
  {
    id: 'w12_m4',
    worldId: 12,
    title: 'The Test Suite Table',
    chapterName: 'Parameterized Testing',
    order: 4,
    conceptTitle: 'Table-Driven Test Cases',
    conceptSummary: 'Loop through a list of input-output pairs to test many cases in one go.',
    conceptDetails: 'Instead of copy-pasting assertion statements, define a test matrix: `[ (input, expected), ... ]` and loop through with `for inp, expected in test_cases: assert fn(inp) == expected`.',
    exampleSnippet: `test_matrix = [(1, 2), (2, 4), (3, 6)]
for inp, exp in test_matrix:
    assert double(inp) == exp`,
    starterCode: `# Parameterized testing suite for move multipliers:
def double_pace(n):
    return n * 2

test_suite = [
    (1, 2),
    (2, 4),
]

for n, expected in test_suite:
    assert double_pace(n) == expected

move_forward(double_pace(2))
collect()
`,
    solutionCode: `def double_pace(n):
    return n * 2

test_suite = [
    (1, 2),
    (2, 4),
]

for n, expected in test_suite:
    assert double_pace(n) == expected

move_forward(double_pace(2))
collect()`,
    hints: [
      'The loop verifies both test cases cleanly.',
      'double_pace(2) evaluates to 4.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Suite Crystal' },
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
        { id: 'sc1', type: 'crystal', x: 4, y: 1, name: 'Suite Crystal' },
      ],
    },
    xpReward: 530,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Suite Crystal',
      star2: 'Runs parameterized test loop',
      star3: 'Under 14 lines of code',
      maxLinesForStar2: 14,
    },
  },
  {
    id: 'w12_m5',
    worldId: 12,
    title: 'Testing Expected Exceptions',
    chapterName: 'Negative Testing',
    order: 5,
    conceptTitle: 'Asserting Failures and Invalid Arguments',
    conceptSummary: 'Verify that invalid inputs raise the expected exception type.',
    conceptDetails: 'Negative testing verifies that your program rejects bad inputs appropriately instead of doing unpredictable things. Use try-except inside your test to assert an error was raised.',
    exampleSnippet: `caught = False
try:
    divide(10, 0)
except ZeroDivisionError:
    caught = True
assert caught`,
    starterCode: `# Verify that dividing by zero raises ZeroDivisionError:
def safe_divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a // b

# Test for expected error:
error_raised = False
try:
    safe_divide(10, 0)
except ValueError:
    error_raised = True

assert error_raised, "Should have rejected zero divisor!"

move_forward(safe_divide(10, 2)) # 5 paces
collect()
`,
    solutionCode: `def safe_divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a // b

error_raised = False
try:
    safe_divide(10, 0)
except ValueError:
    error_raised = True

assert error_raised, "Should have rejected zero divisor!"

move_forward(safe_divide(10, 2))
collect()`,
    hints: [
      'The try-except confirms safe_divide(10, 0) raised ValueError.',
      'safe_divide(10, 2) returns 5.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Negative Test Rune' },
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
        { id: 'ntr', type: 'crystal', x: 5, y: 1, name: 'Negative Test Rune' },
      ],
    },
    xpReward: 540,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Negative Test Rune',
      star2: 'Asserts expected exception',
      star3: 'Under 16 lines of code',
      maxLinesForStar2: 16,
    },
  },
  {
    id: 'w12_m6',
    worldId: 12,
    title: 'The Mock Alchemist',
    chapterName: 'Mocking & Test Doubles',
    order: 6,
    conceptTitle: 'Simulating External Dependencies',
    conceptSummary: 'Use mock objects or stub functions to test business logic in isolation.',
    conceptDetails: 'In production, your code might query a database or network API. In testing, you substitute mock objects (stubs) that return predetermined values without real network calls.',
    exampleSnippet: `class MockSensor:
    def read(self): return 3
sensor = MockSensor()
move_forward(sensor.read())`,
    starterCode: `# Create a MockWeatherSensor that returns constant wind power:
class MockWeatherSensor:
    def get_tailwind(self):
        return 4

sensor = MockWeatherSensor()
assert sensor.get_tailwind() == 4, "Sensor stub failed!"

# Advance with simulated tailwind:
move_forward(sensor.get_tailwind())
collect()
`,
    solutionCode: `class MockWeatherSensor:
    def get_tailwind(self):
        return 4

sensor = MockWeatherSensor()
assert sensor.get_tailwind() == 4, "Sensor stub failed!"

move_forward(sensor.get_tailwind())
collect()`,
    hints: [
      'MockWeatherSensor simulates an external sensor returning 4.',
      'move_forward(4) reaches the Isolated Test Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Isolated Test Crystal' },
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
        { id: 'itc', type: 'crystal', x: 4, y: 1, name: 'Isolated Test Crystal' },
      ],
    },
    xpReward: 550,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Isolated Test Crystal',
      star2: 'Implements test stub class',
      star3: 'Under 12 lines of code',
      maxLinesForStar2: 12,
    },
  },
  {
    id: 'w12_m7',
    worldId: 12,
    title: 'Code Refactoring with Test Guardrails',
    chapterName: 'Refactoring & Clean Code',
    order: 7,
    conceptTitle: 'Safe Refactoring Protected by Tests',
    conceptSummary: 'Refactor messy code to clean, readable code while ensuring all unit tests still pass.',
    conceptDetails: 'Refactoring means restructuring existing code without changing its external behavior. Tests act as an automated safety net, guaranteeing nothing broke during the cleanup.',
    exampleSnippet: `# Before: r = 0; if x: r = 1; else: r = 2
# Refactored: r = 1 if x else 2`,
    starterCode: `# Refactor the messy path calculation into a clean list comprehension:
# Original messy logic:
raw = [1, 2, 3]
# Clean comprehension:
paces = sum([x for x in raw if x <= 2]) # 1 + 2 = 3

assert paces == 3, "Refactoring altered calculation!"

move_forward(paces)
collect()
`,
    solutionCode: `raw = [1, 2, 3]
paces = sum([x for x in raw if x <= 2])

assert paces == 3, "Refactoring altered calculation!"

move_forward(paces)
collect()`,
    hints: [
      'sum([1, 2]) yields 3.',
      'move_forward(3) collects the Refactor Glyph.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Refactor Glyph' },
    ],
    map: {
      width: 6,
      height: 3,
      tiles: [
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
        ['path', 'path', 'path', 'path', 'stone', 'stone'],
        ['stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
      ],
      playerStart: { x: 0, y: 1 },
      playerDirection: 'right',
      entities: [
        { id: 'rg1', type: 'crystal', x: 3, y: 1, name: 'Refactor Glyph' },
      ],
    },
    xpReward: 560,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Refactor Glyph',
      star2: 'Refactors into clean comprehension',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w12_m8',
    worldId: 12,
    title: 'The Regression Shield',
    chapterName: 'Regression Testing',
    order: 8,
    conceptTitle: 'Locking In Fixed Bugs',
    conceptSummary: 'Whenever you fix a bug, write a test reproducing that exact case to prevent it returning.',
    conceptDetails: 'A regression bug is a flaw that was fixed in the past but reappears later. Writing a permanent regression test ensures that once fixed, a bug remains fixed permanently.',
    exampleSnippet: `# Regression test for string split bug:
s = "line1\\nline2"
assert len(s.split("\\n")) == 2`,
    starterCode: `# Build a regression test for newline string formatting:
def format_log(header, body):
    return header + " - " + body

assert format_log("QUEST", "ACTIVE") == "QUEST - ACTIVE"

# Traverse to verification waypoint:
move_forward(4)
collect()
`,
    solutionCode: `def format_log(header, body):
    return header + " - " + body

assert format_log("QUEST", "ACTIVE") == "QUEST - ACTIVE"

move_forward(4)
collect()`,
    hints: [
      'The regression assertion verifies string joining logic.',
      'move_forward(4) reaches the Regression Shield.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Regression Shield' },
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
        { id: 'rs1', type: 'crystal', x: 4, y: 1, name: 'Regression Shield' },
      ],
    },
    xpReward: 570,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Regression Shield',
      star2: 'Asserts regression format function',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w12_m9',
    worldId: 12,
    title: 'Test-Driven Development (TDD)',
    chapterName: 'TDD Workflow',
    order: 9,
    conceptTitle: 'Red-Green-Refactor Cycle',
    conceptSummary: 'Write the test before writing the code, make it pass, then polish.',
    conceptDetails: 'In TDD (Test-Driven Development), you first define what success looks like in a test (Red). Then you write the simplest code that passes (Green). Finally, you clean up the implementation (Refactor).',
    exampleSnippet: `# 1. Test first:
# assert power_level(3) == 9
# 2. Implement:
# def power_level(x): return x ** 2`,
    starterCode: `# TDD trial: Write step_counter to satisfy the test assertions:
def step_counter(target_crystals):
    return target_crystals * 2

# Test specification:
assert step_counter(1) == 2
assert step_counter(2) == 4

move_forward(step_counter(2))
collect()
`,
    solutionCode: `def step_counter(target_crystals):
    return target_crystals * 2

assert step_counter(1) == 2
assert step_counter(2) == 4

move_forward(step_counter(2))
collect()`,
    hints: [
      'step_counter(2) computes 4 paces.',
      'move_forward(4) lands directly on the TDD Medal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect TDD Medal' },
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
        { id: 'tm1', type: 'crystal', x: 4, y: 1, name: 'TDD Medal' },
      ],
    },
    xpReward: 580,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect TDD Medal',
      star2: 'Fulfills TDD test specification',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w12_m10',
    worldId: 12,
    title: 'The Proving Grounds Grand Boss Trial',
    chapterName: 'World 12 Capstone Boss',
    order: 10,
    conceptTitle: 'Full Test Suite Validation',
    conceptSummary: 'Run a multi-phase test suite to unlock all 3 Proving Pillars and ascend the Test Portal.',
    conceptDetails: 'The Master Inquisitor guards the portal. To pass, construct a complete test suite with edge cases, assertions, and boundary checks that validates a waypoint navigator and opens the portal!',
    exampleSnippet: `for waypoint in [2, 2, 2]:
    assert waypoint > 0
    move_forward(waypoint)
    collect()
    turn_right()
jump()`,
    starterCode: `# Boss Trial: Test-driven navigation across all 3 proving grounds:
waypoints = [2, 2, 2]

# Automated verification suite:
assert len(waypoints) == 3, "Must have 3 test chambers"
assert all(w > 0 for w in waypoints), "Waypoints must be strictly positive"

for stride in waypoints:
    move_forward(stride)
    collect()
    turn_right()

jump() # Leap into the Obsidian Portal!
`,
    solutionCode: `waypoints = [2, 2, 2]

assert len(waypoints) == 3, "Must have 3 test chambers"
assert all(w > 0 for w in waypoints), "Waypoints must be strictly positive"

for stride in waypoints:
    move_forward(stride)
    collect()
    turn_right()

jump()`,
    hints: [
      'The assertion verifies the 3 waypoints.',
      'The loop clears all 3 proving grounds collecting the runes.',
      'jump() leaps into the center portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Proving Runes' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the Obsidian Portal' },
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
        { id: 'pr1', type: 'crystal', x: 2, y: 1, name: 'North Proving Rune' },
        { id: 'pr2', type: 'crystal', x: 2, y: 3, name: 'East Proving Rune' },
        { id: 'pr3', type: 'crystal', x: 0, y: 3, name: 'South Proving Rune' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 600,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all runes & enter portal',
      star2: 'Executes verified test assertions',
      star3: 'Boss trial cleared with 0 failures',
      maxLinesForStar2: 14,
    },
  },
];
