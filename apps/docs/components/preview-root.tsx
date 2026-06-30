'use client';

import { ThemeProvider } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';
import type { ReactNode } from 'react';

/**
 * Wraps a live component example in the SSA UI Kit Emotion theme.
 *
 * IMPORTANT: this module imports `@ssa-ui-kit/core`, which is a UMD bundle that
 * evaluates browser-only chart deps (plotly/nivo) at import time. It must only
 * ever be reached through a `next/dynamic(..., { ssr: false })` boundary so it is
 * never evaluated on the server. See registry/index.tsx.
 */
export function PreviewRoot({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>;
}
