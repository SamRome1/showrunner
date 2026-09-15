import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, colors, enter, fonts, glass, glow, palette, radius, textGlow, typeOut } from '../theme';
import { LightSweep } from './LightSweep';

type Props = {
  /** Full query string. */
  query: string;
  /** Frame (within the scene) typing starts. */
  typeAt?: number;
  framesPerChar?: number;
  /** Result rows (label · detail). */
  results: string[];
  /**
   * "lagging": nothing appears until `latencyFrames` after the LAST keystroke.
   * "live": results refresh `latencyFrames` after EVERY keystroke.
   */
  mode: 'lagging' | 'live';
  latencyFrames: number;
  /** Milliseconds shown in the readout once results land. */
  readoutMs: number;
  width?: number;
  /** Frame the whole mock enters. */
  delay?: number;
};

/**
 * SearchMock — a glass search field with a typed query, result rows that land
 * after a configurable latency, and an amber latency readout. Built from
 * components; not a screenshot.
 */
export const SearchMock: React.FC<Props> = ({
  query,
  typeAt = 30,
  framesPerChar = 4,
  results,
  mode,
  latencyFrames,
  readoutMs,
  width = 880,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = enter(frame, fps, delay);
  const br = breathe(frame, 80, 0.55, 1);

  const typed = typeOut(query, frame, typeAt, framesPerChar);
  const typedCount = typed.length;
  const lastKeyFrame = typeAt + Math.max(0, typedCount - 1) * framesPerChar;
  const doneTyping = typedCount >= query.length;
  const caretOn = Math.floor(frame / 14) % 2 === 0;

  // when do results (for the current typed state) become visible?
  let resultsAt: number | null = null;
  if (mode === 'lagging') {
    const lastFrame = typeAt + (query.length - 1) * framesPerChar;
    resultsAt = doneTyping ? lastFrame + latencyFrames : null;
  } else if (typedCount > 0) {
    // live: results appear once, `latencyFrames` after the first keystroke, and
    // stay on screen while the list narrows — no blink between keystrokes.
    resultsAt = typeAt + latencyFrames;
  }
  const showResults = resultsAt !== null && frame >= resultsAt;
  const waiting = typedCount > 0 && !showResults;
  void lastKeyFrame;
  // live mode narrows the list as the query grows
  const visible = mode === 'live' ? results.slice(0, Math.max(2, results.length - Math.floor(typedCount / 6))) : results;
  const readoutIn = resultsAt !== null ? Math.max(0, Math.min(1, (frame - resultsAt) / 12)) : 0;
  const shownMs = Math.round(readoutMs * readoutIn);

  return (
    <div
      style={{
        position: 'relative',
        width,
        borderRadius: radius.lg,
        ...glass(0.35 + 0.3 * br),
        boxShadow: `${glow(palette.deep, 0.9, 60)}, 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
        overflow: 'hidden',
        opacity: e.opacity,
        transform: `translateY(${e.translateY}px) scale(${e.scale})`,
      }}
    >
      {/* field */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '26px 30px', borderBottom: `1px solid ${colors.border}` }}>
        <svg width={30} height={30} viewBox="0 0 24 24" fill="none" style={{ filter: textGlow(palette.sky, 0.6) }}>
          <circle cx={11} cy={11} r={7} stroke={palette.sky} strokeWidth={1.8} />
          <path d="M16.5 16.5L21 21" stroke={palette.sky} strokeWidth={1.8} strokeLinecap="round" />
        </svg>
        <div style={{ flex: 1, fontFamily: fonts.mono, fontSize: 34, color: colors.text, whiteSpace: 'pre', minHeight: 40 }}>
          {typed}
          <span style={{ opacity: caretOn ? 1 : 0, color: palette.amber }}>▏</span>
        </div>
        {waiting ? (
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: `2px solid rgba(95,168,255,0.25)`,
              borderTopColor: palette.amber,
              transform: `rotate(${frame * 14}deg)`,
              boxShadow: glow(palette.amber, 0.4, 14),
            }}
          />
        ) : null}
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 26,
            fontVariantNumeric: 'tabular-nums',
            color: palette.amber,
            opacity: readoutIn,
            filter: textGlow(palette.amber, br),
            padding: '6px 14px',
            borderRadius: radius.pill,
            border: `1px solid rgba(245,158,11,${0.35 + 0.4 * br})`,
            backgroundColor: 'rgba(245,158,11,0.08)',
            marginLeft: 8,
          }}
        >
          {shownMs.toLocaleString('en-US')} ms
        </div>
      </div>

      {/* results */}
      <div style={{ padding: '14px 18px 18px', minHeight: 5 * 66 + 32 }}>
        {visible.map((r, i) => {
          const at = resultsAt ?? 0;
          const re = showResults ? enter(frame, fps, at + i * 3) : { opacity: 0, translateY: 24, scale: 0.92 };
          const [label, detail] = r.split(' · ');
          const shimmer = breathe(frame, 90, 0, 1, -i * 0.7);
          return (
            <div
              key={r}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                margin: '6px 0',
                borderRadius: radius.sm,
                border: `1px solid rgba(95,168,255,${0.12 + 0.18 * shimmer})`,
                backgroundColor: `rgba(51,103,145,${0.16 + 0.14 * shimmer})`,
                fontFamily: fonts.ui,
                fontSize: 24,
                color: colors.text,
                opacity: re.opacity,
                transform: `translateY(${re.translateY}px) scale(${re.scale})`,
                transformOrigin: '0% 50%',
              }}
            >
              <span style={{ fontWeight: 600 }}>{label}</span>
              <span style={{ color: colors.textSecondary, fontSize: 20 }}>{detail}</span>
            </div>
          );
        })}
      </div>
      <LightSweep period={170} opacity={0.07} />
    </div>
  );
};
