import '@emotion/react';
export type { Theme, SerializedStyles, Interpolation } from '@emotion/react';
export { default as mainTheme } from './src/themes/main';
export type * from './src/types/global';
export * from './src'

declare module '@emotion/react' {
    export interface Theme {
      colors: Colors;
      mediaQueries: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xlg: string;
      };
    }
  }
