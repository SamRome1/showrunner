import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, colors, enter, gradientText, palette, springs, textGlow, type } from '../theme';

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  delay?: number;
  duration?: number;
  decimals?: number;
  /** Amber numerals for the highlight moment. */
  accent?: boolean;
  /** Sky → white gradient numerals (default). */
  gradient?: boolean;
  fontSize?: number;
  weight?: number;
  letterSpacing?: number;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
  numeralStyle?: React.CSSProperties;
};

const format = (n: number, decimals: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Large numeral that counts up with a pop, glows, and breathes while it holds. */
export const StatCounter: React.FC<Props> = ({
  value,
  prefix = '',
  suffix = '',
  label,
  delay = 0,
  duration = 45,
  decimals = 0,
  accent = false,
  gradient = true,
  fontSize = type.stat.fontSize,
  weight = type.stat.fontWeight,
  letterSpacing = type.stat.letterSpacing,
  align = 'left',
  style,
  numeralStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = enter(frame, fps, delay);
  const count = spring({ fps, frame: frame - delay, config: springs.drift, durationInFrames: duration });
  const settle = spring({ fps, frame: frame - delay - duration + 10, config: springs.pop });
  const current = value * Math.min(1, count);
  const hue = accent ? palette.amber : palette.sky;
  const br = breathe(frame, 100, 0.65, 1, delay);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        gap: 28,
        opacity: e.opacity,
        transform: `translateY(${e.translateY}px) scale(${e.scale * (1 + 0.03 * settle * (1 - settle))})`,
        transformOrigin: align === 'center' ? '50% 50%' : '0% 50%',
        ...style,
      }}
    >
      <div
        style={{
          ...type.stat,
          fontSize,
          fontWeight: weight,
          letterSpacing,
          color: accent ? palette.amber : colors.text,
          fontVariantNumeric: 'tabular-nums',
          filter: textGlow(hue, br),
          ...(gradient && !accent ? gradientText(palette.sky, palette.white, 95) : null),
          ...(accent ? gradientText(palette.amberSoft, palette.amber, 95) : null),
          ...numeralStyle,
        }}
      >
        {prefix}
        {format(current, decimals)}
        {suffix}
      </div>
      {label ? (
        <div style={{ ...type.monoLabel, color: colors.textSecondary, textTransform: 'uppercase' }}>{label}</div>
      ) : null}
    </div>
  );
};
