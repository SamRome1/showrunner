import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Headline, MonoLabel, SceneWrapper } from '../../components';
import { colors, enter, fonts, itp, timing } from '../../theme';

export const TRADE_OFF_DURATION = 180;
const ROWS = [
  { k: 'recall', v: '~95%', at: 30 },
  { k: 'latency', v: '~1 ms', at: 30 + timing.stagger * 2 },
];

/** The honest deal: approximate answers, fast. */
export const TradeOff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneWrapper gap={40}>
      <Headline delay={0} maxWidth={864}>
        Approximate. Fast.
      </Headline>
      <div style={{ width: 864, display: 'flex', flexDirection: 'column' }}>
        {ROWS.map((r) => {
          const e = enter(frame, fps, r.at);
          const rule = itp(frame, r.at + 6, r.at + 30);
          return (
            <div key={r.k} style={{ opacity: e.opacity, transform: `translateY(${e.translateY}px)` }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: fonts.mono,
                  fontSize: 34,
                  color: colors.text,
                  padding: '26px 0',
                }}
              >
                <span style={{ color: colors.zinc400 }}>{r.k}</span>
                <span>{r.v}</span>
              </div>
              <div style={{ height: 1, backgroundColor: colors.accent, transform: `scaleX(${rule})`, transformOrigin: '0 50%' }} />
            </div>
          );
        })}
      </div>
      <MonoLabel delay={ROWS[1].at + 20}>typical · hnsw · 1m vectors</MonoLabel>
    </SceneWrapper>
  );
};
