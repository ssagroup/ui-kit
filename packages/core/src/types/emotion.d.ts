import '@emotion/react';
import { Theme as T } from './emotion';

declare module '@emotion/react' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  export interface Theme extends T {}
}
