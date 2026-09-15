import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../../components';
import { FRAMEWORKS, MEASURED_ON, SOURCE_URL } from './data';
import { colors, enter, fonts, radius } from '../../theme';

export const SOURCE_DURATION = 240;
const AT = 20;

/** Citation card in the style of TheReceipt. */
export const Source: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enter(frame, fps, AT);
  const row = (i: number): React.CSSProperties => {
    const e = enter(frame, fps, AT + 8 + i * 6);
    return { opacity: e.opacity, transform: `translateY(${e.translateY}px)` };
  };
  return (
    <SceneWrapper justify="center">
      <div
        style={{
          width: 1100,
          border: `1px solid ${colors.zinc700}`,
          borderRadius: radius.lg,
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          backgroundColor: colors.bg,
          opacity: card.opacity,
          transform: `translateY(${card.translateY}px) scale(${card.scale})`,
        }}
      >
        <div style={{ fontFamily: fonts.mono, fontSize: 20, letterSpacing: 1.5, color: colors.zinc400, ...row(0) }}>SOURCE</div>
        <div style={{ fontFamily: fonts.ui, fontWeight: 600, fontSize: 38, letterSpacing: -0.5, color: colors.text, ...row(1) }}>
          {SOURCE_URL} · esbuild · min + gzip
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...row(2) }}>
          {FRAMEWORKS.map((f) => (
            <div key={f.id} style={{ fontFamily: fonts.mono, fontSize: 23, color: colors.zinc400 }}>
              {f.query}
            </div>
          ))}
        </div>
        <div style={{ fontFamily: fonts.ui, fontWeight: 500, fontSize: 22, color: colors.zinc500, ...row(3) }}>
          Measured {MEASURED_ON} · whole runtime, every export, before tree-shaking
        </div>
      </div>
    </SceneWrapper>
  );
};
