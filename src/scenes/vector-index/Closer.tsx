import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../../components';
import { colors, fonts, typeOut } from '../../theme';

export const VI_CLOSER_DURATION = 90;
const LINE = "that's a vector index.";

/** One typed line, hold, hard cut. */
export const Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const text = typeOut(LINE, frame, 0, 2);
  const caretOn = text.length < LINE.length && Math.floor(frame / 15) % 2 === 0;
  return (
    <SceneWrapper exit={false} justify="center">
      <div style={{ fontFamily: fonts.mono, fontSize: 36, color: colors.text, whiteSpace: 'pre' }}>
        {text}
        <span style={{ opacity: caretOn ? 1 : 0, color: colors.zinc400 }}>▏</span>
      </div>
    </SceneWrapper>
  );
};
