import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { MonoLabel, SceneWrapper } from '../../components';
import { breathe, enter, fonts, gradientText, palette, textGlow } from '../../theme';

export const WORDMARK_DURATION = 150;

/** The one display-scale text moment in the video (sanctioned in the brief). */
export const Wordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = enter(frame, fps, 0);
  const br = breathe(frame, 80, 0.6, 1);
  const letters = 'showrunner'.split('');
  return (
    <SceneWrapper justify="center" gap={30} halo>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          fontFamily: fonts.ui,
          fontWeight: 800,
          fontSize: 136,
          letterSpacing: -5,
          lineHeight: 1,
          filter: textGlow(palette.sky, br),
        }}
      >
        {letters.map((ch, i) => {
          const le = enter(frame, fps, i * 2);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                ...gradientText(palette.white, palette.sky, 170),
                opacity: le.opacity,
                transform: `translateY(${le.translateY}px) scale(${le.scale})`,
                transformOrigin: '50% 100%',
              }}
            >
              {ch}
            </span>
          );
        })}
        <span
          style={{
            display: 'inline-block',
            color: palette.amber,
            filter: textGlow(palette.amber, br * 1.2),
            opacity: enter(frame, fps, 22).opacity,
            transform: `scale(${enter(frame, fps, 22).scale})`,
          }}
        >
          .
        </span>
      </div>
      <MonoLabel delay={26} size={19} accent dot>
        A motion design system for AI-generated video
      </MonoLabel>
      <div style={{ opacity: e.opacity * 0.9 }} />
    </SceneWrapper>
  );
};
