import React from 'react';
import { SceneWrapper, Terminal } from '../../components';
import type { TerminalLine } from '../../components';

export const THE_ASK_DURATION = 180;

const LINES: TerminalLine[] = [
  { text: 'make me a launch video', at: 12, kind: 'input' },
  { text: 'added bounce spring', at: 60, kind: 'muted', glyph: 'check' },
  { text: 'added gradient background', at: 68, kind: 'muted', glyph: 'check' },
  { text: 'drew the logo in CSS', at: 76, kind: 'muted', glyph: 'check' },
  { text: 'centered everything', at: 84, kind: 'muted', glyph: 'check' },
  { text: 'looks generated.', at: 126, kind: 'output' },
];

/** The problem, told as a transcript. No ugly animation is built. */
export const TheAsk: React.FC = () => (
  <SceneWrapper justify="center">
    <Terminal lines={LINES} height={380} caretUntil={60} />
  </SceneWrapper>
);
