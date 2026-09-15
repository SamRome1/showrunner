import React from 'react';
import { Headline, Muted, SceneWrapper } from '../../components';
import { timing } from '../../theme';

export const THE_IDEA_DURATION = 180;

/** The turn: stop comparing against everything. */
export const TheIdea: React.FC = () => (
  <SceneWrapper>
    <Headline delay={0} maxWidth={864}>
      Don't compare against everything.
    </Headline>
    <Headline delay={timing.stagger * 3} variant="subhead" maxWidth={864}>
      <Muted>Build a map first.</Muted>
    </Headline>
  </SceneWrapper>
);
