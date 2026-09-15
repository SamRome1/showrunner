import React from 'react';
import { SceneWrapper, Terminal } from '../../components';

export const CLOSER_DURATION = 90;

/** Clone line types, holds, hard cut. */
export const Closer: React.FC = () => (
  <SceneWrapper exit={false} justify="center" halo>
    <Terminal
      lines={[{ text: 'git clone github.com/SamRome1/showrunner', at: 8, kind: 'input', framesPerChar: 1.5 }]}
      height={200}
      fontSize={27}
      caretUntil={90}
      active={0.8}
    />
  </SceneWrapper>
);
