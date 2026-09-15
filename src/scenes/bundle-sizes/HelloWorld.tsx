import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Headline, SceneWrapper } from '../../components';
import { breathe, colors, fonts, glass, glow, palette, radius, textGlow, typeOut } from '../../theme';

export const HELLO_WORLD_DURATION = 150;
const LINE = '<h1>Hello world</h1>';

/** A mono line types inside a glowing glass chip; the question rises beneath. */
export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const text = typeOut(LINE, frame, 0, 2);
  const typing = text.length < LINE.length;
  const caretOn = typing && Math.floor(frame / 15) % 2 === 0;
  const br = breathe(frame, 70, 0.55, 1);
  return (
    <SceneWrapper justify="center" gap={44} halo>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 88,
          color: colors.text,
          whiteSpace: 'pre',
          lineHeight: 1,
          padding: '34px 60px',
          borderRadius: radius.lg,
          ...glass(0.7 * br),
          boxShadow: `${glow(palette.sky, 0.8 * br, 56)}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          filter: textGlow(palette.sky, 0.7 * br),
        }}
      >
        <span style={{ color: palette.sky }}>{'<h1>'.slice(0, Math.min(4, text.length))}</span>
        <span>{text.slice(4, Math.max(4, text.length - (text.length > 15 ? text.length - 15 : 0)))}</span>
        <span style={{ color: palette.sky }}>{text.length > 15 ? text.slice(15) : ''}</span>
        <span style={{ opacity: caretOn ? 1 : 0, color: palette.amber }}>▏</span>
      </div>
      <Headline variant="subhead" delay={60} align="center" glow={0.6}>
        What does it cost to ship it?
      </Headline>
    </SceneWrapper>
  );
};
