import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../components';
import { breathe, colors, enter, fonts, palette, typeOut } from '../theme';

export const CLOSER_DURATION = 210;
const LINE = 'the database from your tutorial';
const TYPE_AT = 40;

/** Elephant returns small; one mono line types; hold; hard cut to black on the last frame. */
export const Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const el = enter(frame, fps, 0);
  const br = breathe(frame, 80, 0.6, 1);
  const text = typeOut(LINE, frame, TYPE_AT, 2);
  const typing = frame >= TYPE_AT && text.length < LINE.length;
  const caretOn = typing && Math.floor(frame / 15) % 2 === 0;

  return (
    <SceneWrapper halo exit={false} justify="center" gap={44}>
      <Img
        src={staticFile('assets/postgresql.svg')}
        style={{
          width: 160,
          height: 160,
          objectFit: 'contain',
          filter: `drop-shadow(0 0 ${26 * br}px ${palette.sky}aa)`,
          opacity: el.opacity,
          transform: `translateY(${el.translateY}px) scale(${el.scale})`,
        }}
      />
      <div style={{ fontFamily: fonts.mono, fontSize: 38, color: colors.text, whiteSpace: 'pre', minHeight: 48, filter: 'drop-shadow(0 0 12px rgba(95,168,255,0.35))' }}>
        {text}
        <span style={{ opacity: caretOn ? 1 : 0, color: colors.zinc400 }}>▏</span>
      </div>
    </SceneWrapper>
  );
};
