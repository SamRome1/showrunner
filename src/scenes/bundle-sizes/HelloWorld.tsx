import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Headline, SceneWrapper } from '../../components';
import { colors, fonts, typeOut } from '../../theme';

export const HELLO_WORLD_DURATION = 150;
const LINE = '<h1>Hello world</h1>';

export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const text = typeOut(LINE, frame, 0, 2);
  const typing = text.length < LINE.length;
  const caretOn = typing && Math.floor(frame / 15) % 2 === 0;
  return (
    <SceneWrapper justify="center" gap={40}>
      <div style={{ fontFamily: fonts.mono, fontSize: 56, color: colors.text, whiteSpace: 'pre', lineHeight: 1 }}>
        {text}
        <span style={{ opacity: caretOn ? 1 : 0, color: colors.zinc400 }}>▏</span>
      </div>
      <Headline variant="subhead" delay={60} color={colors.zinc400} align="center">
        What does it cost to ship it?
      </Headline>
    </SceneWrapper>
  );
};
