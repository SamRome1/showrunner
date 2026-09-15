import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Headline, LightSweep, MonoLabel, SceneWrapper } from '../../components';
import { breathe, colors, enter, fonts, glass, glow, itp, palette, radius, textGlow, timing } from '../../theme';

export const TRADE_OFF_DURATION = 180;
const ROWS = [
  { k: 'recall', v: '~95%', at: 30 },
  { k: 'latency', v: '~1 ms', at: 30 + timing.stagger * 2 },
];

/** The honest deal: approximate answers, fast. */
export const TradeOff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const br = breathe(frame, 80, 0.5, 1);
  return (
    <SceneWrapper gap={40} halo>
      <Headline delay={0} maxWidth={864} gradient>
        Approximate. Fast.
      </Headline>
      <div style={{ width: 864, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {ROWS.map((r, i) => {
          const e = enter(frame, fps, r.at);
          const rule = itp(frame, r.at + 6, r.at + 30);
          return (
            <div
              key={r.k}
              style={{
                position: 'relative',
                overflow: 'hidden',
                ...glass(0.5 * br),
                borderRadius: radius.md,
                padding: '30px 36px',
                opacity: e.opacity,
                transform: `translateY(${e.translateY}px) scale(${e.scale})`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: fonts.mono, fontSize: 36, color: colors.text }}>
                <span style={{ color: colors.textSecondary }}>{r.k}</span>
                <span style={{ color: palette.amber, fontSize: 48, fontWeight: 700, filter: textGlow(palette.amber, br) }}>{r.v}</span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: 2,
                  width: '100%',
                  background: `linear-gradient(90deg, ${palette.sky}, ${palette.amber})`,
                  boxShadow: glow(palette.sky, br, 16),
                  transform: `scaleX(${rule})`,
                  transformOrigin: '0 50%',
                }}
              />
              <LightSweep period={160} phase={i * 60} />
            </div>
          );
        })}
      </div>
      <MonoLabel delay={ROWS[1].at + 20} pill>
        typical · hnsw · 1m vectors
      </MonoLabel>
    </SceneWrapper>
  );
};
