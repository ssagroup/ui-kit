import { baseConfig } from '../../lostpixel.base.config';
import { SCREEN_SIZES } from './src/consts';
import { CustomProjectConfig } from 'lost-pixel';

const breakpoints = Object.keys(SCREEN_SIZES).map(Number);

export const config: Partial<CustomProjectConfig> & {
  storybookShots: {
    breakpoints: number[];
  };
} = Object.assign({}, baseConfig, {
  storybookShots: {
    storybookUrl: './packages/core/storybook-static',
    breakpoints,
  },
  // @cspell:disable-next-line
  lostPixelProjectId: 'clldrwk2t4dkena0e4nu2rikp',
});
