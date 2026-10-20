import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MapData, Coordinates, Direction, GameStep, PlayerCustomization } from '../../types/game';
import { playSound } from '../../audio/soundEffects';
import { Play, Pause, RotateCcw, FastForward, Info } from 'lucide-react';

interface GameCanvasProps {
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
  onSwitchTo3D?: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
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
  onSwitchTo3D,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredTile, setHoveredTile] = useState<Coordinates | null>(null);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);

  // Speed mapping in milliseconds per step
  const speedDelays = {
    slow: 450,
    normal: 260,
    fast: 120,
    instant: 15,
  };
  const stepDelay = speedDelays[animationSpeed];

  // Particle pool for magic collection and footsteps
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    life: number;
    maxLife: number;
  }
  const particlesRef = useRef<Particle[]>([]);

  // Calculate current hero position and direction based on step index
  const calculateStateAtStep = useCallback((stepIdx: number) => {
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
  }, [map, steps]);

  const { pos: heroPos, dir: heroDir, collectedIds, openedGateIds, speech } = calculateStateAtStep(currentStepIndex);

  // Trigger sound effect on step advancement
  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      if (step.type === 'move') {
        playSound('move', soundVolume, sfxEnabled);
      } else if (step.type === 'turn') {
        playSound('turn', soundVolume, sfxEnabled);
      } else if (step.type === 'collect') {
        playSound('collect', soundVolume, sfxEnabled);
        // Spawn collection sparkles
        for (let i = 0; i < 16; i++) {
          particlesRef.current.push({
            x: heroPos.x + 0.5,
            y: heroPos.y + 0.5,
            vx: (Math.random() - 0.5) * 0.08,
            vy: (Math.random() - 0.5) * 0.08 - 0.04,
            color: '#FBBF24',
            size: Math.random() * 4 + 2,
            life: 1,
            maxLife: 25,
          });
        }
      } else if (step.type === 'jump') {
        playSound('jump', soundVolume, sfxEnabled);
      } else if (step.type === 'open_door') {
        playSound('door', soundVolume, sfxEnabled);
      } else if (step.type === 'attack') {
        playSound('attack', soundVolume, sfxEnabled);
      }
    }
  }, [currentStepIndex, steps, soundVolume, sfxEnabled, heroPos]);

  // Main animation / rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    const render = () => {
      tick++;

      // Canvas dimensions
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Determine tile size to fit canvas nicely with margin
      const padding = 20;
      const availableW = width - padding * 2;
      const availableH = height - padding * 2;
      const tileSize = Math.min(
        Math.floor(availableW / map.width),
        Math.floor(availableH / map.height),
        72
      );

      const offsetX = Math.floor((width - map.width * tileSize) / 2);
      const offsetY = Math.floor((height - map.height * tileSize) / 2);

      // 1. Draw Grid Tiles
      for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
          const tile = map.tiles[y]?.[x] || 'grass';
          const px = offsetX + x * tileSize;
          const py = offsetY + y * tileSize;

          // Tile background
          if (tile === 'grass') {
            ctx.fillStyle = (x + y) % 2 === 0 ? '#14532D' : '#166534';
            ctx.fillRect(px, py, tileSize, tileSize);
            // Subtle blade accents
            ctx.fillStyle = '#22C55E';
            ctx.fillRect(px + 8, py + 8, 2, 4);
            ctx.fillRect(px + tileSize - 12, py + tileSize - 14, 2, 5);
          } else if (tile === 'path') {
            ctx.fillStyle = (x + y) % 2 === 0 ? '#78716C' : '#57534E';
            ctx.fillRect(px, py, tileSize, tileSize);
            // Cobblestone border
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.strokeRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
          } else if (tile === 'bridge') {
            ctx.fillStyle = '#92400E';
            ctx.fillRect(px, py, tileSize, tileSize);
            // Planks
            ctx.fillStyle = '#78350F';
            ctx.fillRect(px, py + 4, tileSize, 2);
            ctx.fillRect(px, py + tileSize / 2, tileSize, 2);
            ctx.fillRect(px, py + tileSize - 6, tileSize, 2);
          } else if (tile === 'water') {
            ctx.fillStyle = '#0284C7';
            ctx.fillRect(px, py, tileSize, tileSize);
            // Animated ripple
            const waveOffset = Math.sin((tick * 0.05) + x + y) * 3;
            ctx.fillStyle = '#38BDF8';
            ctx.fillRect(px + 6, py + tileSize / 2 + waveOffset, tileSize - 12, 2);
          } else if (tile === 'wall') {
            ctx.fillStyle = '#334155';
            ctx.fillRect(px, py, tileSize, tileSize);
            ctx.fillStyle = '#1E293B';
            ctx.fillRect(px + 3, py + 3, tileSize - 6, tileSize - 6);
            ctx.strokeStyle = '#475569';
            ctx.strokeRect(px + 4, py + 4, tileSize - 8, tileSize - 8);
          } else if (tile === 'stone') {
            ctx.fillStyle = (x + y) % 2 === 0 ? '#475569' : '#334155';
            ctx.fillRect(px, py, tileSize, tileSize);
          } else if (tile === 'ice') {
            ctx.fillStyle = '#E0F2FE';
            ctx.fillRect(px, py, tileSize, tileSize);
            ctx.strokeStyle = '#BAE6FD';
            ctx.strokeRect(px + 1, py + 1, tileSize - 2, tileSize - 2);
          } else if (tile === 'wood_floor') {
            ctx.fillStyle = '#B45309';
            ctx.fillRect(px, py, tileSize, tileSize);
            ctx.strokeStyle = '#92400E';
            ctx.strokeRect(px, py, tileSize, tileSize);
          }

          // Subtle grid line
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.strokeRect(px, py, tileSize, tileSize);

          // Tile hover highlight
          if (hoveredTile && hoveredTile.x === x && hoveredTile.y === y) {
            ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
            ctx.fillRect(px, py, tileSize, tileSize);
            ctx.strokeStyle = '#FBBF24';
            ctx.lineWidth = 2;
            ctx.strokeRect(px, py, tileSize, tileSize);
            ctx.lineWidth = 1;
          }
        }
      }

      // 2. Draw Portal if defined
      if (map.portalPosition) {
        const portalPx = offsetX + map.portalPosition.x * tileSize + tileSize / 2;
        const portalPy = offsetY + map.portalPosition.y * tileSize + tileSize / 2;
        const portalRadius = tileSize * 0.38;

        // Outer glow
        const glow = ctx.createRadialGradient(portalPx, portalPy, 4, portalPx, portalPy, portalRadius * 1.5);
        glow.addColorStop(0, 'rgba(168, 85, 247, 0.9)');
        glow.addColorStop(0.5, 'rgba(99, 102, 241, 0.4)');
        glow.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(portalPx, portalPy, portalRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Swirling vortex rings
        ctx.save();
        ctx.translate(portalPx, portalPy);
        ctx.rotate(tick * 0.04);
        ctx.strokeStyle = '#C084FC';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, portalRadius, 0, Math.PI * 1.5);
        ctx.stroke();

        ctx.rotate(-tick * 0.07);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, portalRadius * 0.65, 0, Math.PI * 1.2);
        ctx.stroke();

        // Portal center core
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, 0, portalRadius * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw Entities (Crystals, Gems, Coins, Keys, Gates, etc.)
      map.entities.forEach((entity) => {
        if (collectedIds.has(entity.id) || openedGateIds.has(entity.id)) return;

        const ex = offsetX + entity.x * tileSize + tileSize / 2;
        const ey = offsetY + entity.y * tileSize + tileSize / 2;
        const bob = Math.sin(tick * 0.08 + entity.x) * 4;

        if (entity.type === 'crystal' || entity.type === 'gem') {
          // Gem facet
          ctx.save();
          ctx.translate(ex, ey + bob);
          const gemSize = tileSize * 0.32;
          const gemColor = entity.color || '#38BDF8';

          // Glow
          ctx.shadowColor = gemColor;
          ctx.shadowBlur = 10;

          ctx.fillStyle = gemColor;
          ctx.beginPath();
          ctx.moveTo(0, -gemSize);
          ctx.lineTo(gemSize * 0.8, -gemSize * 0.2);
          ctx.lineTo(0, gemSize);
          ctx.lineTo(-gemSize * 0.8, -gemSize * 0.2);
          ctx.closePath();
          ctx.fill();

          // Highlight
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.moveTo(0, -gemSize);
          ctx.lineTo(gemSize * 0.3, -gemSize * 0.2);
          ctx.lineTo(0, gemSize * 0.4);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else if (entity.type === 'coin') {
          ctx.save();
          ctx.translate(ex, ey + bob);
          const coinR = tileSize * 0.25;
          ctx.fillStyle = '#F59E0B';
          ctx.beginPath();
          ctx.arc(0, 0, coinR, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FDE68A';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = '#78350F';
          ctx.font = `bold ${Math.floor(tileSize * 0.22)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', 0, 1);
          ctx.restore();
        } else if (entity.type === 'key') {
          ctx.save();
          ctx.translate(ex, ey + bob);
          ctx.rotate(-Math.PI / 4);
          ctx.fillStyle = '#FBBF24';
          ctx.beginPath();
          ctx.arc(0, -8, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(-2, -3, 4, 18);
          ctx.fillRect(2, 6, 5, 3);
          ctx.fillRect(2, 11, 4, 3);
          ctx.restore();
        } else if (entity.type === 'gate') {
          // Gate
          const px = offsetX + entity.x * tileSize;
          const py = offsetY + entity.y * tileSize;
          ctx.fillStyle = '#713F12';
          ctx.fillRect(px + 4, py + 2, tileSize - 8, tileSize - 4);
          // Runic bars
          ctx.strokeStyle = '#FDE047';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(px + 8, py + 6);
          ctx.lineTo(px + 8, py + tileSize - 8);
          ctx.moveTo(px + tileSize / 2, py + 6);
          ctx.lineTo(px + tileSize / 2, py + tileSize - 8);
          ctx.moveTo(px + tileSize - 8, py + 6);
          ctx.lineTo(px + tileSize - 8, py + tileSize - 8);
          ctx.stroke();
          ctx.lineWidth = 1;
        } else if (entity.type === 'chest') {
          const px = offsetX + entity.x * tileSize + 8;
          const py = offsetY + entity.y * tileSize + 10;
          ctx.fillStyle = '#92400E';
          ctx.fillRect(px, py, tileSize - 16, tileSize - 20);
          ctx.fillStyle = '#F59E0B';
          ctx.fillRect(px + (tileSize - 16) / 2 - 4, py + 6, 8, 8);
          ctx.strokeStyle = '#451A03';
          ctx.strokeRect(px, py, tileSize - 16, tileSize - 20);
        } else if (entity.type === 'flower') {
          ctx.save();
          ctx.translate(ex, ey + bob);
          ctx.fillStyle = '#EC4899';
          for (let p = 0; p < 5; p++) {
            ctx.rotate((Math.PI * 2) / 5);
            ctx.beginPath();
            ctx.arc(0, 8, 5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#FDE047';
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (entity.type === 'potion') {
          ctx.save();
          ctx.translate(ex, ey + bob);
          ctx.fillStyle = '#A855F7';
          ctx.beginPath();
          ctx.arc(0, 4, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#94A3B8';
          ctx.fillRect(-3, -8, 6, 6);
          ctx.restore();
        }
      });

      // 4. Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        const pX = offsetX + p.x * tileSize;
        const pY = offsetY + p.y * tileSize;
        ctx.arc(pX, pY, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // 5. Draw Hero Character
      const heroPx = offsetX + heroPos.x * tileSize + tileSize / 2;
      const heroPy = offsetY + heroPos.y * tileSize + tileSize / 2;
      const walkBob = isPlaying ? Math.sin(tick * 0.25) * 3 : 0;

      ctx.save();
      ctx.translate(heroPx, heroPy + walkBob);

      // Hero Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(0, tileSize * 0.32, tileSize * 0.25, tileSize * 0.1, 0, 0, Math.PI * 2);
      ctx.fill();

      // Facing orientation
      let facingAngle = 0;
      if (heroDir === 'down') facingAngle = 0;
      else if (heroDir === 'up') facingAngle = Math.PI;
      else if (heroDir === 'left') facingAngle = -Math.PI / 2;
      else if (heroDir === 'right') facingAngle = Math.PI / 2;

      // Cloak
      ctx.fillStyle = customization.cloakColor || '#2563EB';
      ctx.beginPath();
      ctx.arc(0, 2, tileSize * 0.26, 0, Math.PI);
      ctx.fill();

      // Body / Tunic
      ctx.fillStyle = '#334155';
      ctx.fillRect(-tileSize * 0.14, -tileSize * 0.08, tileSize * 0.28, tileSize * 0.32);

      // Belt with buckle
      ctx.fillStyle = '#78350F';
      ctx.fillRect(-tileSize * 0.14, tileSize * 0.12, tileSize * 0.28, 4);
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(-3, tileSize * 0.12 - 1, 6, 6);

      // Head / Skin
      ctx.fillStyle = customization.skinTone || '#FCD34D';
      ctx.beginPath();
      ctx.arc(0, -tileSize * 0.18, tileSize * 0.16, 0, Math.PI * 2);
      ctx.fill();

      // Sorcerer Hood or Hair
      ctx.fillStyle = customization.cloakColor || '#1D4ED8';
      ctx.beginPath();
      ctx.arc(0, -tileSize * 0.22, tileSize * 0.17, Math.PI, Math.PI * 2);
      ctx.fill();

      // Eyes (glowing or focused)
      ctx.fillStyle = '#0F172A';
      if (heroDir === 'right') {
        ctx.fillRect(2, -tileSize * 0.2, 3, 3);
      } else if (heroDir === 'left') {
        ctx.fillRect(-5, -tileSize * 0.2, 3, 3);
      } else {
        ctx.fillRect(-4, -tileSize * 0.2, 3, 3);
        ctx.fillRect(2, -tileSize * 0.2, 3, 3);
      }

      // Wand / Staff in hand
      ctx.save();
      ctx.translate(tileSize * 0.2, 0);
      ctx.fillStyle = '#78350F';
      ctx.fillRect(-2, -tileSize * 0.3, 4, tileSize * 0.5);
      // Wand tip crystal
      ctx.fillStyle = '#38BDF8';
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, -tileSize * 0.32, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Familiar Pet (hovering beside hero)
      const petOffset = Math.sin(tick * 0.1) * 3;
      ctx.save();
      ctx.translate(-tileSize * 0.28, -tileSize * 0.25 + petOffset);
      if (customization.familiar === 'dragon') {
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(2, -2, 2, 2);
      } else if (customization.familiar === 'robot') {
        ctx.fillStyle = '#94A3B8';
        ctx.fillRect(-6, -6, 12, 12);
        ctx.fillStyle = '#38BDF8';
        ctx.fillRect(-3, -2, 6, 4);
      } else {
        // Owl (default)
        ctx.fillStyle = '#D97706';
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-3, -2, 3, 3);
        ctx.fillRect(1, -2, 3, 3);
      }
      ctx.restore();

      ctx.restore(); // Restore hero translation

      // 6. Speech Bubble if hero is speaking
      const activeSpeech = speech || heroMessage;
      if (activeSpeech) {
        ctx.save();
        const bubbleX = heroPx;
        const bubbleY = heroPy - tileSize * 0.65;
        ctx.font = '600 13px Plus Jakarta Sans, sans-serif';
        const textWidth = ctx.measureText(activeSpeech).width;
        const bubbleW = textWidth + 24;
        const bubbleH = 28;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.5;

        // Rounded rect bubble
        ctx.beginPath();
        ctx.roundRect(bubbleX - bubbleW / 2, bubbleY - bubbleH, bubbleW, bubbleH, 6);
        ctx.fill();
        ctx.stroke();

        // Pointer
        ctx.beginPath();
        ctx.moveTo(bubbleX - 5, bubbleY);
        ctx.lineTo(bubbleX, bubbleY + 6);
        ctx.lineTo(bubbleX + 5, bubbleY);
        ctx.closePath();
        ctx.fillStyle = '#38BDF8';
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(activeSpeech, bubbleX, bubbleY - bubbleH / 2);
        ctx.restore();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [map, heroPos, heroDir, collectedIds, speech, heroMessage, hoveredTile, customization, isPlaying]);

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

  // Handle canvas mouse move for coordinate inspection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const padding = 20;
    const availableW = width - padding * 2;
    const availableH = height - padding * 2;
    const tileSize = Math.min(
      Math.floor(availableW / map.width),
      Math.floor(availableH / map.height),
      72
    );
    const offsetX = Math.floor((width - map.width * tileSize) / 2);
    const offsetY = Math.floor((height - map.height * tileSize) / 2);

    const tileX = Math.floor((mouseX - offsetX) / tileSize);
    const tileY = Math.floor((mouseY - offsetY) / tileSize);

    if (tileX >= 0 && tileX < map.width && tileY >= 0 && tileY < map.height) {
      setHoveredTile({ x: tileX, y: tileY });
      const ent = map.entities.find(en => en.x === tileX && en.y === tileY);
      setHoveredEntity(ent ? ent.name || ent.type : null);
    } else {
      setHoveredTile(null);
      setHoveredEntity(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredTile(null);
    setHoveredEntity(null);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
      {/* HUD Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Position: ({heroPos.x}, {heroPos.y})</span>
          </div>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 capitalize">Facing: {heroDir}</span>
        </div>

        {hoveredTile && (
          <div className="hidden sm:flex items-center gap-1.5 text-amber-300 font-mono text-[11px] bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            <Info className="w-3 h-3 text-amber-400" />
            <span>Tile: ({hoveredTile.x}, {hoveredTile.y})</span>
            {hoveredEntity && <span>· {hoveredEntity}</span>}
          </div>
        )}

        <div className="flex items-center gap-2">
          {onSwitchTo3D && (
            <button
              onClick={onSwitchTo3D}
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors border border-slate-700"
              title="Switch to Three.js 3D Realm"
            >
              <span className="text-sky-400 font-bold">3D</span>
              <span>Realm</span>
            </button>
          )}

          <span className="text-slate-400">Step</span>
          <span className="font-mono text-emerald-400 font-semibold">
            {steps.length > 0 ? `${currentStepIndex + 1} / ${steps.length}` : 'Ready'}
          </span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 min-h-[300px] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full cursor-crosshair"
        />

        {steps.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 pointer-events-none">
            <div className="text-center px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-lg shadow-lg">
              <p className="text-xs text-slate-300 font-medium">Write your code and press Run to command your hero!</p>
            </div>
          </div>
        )}
      </div>

      {/* Playback Controls Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/90 border-t border-slate-800 text-xs">
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
