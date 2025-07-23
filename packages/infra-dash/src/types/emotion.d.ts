import '@emotion/react';
import { Theme as T } from '@ssa-ui-kit/core';

declare module '@emotion/react' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  export interface Theme extends T {}
}
