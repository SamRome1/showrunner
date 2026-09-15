import React from 'react';
import { useCurrentFrame } from 'remotion';
import { breathe, drift, hash, palette } from '../theme';

/**
 * PointField — a seeded cloud of glowing points in normalized [0,1]² space,
 * drawn into a pixel box. Deterministic: same seed + count → same points on
 * every frame. Points twinkle individually and the whole field drifts slightly.
 */
export { makePoints, mulberry32, place, dist2, nearestIndex } from './pointMath';
export type { Pt, Box } from './pointMath';
import { place, type Box, type Pt } from './pointMath';

type Highlight = { index: number; color?: string; ring?: boolean; r?: number };

type Props = {
  points: Pt[];
  box: Box;
  /** Fraction of points visible, revealed in index order with a soft leading edge. */
  reveal?: number;
  radius?: number;
  color?: string;
  opacity?: number;
  highlights?: Highlight[];
  /** Amber query marker with pulsing rings and bloom. */
  query?: Pt;
  /** Extra SVG drawn on top of points in the same coordinate space. */
  children?: React.ReactNode;
  width: number;
  height: number;
  /** Seed for the field's slow parallax drift. */
  driftSeed?: number;
};

/** Shared SVG defs (glow filters, soft dot gradient). Render once per <svg>. */
export const FieldDefs: React.FC = () => (
  <defs>
    <filter id="vi-glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="6" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="vi-glow-soft" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="14" />
    </filter>
    <radialGradient id="vi-dot">
      <stop offset="0%" stopColor={palette.white} stopOpacity="0.95" />
      <stop offset="45%" stopColor={palette.sky} stopOpacity="0.9" />
      <stop offset="100%" stopColor={palette.sky} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="vi-amber">
      <stop offset="0%" stopColor={palette.amberSoft} stopOpacity="1" />
      <stop offset="60%" stopColor={palette.amber} stopOpacity="0.8" />
      <stop offset="100%" stopColor={palette.amber} stopOpacity="0" />
    </radialGradient>
  </defs>
);

/** Amber query marker: bloom, dot, breathing ring, and a repeating expanding pulse. */
export const QueryMarker: React.FC<{ x: number; y: number; opacity?: number; scale?: number }> = ({ x, y, opacity = 1, scale = 1 }) => {
  const frame = useCurrentFrame();
  const br = breathe(frame, 50, 0.7, 1);
  const t = (frame % 54) / 54;
  return (
    <g opacity={opacity} transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r={34} fill="url(#vi-amber)" opacity={0.45 * br} />
      <circle r={12 + t * 30} fill="none" stroke={palette.amber} strokeWidth={1.5} opacity={(1 - t) * 0.8} />
      <circle r={16} fill="none" stroke={palette.amber} strokeWidth={1.8} opacity={0.5 + 0.5 * br} filter="url(#vi-glow)" />
      <circle r={7} fill={palette.amberSoft} filter="url(#vi-glow)" />
      <circle r={3} fill={palette.white} />
    </g>
  );
};

export const PointField: React.FC<Props> = ({
  points,
  box,
  reveal = 1,
  radius = 2.6,
  color = palette.sky,
  opacity = 1,
  highlights = [],
  query,
  children,
  width,
  height,
  driftSeed = 7,
}) => {
  const frame = useCurrentFrame();
  const edge = 60;
  const front = reveal * (points.length + edge);
  const d = drift(frame, driftSeed, 3, 300);
  const q = query ? place(query, box) : null;
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0, opacity }}>
      <FieldDefs />
      <g transform={`translate(${d.x} ${d.y})`}>
        {points.map((p, i) => {
          const o = Math.max(0, Math.min(1, (front - i) / edge));
          if (o <= 0) return null;
          const { x, y } = place(p, box);
          const h = hash(i);
          const tw = breathe(frame, 40 + h * 70, 0.35, 1, h * Math.PI * 2);
          const bright = h > 0.9;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={bright ? radius * 1.9 : radius * (0.8 + h * 0.5)}
              fill={bright ? 'url(#vi-dot)' : color}
              opacity={o * tw * (bright ? 1 : 0.75)}
            />
          );
        })}
        {highlights.map((h, k) => {
          const { x, y } = place(points[h.index], box);
          const c = h.color ?? palette.amber;
          return h.ring ? (
            <circle key={`h${k}`} cx={x} cy={y} r={h.r ?? 14} fill="none" stroke={c} strokeWidth={1.8} filter="url(#vi-glow)" />
          ) : (
            <circle key={`h${k}`} cx={x} cy={y} r={h.r ?? 5} fill={c} filter="url(#vi-glow)" />
          );
        })}
        {children}
        {q ? <QueryMarker x={q.x} y={q.y} /> : null}
      </g>
    </svg>
  );
};
