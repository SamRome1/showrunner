import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArchDiagram, SceneWrapper, SlotBadge } from '../components';
import { afterScene2 } from './diagramState';
import { brand, breathe, colors, enter, fonts, glow, itp, palette, radius, slowSpring } from '../theme';

export const CODEX_REWRITE_DURATION = 330;

const DRAIN_AT = 150;
const DRAIN_LEN = 60;
const RUST_TARGET = 0.95;
const BAR_OUT = 290;
const DOCK_AT = 300;

export const CodexRewrite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = enter(frame, fps, 0);
  const bar = enter(frame, fps, 4);
  const drain = slowSpring(frame, fps, DRAIN_AT, DRAIN_LEN);
  const rustFrac = drain * RUST_TARGET;
  const rustPct = Math.round(rustFrac * 100);
  const badgeSwap = itp(frame, DRAIN_AT, DRAIN_AT + 20);
  const labelIn = enter(frame, fps, DRAIN_AT);
  const groupOut = itp(frame, BAR_OUT, BAR_OUT + 8, 1, 0);
  const diagramOpacity = frame < BAR_OUT ? itp(frame, 0, 8, 1, 0.28) : itp(frame, BAR_OUT, BAR_OUT + 10, 0.28, 1);
  const br = breathe(frame, 70, 0.6, 1);

  const agent = frame >= DOCK_AT - 2 ? <SlotBadge src="assets/rust.svg" delay={DOCK_AT} /> : undefined;

  return (
    <SceneWrapper exit={false}>
      <AbsoluteFill>
        <ArchDiagram opacity={diagramOpacity} slots={{ ...afterScene2, agent }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: groupOut }}>
        <div style={{ width: 864, display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* repo header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: head.opacity,
              transform: `translateY(${head.translateY}px) scale(${head.scale})`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Img src={staticFile('assets/github.svg')} style={{ width: 26, height: 26, objectFit: 'contain' }} />
              <span style={{ fontFamily: fonts.mono, fontSize: 24, color: colors.text }}>openai/codex</span>
            </div>
            <span
              style={{
                fontFamily: fonts.ui,
                fontWeight: 800,
                fontSize: 64,
                letterSpacing: -2,
                color: palette.amber,
                filter: `drop-shadow(0 0 ${16 * br}px rgba(245,158,11,0.7))`,
                fontVariantNumeric: 'tabular-nums',
                opacity: labelIn.opacity,
                transform: `translateY(${labelIn.translateY}px)`,
              }}
            >
              {rustPct}% Rust
            </span>
          </div>

          {/* badge + language bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              opacity: bar.opacity,
              transform: `translateY(${bar.translateY}px) scale(${bar.scale})`,
            }}
          >
            <div style={{ position: 'relative', width: 72, height: 72 }}>
              <Img
                src={staticFile('assets/typescript.svg')}
                style={{ position: 'absolute', inset: 0, width: 72, height: 72, objectFit: 'contain', opacity: 1 - badgeSwap, filter: `drop-shadow(0 0 14px ${brand.typescript}aa)` }}
              />
              <Img
                src={staticFile('assets/rust.svg')}
                style={{ position: 'absolute', inset: 0, width: 72, height: 72, objectFit: 'contain', opacity: badgeSwap, filter: `drop-shadow(0 0 14px ${brand.rust}aa)` }}
              />
            </div>
            <div
              style={{
                flex: 1,
                height: 22,
                borderRadius: radius.pill,
                overflow: 'hidden',
                display: 'flex',
                backgroundColor: 'rgba(5,8,16,0.6)',
                boxShadow: `${glow(rustFrac > 0.5 ? brand.rust : brand.typescript, 0.8 * br, 40)}, inset 0 1px 0 rgba(255,255,255,0.08)`,
              }}
            >
              <div style={{ width: `${rustFrac * 100}%`, background: `linear-gradient(90deg, ${brand.rust}, #f3c9a3)` }} />
              <div style={{ flex: 1, background: `linear-gradient(90deg, ${brand.typescript}, #6ea8ff)` }} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
