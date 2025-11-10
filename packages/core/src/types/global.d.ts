/// <reference types="@emotion/react/types/css-prop" />

import { MainColors as MC, MainSizes as MS } from './global';

declare global {
  export type MainSizes = MS;
  export type MainColors = MC;
}
