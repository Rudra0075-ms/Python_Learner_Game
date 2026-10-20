import { Mission } from '../../types/game';

export const WORLD_6_MISSIONS: Mission[] = [
  {
    id: 'w6_m1',
    worldId: 6,
    title: 'The Golem Blueprint: class',
    chapterName: 'Object Blueprints',
    order: 1,
    conceptTitle: 'Classes and Instances',
    conceptSummary: 'Classes are blueprints for creating objects with attributes and behaviors.',
    conceptDetails: 'In Python, define a class with `class Name:`. The `__init__(self, ...)` method initializes attributes when an object is created. `self` refers to the specific instance being operated on.',
    exampleSnippet: `class Golem:
    def __init__(self, power):
        self.power = power

g = Golem(3)
move_forward(g.power)`,
    starterCode: `# Create a Golem class with a power attribute:
class Golem:
    def __init__(self, power):
        self.power = power

my_golem = Golem(4)
move_forward(my_golem.power)
collect()
`,
    solutionCode: `class Golem:
    def __init__(self, power):
        self.power = power

my_golem = Golem(4)
move_forward(my_golem.power)
collect()`,
    hints: [
      'my_golem = Golem(4) sets self.power = 4.',
      'move_forward(my_golem.power) walks 4 paces to the Golem Core.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Golem Core' },
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
        { id: 'core1', type: 'crystal', x: 4, y: 1, name: 'Golem Core' },
      ],
    },
    xpReward: 350,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Golem Core',
      star2: 'Defines class with __init__',
      star3: 'Under 9 lines of code',
      maxLinesForStar2: 9,
    },
  },
  {
    id: 'w6_m2',
    worldId: 6,
    title: 'Living Methods: self',
    chapterName: 'Instance Methods',
    order: 2,
    conceptTitle: 'Defining Methods in Classes',
    conceptSummary: 'Methods are functions defined inside classes that operate on self.',
    conceptDetails: 'A method always receives `self` as its first parameter. Inside the method, access instance properties via `self.attribute`. Calling `obj.method()` passes `obj` as `self` automatically.',
    exampleSnippet: `class Knight:
    def __init__(self, steps):
        self.steps = steps

    def advance(self):
        move_forward(self.steps)

k = Knight(3)
k.advance()`,
    starterCode: `# Give the Knight class a march method:
class Knight:
    def __init__(self, distance):
        self.distance = distance

    def march(self):
        move_forward(self.distance)
        collect()

paladin = Knight(3)
paladin.march()
`,
    solutionCode: `class Knight:
    def __init__(self, distance):
        self.distance = distance

    def march(self):
        move_forward(self.distance)
        collect()

paladin = Knight(3)
paladin.march()`,
    hints: [
      'Call paladin.march() to trigger the method.',
      'It walks self.distance (3 steps) and collects the crest.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve Paladin Crest' },
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
        { id: 'crest1', type: 'gem', x: 3, y: 1, name: 'Paladin Crest' },
      ],
    },
    xpReward: 360,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Paladin Crest',
      star2: 'Defines and calls instance method',
      star3: 'Under 11 lines of code',
      maxLinesForStar2: 11,
    },
  },
  {
    id: 'w6_m3',
    worldId: 6,
    title: 'The Legion of Two',
    chapterName: 'Multiple Instances',
    order: 3,
    conceptTitle: 'Multiple Object Instances',
    conceptSummary: 'Create multiple independent objects from the same class blueprint.',
    conceptDetails: 'Each instance holds its own distinct attribute values. Changing an attribute on `scout_a` has no effect on `scout_b`.',
    exampleSnippet: `scout1 = Scout(2)
scout2 = Scout(2)
scout1.explore()
scout2.explore()`,
    starterCode: `# Instantiate two distinct Scout objects:
class Scout:
    def __init__(self, paces):
        self.paces = paces

    def scout_ahead(self):
        move_forward(self.paces)
        collect()

scout_a = Scout(2)
scout_b = Scout(2)

scout_a.scout_ahead()
scout_b.scout_ahead()
`,
    solutionCode: `class Scout:
    def __init__(self, paces):
        self.paces = paces

    def scout_ahead(self):
        move_forward(self.paces)
        collect()

scout_a = Scout(2)
scout_b = Scout(2)

scout_a.scout_ahead()
scout_b.scout_ahead()`,
    hints: [
      'scout_a moves 2 paces and collects ruby 1.',
      'scout_b moves 2 paces and collects ruby 2.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect both Scout Rubies' },
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
        { id: 'r1', type: 'crystal', x: 2, y: 1, name: 'Scout Ruby 1' },
        { id: 'r2', type: 'crystal', x: 4, y: 1, name: 'Scout Ruby 2' },
      ],
    },
    xpReward: 370,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect both rubies',
      star2: 'Two class instances utilized',
      star3: 'Flawless execution',
    },
  },
  {
    id: 'w6_m4',
    worldId: 6,
    title: 'Dynamic State Evolution',
    chapterName: 'Modifying State',
    order: 4,
    conceptTitle: 'Updating Instance Attributes',
    conceptSummary: 'Methods can mutate internal state variables across operations.',
    conceptDetails: 'An object remembers its state over time. Methods can increment counters, toggle flags, or alter lists attached to `self`.',
    exampleSnippet: `class Battery:
    def __init__(self):
        self.charge = 1

    def boost(self):
        self.charge += 1`,
    starterCode: `# Build a Walker that accelerates on each step:
class AcceleratingWalker:
    def __init__(self):
        self.speed = 1

    def step(self):
        move_forward(self.speed)
        self.speed += 1

walker = AcceleratingWalker()
walker.step() # moves 1 (to tile 1)
walker.step() # moves 2 (to tile 3)
collect()
`,
    solutionCode: `class AcceleratingWalker:
    def __init__(self):
        self.speed = 1

    def step(self):
        move_forward(self.speed)
        self.speed += 1

walker = AcceleratingWalker()
walker.step()
walker.step()
collect()`,
    hints: [
      'The first step moves 1 space (tile 0 -> 1) and sets speed = 2.',
      'The second step moves 2 spaces (tile 1 -> 3). Then collect the gem!',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Kinetic Gem' },
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
        { id: 'kg1', type: 'gem', x: 3, y: 1, name: 'Kinetic Gem' },
      ],
    },
    xpReward: 380,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Kinetic Gem',
      star2: 'Mutates self.speed attribute',
      star3: 'Under 14 lines of code',
      maxLinesForStar2: 14,
    },
  },
  {
    id: 'w6_m5',
    worldId: 6,
    title: 'The Bloodline of Classes: Inheritance',
    chapterName: 'Inheritance & Subclasses',
    order: 5,
    conceptTitle: 'Class Inheritance',
    conceptSummary: 'Subclasses inherit attributes and methods from a parent superclass.',
    conceptDetails: 'Syntax: `class Child(Parent):`. The Child class inherits all behaviors of the Parent class, allowing reuse without duplication, while adding specialized features.',
    exampleSnippet: `class Unit:
    def walk(self):
        move_forward()

class Hero(Unit):
    def gather(self):
        collect()`,
    starterCode: `# Inherit from BaseUnit:
class BaseUnit:
    def march(self, steps):
        move_forward(steps)

class TreasureHunter(BaseUnit):
    def claim(self):
        collect()

hunter = TreasureHunter()
hunter.march(3)
hunter.claim()
`,
    solutionCode: `class BaseUnit:
    def march(self, steps):
        move_forward(steps)

class TreasureHunter(BaseUnit):
    def claim(self):
        collect()

hunter = TreasureHunter()
hunter.march(3)
hunter.claim()`,
    hints: [
      'TreasureHunter inherits march() from BaseUnit.',
      'hunter.march(3) moves 3 tiles, and hunter.claim() collects the relic.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Ancient Scepter' },
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
        { id: 'as1', type: 'gem', x: 3, y: 1, name: 'Ancient Scepter' },
      ],
    },
    xpReward: 390,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Ancient Scepter',
      star2: 'Inherits methods from parent class',
      star3: 'Clean execution',
    },
  },
  {
    id: 'w6_m6',
    worldId: 6,
    title: 'Super Invocations: super()',
    chapterName: 'Overriding & super()',
    order: 6,
    conceptTitle: 'Method Overriding and super()',
    conceptSummary: 'Extend parent functionality using super() within overridden methods.',
    conceptDetails: 'When a subclass defines a method with the same name as its parent, it overrides it. Call `super().method_name()` to execute the parent logic before or after adding new actions.',
    exampleSnippet: `class Base:
    def act(self):
        move_forward()

class Extended(Base):
    def act(self):
        super().act()
        collect()`,
    starterCode: `# Extend parent actions with super():
class Vanguard:
    def advance(self):
        move_forward(2)

class EliteVanguard(Vanguard):
    def advance(self):
        super().advance() # Moves 2 steps
        move_forward(1)   # Moves 1 additional step
        collect()

elite = EliteVanguard()
elite.advance()
`,
    solutionCode: `class Vanguard:
    def advance(self):
        move_forward(2)

class EliteVanguard(Vanguard):
    def advance(self):
        super().advance()
        move_forward(1)
        collect()

elite = EliteVanguard()
elite.advance()`,
    hints: [
      'super().advance() executes Vanguard.advance() (2 steps).',
      'The subclass adds 1 more step (total 3 steps) and collects the relic.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Elite Vanguard Relic' },
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
        { id: 'evr1', type: 'crystal', x: 3, y: 1, name: 'Vanguard Relic' },
      ],
    },
    xpReward: 400,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Vanguard Relic',
      star2: 'Uses super() call',
      star3: 'Under 14 lines of code',
      maxLinesForStar2: 14,
    },
  },
  {
    id: 'w6_m7',
    worldId: 6,
    title: 'Polymorphic Guardians',
    chapterName: 'Polymorphism',
    order: 7,
    conceptTitle: 'Polymorphism in Python',
    conceptSummary: 'Different classes can implement the same method interface.',
    conceptDetails: 'Polymorphism means \"many forms\". Different classes like `Warrior` and `Wizard` can both define a `perform()` method. You can treat them uniformly in loops.',
    exampleSnippet: `squad = [Knight(), Archer()]
for member in squad:
    member.act()`,
    starterCode: `# Run uniform actions across polymorphic objects:
class Stepper:
    def act(self):
        move_forward(2)

class Collector:
    def act(self):
        move_forward(1)
        collect()

squad = [Stepper(), Collector()]
for unit in squad:
    unit.act()
`,
    solutionCode: `class Stepper:
    def act(self):
        move_forward(2)

class Collector:
    def act(self):
        move_forward(1)
        collect()

squad = [Stepper(), Collector()]
for unit in squad:
    unit.act()`,
    hints: [
      'The loop iterates through squad and calls .act() on each unit.',
      'Stepper moves 2 tiles, then Collector moves 1 tile and collects.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Polymorphic Prism' },
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
        { id: 'poly1', type: 'gem', x: 3, y: 1, name: 'Polymorphic Prism' },
      ],
    },
    xpReward: 410,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Polymorphic Prism',
      star2: 'Iterates through polymorphic objects',
      star3: 'Flawless run',
    },
  },
  {
    id: 'w6_m8',
    worldId: 6,
    title: 'The Shield of Encapsulation',
    chapterName: 'Encapsulation & Privacy',
    order: 8,
    conceptTitle: 'Encapsulation and Getter Methods',
    conceptSummary: 'Hide internal state using underscore naming and expose safe getter methods.',
    conceptDetails: 'In Python, an underscore prefix `_attribute` signals that a variable is intended for internal use only. Getter methods like `get_distance()` provide controlled access.',
    exampleSnippet: `class Vault:
    def __init__(self, key):
        self._key = key
    def get_key(self):
        return self._key`,
    starterCode: `# Access internal state safely via getter methods:
class FortressGate:
    def __init__(self, paces):
        self._paces = paces

    def get_paces(self):
        return self._paces

gate = FortressGate(4)
steps = gate.get_paces()
move_forward(steps)
collect()
`,
    solutionCode: `class FortressGate:
    def __init__(self, paces):
        self._paces = paces

    def get_paces(self):
        return self._paces

gate = FortressGate(4)
steps = gate.get_paces()
move_forward(steps)
collect()`,
    hints: [
      'gate.get_paces() returns the private attribute _paces (4).',
      'Move forward 4 tiles and collect the Gate Key.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Retrieve Fortress Gate Key' },
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
        { id: 'gk1', type: 'key', x: 4, y: 1, name: 'Gate Key' },
      ],
    },
    xpReward: 420,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Gate Key',
      star2: 'Uses encapsulation with getter',
      star3: 'Under 14 lines',
      maxLinesForStar2: 14,
    },
  },
  {
    id: 'w6_m9',
    worldId: 6,
    title: 'The Inscription of __str__',
    chapterName: 'Dunder Magic Methods',
    order: 9,
    conceptTitle: 'String Representation with __str__',
    conceptSummary: 'Define readable string output for objects using the special __str__ method.',
    conceptDetails: 'Double-underscore (\"dunder\") methods define special behaviors. Defining `__str__(self)` determines what `print(obj)` or `str(obj)` outputs.',
    exampleSnippet: `class Artifact:
    def __str__(self):
        return "Rune of Power"

a = Artifact()
print(a)`,
    starterCode: `# Implement __str__ on the Guardian class:
class Guardian:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Guardian {self.name}"

g = Guardian("Ironheart")
say(str(g))
move_forward(3)
collect()
`,
    solutionCode: `class Guardian:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Guardian {self.name}"

g = Guardian("Ironheart")
say(str(g))
move_forward(3)
collect()`,
    hints: [
      'str(g) calls g.__str__(), returning "Guardian Ironheart".',
      'say() announces the guardian, then move forward 3 paces.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Guardian Heart' },
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
        { id: 'gh1', type: 'crystal', x: 3, y: 1, name: 'Guardian Heart' },
      ],
    },
    xpReward: 430,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Guardian Heart',
      star2: 'Implements __str__ dunder method',
      star3: 'Flawless run',
    },
  },
  {
    id: 'w6_m10',
    worldId: 6,
    title: 'The Golem Architect Capstone',
    chapterName: 'World 6 Capstone Boss',
    order: 10,
    conceptTitle: 'Full OOP Architecture Capstone',
    conceptSummary: 'Synthesize classes, methods, and loops to clear the Great Fortress of Constructors.',
    conceptDetails: 'You face the Golem Master. Construct an autonomous Navigator class that coordinates walking, turning, and harvesting across all 3 fortress chambers to reach the Master Portal!',
    exampleSnippet: `class Navigator:
    def circuit(self):
        for _ in range(3):
            move_forward(2)
            collect()
            turn_right()`,
    starterCode: `# Build the Master Navigator class:
class FortressNavigator:
    def __init__(self, stride):
        self.stride = stride

    def navigate_chamber(self):
        move_forward(self.stride)
        collect()
        turn_right()

nav = FortressNavigator(2)
for _ in range(3):
    nav.navigate_chamber()

jump() # Leap into the Master Portal!
`,
    solutionCode: `class FortressNavigator:
    def __init__(self, stride):
        self.stride = stride

    def navigate_chamber(self):
        move_forward(self.stride)
        collect()
        turn_right()

nav = FortressNavigator(2)
for _ in range(3):
    nav.navigate_chamber()

jump()`,
    hints: [
      'nav.navigate_chamber() moves self.stride (2 paces), collects, and turns right.',
      'Looping 3 times gathers all 3 constructor cores.',
      'A final jump() carries you to the center portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Constructor Cores' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the Fortress Constructor Portal' },
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
        { id: 'cc1', type: 'crystal', x: 2, y: 1, name: 'Core Alpha' },
        { id: 'cc2', type: 'crystal', x: 2, y: 3, name: 'Core Beta' },
        { id: 'cc3', type: 'crystal', x: 0, y: 3, name: 'Core Gamma' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 500,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all cores and enter portal',
      star2: 'Autonomous class navigation',
      star3: 'Boss trial cleared flawlessly',
      maxLinesForStar2: 15,
    },
  },
];
