import { Mission } from '../../types/game';

export const WORLD_7_MISSIONS: Mission[] = [
  {
    id: 'w7_m1',
    worldId: 7,
    title: 'Shield of Try-Except',
    chapterName: 'Defensive Programming',
    order: 1,
    conceptTitle: 'Exception Handling: try and except',
    conceptSummary: 'Catch runtime errors safely with try: and except: blocks.',
    conceptDetails: 'Without exception handling, an unhandled error crashes your program. Placing risky code inside a `try` block allows the `except` block to intercept the failure and recover gracefully.',
    exampleSnippet: `try:
    move_forward(5)
except Exception:
    move_forward(2)`,
    starterCode: `# Protect against dungeon traps using try-except:
try:
    move_forward(3)
    collect()
except Exception as e:
    print("Trap deflected!")
`,
    solutionCode: `try:
    move_forward(3)
    collect()
except Exception as e:
    print("Trap deflected!")`,
    hints: [
      'The try block safely advances 3 spaces and collects the dungeon relic.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Dungeon Relic' },
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
        { id: 'relic1', type: 'chest', x: 3, y: 1, name: 'Dungeon Relic' },
      ],
    },
    xpReward: 360,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Dungeon Relic',
      star2: 'Enclosed in try-except block',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w7_m2',
    worldId: 7,
    title: 'Precision Shielding: Specific Exceptions',
    chapterName: 'Targeted Exceptions',
    order: 2,
    conceptTitle: 'Catching Specific Error Types',
    conceptSummary: 'Catch specific errors like ValueError or ZeroDivisionError rather than generic exceptions.',
    conceptDetails: 'Catching specific exceptions prevents accidentally masking bugs. For example, `except ValueError:` only catches value conversion problems, letting other issues bubble up properly.',
    exampleSnippet: `try:
    steps = int("4")
except ValueError:
    steps = 1
move_forward(steps)`,
    starterCode: `# Parse the step distance safely with ValueError handling:
try:
    raw_input = "4"
    dist = int(raw_input)
except ValueError:
    dist = 1

move_forward(dist)
collect()
`,
    solutionCode: `try:
    raw_input = "4"
    dist = int(raw_input)
except ValueError:
    dist = 1

move_forward(dist)
collect()`,
    hints: [
      'int("4") successfully converts to the integer 4.',
      'move_forward(dist) moves 4 spaces to the crypt ruby.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Crypt Ruby' },
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
        { id: 'ruby1', type: 'crystal', x: 4, y: 1, name: 'Crypt Ruby' },
      ],
    },
    xpReward: 370,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Crypt Ruby',
      star2: 'Catches ValueError specifically',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w7_m3',
    worldId: 7,
    title: 'The Multi-Tiered Ward',
    chapterName: 'Multiple Except Blocks',
    order: 3,
    conceptTitle: 'Multiple except Clauses',
    conceptSummary: 'Handle different kinds of errors with dedicated except blocks.',
    conceptDetails: 'A single `try` can have multiple `except` handlers. Python checks them from top to bottom and executes the first matching block.',
    exampleSnippet: `try:
    run_trap()
except ZeroDivisionError:
    handle_math()
except KeyError:
    handle_key()`,
    starterCode: `# Handle index errors or key errors separately:
vault = [3]
try:
    dist = vault[0]
except IndexError:
    dist = 1
except TypeError:
    dist = 1

move_forward(dist)
collect()
`,
    solutionCode: `vault = [3]
try:
    dist = vault[0]
except IndexError:
    dist = 1
except TypeError:
    dist = 1

move_forward(dist)
collect()`,
    hints: [
      'vault[0] retrieves 3 safely without triggering either exception.',
      'move_forward(3) navigates directly to the ward crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Ward Crystal' },
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
        { id: 'ward1', type: 'crystal', x: 3, y: 1, name: 'Ward Crystal' },
      ],
    },
    xpReward: 380,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Ward Crystal',
      star2: 'Defines multiple except blocks',
      star3: 'Under 12 lines of code',
      maxLinesForStar2: 12,
    },
  },
  {
    id: 'w7_m4',
    worldId: 7,
    title: 'The Serene Chamber: try-else',
    chapterName: 'The else Block',
    order: 4,
    conceptTitle: 'The else Clause in Exception Handling',
    conceptSummary: 'Code in the else block runs ONLY if the try block succeeded without error.',
    conceptDetails: 'The `else` block runs only when no exceptions occurred in `try`. This cleanly separates the risky operation from the actions that depend on its success.',
    exampleSnippet: `try:
    val = verify_key()
except Exception:
    print("Error")
else:
    move_forward(val)`,
    starterCode: `# Place movement inside the else block:
try:
    safe_speed = 3
except Exception:
    print("Warning")
else:
    move_forward(safe_speed)
    collect()
`,
    solutionCode: `try:
    safe_speed = 3
except Exception:
    print("Warning")
else:
    move_forward(safe_speed)
    collect()`,
    hints: [
      'Because no exception occurs in try, the else block runs!',
      'move_forward(safe_speed) moves 3 tiles and collects the amber.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Amber Pendant' },
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
        { id: 'amber1', type: 'gem', x: 3, y: 1, name: 'Amber Pendant' },
      ],
    },
    xpReward: 390,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Amber Pendant',
      star2: 'Uses try-except-else pattern',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w7_m5',
    worldId: 7,
    title: 'The Eternal Guarantee: finally',
    chapterName: 'Cleanup with finally',
    order: 5,
    conceptTitle: 'The finally Clause',
    conceptSummary: 'Code in a finally block ALWAYS executes, regardless of whether an error occurred.',
    conceptDetails: 'The `finally` block runs under all conditions—even if an error crashed or return was called. In Python, it is standard for closing files, unlocking resources, and cleanup tasks.',
    exampleSnippet: `try:
    open_gate()
finally:
    lock_shield()`,
    starterCode: `# Guarantee that collection occurs in the finally block:
try:
    move_forward(3)
except Exception:
    print("Error encountered")
finally:
    collect()
`,
    solutionCode: `try:
    move_forward(3)
except Exception:
    print("Error encountered")
finally:
    collect()`,
    hints: [
      'move_forward(3) carries the hero onto the crystal tile.',
      'The finally block guarantees collect() executes under all circumstances.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Eternal Topaz' },
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
        { id: 'topaz1', type: 'gem', x: 3, y: 1, name: 'Eternal Topaz' },
      ],
    },
    xpReward: 400,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Eternal Topaz',
      star2: 'Utilizes finally cleanup block',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w7_m6',
    worldId: 7,
    title: 'The Trigger of Wrath: raise',
    chapterName: 'Triggering Exceptions',
    order: 6,
    conceptTitle: 'Raising Exceptions with raise',
    conceptSummary: 'Explicitly raise exceptions when invalid conditions occur.',
    conceptDetails: 'Use `raise ExceptionType(\"message\")` to stop normal flow and signal an error. Combined with try-except, this allows validating inputs and catching deliberate test cases.',
    exampleSnippet: `def check_distance(d):
    if d < 0:
        raise ValueError("Negative distance!")
    return d`,
    starterCode: `# Validate and catch raised exceptions:
def validate_march(paces):
    if paces <= 0:
        raise ValueError("Cannot move zero or backwards")
    return paces

try:
    valid_paces = validate_march(3)
    move_forward(valid_paces)
    collect()
except ValueError as err:
    print(err)
`,
    solutionCode: `def validate_march(paces):
    if paces <= 0:
        raise ValueError("Cannot move zero or backwards")
    return paces

try:
    valid_paces = validate_march(3)
    move_forward(valid_paces)
    collect()
except ValueError as err:
    print(err)`,
    hints: [
      'validate_march(3) passes validation and returns 3.',
      'move_forward(3) navigates safely to the relic.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve Glyph of Truth' },
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
        { id: 'glyph1', type: 'crystal', x: 3, y: 1, name: 'Glyph of Truth' },
      ],
    },
    xpReward: 410,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Glyph of Truth',
      star2: 'Uses raise and except ValueError',
      star3: 'Under 14 lines of code',
      maxLinesForStar2: 14,
    },
  },
  {
    id: 'w7_m7',
    worldId: 7,
    title: 'Custom Inscribed Errors',
    chapterName: 'Custom Exception Classes',
    order: 7,
    conceptTitle: 'Creating Custom Exceptions',
    conceptSummary: 'Subclass Exception to define domain-specific error types for your applications.',
    conceptDetails: 'Define custom exceptions with `class DungeonTrapError(Exception): pass`. This clarifies code intent and allows catching game-specific issues without interfering with standard Python errors.',
    exampleSnippet: `class TrapTriggered(Exception):
    pass

try:
    raise TrapTriggered("Spike trap!")
except TrapTriggered:
    jump()`,
    starterCode: `# Subclass Exception to make a DungeonTrapError:
class DungeonTrapError(Exception):
    pass

def disarm_trap():
    # Disarmed successfully!
    return 4

try:
    steps = disarm_trap()
    move_forward(steps)
    collect()
except DungeonTrapError:
    print("Trapped!")
`,
    solutionCode: `class DungeonTrapError(Exception):
    pass

def disarm_trap():
    return 4

try:
    steps = disarm_trap()
    move_forward(steps)
    collect()
except DungeonTrapError:
    print("Trapped!")`,
    hints: [
      'disarm_trap() returns 4 paces.',
      'move_forward(4) reaches the Relic of Immunity.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Relic of Immunity' },
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
        { id: 'roi1', type: 'crystal', x: 4, y: 1, name: 'Relic of Immunity' },
      ],
    },
    xpReward: 420,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Relic of Immunity',
      star2: 'Defines custom Exception subclass',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w7_m8',
    worldId: 7,
    title: 'The Stack Lich Boss Trial',
    chapterName: 'World 7 Capstone Boss',
    order: 8,
    conceptTitle: 'Labyrinth of Exceptions Capstone',
    conceptSummary: 'Vanquish the Stack Lich by shielding a three-chamber trial with defensive try-except.',
    conceptDetails: 'The Stack Lich hurls corrupted nulls into the stack frame. Use a robust loop with try-except to navigate the crypt corridors, claim all 3 Lich Phylacteries, and escape through the Sanctum Portal!',
    exampleSnippet: `for _ in range(3):
    try:
        move_forward(2)
        collect()
    except Exception:
        pass
    turn_right()`,
    starterCode: `# Boss Trial: Defend each corridor with try-except:
for chamber in range(3):
    try:
        move_forward(2)
        collect()
    except Exception as e:
        print("Deflected:", e)
    turn_right()

jump() # Ascend into the Sanctum Portal!
`,
    solutionCode: `for chamber in range(3):
    try:
        move_forward(2)
        collect()
    except Exception as e:
        print("Deflected:", e)
    turn_right()

jump()`,
    hints: [
      'The loop covers all 3 chambers, collecting a phylactery in each.',
      'The try-except block guarantees safe execution against runtime traps.',
      'jump() leaps into the center portal to break the Lich curse.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Lich Phylacteries' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the Crypt Sanctum Portal' },
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
        { id: 'lp1', type: 'crystal', x: 2, y: 1, name: 'Phylactery North' },
        { id: 'lp2', type: 'crystal', x: 2, y: 3, name: 'Phylactery East' },
        { id: 'lp3', type: 'crystal', x: 0, y: 3, name: 'Phylactery South' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 480,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all phylacteries & reach portal',
      star2: 'Shielded loop with try-except',
      star3: 'Boss trial cleared with zero crashes',
      maxLinesForStar2: 11,
    },
  },
  {
    id: 'w7_m9',
    worldId: 7,
    title: 'The Raise Incantation',
    chapterName: 'Triggering Exceptions',
    order: 9,
    conceptTitle: 'The raise Statement',
    conceptSummary: 'Explicitly trigger an exception when program constraints are breached.',
    conceptDetails: 'Use `raise ValueError("message")` to signal that an invalid argument or illegal condition occurred. Raising early prevents bad data from causing silent failures downstream.',
    exampleSnippet: `if paces < 0:
    raise ValueError("Paces cannot be negative!")`,
    starterCode: `# Validate step parameters and raise if invalid:
def validate_movement(paces):
    if paces <= 0:
        raise ValueError("Invalid stride!")
    return paces

# Advance 4 paces safely:
stride = validate_movement(4)
move_forward(stride)
collect()
`,
    solutionCode: `def validate_movement(paces):
    if paces <= 0:
        raise ValueError("Invalid stride!")
    return paces

stride = validate_movement(4)
move_forward(stride)
collect()`,
    hints: [
      'validate_movement(4) returns 4.',
      'move_forward(4) collects the Exception Ward.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Exception Ward' },
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
        { id: 'ew1', type: 'crystal', x: 4, y: 1, name: 'Exception Ward' },
      ],
    },
    xpReward: 490,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Exception Ward',
      star2: 'Validates with raise statement',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w7_m10',
    worldId: 7,
    title: 'The Finally Sanctuary',
    chapterName: 'Guaranteed Execution',
    order: 10,
    conceptTitle: 'The finally Clause',
    conceptSummary: 'A finally block executes no matter what, whether an exception was raised or not.',
    conceptDetails: 'The `finally` block is guaranteed to run after `try` and `except`. It is essential for releasing resources, closing files, or ensuring cleanup actions occur even after errors.',
    exampleSnippet: `try:
    move_forward(3)
finally:
    collect()`,
    starterCode: `# Ensure cleanup execution with finally:
try:
    move_forward(3)
except Exception:
    print("Handled")
finally:
    collect() # Guaranteed collection!
`,
    solutionCode: `try:
    move_forward(3)
except Exception:
    print("Handled")
finally:
    collect()`,
    hints: [
      'move_forward(3) reaches the Sanctum Stone.',
      'The finally block guarantees collect() runs.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Sanctum Stone' },
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
        { id: 'ss1', type: 'crystal', x: 3, y: 1, name: 'Sanctum Stone' },
      ],
    },
    xpReward: 500,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Sanctum Stone',
      star2: 'Uses try-except-finally structure',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
];
