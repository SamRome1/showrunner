/**
 * theme.ts — single source of truth for the showrunner motion system (v2: kinetic).
 *
 * Visual system:
 *  - dark canvas with an animated gradient wash and a drifting particle field
 *  - one themed hue set per project: deep blue, sky, amber (brand-anchored)
 *  - Inter for UI + headlines (500–800), JetBrains Mono for code / labels
 *  - density and constant motion: nothing on screen ever sits fully still
 *  - entrances: opacity 0→1, 24px rise, scale 0.92→1 with a slight overshoot
 *  - exits: quick fade with a small scale-down (8 frames)
 *  - glow: soft bloom on active elements, amber for highlight moments
 */
import type { CSSProperties } from 'react';
import { loadFont as loadInter, fontFamily as interFamily } from '@remotion/google-fonts/Inter';
import {
  loadFont as loadJetBrains,
  fontFamily as jetBrainsFamily,
} from '@remotion/google-fonts/JetBrainsMono';
import { interpolate, spring, Easing } from 'remotion';

loadInter('normal', { weights: ['500', '600', '700', '800'], subsets: ['latin'] });
loadJetBrains('normal', { weights: ['400', '500', '700'], subsets: ['latin'] });

// ---------------------------------------------------------------------------
// Canvas
// ---------------------------------------------------------------------------
export const CANVAS = { width: 1080, height: 1080, fps: 30 } as const;

/** Content stays inside this inset; ambient layers (wash, particles) ignore it. */
export const SAFE_INSET = Math.round(CANVAS.width * 0.08); // 86px

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
/** Active accent — sky blue reads on the dark wash. */
export const ACCENT = '#5FA8FF';

export const palette = {
  canvasTop: '#050810',
  canvasBottom: '#0B1E33',
  deep: '#336791', // Postgres blue — structure, fills, rules
  sky: '#5FA8FF', // active accent — highlights, live edges, counters
  amber: '#F59E0B', // warm contrast — the one thing to look at
  amberSoft: '#FBBF24',
  white: '#FFFFFF',
  ink: '#B8C4D6',
} as const;

export const colors = {
  bg: palette.canvasTop,
  text: palette.white,
  textSecondary: palette.ink,
  textTertiary: '#7C8AA5',
  accent: ACCENT,
  deep: palette.deep,
  warm: palette.amber,
  accentBorder: `${ACCENT}66`,
  accentGlow: `0 0 0 1px ${ACCENT}, 0 0 24px ${ACCENT}55`,
  border: 'rgba(160,190,255,0.16)',
  borderStrong: 'rgba(160,190,255,0.32)',
  surface: 'rgba(20,34,60,0.55)', // glass panel fill
  surfaceStrong: 'rgba(24,42,74,0.8)',
  zinc400: '#B8C4D6',
  zinc500: '#7C8AA5',
  zinc600: '#54627A',
  zinc700: '#3A4760',
  zinc800: '#26314A',
} as const;

/** Third-party brand colors used only where a brief calls for them. */
export const brand = {
  typescript: '#3178C6',
  rust: '#DEA584',
  postgres: '#336791',
  denied: 'rgba(239,68,68,0.9)',
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
export const fonts = { ui: interFamily, mono: jetBrainsFamily } as const;

export const type = {
  hero: { fontFamily: fonts.ui, fontSize: 112, fontWeight: 800, lineHeight: 0.98, letterSpacing: -4 },
  headline: { fontFamily: fonts.ui, fontSize: 76, fontWeight: 800, lineHeight: 1.0, letterSpacing: -2.5 },
  subhead: { fontFamily: fonts.ui, fontSize: 40, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1 },
  body: { fontFamily: fonts.ui, fontSize: 28, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0 },
  monoLabel: { fontFamily: fonts.mono, fontSize: 20, fontWeight: 500, lineHeight: 1, letterSpacing: 2 },
  code: { fontFamily: fonts.mono, fontSize: 24, fontWeight: 400, lineHeight: 1.6, letterSpacing: 0 },
  stat: { fontFamily: fonts.ui, fontSize: 168, fontWeight: 800, lineHeight: 1, letterSpacing: -7 },
} as const;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------
export const space = { xs: 8, sm: 16, md: 24, lg: 40, xl: 64, xxl: 96 } as const;
export const radius = { sm: 10, md: 16, lg: 22, pill: 999 } as const;

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------
export const springs = {
  /** Entrance: fluid with a slight overshoot (~3%). */
  enter: { damping: 14, stiffness: 170, mass: 0.9 },
  /** Punchier variant for badges, counters, and stamps. */
  pop: { damping: 11, stiffness: 220, mass: 0.8 },
  /** Slow, heavy — for whole-composition moves (collapse, dock). */
  drift: { damping: 22, stiffness: 60, mass: 1.2 },
} as const;

export const timing = {
  stagger: 3,
  exit: 8,
  hold: 20,
  enterDuration: 22,
  rise: 24,
  scaleFrom: 0.92,
} as const;

/** Standard entrance. Slight overshoot comes from the spring itself. */
export const enter = (frame: number, fps: number, delay = 0) => {
  const p = spring({ fps, frame: frame - delay, config: springs.enter });
  return {
    progress: p,
    opacity: Math.min(1, p * 1.4),
    translateY: (1 - p) * timing.rise,
    scale: timing.scaleFrom + (1 - timing.scaleFrom) * p,
  };
};

/** Quick exit: opacity to 0 with a small scale-down. */
export const exitFade = (frame: number, endFrame: number, length: number = timing.exit) =>
  interpolate(frame, [endFrame - length, endFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });

export const enterStyle = (frame: number, fps: number, delay = 0, durationInFrames?: number): CSSProperties => {
  const e = enter(frame, fps, delay);
  const out = durationInFrames ? exitFade(frame, durationInFrames) : 1;
  return {
    opacity: e.opacity * out,
    transform: `translateY(${e.translateY}px) scale(${e.scale * (0.96 + 0.04 * out)})`,
  };
};

export const itp = (frame: number, from: number, to: number, a = 0, b = 1) =>
  interpolate(frame, [from, to], [a, b], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const slowSpring = (frame: number, fps: number, delay: number, durationInFrames: number) =>
  spring({ fps, frame: frame - delay, config: springs.drift, durationInFrames });

export const typeOut = (text: string, frame: number, start: number, framesPerChar = 2) => {
  const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) / framesPerChar) + 1));
  return frame < start ? '' : text.slice(0, n);
};

// ---------------------------------------------------------------------------
// Ambient motion — the layer that keeps every frame alive
// ---------------------------------------------------------------------------
/** Deterministic 0..1 hash of a seed. Never use Math.random() at render time. */
export const hash = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Slow 2D drift for idle elements. `amp` px, `period` frames per loop.
 * Seeds decorrelate siblings so a grid never moves in lockstep.
 */
export const drift = (frame: number, seed: number, amp = 4, period = 150) => {
  const a = hash(seed) * Math.PI * 2;
  const b = hash(seed + 17) * Math.PI * 2;
  return {
    x: Math.sin((frame / period) * Math.PI * 2 + a) * amp,
    y: Math.cos((frame / (period * 1.31)) * Math.PI * 2 + b) * amp,
  };
};

/** Breathing value between min and max. */
export const breathe = (frame: number, period = 90, min = 0.6, max = 1, phase = 0) =>
  min + (max - min) * (0.5 + 0.5 * Math.sin((frame / period) * Math.PI * 2 + phase));

/** Box-shadow bloom. `intensity` 0..1. */
export const glow = (color: string, intensity = 1, spread = 32) =>
  `0 0 ${Math.round(spread * intensity)}px ${color}${Math.round(0x55 * intensity).toString(16).padStart(2, '0')}, 0 0 ${Math.round(
    spread * 0.35 * intensity,
  )}px ${color}${Math.round(0x88 * intensity).toString(16).padStart(2, '0')}`;

/** Text glow via drop-shadow filter. */
export const textGlow = (color: string, intensity = 1) =>
  `drop-shadow(0 0 ${Math.round(18 * intensity)}px ${color}${Math.round(0x66 * intensity).toString(16).padStart(2, '0')})`;

/** Gradient-filled text (sky → white by default). */
export const gradientText = (from: string = palette.sky, to: string = palette.white, angle = 100): CSSProperties => ({
  backgroundImage: `linear-gradient(${angle}deg, ${from}, ${to})`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
});

/** Glass panel base (border + translucent fill + inner highlight). */
export const glass = (active = 0): CSSProperties => ({
  backgroundColor: colors.surface,
  border: `1px solid ${active > 0 ? `rgba(95,168,255,${0.25 + 0.5 * active})` : colors.border}`,
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)${active > 0 ? `, ${glow(palette.sky, active)}` : ''}`,
  backdropFilter: 'blur(6px)',
});
