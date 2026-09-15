import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../components';
import { breathe, colors, enter, fonts, glow, gradientText, itp, palette, textGlow } from '../theme';

export const NINE_MONTHS_DURATION = 195;
const A_AT = 20;
const RULE_AT = 45;
const B_AT = 70;

export const NineMonths: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = enter(frame, fps, A_AT);
  const b = enter(frame, fps, B_AT);
  const rule = itp(frame, RULE_AT, RULE_AT + 25);
  const br = breathe(frame, 70, 0.6, 1);

  return (
    <SceneWrapper halo justify="center" gap={36}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 96,
          fontWeight: 500,
          color: colors.text,
          lineHeight: 1,
          ...gradientText(palette.sky, palette.white),
          filter: textGlow(palette.sky, br),
          opacity: a.opacity,
          transform: `translateY(${a.translateY}px) scale(${a.scale})`,
        }}
      >
        9 months
      </div>
      <div style={{ width: 320, height: 2, background: `linear-gradient(90deg, ${palette.sky}, ${palette.amber})`, boxShadow: glow(palette.amber, br, 24), transform: `scaleX(${rule})` }} />
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 112,
          fontWeight: 700,
          color: palette.amber,
          lineHeight: 1,
          filter: textGlow(palette.amber, br),
          opacity: b.opacity,
          transform: `translateY(${b.translateY}px) scale(${b.scale})`,
        }}
      >
        1 SEV0
      </div>
    </SceneWrapper>
  );
};
