import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArchDiagram, SceneWrapper, SlotBadge, SlotRow } from '../components';
import { colors, enter, fonts, glass, glow, itp, palette, radius, typeOut } from '../theme';

export const FRONTEND_REVEAL_DURATION = 285;

const URL = 'chatgpt.com';
const SOURCE_AT = 75;
const HL_REACT = 105;
const HL_NEXT = 150;
const WINDOW_OUT = 195;
const DOCK_AT = 207;

type Tok = { t: string; hl?: 'react' | 'next' };
/** Invented, minified-looking markup. Not scraped from anywhere. */
const SOURCE: Tok[][] = [
  [{ t: '<!doctype html><html lang="en" class="dark"><head><meta charset="utf-8"/>' }],
  [{ t: '<script id="__oai_cfg" type="application/json">{"sp":1,"rl":0,"ab":{}}</script>' }],
  [{ t: '<link rel="preload" as="script" href="/_s/chunks/main-8f21c.js" crossorigin/>' }],
  [{ t: '<link rel="preload" as="script" href="/_s/chunks/framework-' }, { t: 'react', hl: 'react' }, { t: '-dom-c91a4.js"/>' }],
  [{ t: '<style data-precedence="high">:root{--bg:#000;--fg:#fff}body{margin:0}</style>' }],
  [{ t: '</head><body><div id="__root" data-hydrated="false" data-theme="system">' }],
  [{ t: '<div class="flex h-full w-full overflow-hidden"><nav aria-label="sidebar"/>' }],
  [{ t: '<main class="relative flex-1"><div class="composer" data-state="idle"/>' }],
  [{ t: '</main></div></div><script id="' }, { t: '__NEXT_DATA__', hl: 'next' }, { t: '" type="application/json">' }],
  [{ t: '{"props":{"pageProps":{"session":null,"flags":{"a":true}},"__N_SSP":true},' }],
  [{ t: '"page":"/","query":{},"buildId":"k3Qz8vPq1","isFallback":false,"gssp":true,' }],
  [{ t: '"scriptLoader":[]}</script><script src="/_s/chunks/webpack-1a2b3c.js" async>' }],
  [{ t: '</script><script src="/_s/chunks/pages/_app-77de0.js" async></script>' }],
  [{ t: '</body></html>' }],
];

export const FrontendReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = enter(frame, fps, 0);
  const winOut = itp(frame, WINDOW_OUT, WINDOW_OUT + 8, 1, 0);
  const diagramOpacity = frame < WINDOW_OUT ? itp(frame, 0, 8, 1, 0.28) : itp(frame, WINDOW_OUT, WINDOW_OUT + 10, 0.28, 1);
  const url = typeOut(URL, frame, 10, 3);
  const caretOn = frame < SOURCE_AT && Math.floor(frame / 15) % 2 === 0;
  const sourceIn = itp(frame, SOURCE_AT, SOURCE_AT + 6);
  const hlReact = enter(frame, fps, HL_REACT).progress;
  const hlNext = enter(frame, fps, HL_NEXT).progress;

  const frontend =
    frame >= DOCK_AT - 2 ? (
      <SlotRow>
        <SlotBadge src="assets/react.svg" delay={DOCK_AT} />
        <SlotBadge src="assets/nextjs.svg" delay={DOCK_AT + 4} />
      </SlotRow>
    ) : undefined;

  return (
    <SceneWrapper exit={false}>
      <AbsoluteFill>
        <ArchDiagram opacity={diagramOpacity} slots={{ frontend }} />
      </AbsoluteFill>

      {/* browser window */}
      {frame < WINDOW_OUT + 8 ? (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: 840,
              height: 520,
              ...glass(0.35),
              borderRadius: radius.lg,
              boxShadow: `${glow(palette.deep, 0.8, 60)}, 0 30px 80px rgba(0,0,0,0.5)`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              opacity: win.opacity * winOut,
              transform: `translateY(${win.translateY}px) scale(${win.scale})`,
            }}
          >
            <div
              style={{
                height: 56,
                borderBottom: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', gap: 6 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: [palette.sky, palette.amber, colors.zinc600][i], opacity: 0.85 }} />
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 36,
                  border: `1px solid ${colors.borderStrong}`,
                  borderRadius: radius.sm,
                  backgroundColor: 'rgba(5,8,16,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 14px',
                  fontFamily: fonts.mono,
                  fontSize: 18,
                  color: colors.text,
                }}
              >
                {url}
                <span style={{ opacity: caretOn ? 1 : 0, marginLeft: 1, color: colors.zinc400 }}>▏</span>
              </div>
            </div>
            <div style={{ flex: 1, padding: '20px 22px', overflow: 'hidden', opacity: sourceIn }}>
              {SOURCE.map((line, i) => {
                const li = itp(frame, SOURCE_AT + i * 2, SOURCE_AT + i * 2 + 6);
                return (
                  <div
                    key={i}
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 15,
                      lineHeight: '30px',
                      color: colors.zinc500,
                      whiteSpace: 'pre',
                      opacity: li,
                    }}
                  >
                    {line.map((tok, j) => {
                      if (!tok.hl) return <span key={j}>{tok.t}</span>;
                      const p = tok.hl === 'react' ? hlReact : hlNext;
                      return (
                        <span
                          key={j}
                          style={{
                            color: `rgba(245,158,11,${0.4 + 0.6 * p})`,
                            borderBottom: `1px solid rgba(245,158,11,${p})`,
                            textShadow: `0 0 ${12 * p}px rgba(245,158,11,0.7)`,
                            paddingBottom: 1,
                          }}
                        >
                          {tok.t}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      ) : null}
    </SceneWrapper>
  );
};
