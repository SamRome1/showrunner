import React from 'react';
import { useCurrentFrame } from 'remotion';
import { palette } from '../theme';

type Props = {
  /** Frames per sweep. */
  period?: number;
  /** Frame offset so siblings do not sweep together. */
  phase?: number;
  color?: string;
  opacity?: number;
  /** Sweep band width as a fraction of the container width. */
  width?: number;
};

/**
 * A soft highlight that travels across its (position: relative, overflow: hidden)
 * parent. Drop it as the last child of any card or panel.
 */
export const LightSweep: React.FC<Props> = ({ period = 140, phase = 0, color = palette.white, opacity = 0.09, width = 0.35 }) => {
  const frame = useCurrentFrame();
  const t = (((frame + phase) / period) % 1 + 1) % 1;
  const left = -width * 100 + t * (100 + width * 200);
  return (
    <div
      style={{
        position: 'absolute',
        top: -20,
        bottom: -20,
        left: `${left}%`,
        width: `${width * 100}%`,
        background: `linear-gradient(100deg, transparent 0%, ${color} 50%, transparent 100%)`,
        opacity,
        transform: 'skewX(-14deg)',
        pointerEvents: 'none',
      }}
    />
  );
};
