import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MonoLabel, SceneWrapper } from '../../components';
import { breathe, colors, fonts, glass, glow, palette, radius, typeOut } from '../../theme';
import { Wordmark } from './Wordmark';

export const CLOSER_DURATION = 120;
const LINE = 'npm i @lumen/search';

/** Wordmark + install line; hard cut at the end. */
export const Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const text = typeOut(LINE, frame, 20, 2);
  const typing = frame >= 20 && text.length < LINE.length;
  const caretOn = typing && Math.floor(frame / 14) % 2 === 0;
  const br = breathe(frame, 70, 0.55, 1);
  return (
    <SceneWrapper exit={false} justify="center" gap={44} halo>
      <Wordmark size={120} />
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 44,
          color: colors.text,
          whiteSpace: 'pre',
          padding: '22px 44px',
          borderRadius: radius.lg,
          ...glass(0.6 * br),
          boxShadow: `${glow(palette.sky, 0.7 * br, 44)}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          minWidth: 560,
          textAlign: 'center',
        }}
      >
        <span style={{ color: palette.sky }}>$ </span>
        {text}
        <span style={{ opacity: caretOn ? 1 : 0, color: palette.amber }}>▏</span>
      </div>
      <MonoLabel delay={70} uppercase={false} size={26} accent>
        lumen.dev
      </MonoLabel>
    </SceneWrapper>
  );
};
