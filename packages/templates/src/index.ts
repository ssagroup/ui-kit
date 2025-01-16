/* eslint-disable @typescript-eslint/no-empty-interface */
import '@emotion/react';

import { Theme as T } from '@ssa-ui-kit/core';

declare module '@emotion/react' {
  export interface Theme extends T {}
}

export * from './projects/fintech';
export * from './projects/fitness';
