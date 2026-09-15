import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, colors, enter, glow, palette, radius, type } from '../theme';

type Props = {
  children: React.ReactNode;
  delay?: number;
  pill?: boolean;
  accent?: boolean;
  /** Amber variant for highlight moments. */
  warm?: boolean;
  dot?: boolean;
  uppercase?: boolean;
  size?: number;
  animate?: boolean;
  style?: React.CSSProperties;
};

/** JetBrains Mono label. Pills glow and breathe. */
export const MonoLabel: React.FC<Props> = ({
  children,
  delay = 0,
  pill = false,
  accent = false,
  warm = false,
  dot = false,
  uppercase = true,
  size = type.monoLabel.fontSize,
  animate = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = animate ? enter(frame, fps, delay) : { opacity: 1, translateY: 0, scale: 1 };
  const hue = warm ? palette.amber : palette.sky;
  const color = warm || accent ? hue : colors.textSecondary;
  const br = breathe(frame, 100, 0.5, 1, delay);

  return (
    <div
      style={{
        ...type.monoLabel,
        fontSize: size,
        color,
        textTransform: uppercase ? 'uppercase' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        ...(pill
          ? {
              padding: '10px 18px',
              border: `1px solid ${warm || accent ? `${hue}${Math.round(0x40 + 0x60 * br).toString(16)}` : colors.border}`,
              borderRadius: radius.pill,
              backgroundColor: colors.surface,
              boxShadow: warm || accent ? glow(hue, 0.5 * br, 24) : undefined,
            }
          : null),
        opacity: e.opacity,
        transform: `translateY(${e.translateY}px) scale(${e.scale})`,
        transformOrigin: '0% 50%',
        ...style,
      }}
    >
      {dot ? (
        <span style={{ width: 8, height: 8, borderRadius: radius.pill, backgroundColor: hue, boxShadow: glow(hue, br, 12), flexShrink: 0 }} />
      ) : null}
      {children}
    </div>
  );
};
