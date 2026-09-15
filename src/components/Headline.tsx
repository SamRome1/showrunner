import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, colors, drift, enter, gradientText, palette, textGlow, timing, type } from '../theme';

type Props = {
  children: React.ReactNode;
  delay?: number;
  variant?: 'hero' | 'headline' | 'subhead' | 'body';
  color?: string;
  align?: 'left' | 'center';
  maxWidth?: number;
  /** Per-word kinetic entrance (string children only). */
  kinetic?: boolean;
  /** Gradient-filled text (sky → white). */
  gradient?: boolean;
  /** Glow intensity 0..1. */
  glow?: number;
  /** false = render settled, no entrance. */
  animate?: boolean;
  style?: React.CSSProperties;
};

/** Amber emphasis span — the one warm thing on screen. */
export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: palette.amber, filter: textGlow(palette.amber, 0.8) }}>{children}</span>
);

/** Sky emphasis span. */
export const Sky: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: palette.sky, filter: textGlow(palette.sky, 0.6) }}>{children}</span>
);

export const Muted: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: colors.textSecondary }}>{children}</span>
);

export const Headline: React.FC<Props> = ({
  children,
  delay = 0,
  variant = 'headline',
  color = colors.text,
  align = 'left',
  maxWidth,
  kinetic = true,
  gradient = false,
  glow = 0.5,
  animate = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const settled = { opacity: 1, translateY: 0, scale: 1, progress: 1 };
  const e = animate ? enter(frame, fps, delay) : settled;
  const d = drift(frame, delay + 3, 2, 210);
  const g = glow * breathe(frame, 110, 0.7, 1, delay);

  const base: React.CSSProperties = {
    ...type[variant],
    color,
    textAlign: align,
    maxWidth,
    textWrap: 'balance',
    filter: glow > 0 ? textGlow(gradient ? palette.sky : color, g) : undefined,
    ...(gradient ? gradientText() : null),
    transform: `translate(${d.x}px, ${d.y}px)`,
    ...style,
  };

  if (kinetic && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <div
        style={{
          ...base,
          ...(gradient ? { backgroundImage: undefined, WebkitBackgroundClip: undefined, backgroundClip: undefined, color: undefined } : null),
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0 0.28em',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
        }}
      >
        {words.map((w, i) => {
          const we = animate ? enter(frame, fps, delay + i * timing.stagger) : settled;
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: we.opacity,
                transform: `translateY(${we.translateY}px) scale(${we.scale})`,
                transformOrigin: '0% 100%',
                ...(gradient ? gradientText() : null),
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        ...base,
        opacity: e.opacity,
        transform: `translate(${d.x}px, ${d.y + e.translateY}px) scale(${e.scale})`,
        transformOrigin: align === 'center' ? '50% 50%' : '0% 50%',
      }}
    >
      {children}
    </div>
  );
};
