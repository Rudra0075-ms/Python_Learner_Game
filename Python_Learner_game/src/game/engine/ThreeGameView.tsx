import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { MapData, Coordinates, Direction, GameStep, PlayerCustomization } from '../../types/game';
import { playSound } from '../../audio/soundEffects';
import { Play, Pause, RotateCcw, Eye, Info, Sparkles, Layers } from 'lucide-react';

interface ThreeGameViewProps {
  map: MapData;
  steps: GameStep[];
  currentStepIndex: number;
  onStepChange?: (index: number) => void;
  onExecutionComplete?: () => void;
  customization: PlayerCustomization;
  animationSpeed?: 'slow' | 'normal' | 'fast' | 'instant';
  soundVolume?: number;
  sfxEnabled?: boolean;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onReset?: () => void;
  heroMessage?: string | null;
  reducedMotion?: boolean;
  onSwitchTo2D?: () => void;
}

// Module-level scratch variables to prevent GC in animation loop
const _vec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();

export const ThreeGameView: React.FC<ThreeGameViewProps> = ({
  map,
  steps,
  currentStepIndex,
  onStepChange,
  onExecutionComplete,
  customization,
  animationSpeed = 'normal',
  soundVolume = 0.5,
  sfxEnabled = true,
  isPlaying = false,
  onTogglePlay,
  onReset,
  heroMessage,
  reducedMotion = false,
  onSwitchTo2D,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCoords, setHoveredCoords] = useState<Coordinates | null>(null);
  const [hoveredEntityName, setHoveredEntityName] = useState<string | null>(null);

  // Speed mapping in milliseconds per step
  const speedDelays = {
    slow: 450,
    normal: 260,
    fast: 120,
    instant: 15,
  };
  const stepDelay = speedDelays[animationSpeed];

  // Calculate authoritative game state at currentStepIndex
  const calculateState = useCallback(
    (stepIdx: number) => {
      let pos: Coordinates = { ...map.playerStart };
      let dir: Direction = map.playerDirection;
      const collectedIds = new Set<string>();
      const openedGateIds = new Set<string>();
      let speech: string | null = null;

      for (let i = 0; i <= stepIdx && i < steps.length; i++) {
        const s = steps[i];
        if (s.type === 'move' && s.to && s.success) {
          pos = { ...s.to };
          if (s.direction) dir = s.direction;
        } else if (s.type === 'turn' && s.direction) {
          dir = s.direction;
        } else if (s.type === 'jump' && s.to && s.success) {
          pos = { ...s.to };
          if (s.direction) dir = s.direction;
        } else if (s.type === 'collect' && s.targetEntityId) {
          collectedIds.add(s.targetEntityId);
        } else if (s.type === 'attack' && s.targetEntityId) {
          collectedIds.add(s.targetEntityId);
        } else if (s.type === 'open_door' && s.targetEntityId) {
          openedGateIds.add(s.targetEntityId);
        } else if (s.type === 'say' && s.message) {
          speech = s.message;
        }
      }

      return { pos, dir, collectedIds, openedGateIds, speech };
    },
    [map, steps]
  );

  const { pos: heroPos, dir: heroDir, collectedIds, openedGateIds, speech } = calculateState(currentStepIndex);

  // Audio triggers on step advance
  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      if (step.type === 'move') playSound('move', soundVolume, sfxEnabled);
      else if (step.type === 'turn') playSound('turn', soundVolume, sfxEnabled);
      else if (step.type === 'collect') playSound('collect', soundVolume, sfxEnabled);
      else if (step.type === 'jump') playSound('jump', soundVolume, sfxEnabled);
      else if (step.type === 'open_door') playSound('door', soundVolume, sfxEnabled);
      else if (step.type === 'attack') playSound('attack', soundVolume, sfxEnabled);
    }
  }, [currentStepIndex, steps, soundVolume, sfxEnabled]);

  // Step advancement timer when playing
  useEffect(() => {
    if (!isPlaying) return;

    if (currentStepIndex >= steps.length - 1) {
      const finishTimer = setTimeout(() => {
        if (onTogglePlay) onTogglePlay();
        if (onExecutionComplete) onExecutionComplete();
      }, stepDelay + 150);
      return () => clearTimeout(finishTimer);
    }

    const timer = setTimeout(() => {
      if (onStepChange) {
        onStepChange(currentStepIndex + 1);
      }
    }, stepDelay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length, stepDelay, onStepChange, onTogglePlay, onExecutionComplete]);

  // Refs for scene items to update smoothly without tearing down the WebGL canvas
  const stateRef = useRef({
    heroPos,
    heroDir,
    collectedIds,
    openedGateIds,
    isPlaying,
    reducedMotion,
    map,
  });

  useEffect(() => {
    stateRef.current = {
      heroPos,
      heroDir,
      collectedIds,
      openedGateIds,
      isPlaying,
      reducedMotion,
      map,
    };
  }, [heroPos, heroDir, collectedIds, openedGateIds, isPlaying, reducedMotion, map]);

  // Three.js Lifecycle
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvasTest = document.createElement('canvas');
    const gl = canvasTest.getContext('webgl2') || canvasTest.getContext('webgl');
    if (!gl) {
      console.warn('WebGL is not supported in this browser. Falling back to 2D view.');
      if (onSwitchTo2D) onSwitchTo2D();
      return;
    }

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();

    // World theme colors
    const themeName = (map.theme || 'forest').toLowerCase();
    let fogColor = 0x090d16;
    let groundColor = 0x166534;
    let skyLightColor = 0xa7f3d0;

    if (themeName.includes('river') || themeName.includes('water')) {
      fogColor = 0x082f49;
      groundColor = 0x0284c7;
      skyLightColor = 0xbae6fd;
    } else if (themeName.includes('cavern') || themeName.includes('cave') || themeName.includes('grotto')) {
      fogColor = 0x1e1b4b;
      groundColor = 0x4c1d95;
      skyLightColor = 0xc084fc;
    } else if (themeName.includes('castle') || themeName.includes('citadel')) {
      fogColor = 0x18181b;
      groundColor = 0x713f12;
      skyLightColor = 0xfde68a;
    } else if (themeName.includes('mountain') || themeName.includes('ice')) {
      fogColor = 0x0f172a;
      groundColor = 0x38bdf8;
      skyLightColor = 0xe0f2fe;
    }

    scene.background = new THREE.Color(fogColor);
    scene.fog = new THREE.FogExp2(fogColor, 0.045);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(map.width / 2, 7.5, map.height + 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Lighting Rig
    const hemiLight = new THREE.HemisphereLight(skyLightColor, 0x1e293b, 1.2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    dirLight.position.set(map.width / 2 + 5, 14, map.height / 2 + 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    const d = Math.max(map.width, map.height) * 1.2;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // Subtle blue rim light from opposite angle
    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.7);
    rimLight.position.set(-8, 6, -8);
    scene.add(rimLight);

    // 3. Procedural Map Meshes
    const tileGroup = new THREE.Group();
    scene.add(tileGroup);

    // Shared geometries
    const tileGeo = new THREE.BoxGeometry(0.96, 0.35, 0.96);
    tileGeo.translate(0, 0.175, 0); // Bottom-center pivot

    const pathGeo = new THREE.BoxGeometry(0.96, 0.3, 0.96);
    pathGeo.translate(0, 0.15, 0);

    const waterGeo = new THREE.BoxGeometry(0.96, 0.18, 0.96);
    waterGeo.translate(0, 0.09, 0);

    const wallGeo = new THREE.BoxGeometry(0.96, 1.1, 0.96);
    wallGeo.translate(0, 0.55, 0);

    // Materials
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.8,
      metalness: 0.05,
    });
    const grassMatAlt = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.85,
      metalness: 0.05,
    });
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.9,
      metalness: 0.1,
    });
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.15,
      metalness: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.7,
      metalness: 0.2,
    });
    const iceMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.1,
      metalness: 0.1,
    });

    const tileObjects: { mesh: THREE.Mesh; x: number; y: number }[] = [];

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tileType = map.tiles[y]?.[x] || 'grass';
        let mesh: THREE.Mesh;

        if (tileType === 'path' || tileType === 'bridge') {
          mesh = new THREE.Mesh(pathGeo, pathMat);
        } else if (tileType === 'water') {
          mesh = new THREE.Mesh(waterGeo, waterMat);
        } else if (tileType === 'wall') {
          mesh = new THREE.Mesh(wallGeo, wallMat);
          mesh.castShadow = true;
        } else if (tileType === 'ice') {
          mesh = new THREE.Mesh(pathGeo, iceMat);
        } else {
          mesh = new THREE.Mesh(tileGeo, (x + y) % 2 === 0 ? grassMat : grassMatAlt);
        }

        mesh.position.set(x, 0, y);
        mesh.receiveShadow = true;
        tileGroup.add(mesh);
        tileObjects.push({ mesh, x, y });
      }
    }

    // Extended natural perimeter (mountains, trees, rocky borders)
    const perimeterGroup = new THREE.Group();
    scene.add(perimeterGroup);
    const borderMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const borderGeo = new THREE.BoxGeometry(map.width + 12, 0.2, map.height + 12);
    borderGeo.translate(map.width / 2 - 0.5, -0.1, map.height / 2 - 0.5);
    const borderMesh = new THREE.Mesh(borderGeo, borderMat);
    borderMesh.receiveShadow = true;
    perimeterGroup.add(borderMesh);

    // Decorative stylized anime low-poly trees around border
    const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.8, 6);
    trunkGeo.translate(0, 0.4, 0);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x543310, roughness: 0.9 });

    const foliageGeo = new THREE.ConeGeometry(0.65, 1.3, 6);
    foliageGeo.translate(0, 1.25, 0);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.75 });

    for (let i = -2; i <= map.width + 1; i += 2) {
      [-2, map.height + 1].forEach((pz) => {
        const tree = new THREE.Group();
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.castShadow = true;
        const leaves = new THREE.Mesh(foliageGeo, foliageMat);
        leaves.castShadow = true;
        tree.add(trunk);
        tree.add(leaves);
        tree.position.set(i + (Math.random() - 0.5) * 0.4, 0, pz + (Math.random() - 0.5) * 0.4);
        tree.scale.setScalar(0.75 + Math.random() * 0.35);
        perimeterGroup.add(tree);
      });
    }

    // 4. Portal Model (Multi-part animated portal with runic ring)
    let portalGroup: THREE.Group | null = null;
    if (map.portalPosition) {
      portalGroup = new THREE.Group();
      portalGroup.position.set(map.portalPosition.x, 0.2, map.portalPosition.y);

      // Outer Torus Ring
      const ringGeo = new THREE.TorusGeometry(0.55, 0.08, 8, 24);
      ringGeo.rotateX(Math.PI / 2);
      ringGeo.translate(0, 0.6, 0);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      portalGroup.add(ringMesh);

      // Inner Swirling Vortex Disc
      const discGeo = new THREE.CircleGeometry(0.48, 20);
      discGeo.rotateX(-Math.PI / 2);
      discGeo.translate(0, 0.6, 0);
      const discMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
      });
      const discMesh = new THREE.Mesh(discGeo, discMat);
      portalGroup.add(discMesh);

      // Portal Pedestal
      const pedGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.2, 8);
      pedGeo.translate(0, 0.1, 0);
      const pedMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
      const pedMesh = new THREE.Mesh(pedGeo, pedMat);
      pedMesh.receiveShadow = true;
      portalGroup.add(pedMesh);

      scene.add(portalGroup);
    }

    // 5. Collectible Entities (Crystals, Gems, Coins, Keys, Gates)
    const entityGroupMap = new Map<string, THREE.Group>();

    const gemGeo = new THREE.OctahedronGeometry(0.24, 0);
    gemGeo.translate(0, 0.45, 0);

    const coinGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 14);
    coinGeo.rotateX(Math.PI / 4);
    coinGeo.translate(0, 0.45, 0);

    map.entities.forEach((ent) => {
      const eGroup = new THREE.Group();
      eGroup.position.set(ent.x, 0, ent.y);

      if (ent.type === 'crystal' || ent.type === 'gem') {
        const mat = new THREE.MeshStandardMaterial({
          color: ent.color ? parseInt(ent.color.replace('#', '0x')) : 0x38bdf8,
          emissive: ent.color ? parseInt(ent.color.replace('#', '0x')) : 0x0284c7,
          emissiveIntensity: 0.7,
          roughness: 0.1,
          metalness: 0.9,
        });
        const mesh = new THREE.Mesh(gemGeo, mat);
        mesh.castShadow = true;
        eGroup.add(mesh);
      } else if (ent.type === 'coin') {
        const mat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0xd97706,
          emissiveIntensity: 0.5,
          roughness: 0.2,
          metalness: 0.9,
        });
        const mesh = new THREE.Mesh(coinGeo, mat);
        mesh.castShadow = true;
        eGroup.add(mesh);
      } else if (ent.type === 'gate') {
        const barGeo = new THREE.BoxGeometry(0.88, 0.8, 0.15);
        barGeo.translate(0, 0.4, 0);
        const barMat = new THREE.MeshStandardMaterial({
          color: 0x713f12,
          emissive: 0xca8a04,
          emissiveIntensity: 0.4,
          roughness: 0.5,
        });
        const mesh = new THREE.Mesh(barGeo, barMat);
        mesh.castShadow = true;
        eGroup.add(mesh);
      } else {
        // Generic quest treasure
        const genericMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          emissive: 0x9333ea,
          emissiveIntensity: 0.5,
        });
        const mesh = new THREE.Mesh(gemGeo, genericMat);
        mesh.castShadow = true;
        eGroup.add(mesh);
      }

      scene.add(eGroup);
      entityGroupMap.set(ent.id, eGroup);
    });

    // 6. Hero Character (Composite 8-Part Procedural 3D Character)
    const heroGroup = new THREE.Group();
    heroGroup.position.set(heroPos.x, 0.25, heroPos.y);

    // Part 1: Contact ground shadow disc
    const shadowGeo = new THREE.CircleGeometry(0.3, 16);
    shadowGeo.rotateX(-Math.PI / 2);
    shadowGeo.translate(0, 0.02, 0);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    heroGroup.add(shadowMesh);

    // Part 2: Tunic / Robe Body
    const tunicGeo = new THREE.CylinderGeometry(0.18, 0.26, 0.52, 8);
    tunicGeo.translate(0, 0.36, 0);
    const tunicMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const tunicMesh = new THREE.Mesh(tunicGeo, tunicMat);
    tunicMesh.castShadow = true;
    heroGroup.add(tunicMesh);

    // Part 3: Cloak / Cape
    const cloakHex = customization.cloakColor ? parseInt(customization.cloakColor.replace('#', '0x')) : 0x2563eb;
    const cloakGeo = new THREE.ConeGeometry(0.32, 0.65, 8);
    cloakGeo.translate(0, 0.4, -0.05);
    const cloakMat = new THREE.MeshStandardMaterial({
      color: cloakHex,
      roughness: 0.65,
      metalness: 0.1,
    });
    const cloakMesh = new THREE.Mesh(cloakGeo, cloakMat);
    cloakMesh.castShadow = true;
    heroGroup.add(cloakMesh);

    // Part 4: Belt & Buckle
    const beltGeo = new THREE.BoxGeometry(0.42, 0.08, 0.42);
    beltGeo.translate(0, 0.32, 0);
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const beltMesh = new THREE.Mesh(beltGeo, beltMat);
    heroGroup.add(beltMesh);

    // Part 5: Stylized Anime Head
    const skinHex = customization.skinTone ? parseInt(customization.skinTone.replace('#', '0x')) : 0xfcd34d;
    const headGeo = new THREE.SphereGeometry(0.19, 12, 10);
    headGeo.translate(0, 0.72, 0);
    const headMat = new THREE.MeshStandardMaterial({ color: skinHex, roughness: 0.5 });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.castShadow = true;
    heroGroup.add(headMesh);

    // Part 6: Sorcerer Hood / Hat
    const hoodGeo = new THREE.ConeGeometry(0.25, 0.45, 8);
    hoodGeo.translate(0, 0.95, -0.02);
    const hoodMesh = new THREE.Mesh(hoodGeo, cloakMat);
    hoodMesh.castShadow = true;
    heroGroup.add(hoodMesh);

    // Part 7: Magic Wand / Staff with Levitating Tip
    const staffGroup = new THREE.Group();
    staffGroup.position.set(0.3, 0.1, 0.1);
    const stickGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6);
    stickGeo.translate(0, 0.4, 0);
    const stickMat = new THREE.MeshStandardMaterial({ color: 0x543310, roughness: 0.9 });
    const stickMesh = new THREE.Mesh(stickGeo, stickMat);
    stickMesh.castShadow = true;
    staffGroup.add(stickMesh);

    const tipCrystalGeo = new THREE.OctahedronGeometry(0.08, 0);
    tipCrystalGeo.translate(0, 0.88, 0);
    const tipCrystalMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.9,
    });
    const tipCrystalMesh = new THREE.Mesh(tipCrystalGeo, tipCrystalMat);
    staffGroup.add(tipCrystalMesh);
    heroGroup.add(staffGroup);

    // Part 8: Familiar Pet (Ollie the Owl hovering beside wizard)
    const petGroup = new THREE.Group();
    petGroup.position.set(-0.35, 0.75, 0);

    const owlBodyGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const owlBodyMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.8 });
    const owlBodyMesh = new THREE.Mesh(owlBodyGeo, owlBodyMat);
    petGroup.add(owlBodyMesh);

    const owlWingGeo = new THREE.BoxGeometry(0.04, 0.08, 0.12);
    const owlWingMat = new THREE.MeshStandardMaterial({ color: 0x713f12 });
    const owlLeftWing = new THREE.Mesh(owlWingGeo, owlWingMat);
    owlLeftWing.position.set(-0.1, 0, 0);
    const owlRightWing = new THREE.Mesh(owlWingGeo, owlWingMat);
    owlRightWing.position.set(0.1, 0, 0);
    petGroup.add(owlLeftWing);
    petGroup.add(owlRightWing);

    heroGroup.add(petGroup);
    scene.add(heroGroup);

    // 7. Raycaster for Tile Inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(tileObjects.map((t) => t.mesh));
      if (intersects.length > 0) {
        const hit = tileObjects.find((t) => t.mesh === intersects[0].object);
        if (hit) {
          setHoveredCoords({ x: hit.x, y: hit.y });
          const ent = stateRef.current.map.entities.find(
            (en) => en.x === hit.x && en.y === hit.y && !stateRef.current.collectedIds.has(en.id)
          );
          setHoveredEntityName(ent ? ent.name || ent.type : null);
          return;
        }
      }
      setHoveredCoords(null);
      setHoveredEntityName(null);
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);

    // 8. Animation & Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();
      const current = stateRef.current;

      // 1. Smoothly interpolate hero position
      _vec3.set(current.heroPos.x, 0.25, current.heroPos.y);
      heroGroup.position.lerp(_vec3, current.reducedMotion ? 0.4 : 0.2);

      // Hero rotation based on facing direction
      let targetRotY = 0;
      if (current.heroDir === 'right') targetRotY = Math.PI / 2;
      else if (current.heroDir === 'left') targetRotY = -Math.PI / 2;
      else if (current.heroDir === 'up') targetRotY = Math.PI;
      else if (current.heroDir === 'down') targetRotY = 0;

      heroGroup.rotation.y = THREE.MathUtils.damp(heroGroup.rotation.y, targetRotY, 8, delta);

      // Subtle breathing / walking bob
      if (current.isPlaying && !current.reducedMotion) {
        tunicMesh.position.y = Math.sin(time * 12) * 0.04;
        petGroup.position.y = 0.75 + Math.sin(time * 6) * 0.08;
        owlLeftWing.rotation.z = Math.sin(time * 16) * 0.5;
        owlRightWing.rotation.z = -Math.sin(time * 16) * 0.5;
      } else {
        tunicMesh.position.y = 0;
        petGroup.position.y = 0.75 + Math.sin(time * 3) * 0.03;
        owlLeftWing.rotation.z = 0;
        owlRightWing.rotation.z = 0;
      }

      // 2. Camera follow hero smoothly
      _targetCamPos.set(heroGroup.position.x, 6.5, heroGroup.position.z + 5.5);
      camera.position.lerp(_targetCamPos, current.reducedMotion ? 0.3 : 0.08);
      camera.lookAt(heroGroup.position.x, 0.4, heroGroup.position.z);

      // 3. Animate Portal
      if (portalGroup && !current.reducedMotion) {
        portalGroup.children[0].rotation.z = time * 0.8;
        portalGroup.children[1].rotation.z = -time * 1.2;
      }

      // 4. Animate Collectibles & update visibility based on game state
      entityGroupMap.forEach((grp, id) => {
        const isCollected = current.collectedIds.has(id);
        const isOpenedGate = current.openedGateIds.has(id);
        grp.visible = !isCollected && !isOpenedGate;

        if (grp.visible && !current.reducedMotion) {
          grp.rotation.y = time * 2;
          grp.position.y = Math.sin(time * 4 + grp.position.x) * 0.06;
        }
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);

      // Dispose Three.js objects
      tileGeo.dispose();
      pathGeo.dispose();
      waterGeo.dispose();
      wallGeo.dispose();
      gemGeo.dispose();
      coinGeo.dispose();
      grassMat.dispose();
      grassMatAlt.dispose();
      pathMat.dispose();
      waterMat.dispose();
      wallMat.dispose();
      iceMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      tunicGeo.dispose();
      tunicMat.dispose();
      cloakGeo.dispose();
      cloakMat.dispose();
      beltGeo.dispose();
      beltMat.dispose();
      headGeo.dispose();
      headMat.dispose();
      hoodGeo.dispose();
      stickGeo.dispose();
      stickMat.dispose();
      tipCrystalGeo.dispose();
      tipCrystalMat.dispose();
      owlBodyGeo.dispose();
      owlBodyMat.dispose();
      owlWingGeo.dispose();
      owlWingMat.dispose();
      borderGeo.dispose();
      borderMat.dispose();
      trunkGeo.dispose();
      trunkMat.dispose();
      foliageGeo.dispose();
      foliageMat.dispose();

      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [map, customization.cloakColor, customization.skinTone, onSwitchTo2D]);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
      {/* 3D Viewport Top HUD */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              Hero: ({heroPos.x}, {heroPos.y})
            </span>
          </div>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 capitalize">Facing: {heroDir}</span>
          <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-semibold border border-sky-500/30">
            <Sparkles className="w-3 h-3" />
            <span>Three.js 3D Realm</span>
          </div>
        </div>

        {hoveredCoords && (
          <div className="hidden sm:flex items-center gap-1.5 text-amber-300 font-mono text-[11px] bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            <Info className="w-3 h-3 text-amber-400" />
            <span>
              Tile: ({hoveredCoords.x}, {hoveredCoords.y})
            </span>
            {hoveredEntityName && <span>· {hoveredEntityName}</span>}
          </div>
        )}

        <div className="flex items-center gap-2">
          {onSwitchTo2D && (
            <button
              onClick={onSwitchTo2D}
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors border border-slate-700"
              title="Switch to 2D Classic Grid"
            >
              <Layers className="w-3 h-3 text-amber-400" />
              <span>2D Grid</span>
            </button>
          )}

          <span className="text-slate-400">Step</span>
          <span className="font-mono text-emerald-400 font-semibold">
            {steps.length > 0 ? `${currentStepIndex + 1} / ${steps.length}` : 'Ready'}
          </span>
        </div>
      </div>

      {/* Main 3D Canvas Mount Container */}
      <div className="relative flex-1 min-h-[300px] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Speech Bubble Overlay */}
        {(speech || heroMessage) && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none z-20">
            <div className="px-3.5 py-1.5 bg-slate-950/95 border border-sky-400 text-white rounded-lg shadow-xl text-xs font-semibold flex items-center gap-1.5 animate-bounce">
              <span>🧙</span>
              <span>{speech || heroMessage}</span>
            </div>
          </div>
        )}

        {steps.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 pointer-events-none">
            <div className="text-center px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-lg shadow-lg">
              <p className="text-xs text-slate-300 font-medium">Write your code and press Run to command your hero in 3D!</p>
            </div>
          </div>
        )}
      </div>

      {/* Playback Controls Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/90 border-t border-slate-800 text-xs z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            disabled={steps.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              steps.length === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                : isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-sm'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Steps</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            disabled={steps.length === 0 || currentStepIndex === -1}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium disabled:opacity-40 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Map</span>
          </button>
        </div>

        {/* Step Scrubber */}
        {steps.length > 0 && (
          <div className="flex items-center gap-2 max-w-xs w-full px-2">
            <input
              type="range"
              min={-1}
              max={steps.length - 1}
              value={currentStepIndex}
              onChange={(e) => onStepChange && onStepChange(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};
