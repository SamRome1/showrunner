import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { drift, palette } from '../theme';

/**
 * Animated canvas: base gradient plus three slowly drifting radial washes.
 * Always behind content. `intensity` scales the wash opacity.
 */
export const GradientWash: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const blobs = [
    { seed: 1, x: 0.25, y: 0.3, r: 0.55, color: palette.deep, a: 0.55 },
    { seed: 2, x: 0.8, y: 0.75, r: 0.5, color: palette.sky, a: 0.22 },
    { seed: 3, x: 0.7, y: 0.15, r: 0.35, color: palette.amber, a: 0.13 },
  ];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${palette.canvasTop} 0%, ${palette.canvasBottom} 100%)` }}>
      {blobs.map((b) => {
        const d = drift(frame, b.seed, Math.min(width, height) * 0.06, 420);
        const cx = b.x * width + d.x;
        const cy = b.y * height + d.y;
        const r = b.r * Math.max(width, height);
        return (
          <div
            key={b.seed}
            style={{
              position: 'absolute',
              left: cx - r,
              top: cy - r,
              width: r * 2,
              height: r * 2,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${b.color} 0%, transparent 62%)`,
              opacity: b.a * intensity,
              filter: 'blur(40px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
