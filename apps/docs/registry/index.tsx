'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

function Loading() {
  return (
    <div className="text-sm text-fd-muted-foreground">Loading preview…</div>
  );
}

/**
 * Registry of live component examples, keyed by name.
 *
 * Every entry is loaded with `ssr: false` on purpose: `@ssa-ui-kit/core` is a
 * UMD bundle that touches `window` (plotly/nivo charts) at import time, so it
 * cannot be evaluated during server rendering. Loading examples client-side is
 * the same trade-off shadcn/ui makes for its interactive previews.
 *
 * To add a component to the docs: drop an example in registry/examples and add
 * one line here.
 */
export const registry: Record<string, ComponentType> = {
  'button-demo': dynamic(() => import('./examples/button-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'typeahead-demo': dynamic(() => import('./examples/typeahead-demo'), {
    ssr: false,
    loading: Loading,
  }),
};
