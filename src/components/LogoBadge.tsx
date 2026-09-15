import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, colors, drift, enter, glass, glow, palette, radius, type } from '../theme';
import { LightSweep } from './LightSweep';

type Props = {
  src: string;
  label?: string;
  delay?: number;
  size?: number;
  /** ONLY for pure monochrome marks. */
  invert?: boolean;
  /** Accent glow on the tile (0..1). */
  highlight?: boolean | number;
  bare?: boolean;
  animate?: boolean;
  labelSize?: number;
  style?: React.CSSProperties;
};

/** Official logo in a glass tile that floats, breathes, and catches a light sweep. */
export const LogoBadge: React.FC<Props> = ({
  src,
  label,
  delay = 0,
  size = 120,
  invert = false,
  highlight = false,
  bare = false,
  animate = true,
  labelSize = type.subhead.fontSize,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = animate ? enter(frame, fps, delay) : { opacity: 1, translateY: 0, scale: 1 };
  const d = drift(frame, delay * 7 + size, 3, 180);
  const hl = typeof highlight === 'number' ? highlight : highlight ? 1 : 0;
  const br = breathe(frame, 95, 0.6, 1, delay);
  const markSize = Math.round(size * 0.52);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 24,
        opacity: e.opacity,
        transform: `translate(${d.x}px, ${d.y + e.translateY}px) scale(${e.scale})`,
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radius.lg,
          overflow: 'hidden',
          ...(bare ? null : { ...glass(hl * br), boxShadow: `${glow(palette.sky, 0.25 + hl * br * 0.9, 36)}, inset 0 1px 0 rgba(255,255,255,0.08)` }),
        }}
      >
        <Img src={staticFile(src)} style={{ width: markSize, height: markSize, objectFit: 'contain', filter: `${invert ? 'invert(1) ' : ''}drop-shadow(0 4px 14px rgba(0,0,0,0.5))` }} />
        {bare ? null : <LightSweep period={160} phase={delay * 13} />}
      </div>
      {label ? <div style={{ ...type.subhead, fontSize: labelSize, color: colors.text }}>{label}</div> : null}
    </div>
  );
};
