export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Coordinates {
  x: number;
  y: number;
}

export type TileType = 
  | 'grass' 
  | 'path' 
  | 'water' 
  | 'wall' 
  | 'bridge' 
  | 'ice' 
  | 'stone' 
  | 'portal' 
  | 'gate'
  | 'lava'
  | 'wood_floor';

export type EntityType = 
  | 'gem' 
  | 'crystal' 
  | 'coin' 
  | 'key' 
  | 'scroll' 
  | 'potion' 
  | 'chest' 
  | 'lever' 
  | 'gate' 
  | 'portal' 
  | 'goblin' 
  | 'golem' 
  | 'flower';

export interface GameEntity {
  id: string;
  type: EntityType;
  x: number;
  y: number;
  name?: string;
  collected?: boolean;
  active?: boolean;
  color?: string;
  requiredKey?: string;
  health?: number;
}

export interface LevelGoal {
  id: string;
  description: string;
  type: 
    | 'collect_all' 
    | 'collect_item' 
    | 'reach_portal' 
    | 'open_gate' 
    | 'defeat_enemy' 
    | 'output_match' 
    | 'code_lines_limit';
  targetValue?: any;
}

export interface MapData {
  id?: string;
  name?: string;
  theme?: string;
  width: number;
  height: number;
  tiles: TileType[][];
  playerStart: Coordinates;
  playerDirection: Direction;
  entities: GameEntity[];
  portalPosition?: Coordinates;
}

export interface Mission {
  id: string;
  worldId: number;
  title: string;
  chapterName: string;
  order: number;
  conceptTitle: string;
  conceptSummary: string;
  conceptDetails: string;
  exampleSnippet: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
  goals: LevelGoal[];
  map: MapData;
  xpReward: number;
  maxStars: number;
  starCriteria: {
    star1: string;
    star2: string; // e.g. "Complete with <= 5 lines" or "Use a for loop"
    star3: string; // e.g. "Collect all bonus crystals" or "No syntax errors on 1st run"
    maxLinesForStar2?: number;
    requiredKeywordForStar2?: string;
  };
}

export interface WorldInfo {
  id: number;
  title: string;
  subtitle: string;
  theme: string;
  accentColor: string;
  badgeName: string;
  iconName: string;
  lore: string;
  missionsCount: number;
  mapCoords: { x: number; y: number };
}

export interface GameStep {
  type: 'move' | 'turn' | 'jump' | 'collect' | 'interact' | 'open_door' | 'attack' | 'say' | 'log' | 'defeat' | 'error';
  direction?: Direction;
  from?: Coordinates;
  to?: Coordinates;
  targetEntityId?: string;
  message?: string;
  success?: boolean;
}

export interface ExecutionResult {
  success: boolean;
  stdout: string[];
  stderr: string[];
  steps: GameStep[];
  error?: string;
  executionTimeMs: number;
  finalPosition?: Coordinates;
  finalDirection?: Direction;
  collectedEntities?: string[];
  goalsAchieved?: Record<string, boolean>;
  allGoalsMet?: boolean;
}

export interface PlayerCustomization {
  name: string;
  archetype: 'sorcerer' | 'ranger' | 'knight' | 'artificer';
  cloakColor: string;
  skinTone: string;
  wandStyle: 'crystal' | 'oak' | 'arcane' | 'stellar';
  familiar: 'owl' | 'dragon' | 'robot' | 'fox';
}

export interface CompletedMissionData {
  stars: number;
  bestCode: string;
  completedAt: string;
  xpEarned: number;
}

export interface PlayerProgress {
  customization: PlayerCustomization;
  xp: number;
  level: number;
  stars: number;
  completedMissions: Record<string, CompletedMissionData>;
  currentMissionId: string;
  unlockedWorldIds: number[];
  unlockedBadges: string[];
  streakDays: number;
  lastPlayedDate: string;
  totalExecutions: number;
}

export interface GameSettings {
  soundVolume: number;
  sfxEnabled: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast' | 'instant';
  editorFontSize: 'sm' | 'md' | 'lg';
  reducedMotion: boolean;
  theme: 'dark' | 'slate';
}

export type ActiveScreen = 
  | 'title' 
  | 'world_map' 
  | 'gameplay' 
  | 'customizer' 
  | 'codex' 
  | 'dashboard' 
  | 'challenges' 
  | 'workshop' 
  | 'settings';
