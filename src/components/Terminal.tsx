import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, enter, fonts, radius, typeOut } from '../theme';
import { CheckGlyph, CrossGlyph } from './Glyphs';

/**
 * Terminal — a bordered terminal window. Input lines type out character by
 * character behind an accent prompt; output lines rise in on their frame.
 */
export type TerminalLine = {
  text: string;
  /** Frame (within the scene) at which this line begins. */
  at: number;
  /** input = typed behind the prompt; output = rises in; muted = output in zinc-400. */
  kind?: 'input' | 'output' | 'muted';
  /** Frames per character for input lines (default 2). Output lines ignore this. */
  framesPerChar?: number;
  /** Optional glyph drawn beside the line, starting `glyphAt` frames after `at`. */
  glyph?: 'check' | 'cross';
  glyphAt?: number;
  /** For output lines: type instead of rise (uses framesPerChar). */
  typed?: boolean;
};

type Props = {
  lines: TerminalLine[];
  /** Frame at which the window rises in. */
  delay?: number;
  width?: number;
  height?: number;
  /** Title bar text (mono, zinc-400). */
  title?: string;
  /** Path under public/ for a small official mark in the title bar. */
  titleIcon?: string;
  fontSize?: number;
  /** Frame at which the caret stops blinking (default: never). */
  caretUntil?: number;
  style?: React.CSSProperties;
};

export const Terminal: React.FC<Props> = ({
  lines,
  delay = 0,
  width = 820,
  height = 460,
  title,
  titleIcon,
  fontSize = 24,
  caretUntil = Number.POSITIVE_INFINITY,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const win = enter(frame, fps, delay);
  const lineHeight = Math.round(fontSize * 1.9);

  // caret sits on the line currently typing, or after the last input line
  const activeTyped = lines
    .filter((l) => (l.kind ?? 'output') === 'input' || l.typed)
    .filter((l) => frame >= l.at)
    .slice(-1)[0];

  return (
    <div
      style={{
        width,
        height,
        border: `1px solid ${colors.zinc700}`,
        borderRadius: radius.md,
        backgroundColor: colors.bg,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: win.opacity,
        transform: `translateY(${win.translateY}px) scale(${win.scale})`,
        ...style,
      }}
    >
      <div
        style={{
          height: 52,
          flexShrink: 0,
          borderBottom: `1px solid ${colors.zinc700}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: 999, border: `1px solid ${colors.zinc700}` }} />
          ))}
        </div>
        {titleIcon ? (
          <Img src={staticFile(titleIcon)} style={{ width: 16, height: 16, objectFit: 'contain', marginLeft: 6 }} />
        ) : null}
        {title ? (
          <span style={{ fontFamily: fonts.mono, fontSize: 15, letterSpacing: 1, color: colors.zinc400 }}>{title}</span>
        ) : null}
      </div>

      <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column' }}>
        {lines.map((l, i) => {
          if (frame < l.at) return null;
          const kind = l.kind ?? 'output';
          const isInput = kind === 'input';
          const typed = isInput || l.typed;
          const fpc = l.framesPerChar ?? 2;
          const text = typed ? typeOut(l.text, frame, l.at, fpc) : l.text;
          const e = typed ? { opacity: 1, translateY: 0 } : enter(frame, fps, l.at);
          const color = isInput ? colors.text : kind === 'muted' ? colors.zinc400 : colors.text;
          const doneAt = typed ? l.at + l.text.length * fpc : l.at;
          const glyphP = l.glyph ? enter(frame, fps, doneAt + (l.glyphAt ?? 6)).progress : 0;
          const showCaret = activeTyped === l && frame < caretUntil && frame < doneAt + 1e9 && Math.floor(frame / 15) % 2 === 0;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                height: lineHeight,
                fontFamily: fonts.mono,
                fontSize,
                color,
                whiteSpace: 'pre',
                opacity: e.opacity,
                transform: `translateY(${e.translateY}px)`,
              }}
            >
              {isInput ? <span style={{ color: colors.accent }}>›</span> : null}
              {l.glyph === 'check' ? <CheckGlyph progress={glyphP} size={Math.round(fontSize * 0.9)} /> : null}
              {l.glyph === 'cross' ? <CrossGlyph progress={glyphP} size={Math.round(fontSize * 0.9)} /> : null}
              <span>{text}</span>
              {showCaret ? <span style={{ color: colors.zinc400, marginLeft: -8 }}>▏</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
