export interface CodexEntry {
  id: string;
  category: string;
  title: string;
  syntax: string;
  description: string;
  explanation: string;
  codeExample: string;
  outputExample: string;
  tips: string[];
}

export const CODEX_ENTRIES: CodexEntry[] = [
  {
    id: 'game_api',
    category: 'Game Engine API',
    title: 'Game Commands Reference',
    syntax: 'move_forward(steps=1) | turn_left() | turn_right() | collect() | jump() | interact() | open_door() | say(text) | see_ahead()',
    description: 'Commands to direct your hero in Python Quest.',
    explanation: 'These built-in functions allow your Python code to control your hero on the 2D adventure canvas. They can be placed inside loops, functions, and conditionals just like any Python statements.',
    codeExample: `# Patrol and collect
move_forward(2)
collect()
turn_right()
jump()
say("Tile cleared!")`,
    outputExample: `🧙 "Tile cleared!"`,
    tips: [
      'move_forward(n) accepts an integer to walk n tiles at once.',
      'turn_left() and turn_right() pivot 90 degrees.',
      'jump() leaps 2 tiles forward, skipping over water or hazard tiles.',
      'see_ahead() returns "wall", "water", "gem", or "empty".',
    ],
  },
  {
    id: 'variables',
    category: 'Basics & Syntax',
    title: 'Variables & Data Types',
    syntax: 'variable_name = value',
    description: 'Store values in named containers: integers, floats, strings, and booleans.',
    explanation: 'Variables are assigned using the = sign. Python dynamically infers the type of value assigned. Variable names must start with a letter or underscore and cannot contain spaces.',
    codeExample: `hero_name = "Aethelgard"  # str (string)
level = 5                # int (integer)
mana_ratio = 0.85        # float (decimal)
is_alive = True          # bool (boolean)

print(f"{hero_name} is level {level}")`,
    outputExample: `Aethelgard is level 5`,
    tips: [
      'Use descriptive snake_case names like player_speed or coin_count.',
      'Boolean values must be capitalized: True and False.',
      'Convert between types with int("5"), str(10), or float(3).',
    ],
  },
  {
    id: 'conditionals',
    category: 'Control Flow',
    title: 'Conditionals (if, elif, else)',
    syntax: 'if condition:\n    ...\nelif other_condition:\n    ...\nelse:\n    ...',
    description: 'Execute different code paths based on whether expressions evaluate to True or False.',
    explanation: 'Indentation (4 spaces) is required in Python to show which statements belong to which branch. Comparison operators include == (equal), != (not equal), <, >, <=, >=.',
    codeExample: `coins = 15

if coins >= 20:
    print("Can buy Diamond Sword")
elif coins >= 10:
    print("Can buy Silver Shield")
else:
    print("Need more coins")`,
    outputExample: `Can buy Silver Shield`,
    tips: [
      'Do not confuse = (assignment) with == (comparison).',
      'Combine conditions using and, or, and not.',
    ],
  },
  {
    id: 'for_loops',
    category: 'Control Flow',
    title: 'For Loops & range()',
    syntax: 'for item in sequence:\n    ...',
    description: 'Iterate over sequences of numbers, items in a list, or characters in a string.',
    explanation: 'range(stop) produces numbers from 0 up to stop-1. range(start, stop, step) allows customized steps.',
    codeExample: `# Count steps
for i in range(1, 4):
    print(f"Step {i}")

# Iterate over a list
runes = ["Fire", "Ice", "Lightning"]
for rune in runes:
    print(f"Equipped {rune}")`,
    outputExample: `Step 1\nStep 2\nStep 3\nEquipped Fire\nEquipped Ice\nEquipped Lightning`,
    tips: [
      'range(5) runs 5 times: 0, 1, 2, 3, 4.',
      'Use break to exit early and continue to skip to the next iteration.',
    ],
  },
  {
    id: 'while_loops',
    category: 'Control Flow',
    title: 'While Loops',
    syntax: 'while condition:\n    ...',
    description: 'Repeat a block of code as long as the condition evaluates to True.',
    explanation: 'Ensure the loop condition eventually becomes False, or use break, otherwise an infinite loop will occur.',
    codeExample: `mana = 3
while mana > 0:
    print(f"Casting spell! Mana left: {mana}")
    mana -= 1
print("Out of mana!")`,
    outputExample: `Casting spell! Mana left: 3\nCasting spell! Mana left: 2\nCasting spell! Mana left: 1\nOut of mana!`,
    tips: [
      'Always modify the loop control variable inside the loop body.',
    ],
  },
  {
    id: 'lists',
    category: 'Data Structures',
    title: 'Lists & Indexing',
    syntax: 'my_list = [item1, item2, item3]',
    description: 'Ordered, mutable sequences of values.',
    explanation: 'Elements in a list are zero-indexed: my_list[0] is the first element. Negative indices count from the back: my_list[-1] is the last item.',
    codeExample: `inventory = ["Wooden Staff", "Health Potion"]
inventory.append("Spellbook")
print("First item:", inventory[0])
print("Inventory length:", len(inventory))`,
    outputExample: `First item: Wooden Staff\nInventory length: 3`,
    tips: [
      'Use .append(x) to add an item to the end.',
      'Use .pop() to remove and return the last item.',
      'Slice with list[start:end]: runes[0:2] grabs the first two items.',
    ],
  },
  {
    id: 'dictionaries',
    category: 'Data Structures',
    title: 'Dictionaries (Key-Value)',
    syntax: 'my_dict = {"key1": value1, "key2": value2}',
    description: 'Unordered key-value mappings for rapid associative lookups.',
    explanation: 'Dictionaries allow you to associate identifiers with values. Look up values with square brackets or .get().',
    codeExample: `spells = {
    "fireball": 25,
    "frostbolt": 15,
    "teleport": 50
}
print("Fireball cost:", spells["fireball"])`,
    outputExample: `Fireball cost: 25`,
    tips: [
      'Keys are usually strings, but can be numbers or tuples.',
      'Use .keys(), .values(), and .items() to iterate through dictionaries.',
    ],
  },
  {
    id: 'functions',
    category: 'Functions & Modules',
    title: 'Functions (def, return)',
    syntax: 'def function_name(param1, param2):\n    return result',
    description: 'Package reusable blocks of logic that can receive parameters and return values.',
    explanation: 'Functions prevent code repetition. The return statement sends a computed value back to the caller.',
    codeExample: `def calculate_damage(base_attack, multiplier=1.5):
    return int(base_attack * multiplier)

crit = calculate_damage(20)
print(f"Critical strike: {crit} dmg")`,
    outputExample: `Critical strike: 30 dmg`,
    tips: [
      'Default parameter values can be specified: def heal(amount=10):',
      'Variables created inside a function are local to that function.',
    ],
  },
  {
    id: 'classes',
    category: 'Object-Oriented Programming',
    title: 'Classes and Objects',
    syntax: 'class Name:\n    def __init__(self, arg):\n        self.arg = arg',
    description: 'Blueprints for creating objects with shared behaviors and internal state.',
    explanation: 'Classes encapsulate data (attributes) and functions (methods). self refers to the specific instance of the object.',
    codeExample: `class Knight:
    def __init__(self, name, shield_points):
        self.name = name
        self.shield = shield_points

    def take_hit(self, damage):
        self.shield = max(0, self.shield - damage)
        print(f"{self.name} shield remaining: {self.shield}")

paladin = Knight("Galahad", 50)
paladin.take_hit(20)`,
    outputExample: `Galahad shield remaining: 30`,
    tips: [
      'Always include self as the first parameter of instance methods.',
      'Inherit from base classes with class Paladin(Knight):',
    ],
  },
  {
    id: 'errors',
    category: 'Error Handling',
    title: 'Exceptions (try, except)',
    syntax: 'try:\n    ...\nexcept ErrorType as e:\n    ...\nfinally:\n    ...',
    description: 'Gracefully intercept and handle runtime errors without crashing the program.',
    explanation: 'Code in the try block runs first. If an error occurs, execution jumps straight to the matching except block.',
    codeExample: `try:
    number = int("invalid_number")
except ValueError:
    print("Could not parse number, using default 0")
    number = 0`,
    outputExample: `Could not parse number, using default 0`,
    tips: [
      'Catch specific exceptions like ValueError, KeyError, IndexError instead of bare except.',
      'Use finally: to run cleanup code regardless of success or failure.',
    ],
  },
];
