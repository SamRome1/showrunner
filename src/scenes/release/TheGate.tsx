import React from 'react';
import { SceneWrapper, Terminal } from '../../components';
import type { TerminalLine } from '../../components';

export const THE_GATE_DURATION = 360;

const HEADERS = ['0. FORMAT', '1. VISUAL SYSTEM', '2. ASSET RULES', '3. ARCHITECTURE', '4. SCENES'];

const LINES: TerminalLine[] = [
  { text: 'make me a launch video', at: 10, kind: 'input' },
  { text: 'This project requires a brief. Fill this in:', at: 56, kind: 'output' },
  ...HEADERS.map((h, i) => ({ text: h, at: 110 + i * 34, kind: 'muted' as const, typed: true, glyph: 'check' as const })),
];

/** The brief gate: the agent refuses to build until the template is filled. */
export const TheGate: React.FC = () => (
  <SceneWrapper justify="center">
    <Terminal lines={LINES} height={480} title="claude" titleIcon="assets/anthropic.svg" caretUntil={56} />
  </SceneWrapper>
);
