import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { MonoLabel, SceneWrapper } from '../../components';
import { colors, enter, fonts } from '../../theme';

export const WORDMARK_DURATION = 150;

/** The one display-scale text moment in the video (sanctioned in the brief). */
export const Wordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = enter(frame, fps, 0);
  return (
    <SceneWrapper justify="center" gap={28}>
      <div
        style={{
          fontFamily: fonts.ui,
          fontWeight: 700,
          fontSize: 128,
          letterSpacing: -4,
          lineHeight: 1,
          color: colors.text,
          opacity: e.opacity,
          transform: `translateY(${e.translateY}px) scale(${e.scale})`,
        }}
      >
        showrunner<span style={{ color: colors.accent }}>.</span>
      </div>
      <MonoLabel delay={6} size={18}>
        A motion design system for AI-generated video
      </MonoLabel>
    </SceneWrapper>
  );
};
