import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { FlowLine, Headline, LightSweep, SceneWrapper } from '../../components';
import { breathe, colors, drift, enter, fonts, glass, glow, palette, radius, timing } from '../../theme';

export const GRAMMAR_DURATION = 240;

const ROWS: [string, string][] = [
  ['spring', 'damping 14 · slight overshoot'],
  ['rise', '24px'],
  ['scale', '0.92 → 1'],
  ['exit', '8f fade'],
  ['ambient', 'always'],
];

const SAFE = 86; // matches SAFE_INSET so the flow line sits inside the safe zone
const ROW_H = 84;
const GAP = 14;

/** The house motion grammar, demonstrated with the house stagger. Rows are glass and alive. */
export const Grammar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const br = breathe(frame, 90, 0.5, 1);
  const stackH = ROWS.length * ROW_H + (ROWS.length - 1) * GAP;
  return (
    <SceneWrapper gap={36}>
      <Headline variant="headline" delay={0}>
        One motion grammar.
      </Headline>
      <div style={{ position: 'relative', width: '100%', height: stackH }}>
        <svg width={1080} height={stackH} style={{ position: 'absolute', left: -SAFE, top: 0, pointerEvents: 'none' }}>
          <FlowLine x1={SAFE + 28} y1={0} x2={SAFE + 28} y2={stackH} pulses={2} period={110} opacity={0.5} speed={0.7} />
        </svg>
        {ROWS.map(([key, val], i) => {
          const e = enter(frame, fps, 10 + i * timing.stagger);
          const d = drift(frame, i * 13 + 7, 2, 180 + i * 20);
          const hot = i === ROWS.length - 1;
          return (
            <div
              key={key}
              style={{
                position: 'absolute',
                top: i * (ROW_H + GAP),
                left: 0,
                width: '100%',
                height: ROW_H,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 34px 0 64px',
                ...glass(hot ? 0.8 * br : 0.25 * br),
                borderColor: hot ? `rgba(245,158,11,${0.45 + 0.4 * br})` : undefined,
                boxShadow: hot ? `${glow(palette.amber, 0.7 * br, 36)}, inset 0 1px 0 rgba(255,255,255,0.07)` : undefined,
                borderRadius: radius.md,
                overflow: 'hidden',
                fontFamily: fonts.mono,
                fontSize: 30,
                opacity: e.opacity,
                transform: `translate(${d.x}px, ${d.y + e.translateY}px) scale(${e.scale})`,
                transformOrigin: '0% 50%',
              }}
            >
              <span style={{ position: 'absolute', left: 22, top: '50%', width: 12, height: 12, marginTop: -6, borderRadius: 999, backgroundColor: hot ? palette.amber : palette.sky, boxShadow: glow(hot ? palette.amber : palette.sky, br, 14) }} />
              <span style={{ color: colors.textSecondary }}>{key}</span>
              <span style={{ color: hot ? palette.amber : colors.text, fontWeight: hot ? 700 : 500, filter: hot ? `drop-shadow(0 0 12px ${palette.amber}99)` : undefined }}>{val}</span>
              <LightSweep period={150 + i * 17} phase={i * 37} opacity={0.08} />
            </div>
          );
        })}
      </div>
    </SceneWrapper>
  );
};

