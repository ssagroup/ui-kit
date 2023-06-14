/* eslint-disable @typescript-eslint/no-empty-interface */
import '@emotion/react';
import { Theme as T } from './emotion';

declare module '@emotion/react' {
  export interface Theme extends T {}
}
