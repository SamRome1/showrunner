import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { LightSweep, SceneWrapper } from '../components';
import { breathe, colors, enter, fonts, glass, glow, palette, radius } from '../theme';

export const RECEIPT_DURATION = 195;
const AT = 20;

/** Citation card — a document, not a screenshot recreation. */
export const TheReceipt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enter(frame, fps, AT);
  const br = breathe(frame, 90, 0.5, 1);
  const rows = [enter(frame, fps, AT + 8), enter(frame, fps, AT + 14), enter(frame, fps, AT + 20)];
  const rise = (e: ReturnType<typeof enter>): React.CSSProperties => ({
    opacity: e.opacity,
    transform: `translateY(${e.translateY}px)`,
  });

  return (
    <SceneWrapper justify="center">
      <div
        style={{
          position: 'relative',
          width: 860,
          ...glass(0.5 * br),
          boxShadow: `${glow(palette.deep, 0.9, 60)}, 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
          borderRadius: radius.lg,
          padding: '52px 60px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          overflow: 'hidden',
          opacity: card.opacity,
          transform: `translateY(${card.translateY}px) scale(${card.scale})`,
        }}
      >
        <Img
          src={staticFile('assets/postgresql.svg')}
          style={{ position: 'absolute', top: 44, right: 52, width: 56, height: 56, objectFit: 'contain', filter: `drop-shadow(0 0 ${14 * br}px ${palette.sky}aa)`, ...rise(rows[0]) }}
        />
        <div style={{ fontFamily: fonts.mono, fontSize: 18, letterSpacing: 1.5, color: palette.amber, ...rise(rows[0]) }}>
          PGCONF.DEV 2025
        </div>
        <div
          style={{
            fontFamily: fonts.ui,
            fontWeight: 600,
            fontSize: 42,
            lineHeight: 1.2,
            letterSpacing: -0.5,
            color: colors.text,
            paddingRight: 60,
            ...rise(rows[1]),
          }}
        >
          “Scaling Postgres to the Next Level at OpenAI”
        </div>
        <div style={{ fontFamily: fonts.ui, fontWeight: 500, fontSize: 22, color: colors.zinc400, ...rise(rows[2]) }}>
          Bohan Zhang · OpenAI
        </div>
        <LightSweep period={170} opacity={0.08} />
      </div>
    </SceneWrapper>
  );
};
