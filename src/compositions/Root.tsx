import React from 'react';
import { Composition } from 'remotion';
import { CANVAS } from '../theme';
import { ShortForm, SHORT_FORM_DURATION } from './ShortForm';
import { AssetCheck } from './AssetCheck';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="ShortForm"
      component={ShortForm}
      durationInFrames={SHORT_FORM_DURATION}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
    />
    {/* ---- gallery examples (one block each; keep blocks separated) ---- */}

    {/* example: VectorIndex */}

    {/* example: Release */}

    {/* example: BundleSizes */}

    {/* ---- tooling ---- */}
    <Composition
      id="AssetCheck"
      component={AssetCheck}
      durationInFrames={1}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
    />
  </>
);
