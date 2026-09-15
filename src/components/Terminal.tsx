import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, colors, drift, enter, fonts, glass, glow, palette, radius, typeOut } from '../theme';
import { CheckGlyph, CrossGlyph } from './Glyphs';
import { LightSweep } from './LightSweep';

/**
 * Terminal — a glass terminal window. Input lines type out character by
 * character behind a sky prompt; output lines rise in on their frame. The
 * line currently typing carries a breathing glow; `accent` lines are amber.
 */
export type TerminalLine = {
  text: string;
  /** Frame (within the scene) at which this line begins. */
  at: number;
  /** input = typed behind the prompt; output = rises in; muted = secondary color; accent = amber highlight. */
  kind?: 'input' | 'output' | 'muted' | 'accent';
  /** Frames per character for typed lines (default 2). */
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
  /** Title bar text (mono). */
  title?: string;
  /** Path under public/ for a small official mark in the title bar. */
  titleIcon?: string;
  fontSize?: number;
  /** Frame at which the caret stops blinking (default: never). */
  caretUntil?: number;
  /** Glow intensity of the window itself (0..1). */
  active?: number;
  style?: React.CSSProperties;
};

export const Terminal: React.FC<Props> = ({
  lines,
  delay = 0,
  width = 860,
  height = 480,
  title,
  titleIcon,
  fontSize = 25,
  caretUntil = Number.POSITIVE_INFINITY,
  active = 0.45,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const win = enter(frame, fps, delay);
  const d = drift(frame, 91, 3, 240);
  const br = breathe(frame, 90, 0.6, 1);
  const lineHeight = Math.round(fontSize * 1.9);

  // caret sits on the line currently typing, or after the last typed line
  const activeTyped = lines
    .filter((l) => (l.kind ?? 'output') === 'input' || l.typed)
    .filter((l) => frame >= l.at)
    .slice(-1)[0];

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        ...glass(active * br),
        borderRadius: radius.lg,
        boxShadow: `${glow(palette.deep, 0.9, 64)}, ${glow(palette.sky, active * br * 0.6, 40)}, 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: win.opacity,
        transform: `translate(${d.x}px, ${d.y + win.translateY}px) scale(${win.scale})`,
        ...style,
      }}
    >
      <div
        style={{
          height: 56,
          flexShrink: 0,
          borderBottom: `1px solid ${colors.border}`,
          background: 'rgba(5,8,16,0.35)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', gap: 7 }}>
          {[palette.sky, palette.amber, colors.zinc600].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: c, opacity: 0.85, boxShadow: i < 2 ? glow(c, 0.6, 10) : undefined }} />
          ))}
        </div>
        {titleIcon ? (
          <Img src={staticFile(titleIcon)} style={{ width: 18, height: 18, objectFit: 'contain', marginLeft: 6, filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.35))' }} />
        ) : null}
        {title ? (
          <span style={{ fontFamily: fonts.mono, fontSize: 16, letterSpacing: 1.5, color: colors.textSecondary }}>{title}</span>
        ) : null}
      </div>

      <div style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column' }}>
        {lines.map((l, i) => {
          if (frame < l.at) return null;
          const kind = l.kind ?? 'output';
          const isInput = kind === 'input';
          const typed = isInput || l.typed;
          const fpc = l.framesPerChar ?? 2;
          const text = typed ? typeOut(l.text, frame, l.at, fpc) : l.text;
          const e = typed ? { opacity: 1, translateY: 0 } : enter(frame, fps, l.at);
          const color = kind === 'muted' ? colors.textSecondary : kind === 'accent' ? palette.amber : colors.text;
          const doneAt = typed ? l.at + l.text.length * fpc : l.at;
          const typing = typed && frame < doneAt;
          const glyphP = l.glyph ? enter(frame, fps, doneAt + (l.glyphAt ?? 6)).progress : 0;
          const showCaret = activeTyped === l && frame < caretUntil && Math.floor(frame / 15) % 2 === 0;
          const hue = kind === 'accent' ? palette.amber : palette.sky;
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
                filter: typing || kind === 'accent' ? `drop-shadow(0 0 ${12 * br}px ${hue}99)` : undefined,
              }}
            >
              {isInput ? <span style={{ color: palette.sky, filter: `drop-shadow(0 0 8px ${palette.sky})` }}>›</span> : null}
              {l.glyph === 'check' ? <CheckGlyph progress={glyphP} size={Math.round(fontSize * 0.95)} color={palette.amber} /> : null}
              {l.glyph === 'cross' ? <CrossGlyph progress={glyphP} size={Math.round(fontSize * 0.95)} /> : null}
              <span>{text}</span>
              {showCaret ? <span style={{ color: palette.sky, marginLeft: -8 }}>▏</span> : null}
            </div>
          );
        })}
      </div>
      <LightSweep period={170} phase={delay * 11} opacity={0.07} />
    </div>
  );
};
