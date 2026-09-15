import React from 'react';
import { colors } from '../theme';

/**
 * PointField — a seeded cloud of points in normalized [0,1]² space, drawn into
 * a pixel box. Deterministic: same seed + count → same points on every frame.
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
  /** Extra SVG drawn on top of points (lines, rings) in the same coordinate space. */
  children?: React.ReactNode;
  /** Canvas size for the absolutely positioned svg. */
  width: number;
  height: number;
};

export const PointField: React.FC<Props> = ({
  points,
  box,
  reveal = 1,
  radius = 2.5,
  color = colors.zinc500,
  opacity = 1,
  highlights = [],
  children,
  width,
  height,
}) => {
  const edge = 60; // points over which the reveal edge softens
  const front = reveal * (points.length + edge);
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0, opacity }}>
      {points.map((p, i) => {
        const o = Math.max(0, Math.min(1, (front - i) / edge));
        if (o <= 0) return null;
        const { x, y } = place(p, box);
        return <circle key={i} cx={x} cy={y} r={radius} fill={color} opacity={o} />;
      })}
      {highlights.map((h, k) => {
        const { x, y } = place(points[h.index], box);
        return h.ring ? (
          <circle key={`h${k}`} cx={x} cy={y} r={h.r ?? 14} fill="none" stroke={h.color ?? colors.accent} strokeWidth={1.5} />
        ) : (
          <circle key={`h${k}`} cx={x} cy={y} r={h.r ?? 5} fill={h.color ?? colors.accent} />
        );
      })}
      {children}
    </svg>
  );
};
