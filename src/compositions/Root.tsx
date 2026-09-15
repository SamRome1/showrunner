import React from 'react';
import { Composition } from 'remotion';
import { CANVAS } from '../theme';
import { ShortForm, SHORT_FORM_DURATION } from './ShortForm';
import { AssetCheck } from './AssetCheck';
import { Release, RELEASE_DURATION } from './Release';
import { BundleSizes, BUNDLE_SIZES_DURATION } from './BundleSizes';

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

    <Composition
      id="Release"
      component={Release}
      durationInFrames={RELEASE_DURATION}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
    />

    <Composition
      id="BundleSizes"
      component={BundleSizes}
      durationInFrames={BUNDLE_SIZES_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />

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
