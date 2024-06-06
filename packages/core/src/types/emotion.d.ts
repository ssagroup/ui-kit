import '@emotion/react';
import type { Colors } from './emotion';

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
