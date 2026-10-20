import { Mission } from '../../types/game';

export const WORLD_14_MISSIONS: Mission[] = [
  {
    id: 'w14_m1',
    worldId: 14,
    title: 'The Mean Altitude',
    chapterName: 'Descriptive Statistics',
    order: 1,
    conceptTitle: 'Calculating the Arithmetic Mean',
    conceptSummary: 'Compute the average of a collection using sum() and len().',
    conceptDetails: 'The arithmetic mean is calculated as the total sum of all values divided by the number of observations: `mean = sum(values) / len(values)`. It is the most common measure of central tendency.',
    exampleSnippet: `nums = [10, 20, 30]
mean = sum(nums) / len(nums)`,
    starterCode: `# Calculate the mean star brightness reading:
readings = [2, 4, 6]
mean_reading = int(sum(readings) / len(readings)) # 4

move_forward(mean_reading)
collect()
`,
    solutionCode: `readings = [2, 4, 6]
mean_reading = int(sum(readings) / len(readings))

move_forward(mean_reading)
collect()`,
    hints: [
      '(2 + 4 + 6) / 3 = 12 / 3 = 4.',
      'move_forward(4) navigates directly to the Stellar Core.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Stellar Core' },
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
        { id: 'sc3', type: 'crystal', x: 4, y: 1, name: 'Stellar Core' },
      ],
    },
    xpReward: 600,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Stellar Core',
      star2: 'Computes arithmetic mean',
      star3: 'Under 6 lines of code',
      maxLinesForStar2: 6,
    },
  },
  {
    id: 'w14_m2',
    worldId: 14,
    title: 'The Median Meridian',
    chapterName: 'Order Statistics',
    order: 2,
    conceptTitle: 'Finding the Median Value',
    conceptSummary: 'Sort a list and find the middle element to resist outliers.',
    conceptDetails: 'Unlike the mean, the median is not skewed by extreme outliers. Sort the list with `sorted(data)` and retrieve the middle index `data[len(data) // 2]`.',
    exampleSnippet: `s = sorted([99, 1, 3]) # [1, 3, 99]
median = s[len(s) // 2] # 3`,
    starterCode: `# Find the median distance among astronomical observations:
signals = [7, 3, 1]
sorted_signals = sorted(signals) # [1, 3, 7]
median_val = sorted_signals[len(sorted_signals) // 2] # 3

move_forward(median_val)
collect()
`,
    solutionCode: `signals = [7, 3, 1]
sorted_signals = sorted(signals)
median_val = sorted_signals[len(sorted_signals) // 2]

move_forward(median_val)
collect()`,
    hints: [
      'Sorting [7, 3, 1] gives [1, 3, 7].',
      'The median is 3. move_forward(3) collects the Meridian Gem.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Meridian Gem' },
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
        { id: 'mg1', type: 'crystal', x: 3, y: 1, name: 'Meridian Gem' },
      ],
    },
    xpReward: 610,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Meridian Gem',
      star2: 'Computes median with sorted()',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w14_m3',
    worldId: 14,
    title: 'Data Cleansing & Filtering',
    chapterName: 'Data Cleaning',
    order: 3,
    conceptTitle: 'Removing Corrupted & Null Records',
    conceptSummary: 'Filter out None, invalid numbers, and negative noise before analysis.',
    conceptDetails: 'Real-world data is messy: sensors drop packets, text has typos, and missing values appear as `None`. Use list comprehensions or `filter()` to clean input datasets.',
    exampleSnippet: `clean = [x for x in raw if x is not None and x > 0]`,
    starterCode: `# Clean telescope dataset by eliminating zeroes and negative anomalies:
raw_stream = [-2, 0, 1, 2, 1]
valid_readings = [x for x in raw_stream if x > 0] # [1, 2, 1]
total_valid = sum(valid_readings) # 4 paces

move_forward(total_valid)
collect()
`,
    solutionCode: `raw_stream = [-2, 0, 1, 2, 1]
valid_readings = [x for x in raw_stream if x > 0]
total_valid = sum(valid_readings)

move_forward(total_valid)
collect()`,
    hints: [
      'Filtering x > 0 leaves [1, 2, 1].',
      'The sum of valid readings is 4.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Purified Data Crystal' },
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
        { id: 'pdc', type: 'crystal', x: 4, y: 1, name: 'Purified Data Crystal' },
      ],
    },
    xpReward: 620,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Purified Data Crystal',
      star2: 'Filters noise records with comprehension',
      star3: 'Under 7 lines of code',
      maxLinesForStar2: 7,
    },
  },
  {
    id: 'w14_m4',
    worldId: 14,
    title: 'Frequency & Mode Analysis',
    chapterName: 'Frequency Counts',
    order: 4,
    conceptTitle: 'Counting Occurrences with Dictionaries',
    conceptSummary: 'Tally categorical frequencies to find the most frequent value (mode).',
    conceptDetails: 'In data science, frequency tables show how often each label appears. In standard Python, use a dictionary `{ val: count }` or `collections.Counter` to find the most common items.',
    exampleSnippet: `counts = {}
for item in items:
    counts[item] = counts.get(item, 0) + 1`,
    starterCode: `# Calculate frequency of planetary orbits:
readings = ["Earth", "Mars", "Earth", "Earth", "Mars"]
counts = {}
for planet in readings:
    counts[planet] = counts.get(planet, 0) + 1

# Earth appears 3 times:
earth_count = counts["Earth"] # 3
move_forward(earth_count)
collect()
`,
    solutionCode: `readings = ["Earth", "Mars", "Earth", "Earth", "Mars"]
counts = {}
for planet in readings:
    counts[planet] = counts.get(planet, 0) + 1

earth_count = counts["Earth"]
move_forward(earth_count)
collect()`,
    hints: [
      'Earth appears 3 times in the observations.',
      'move_forward(3) collects the Frequency Glyph.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Frequency Glyph' },
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
        { id: 'fg1', type: 'crystal', x: 3, y: 1, name: 'Frequency Glyph' },
      ],
    },
    xpReward: 630,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Frequency Glyph',
      star2: 'Calculates frequency dictionary',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w14_m5',
    worldId: 14,
    title: 'Aggregating Tabular Records',
    chapterName: 'Data Aggregation',
    order: 5,
    conceptTitle: 'Group By & Sum Aggregations',
    conceptSummary: 'Group records by category and calculate total metrics for each group.',
    conceptDetails: 'Data analysts frequently group rows (e.g. sales by department, energy by sector) and aggregate metrics like sum, average, or max.',
    exampleSnippet: `sector_totals = {}
for row in dataset:
    sector_totals[row["cat"]] = sector_totals.get(row["cat"], 0) + row["val"]`,
    starterCode: `# Aggregate star magnitude across constellation sectors:
star_catalog = [
    {"sector": "Alpha", "light": 2},
    {"sector": "Beta", "light": 3},
    {"sector": "Alpha", "light": 2},
]

alpha_sum = sum(s["light"] for s in star_catalog if s["sector"] == "Alpha") # 4

move_forward(alpha_sum)
collect()
`,
    solutionCode: `star_catalog = [
    {"sector": "Alpha", "light": 2},
    {"sector": "Beta", "light": 3},
    {"sector": "Alpha", "light": 2},
]

alpha_sum = sum(s["light"] for s in star_catalog if s["sector"] == "Alpha")

move_forward(alpha_sum)
collect()`,
    hints: [
      'Sector Alpha has 2 + 2 = 4 light units.',
      'move_forward(4) reaches the Stellar Constellation Gem.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Constellation Gem' },
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
        { id: 'scg', type: 'crystal', x: 4, y: 1, name: 'Constellation Gem' },
      ],
    },
    xpReward: 640,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Constellation Gem',
      star2: 'Aggregates sector light values',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w14_m6',
    worldId: 14,
    title: 'Range & Variance Inspection',
    chapterName: 'Dispersion Metrics',
    order: 6,
    conceptTitle: 'Measuring Data Spread',
    conceptSummary: 'Calculate the statistical range (max - min) to assess variability.',
    conceptDetails: 'Range measures how spread out values are: `range_val = max(data) - min(data)`. Low range means stable values; high range indicates high variability.',
    exampleSnippet: `spread = max(temps) - min(temps)`,
    starterCode: `# Calculate the temperature range across solar flares:
flares = [12, 15, 17]
flare_range = max(flares) - min(flares) # 17 - 12 = 5

move_forward(flare_range)
collect()
`,
    solutionCode: `flares = [12, 15, 17]
flare_range = max(flares) - min(flares)

move_forward(flare_range)
collect()`,
    hints: [
      'max is 17, min is 12. Range is 5.',
      'move_forward(5) collects the Flare Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Flare Crystal' },
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
        { id: 'fc1', type: 'crystal', x: 5, y: 1, name: 'Flare Crystal' },
      ],
    },
    xpReward: 650,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Flare Crystal',
      star2: 'Calculates range with max and min',
      star3: 'Under 6 lines of code',
      maxLinesForStar2: 6,
    },
  },
  {
    id: 'w14_m7',
    worldId: 14,
    title: 'Transforming JSON Data Records',
    chapterName: 'JSON Pipelines',
    order: 7,
    conceptTitle: 'Extracting Nested Document Fields',
    conceptSummary: 'Map over complex JSON hierarchies to extract specific analysis targets.',
    conceptDetails: 'Modern web APIs exchange JSON payloads. Transforming nested objects into flat lists is a fundamental data engineering task.',
    exampleSnippet: `targets = [p["location"]["x"] for p in payload]`,
    starterCode: `# Extract waypoint offsets from satellite telemetry:
telemetry = [
    {"probe": "Vanguard", "specs": {"step": 2}},
    {"probe": "Cassini", "specs": {"step": 2}},
]

total_steps = sum(item["specs"]["step"] for item in telemetry) # 4

move_forward(total_steps)
collect()
`,
    solutionCode: `telemetry = [
    {"probe": "Vanguard", "specs": {"step": 2}},
    {"probe": "Cassini", "specs": {"step": 2}},
]

total_steps = sum(item["specs"]["step"] for item in telemetry)

move_forward(total_steps)
collect()`,
    hints: [
      'Extracting step yields 2 + 2 = 4.',
      'move_forward(4) collects the Telemetry Node.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Telemetry Node' },
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
        { id: 'tn1', type: 'crystal', x: 4, y: 1, name: 'Telemetry Node' },
      ],
    },
    xpReward: 660,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Telemetry Node',
      star2: 'Extracts nested dictionary values',
      star3: 'Under 10 lines of code',
      maxLinesForStar2: 10,
    },
  },
  {
    id: 'w14_m8',
    worldId: 14,
    title: 'Normalizing Metrics (Min-Max Scaling)',
    chapterName: 'Feature Scaling',
    order: 8,
    conceptTitle: 'Min-Max Normalization',
    conceptSummary: 'Rescale arbitrary numerical values to standard 0-to-1 or bounded ranges.',
    conceptDetails: 'In data science and machine learning, variables with wildly different scales are normalized so large values do not dominate smaller ones: `scaled = (x - min) / (max - min)`.',
    exampleSnippet: `scaled = [(x - min_v) / (max_v - min_v) for x in raw]`,
    starterCode: `# Scale a sensor rating between 1 and 3:
raw_val = 50
min_v = 0
max_v = 100

# Normalizes 50% across a 6-step runway:
stride = int((raw_val - min_v) / (max_v - min_v) * 6) # 3 paces

move_forward(stride)
collect()
`,
    solutionCode: `raw_val = 50
min_v = 0
max_v = 100

stride = int((raw_val - min_v) / (max_v - min_v) * 6)

move_forward(stride)
collect()`,
    hints: [
      '50 / 100 * 6 = 3.',
      'move_forward(3) collects the Normalized Crystal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Normalized Crystal' },
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
        { id: 'nc1', type: 'crystal', x: 3, y: 1, name: 'Normalized Crystal' },
      ],
    },
    xpReward: 670,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Normalized Crystal',
      star2: 'Applies min-max scaling formula',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w14_m9',
    worldId: 14,
    title: 'The Data Pipeline Operator',
    chapterName: 'ETL Pipelines',
    order: 9,
    conceptTitle: 'Extract, Transform, Load (ETL)',
    conceptSummary: 'Chain extraction, transformation, and calculation into a reusable pipeline.',
    conceptDetails: 'An ETL pipeline takes raw data from a source, cleans and aggregates it through transformation functions, and loads it into a destination analysis report.',
    exampleSnippet: `data = extract()
cleaned = transform(data)
load(cleaned)`,
    starterCode: `# Build a mini ETL pipeline:
def extract(): return [1, 2, 3]
def transform(data): return [x for x in data if x > 1] # [2, 3]
def load(data): return sum(data) # 5

paces = load(transform(extract()))
move_forward(paces)
collect()
`,
    solutionCode: `def extract(): return [1, 2, 3]
def transform(data): return [x for x in data if x > 1]
def load(data): return sum(data)

paces = load(transform(extract()))
move_forward(paces)
collect()`,
    hints: [
      'Extracts [1, 2, 3], transforms to [2, 3], loads sum = 5.',
      'move_forward(5) reaches the Pipeline Keystone.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect Pipeline Keystone' },
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
        { id: 'pks', type: 'crystal', x: 5, y: 1, name: 'Pipeline Keystone' },
      ],
    },
    xpReward: 680,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect Pipeline Keystone',
      star2: 'Implements modular ETL pipeline',
      star3: 'Under 8 lines of code',
      maxLinesForStar2: 8,
    },
  },
  {
    id: 'w14_m10',
    worldId: 14,
    title: 'The Celestial Observatory Grand Boss Trial',
    chapterName: 'World 14 Capstone Boss',
    order: 10,
    conceptTitle: 'Full Data Analysis Pipeline',
    conceptSummary: 'Process astronomical survey records, compute metrics, and unlock the Celestial Portal.',
    conceptDetails: 'The Celestial Star-Sphinx challenges you to analyze raw observation logs across 3 observatory wings. Calculate stride lengths from survey metrics and leap into the Celestial Portal!',
    exampleSnippet: `survey = [{"stride": 2}, {"stride": 2}, {"stride": 2}]
for entry in survey:
    move_forward(entry["stride"])
    collect()
    turn_right()
jump()`,
    starterCode: `# Boss Trial: Execute complete astronomical data pipeline:
survey_logs = [
    {"wing": "North", "paces": 2},
    {"wing": "East", "paces": 2},
    {"wing": "South", "paces": 2},
]

for record in survey_logs:
    move_forward(record["paces"])
    collect()
    turn_right()

jump() # Ascend into the Celestial Portal!
`,
    solutionCode: `survey_logs = [
    {"wing": "North", "paces": 2},
    {"wing": "East", "paces": 2},
    {"wing": "South", "paces": 2},
]

for record in survey_logs:
    move_forward(record["paces"])
    collect()
    turn_right()

jump()`,
    hints: [
      'Iterate over all 3 survey records.',
      'move_forward(2) and collect() in each wing.',
      'jump() leaps over the observatory basin into the portal.',
    ],
    goals: [
      { id: 'g1', type: 'collect_all', description: 'Collect all 3 Celestial Relics' },
      { id: 'g2', type: 'reach_portal', description: 'Enter the Celestial Portal' },
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
        { id: 'cr_n', type: 'crystal', x: 2, y: 1, name: 'North Celestial Relic' },
        { id: 'cr_e', type: 'crystal', x: 2, y: 3, name: 'East Celestial Relic' },
        { id: 'cr_s', type: 'crystal', x: 0, y: 3, name: 'South Celestial Relic' },
      ],
      portalPosition: { x: 1, y: 2 },
    },
    xpReward: 700,
    maxStars: 3,
    starCriteria: {
      star1: 'Collect all relics & enter portal',
      star2: 'Processes dictionary survey records',
      star3: 'Boss trial cleared with zero errors',
      maxLinesForStar2: 12,
    },
  },
];
