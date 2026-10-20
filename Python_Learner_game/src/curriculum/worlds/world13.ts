import { Mission } from '../../types/game';

export const WORLD_13_MISSIONS: Mission[] = [
  {
    id: 'w13_m1',
    worldId: 13,
    title: 'The Async Gateway',
    chapterName: 'Coroutines & Async',
    order: 1,
    conceptTitle: 'The async def Declaration',
    conceptSummary: 'Define asynchronous functions (coroutines) using the async def keyword.',
    conceptDetails: 'In modern Python, functions declared with `async def` produce coroutines. They allow non-blocking operations where multiple tasks can yield execution while awaiting data or time.',
    exampleSnippet: `async def cast_spell():
    return "Lumos"`,
    starterCode: `# Define an asynchronous step planner coroutine:
async def plan_journey():
    return 3

# Execute planned steps:
paces = 3
move_forward(paces)
collect()
`,
    solutionCode: `async def plan_journey():
    return 3

paces = 3
move_forward(paces)
collect()`,
    hints: [
      'async def defines a coroutine function in Python 3.12.',
      'move_forward(3) navigates right to the Temporal Rift Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Temporal Rift Crystal' },
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
        { id: 'trc', type: 'crystal', x: 3, y: 1, name: 'Temporal Rift Crystal' },
      ],
    },
    xpReward: 550,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Temporal Rift Crystal',
      star2: 'Defines async coroutine',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w13_m2',
    worldId: 13,
    title: 'The Await Inscription',
    chapterName: 'Awaiting Coroutines',
    order: 2,
    conceptTitle: 'The await Keyword',
    conceptSummary: 'Use await inside async functions to pause until an asynchronous operation finishes.',
    conceptDetails: 'When a coroutine executes `await other_task()`, it pauses execution of that specific function and lets other tasks run in the event loop until the awaited result is ready.',
    exampleSnippet: `async def run():
    res = await fetch_power()
    return res`,
    starterCode: `# Build coroutine sequence:
async def fetch_paces():
    return 4

async def execute():
    # Await pace value:
    paces = await fetch_paces()
    return paces

# Advance 4 paces:
move_forward(4)
collect()
`,
    solutionCode: `async def fetch_paces():
    return 4

async def execute():
    paces = await fetch_paces()
    return paces

move_forward(4)
collect()`,
    hints: [
      'await pauses until fetch_paces() resolves to 4.',
      'move_forward(4) reaches the Chrono Rune.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Chrono Rune' },
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
        { id: 'cr1', type: 'crystal', x: 4, y: 1, name: 'Chrono Rune' },
      ],
    },
    xpReward: 560,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Chrono Rune',
      star2: 'Awaits coroutine result',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w13_m3',
    worldId: 13,
    title: 'Simulated Non-Blocking Delays',
    chapterName: 'Asynchronous Sleep',
    order: 3,
    conceptTitle: 'asyncio.sleep Concepts',
    conceptSummary: 'Non-blocking pauses allow other operations to proceed without freezing the thread.',
    conceptDetails: 'Unlike `time.sleep()` which blocks the entire OS thread, `await asyncio.sleep()` releases control to the event loop so background tasks and UI frames keep rendering smoothly.',
    exampleSnippet: `async def count():
    await asyncio.sleep(0.1)
    return 1`,
    starterCode: `# Simulate an async delay pipeline:
async def charge_and_move():
    # Simulated async charging step:
    charge_level = 1 + 1 + 1 # 3 units
    return charge_level

paces = 3
move_forward(paces)
collect()
`,
    solutionCode: `async def charge_and_move():
    charge_level = 1 + 1 + 1
    return charge_level

paces = 3
move_forward(paces)
collect()`,
    hints: [
      'The simulated delay yields 3 units of movement.',
      'move_forward(3) collects the Pulse Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Pulse Crystal' },
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
        { id: 'pc2', type: 'crystal', x: 3, y: 1, name: 'Pulse Crystal' },
      ],
    },
    xpReward: 570,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Pulse Crystal',
      star2: 'Structures async charging routine',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w13_m4',
    worldId: 13,
    title: 'Gathering Concurrent Results',
    chapterName: 'Concurrent Tasks',
    order: 4,
    conceptTitle: 'asyncio.gather Pattern',
    conceptSummary: 'Run multiple coroutines concurrently and aggregate all returned values.',
    conceptDetails: '`asyncio.gather(task1(), task2(), ...)` fires multiple tasks at the same time and collects their results into a list. This provides massive speedups for independent operations.',
    exampleSnippet: `results = await asyncio.gather(task_a(), task_b())`,
    starterCode: `# Simulate gathering 2 scout reports:
async def scout_north(): return 2
async def scout_east(): return 2

# Total distance from both scouts:
total_stride = 2 + 2 # 4 paces
move_forward(total_stride)
collect()
`,
    solutionCode: `async def scout_north(): return 2
async def scout_east(): return 2

total_stride = 2 + 2
move_forward(total_stride)
collect()`,
    hints: [
      'Combined scout distance is 4 paces.',
      'move_forward(4) reaches the Concurrency Glyph.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Concurrency Glyph' },
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
        { id: 'cg1', type: 'crystal', x: 4, y: 1, name: 'Concurrency Glyph' },
      ],
    },
    xpReward: 580,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Concurrency Glyph',
      star2: 'Simulates concurrent gather',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w13_m5',
    worldId: 13,
    title: 'Asynchronous Iterators',
    chapterName: 'Async Loops',
    order: 5,
    conceptTitle: 'async for Loops',
    conceptSummary: 'Iterate over streams of data that arrive asynchronously over time.',
    conceptDetails: 'When data arrives chunk by chunk (like websockets or database cursors), `async for item in async_stream:` allows reading each element as it arrives without waiting for the whole stream.',
    exampleSnippet: `async for message in stream:
    process(message)`,
    starterCode: `# Simulate processing stream items:
stream_chunks = [1, 2, 1]
total = sum(stream_chunks) # 4 paces

move_forward(total)
collect()
`,
    solutionCode: `stream_chunks = [1, 2, 1]
total = sum(stream_chunks)

move_forward(total)
collect()`,
    hints: [
      'The chunks sum up to 4 paces.',
      'move_forward(4) collects the Stream Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Stream Crystal' },
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
        { id: 'sc2', type: 'crystal', x: 4, y: 1, name: 'Stream Crystal' },
      ],
    },
    xpReward: 590,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Stream Crystal',
      star2: 'Processes stream chunks',
      star3: 'Under 6 lines of code',
      maxLinesForStar2: 6,
    },
  },
  {
    id: 'w13_m6',
    worldId: 13,
    title: 'Handling Async Timeouts',
    chapterName: 'Timeouts & Safeguards',
    order: 6,
    conceptTitle: 'asyncio.wait_for & Timeout Handling',
    conceptSummary: 'Bound long-running operations with a maximum time limit to prevent hanging.',
    conceptDetails: 'Network or database calls can hang indefinitely. Using `asyncio.wait_for(task(), timeout=seconds)` raises `TimeoutError` if the task exceeds the allocated time limit.',
    exampleSnippet: `try:
    await asyncio.wait_for(fetch(), timeout=2.0)
except TimeoutError:
    handle_timeout()`,
    starterCode: `# Handle timeout fallback gracefully:
timeout_occurred = True
if timeout_occurred:
    # Use fallback safety distance:
    paces = 3
else:
    paces = 10

move_forward(paces)
collect()
`,
    solutionCode: `timeout_occurred = True
if timeout_occurred:
    paces = 3
else:
    paces = 10

move_forward(paces)
collect()`,
    hints: [
      'Timeout fallback selects 3 paces.',
      'move_forward(3) lands right on the Timeout Ward.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Timeout Ward' },
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
        { id: 'tw1', type: 'crystal', x: 3, y: 1, name: 'Timeout Ward' },
      ],
    },
    xpReward: 600,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Timeout Ward',
      star2: 'Implements timeout fallback branch',
      star3: 'Under 9 lines of code',
      maxLinesForStar2: 9,
    },
  },
  {
    id: 'w13_m7',
    worldId: 13,
    title: 'The Async Queue Buffer',
    chapterName: 'Producer-Consumer Pipelines',
    order: 7,
    conceptTitle: 'asyncio.Queue Coordination',
    conceptSummary: 'Coordinate producer and consumer tasks safely with FIFO queues.',
    conceptDetails: 'An asynchronous queue allows multiple worker tasks to pull work items as they become available without race conditions or memory locks.',
    exampleSnippet: `queue = asyncio.Queue()
await queue.put(item)
item = await queue.get()`,
    starterCode: `# Simulate a work queue buffer:
work_queue = [2, 1, 1] # Task step lengths
total_work = sum(work_queue) # 4

move_forward(total_work)
collect()
`,
    solutionCode: `work_queue = [2, 1, 1]
total_work = sum(work_queue)

move_forward(total_work)
collect()`,
    hints: [
      'Queue items sum to 4 paces.',
      'move_forward(4) reaches the Pipeline Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Pipeline Crystal' },
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
        { id: 'plc', type: 'crystal', x: 4, y: 1, name: 'Pipeline Crystal' },
      ],
    },
    xpReward: 610,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Pipeline Crystal',
      star2: 'Simulates queue aggregation',
      star3: 'Under 6 lines of code',
      maxLinesForStar2: 6,
    },
  },
  {
    id: 'w13_m8',
    worldId: 13,
    title: 'The Event Loop Conductor',
    chapterName: 'Event Loop Architecture',
    order: 8,
    conceptTitle: 'Single-Threaded Cooperative Concurrency',
    conceptSummary: 'Understand how the event loop switches between paused tasks on one thread.',
    conceptDetails: 'Python async is cooperative multitasking: it runs on a single thread. Tasks must explicitly `await` or yield to allow other tasks to execute. CPU-heavy synchronous loops block the entire loop.',
    exampleSnippet: `# Async yields at await:
# await task1()
# await task2()`,
    starterCode: `# Build coordinated coroutine scheduler:
def schedule_tasks():
    t1 = 2
    t2 = 3
    return t1 + t2 # 5 paces

stride = schedule_tasks()
move_forward(stride)
collect()
`,
    solutionCode: `def schedule_tasks():
    t1 = 2
    t2 = 3
    return t1 + t2

stride = schedule_tasks()
move_forward(stride)
collect()`,
    hints: [
      'schedule_tasks() returns 5.',
      'move_forward(5) lands on the Conductor Glyph.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Conductor Glyph' },
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
        { id: 'cg2', type: 'crystal', x: 5, y: 1, name: 'Conductor Glyph' },
      ],
    },
    xpReward: 620,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Conductor Glyph',
      star2: 'Implements task scheduler function',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w13_m9',
    worldId: 13,
    title: 'Async Context Managers',
    chapterName: 'Async Resources',
    order: 9,
    conceptTitle: 'async with Statements',
    conceptSummary: 'Manage resources that require asynchronous setup and teardown.',
    conceptDetails: 'Network sessions and database pools often need asynchronous handshakes and cleanup. `async with aiohttp.ClientSession() as session:` handles async enter and exit automatically.',
    exampleSnippet: `async with session.get(url) as response:
    data = await response.text()`,
    starterCode: `# Simulate an async resource context:
class MockAsyncSession:
    def get_stride(self):
        return 4

session = MockAsyncSession()
stride = session.get_stride()

move_forward(stride)
collect()
`,
    solutionCode: `class MockAsyncSession:
    def get_stride(self):
        return 4

session = MockAsyncSession()
stride = session.get_stride()

move_forward(stride)
collect()`,
    hints: [
      'session.get_stride() returns 4.',
      'move_forward(4) reaches the Async Resource Rune.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Async Resource Rune' },
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
        { id: 'arr', type: 'crystal', x: 4, y: 1, name: 'Async Resource Rune' },
      ],
    },
    xpReward: 630,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Async Resource Rune',
      star2: 'Defines session resource accessor',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w13_m10',
    worldId: 13,
    title: 'The Temporal Rift Grand Boss Trial',
    chapterName: 'World 13 Capstone Boss',
    order: 10,
    conceptTitle: 'Master of Asynchronous Concurrency',
    conceptSummary: 'Orchestrate 3 concurrent temporal pathways to collect all rift chronoliths and enter the Rift Portal.',
    conceptDetails: 'The Chrono Wyrm warps time around the central void. Synchronize 3 asynchronous pathways using loop iterations and jump across the cosmic rift into the Portal!',
    exampleSnippet: `for chamber in [2, 2, 2]:
    move_forward(chamber)
    collect()
    turn_right()
jump()`,
    starterCode: `# Boss Trial: Synchronize all 3 temporal rift pathways:
temporal_strides = [2, 2, 2]

for paces in temporal_strides:
    move_forward(paces)
    collect()
    turn_right()

jump() # Leap into the Temporal Rift Portal!
`,
    solutionCode: `temporal_strides = [2, 2, 2]

for paces in temporal_strides:
    move_forward(paces)
    collect()
    turn_right()

jump()`,
    hints: [
      'The loop traverses all 3 temporal coordinates.',
      'Collect each Chronolith and turn right.',
      'jump() breaches the center portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Chronoliths' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the Temporal Rift Portal' },
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
        { id: 'cl1', type: 'crystal', x: 2, y: 1, name: 'North Chronolith' },
        { id: 'cl2', type: 'crystal', x: 2, y: 3, name: 'East Chronolith' },
        { id: 'cl3', type: 'crystal', x: 0, y: 3, name: 'South Chronolith' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 650,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all chronoliths & enter portal',
      star2: 'Iterates temporal strides cleanly',
      star3: 'Boss trial cleared with zero errors',
      maxLinesForStar2: 10,
    },
  },
];
