import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { LightSweep, SceneWrapper } from '../../components';
import { FRAMEWORKS, MEASURED_ON, SOURCE_URL } from './data';
import { breathe, colors, enter, fonts, glass, glow, palette, radius } from '../../theme';

export const SOURCE_DURATION = 240;
const AT = 20;

/** Glass citation card in the style of TheReceipt, with the five logos docked along the top edge. */
export const Source: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enter(frame, fps, AT);
  const br = breathe(frame, 90, 0.5, 1);
  const row = (i: number): React.CSSProperties => {
    const e = enter(frame, fps, AT + 8 + i * 6);
    return { opacity: e.opacity, transform: `translateY(${e.translateY}px)` };
  };
  return (
    <SceneWrapper justify="center" halo>
      <div
        style={{
          position: 'relative',
          width: 1240,
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
        <div style={{ position: 'absolute', top: 44, right: 56, display: 'flex', gap: 14, ...row(0) }}>
          {FRAMEWORKS.map((f, i) => (
            <div key={f.id} style={{ width: 54, height: 54, borderRadius: radius.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', ...glass(0.3 * breathe(frame, 80, 0.4, 1, i)), boxShadow: glow(palette.sky, 0.35, 20) }}>
              <Img src={staticFile(f.logo)} style={{ width: 30, height: 30, objectFit: 'contain' }} />
            </div>
          ))}
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 20, letterSpacing: 1.5, color: palette.amber, ...row(0) }}>SOURCE</div>
        <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 44, letterSpacing: -1, color: colors.text, ...row(1) }}>
          {SOURCE_URL} · esbuild · min + gzip
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...row(2) }}>
          {FRAMEWORKS.map((f) => (
            <div key={f.id} style={{ fontFamily: fonts.mono, fontSize: 24, color: colors.textSecondary }}>
              <span style={{ color: palette.sky }}>{f.name.toLowerCase().padEnd(7)}</span> {f.query}
            </div>
          ))}
        </div>
        <div style={{ fontFamily: fonts.ui, fontWeight: 500, fontSize: 22, color: colors.textTertiary, ...row(3) }}>
          Measured {MEASURED_ON} · whole runtime, every export, before tree-shaking
        </div>
        <LightSweep period={170} opacity={0.08} />
      </div>
    </SceneWrapper>
  );
};
