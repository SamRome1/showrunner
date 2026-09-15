import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../../components';
import { breathe, colors, fonts, palette, textGlow, typeOut } from '../../theme';

export const VI_CLOSER_DURATION = 90;
const LINE = "that's a vector index.";

/** One typed line over the halo, hold, hard cut. */
export const Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const text = typeOut(LINE, frame, 0, 2);
  const caretOn = text.length < LINE.length && Math.floor(frame / 15) % 2 === 0;
  const br = breathe(frame, 70, 0.6, 1);
  return (
    <SceneWrapper exit={false} justify="center" halo>
      <div style={{ fontFamily: fonts.mono, fontSize: 44, color: colors.text, whiteSpace: 'pre', filter: textGlow(palette.sky, br) }}>
        {text}
        <span style={{ opacity: caretOn ? 1 : 0, color: palette.amber }}>▏</span>
      </div>
    </SceneWrapper>
  );
};
