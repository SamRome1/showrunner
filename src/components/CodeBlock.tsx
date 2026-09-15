import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, colors, enter, glass, glow, palette, radius, timing, type } from '../theme';
import { LightSweep } from './LightSweep';

export type CodeToken = { text: string; color?: string };
export type CodeLine = string | CodeToken[];

type Props = {
  lines: CodeLine[];
  delay?: number;
  stagger?: number;
  highlight?: number[];
  highlightAt?: number;
  fontSize?: number;
  width?: number | string;
  showLineNumbers?: boolean;
  filename?: string;
  animate?: boolean;
  style?: React.CSSProperties;
};

const renderLine = (line: CodeLine) => {
  if (typeof line === 'string') return line.length ? line : ' ';
  return line.map((t, i) => (
    <span key={i} style={{ color: t.color ?? colors.text }}>
      {t.text}
    </span>
  ));
};

/** Glass code panel. Lines rise in; highlighted lines get an amber rule and glow. */
export const CodeBlock: React.FC<Props> = ({
  lines,
  delay = 0,
  stagger = timing.stagger,
  highlight = [],
  highlightAt,
  fontSize = type.code.fontSize,
  width = '100%',
  showLineNumbers = false,
  filename,
  animate = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const settled = { opacity: 1, translateY: 0, scale: 1, progress: 1 };
  const frameE = animate ? enter(frame, fps, delay) : settled;
  const hlStart = highlightAt ?? delay + lines.length * stagger + 12;
  const hl = animate ? enter(frame, fps, hlStart).progress : 1;
  const br = breathe(frame, 80, 0.6, 1);

  return (
    <div
      style={{
        position: 'relative',
        width,
        ...glass(0.2),
        borderRadius: radius.md,
        overflow: 'hidden',
        boxShadow: `${glow(palette.deep, 0.6, 40)}, 0 24px 60px rgba(0,0,0,0.45)`,
        opacity: frameE.opacity,
        transform: `translateY(${frameE.translateY}px) scale(${frameE.scale})`,
        ...style,
      }}
    >
      {filename ? (
        <div
          style={{
            ...type.monoLabel,
            letterSpacing: 0,
            fontSize: Math.round(fontSize * 0.75),
            color: colors.textSecondary,
            padding: '14px 24px',
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ display: 'inline-flex', gap: 6 }}>
            {[palette.sky, palette.amber, colors.zinc600].map((c, i) => (
              <span key={i} style={{ width: 9, height: 9, borderRadius: 999, backgroundColor: c, opacity: 0.8 }} />
            ))}
          </span>
          {filename}
        </div>
      ) : null}
      <div style={{ padding: '24px 0' }}>
        {lines.map((line, i) => {
          const e = animate ? enter(frame, fps, delay + 6 + i * stagger) : settled;
          const isHl = highlight.includes(i);
          const hlAmt = isHl ? hl : 0;
          return (
            <div
              key={i}
              style={{
                ...type.code,
                fontSize,
                display: 'flex',
                padding: '0 24px 0 20px',
                borderLeft: `2px solid ${isHl ? `rgba(245,158,11,${hlAmt})` : 'transparent'}`,
                background: isHl ? `linear-gradient(90deg, rgba(245,158,11,${0.14 * hlAmt * br}), transparent 70%)` : undefined,
                color: isHl ? colors.text : colors.textSecondary,
                opacity: e.opacity * (highlight.length && !isHl ? 1 - hl * 0.45 : 1),
                transform: `translateY(${e.translateY}px)`,
                whiteSpace: 'pre',
              }}
            >
              {showLineNumbers ? (
                <span style={{ width: 40, flexShrink: 0, color: colors.textTertiary, userSelect: 'none' }}>{i + 1}</span>
              ) : null}
              <span>{renderLine(line)}</span>
            </div>
          );
        })}
      </div>
      <LightSweep period={180} phase={delay * 7} opacity={0.07} />
    </div>
  );
};
