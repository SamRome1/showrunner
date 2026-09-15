import React from 'react';
import { useCurrentFrame } from 'remotion';
import { palette } from '../theme';

type Props = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  /** Base line opacity. */
  opacity?: number;
  /** Dash travel speed (px per frame). 0 disables dashes. */
  speed?: number;
  /** Number of glowing pulses travelling along the line. */
  pulses?: number;
  /** Frames for one pulse to travel end to end. */
  period?: number;
  width?: number;
};

/**
 * A live connector: faint base line, travelling dashes, and glowing pulses.
 * Render inside an <svg>. Pure function of frame.
 */
export const FlowLine: React.FC<Props> = ({
  x1,
  y1,
  x2,
  y2,
  color = palette.sky,
  opacity = 0.35,
  speed = 0.8,
  pulses = 1,
  period = 90,
  width = 1.25,
}) => {
  const frame = useCurrentFrame();
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} opacity={opacity * 0.6} />
      {speed > 0 ? (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={width}
          strokeDasharray="6 14"
          strokeDashoffset={-frame * speed}
          opacity={opacity}
        />
      ) : null}
      {Array.from({ length: pulses }).map((_, i) => {
        const t = ((frame / period + i / pulses) % 1 + 1) % 1;
        const px = x1 + (x2 - x1) * t;
        const py = y1 + (y2 - y1) * t;
        const fade = Math.sin(t * Math.PI);
        return (
          <g key={i} opacity={fade}>
            <circle cx={px} cy={py} r={7} fill={color} opacity={0.18} />
            <circle cx={px} cy={py} r={2.6} fill={palette.white} />
          </g>
        );
      })}
    </g>
  );
};
