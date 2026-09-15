import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, exitFade, fonts, SAFE_INSET } from '../theme';
import { GradientWash } from './GradientWash';
import { Particles } from './Particles';
import { DotGrid } from './DotGrid';
import { Halo } from './Halo';

type Props = {
  children: React.ReactNode;
  align?: 'center' | 'start' | 'end';
  justify?: 'center' | 'start';
  /** Fade the content layer out over the final frames (the canvas keeps breathing). */
  exit?: boolean;
  gap?: number;
  /** Ambient layer controls. */
  wash?: number;
  particles?: number;
  grid?: number;
  /** Rotating halo behind content — for hero / type-only scenes. */
  halo?: boolean;
  /** Render children outside the safe-zone flex column (for absolutely positioned scenes). */
  raw?: boolean;
};

/**
 * Root of every scene. Animated canvas (gradient wash + particles) behind a
 * safe-zone content column. The canvas never fades, so cuts between scenes
 * feel continuous; only content exits.
 */
export const SceneWrapper: React.FC<Props> = ({
  children,
  align = 'center',
  justify = 'start',
  exit = true,
  gap = 24,
  wash = 1,
  particles = 1,
  grid = 1,
  halo = false,
  raw = false,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = exit ? exitFade(frame, durationInFrames) : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: 'hidden' }}>
      <GradientWash intensity={wash} />
      {grid > 0 ? <DotGrid opacity={0.16 * grid} /> : null}
      {particles > 0 ? <Particles count={110} opacity={particles} /> : null}
      {halo ? <Halo /> : null}
      <AbsoluteFill
        style={
          raw
            ? { opacity, fontFamily: fonts.ui, color: colors.text }
            : {
                padding: SAFE_INSET,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: align === 'center' ? 'center' : align === 'start' ? 'flex-start' : 'flex-end',
                alignItems: justify === 'center' ? 'center' : 'flex-start',
                gap,
                opacity,
                fontFamily: fonts.ui,
                color: colors.text,
              }
        }
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
