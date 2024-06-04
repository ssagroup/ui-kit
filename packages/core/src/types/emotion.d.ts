import '@emotion/react';
import type { Colors, MediaQueryString } from './emotion';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    mediaQueries: {
      xs: MediaQueryString;
      sm: MediaQueryString;
      md: MediaQueryString;
      lg: MediaQueryString;
      xlg: MediaQueryString;
    };
  }
}
