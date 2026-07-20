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
  'avatar-demo': dynamic(() => import('./examples/avatar-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'badge-demo': dynamic(() => import('./examples/badge-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'button-demo': dynamic(() => import('./examples/button-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'checkbox-demo': dynamic(() => import('./examples/checkbox-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'chip-demo': dynamic(() => import('./examples/chip-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'date-picker-demo': dynamic(() => import('./examples/date-picker-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'date-range-picker-demo': dynamic(
    () => import('./examples/date-range-picker-demo'),
    {
      ssr: false,
      loading: Loading,
    },
  ),
  'icon-button-demo': dynamic(() => import('./examples/icon-button-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'input-demo': dynamic(() => import('./examples/input-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'radio-group-demo': dynamic(() => import('./examples/radio-group-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'switch-demo': dynamic(() => import('./examples/switch-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'textarea-demo': dynamic(() => import('./examples/textarea-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'tooltip-demo': dynamic(() => import('./examples/tooltip-demo'), {
    ssr: false,
    loading: Loading,
  }),
  'typeahead-demo': dynamic(() => import('./examples/typeahead-demo'), {
    ssr: false,
    loading: Loading,
  }),
};
