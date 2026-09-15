import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { MonoLabel, SceneWrapper } from '../../components';
import { breathe, enter, gradientText, palette, textGlow, fonts } from '../../theme';

export const WORDMARK_DURATION = 150;
const WORD = 'Lumen';

/** Hero wordmark, letter-kinetic, gradient + breathing glow. Type only — no icon. */
export const Wordmark: React.FC<{ size?: number }> = ({ size = 200 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const br = breathe(frame, 90, 0.6, 1);
  return (
    <div style={{ display: 'flex', fontFamily: fonts.ui, fontWeight: 800, fontSize: size, letterSpacing: -size * 0.05, lineHeight: 1, filter: textGlow(palette.sky, br) }}>
      {WORD.split('').map((ch, i) => {
        const e = enter(frame, fps, i * 3);
        return (
          <span key={i} style={{ display: 'inline-block', ...gradientText(palette.sky, palette.white, 100), opacity: e.opacity, transform: `translateY(${e.translateY}px) scale(${e.scale})` }}>
            {ch}
          </span>
        );
      })}
      <span style={{ display: 'inline-block', color: palette.amber, opacity: enter(frame, fps, WORD.length * 3).opacity, filter: textGlow(palette.amber, br) }}>.</span>
    </div>
  );
};

export const WordmarkScene: React.FC = () => (
  <SceneWrapper justify="center" gap={40} halo>
    <Wordmark />
    <MonoLabel delay={30} dot warm size={24}>
      realtime search for your app · one line
    </MonoLabel>
  </SceneWrapper>
);
