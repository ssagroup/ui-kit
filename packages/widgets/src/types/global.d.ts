import { mainTheme } from '@ssa-ui-kit/core';

declare global {
  export type Theme = typeof mainTheme;
}