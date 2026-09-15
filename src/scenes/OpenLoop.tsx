import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper, StatCounter } from '../components';
import { breathe, colors, enter, fonts, glow, itp, palette } from '../theme';

export const OPEN_LOOP_DURATION = 105;
const SIZE = 54;
const RULE_AT = 48;

/** "1 database. 1,000,000,000 users." — the billion spins up, then a thin accent rule draws beneath. */
export const OpenLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = enter(frame, fps, 0);
  const rule = itp(frame, RULE_AT, RULE_AT + 25);
  const br = breathe(frame, 70, 0.5, 1);
  const numeral: React.CSSProperties = { fontFamily: fonts.ui, fontSize: SIZE, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1, filter: `drop-shadow(0 0 14px rgba(95,168,255,0.35))` };

  return (
    <SceneWrapper halo justify="center" gap={28}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 12,
          color: colors.text,
          opacity: e.opacity,
          transform: `translateY(${e.translateY}px) scale(${e.scale})`,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={numeral}>1 database.</span>
        <StatCounter value={1_000_000_000} delay={0} duration={35} fontSize={SIZE} weight={800} letterSpacing={-1.5} accent numeralStyle={{ lineHeight: 1 }} style={{ gap: 0 }} />
        <span style={numeral}>users.</span>
      </div>
      <div
        style={{
          width: 860,
          height: 2,
          background: `linear-gradient(90deg, ${palette.sky}, ${palette.amber})`,
          boxShadow: glow(palette.sky, br, 24),
          transform: `scaleX(${rule})`,
          transformOrigin: '0% 50%',
        }}
      />
    </SceneWrapper>
  );
};
