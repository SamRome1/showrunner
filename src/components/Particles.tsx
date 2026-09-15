import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, hash, palette } from '../theme';

type Props = {
  count?: number;
  /** Fraction of particles tinted amber instead of sky. */
  warmRatio?: number;
  /** Global opacity multiplier. */
  opacity?: number;
  /** Upward drift speed in px per frame. */
  rise?: number;
};

/** Seeded, drifting, twinkling particle field. Pure function of frame. */
export const Particles: React.FC<Props> = ({ count = 70, warmRatio = 0.15, opacity = 1, rise = 0.25 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: count }).map((_, i) => {
        const sx = hash(i * 3 + 1);
        const sy = hash(i * 3 + 2);
        const sz = hash(i * 3 + 3);
        const size = 1 + sz * 2.6;
        const speed = rise * (0.4 + sz);
        const y = (((sy * height - frame * speed) % height) + height) % height;
        const x = sx * width + Math.sin(frame / (90 + sz * 120) + i) * 14;
        const warm = hash(i * 7 + 5) < warmRatio;
        const tw = breathe(frame, 60 + sz * 80, 0.25, 1, i);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: warm ? palette.amberSoft : palette.sky,
              opacity: tw * opacity * (0.35 + sz * 0.5),
              boxShadow: `0 0 ${4 + size * 3}px ${warm ? palette.amber : palette.sky}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
