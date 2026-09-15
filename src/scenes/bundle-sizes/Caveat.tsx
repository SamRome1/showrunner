import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Accent, Headline, LightSweep, SceneWrapper } from '../../components';
import { breathe, colors, glass, glow, palette, radius } from '../../theme';

export const CAVEAT_DURATION = 210;

/** Headline over a glass caveat card with a light sweep; halo behind. */
export const Caveat: React.FC = () => {
  const frame = useCurrentFrame();
  const br = breathe(frame, 90, 0.5, 1);
  return (
    <SceneWrapper justify="center" gap={40} halo>
      <Headline delay={0} align="center" maxWidth={1500} variant="hero" gradient>
        Bundle size is one variable.
      </Headline>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '34px 56px',
          borderRadius: radius.lg,
          ...glass(0.5 * br),
          boxShadow: `${glow(palette.deep, 0.9, 60)}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          maxWidth: 1500,
        }}
      >
        <Headline variant="subhead" delay={6} align="center" color={colors.textSecondary} glow={0.3} kinetic={false}>
          Runtime speed, hydration, and <Accent>the team you already have</Accent> matter more.
        </Headline>
        <LightSweep period={170} opacity={0.08} />
      </div>
    </SceneWrapper>
  );
};
