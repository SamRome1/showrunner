import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { palette } from '../theme';

/** Faint dot grid that drifts slowly and brightens in a moving band. Canvas depth layer. */
export const DotGrid: React.FC<{ spacing?: number; opacity?: number }> = ({ spacing = 48, opacity = 0.16 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const shift = (frame * 0.15) % spacing;
  const band = ((frame * 2.2) % (height + 400)) - 200;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity }}>
      <div
        style={{
          position: 'absolute',
          inset: -spacing,
          backgroundImage: `radial-gradient(circle, ${palette.sky} 1px, transparent 1.6px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          backgroundPosition: `${shift}px ${shift}px`,
          maskImage: `radial-gradient(ellipse at 50% 50%, black 30%, transparent 85%)`,
          WebkitMaskImage: `radial-gradient(ellipse at 50% 50%, black 30%, transparent 85%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          width,
          top: band - 120,
          height: 240,
          background: `linear-gradient(180deg, transparent, ${palette.sky}33, transparent)`,
          mixBlendMode: 'screen',
        }}
      />
    </AbsoluteFill>
  );
};
