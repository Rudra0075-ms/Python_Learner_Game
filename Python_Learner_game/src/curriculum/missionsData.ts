import { Mission } from '../types/game';
import { WORLD_1_MISSIONS } from './worlds/world1';
import { WORLD_2_MISSIONS } from './worlds/world2';
import { WORLD_3_MISSIONS } from './worlds/world3';
import { WORLD_4_MISSIONS } from './worlds/world4';
import { WORLD_5_MISSIONS } from './worlds/world5';
import { WORLD_6_MISSIONS } from './worlds/world6';
import { WORLD_7_MISSIONS } from './worlds/world7';
import { WORLD_8_MISSIONS } from './worlds/world8';
import { WORLD_9_MISSIONS } from './worlds/world9';
import { WORLD_10_MISSIONS } from './worlds/world10';
import { WORLD_11_MISSIONS } from './worlds/world11';
import { WORLD_12_MISSIONS } from './worlds/world12';
import { WORLD_13_MISSIONS } from './worlds/world13';
import { WORLD_14_MISSIONS } from './worlds/world14';
import { WORLD_15_MISSIONS } from './worlds/world15';

// Master list of all 150 playable missions across all 15 fantasy coding worlds
export const MISSIONS_DATA: Mission[] = [
  ...WORLD_1_MISSIONS,
  ...WORLD_2_MISSIONS,
  ...WORLD_3_MISSIONS,
  ...WORLD_4_MISSIONS,
  ...WORLD_5_MISSIONS,
  ...WORLD_6_MISSIONS,
  ...WORLD_7_MISSIONS,
  ...WORLD_8_MISSIONS,
  ...WORLD_9_MISSIONS,
  ...WORLD_10_MISSIONS,
  ...WORLD_11_MISSIONS,
  ...WORLD_12_MISSIONS,
  ...WORLD_13_MISSIONS,
  ...WORLD_14_MISSIONS,
  ...WORLD_15_MISSIONS,
];

// Helper functions for curriculum lookups
export function getMissionsByWorld(worldId: number): Mission[] {
  return MISSIONS_DATA.filter((m) => m.worldId === worldId);
}

export function getMissionById(missionId: string): Mission | undefined {
  return MISSIONS_DATA.find((m) => m.id === missionId);
}

export function getNextMission(currentMissionId: string): Mission | undefined {
  const current = getMissionById(currentMissionId);
  if (!current) return undefined;

  // Try next mission in current world
  const nextInWorld = MISSIONS_DATA.find(
    (m) => m.worldId === current.worldId && m.order === current.order + 1
  );
  if (nextInWorld) return nextInWorld;

  // Try first mission of next world
  const firstInNextWorld = MISSIONS_DATA.find(
    (m) => m.worldId === current.worldId + 1 && m.order === 1
  );
  return firstInNextWorld;
}
