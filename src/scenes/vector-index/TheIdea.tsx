import React from 'react';
import { Headline, SceneWrapper, Sky } from '../../components';
import { timing } from '../../theme';

export const THE_IDEA_DURATION = 180;

/** The turn: stop comparing against everything. */
export const TheIdea: React.FC = () => (
  <SceneWrapper halo>
    <Headline delay={0} maxWidth={864} gradient>
      Don't compare against everything.
    </Headline>
    <Headline delay={timing.stagger * 3} variant="subhead" maxWidth={864} kinetic={false} glow={0.3}>
      <Sky>Build a map first.</Sky>
    </Headline>
  </SceneWrapper>
);
