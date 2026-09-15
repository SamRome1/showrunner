import React from 'react';
import { useCurrentFrame } from 'remotion';
import { breathe, palette } from '../theme';

type Props = {
  /** Outer diameter in px. */
  size?: number;
  rings?: number;
  opacity?: number;
  /** Center offset from the parent's center. */
  x?: number;
  y?: number;
};

/**
 * Concentric rotating rings with an amber tick, behind hero content.
 * Parent should be position: relative (or use inside SceneWrapper raw).
 */
export const Halo: React.FC<Props> = ({ size = 900, rings = 3, opacity = 0.5, x = 0, y = 0 }) => {
  const frame = useCurrentFrame();
  const br = breathe(frame, 90, 0.7, 1);
  return (
    <div
      style={{
        position: 'absolute',
        left: `calc(50% - ${size / 2}px + ${x}px)`,
        top: `calc(50% - ${size / 2}px + ${y}px)`,
        width: size,
        height: size,
        opacity: opacity * br,
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: rings }).map((_, i) => {
        const inset = i * (size / (rings * 2.4));
        const dir = i % 2 ? -1 : 1;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset,
              borderRadius: '50%',
              border: `1px ${i % 2 ? 'dashed' : 'solid'} rgba(95,168,255,${0.28 - i * 0.05})`,
              borderTopColor: `rgba(245,158,11,${0.7 - i * 0.15})`,
              transform: `rotate(${frame * (0.5 + i * 0.3) * dir}deg)`,
              boxShadow: `0 0 24px rgba(95,168,255,0.12), inset 0 0 24px rgba(95,168,255,0.06)`,
            }}
          />
        );
      })}
      <div style={{ position: 'absolute', inset: size * 0.28, borderRadius: '50%', background: `radial-gradient(circle, ${palette.deep}66, transparent 70%)`, filter: 'blur(30px)' }} />
    </div>
  );
};
