import { CustomProjectConfig } from 'lost-pixel';

import { baseConfig } from '../../lostpixel.base.config';

import { SCREEN_SIZES } from './src/consts';

const breakpoints = Object.keys(SCREEN_SIZES).map(Number);

const coreConfig: Partial<CustomProjectConfig> & {
  storybookShots: {
    breakpoints: number[];
  };
} = {
  storybookShots: {
    storybookUrl: './packages/core/storybook-static',
    breakpoints,
    // https://docs.lost-pixel.com/user-docs/api-reference/mask
    mask: [{ selector: '.lostpixel-ignore' }],
  },
  // @cspell:disable-next-line
  lostPixelProjectId: 'clldrwk2t4dkena0e4nu2rikp',
};

export const config: Partial<CustomProjectConfig> & {
  storybookShots: {
    breakpoints: number[];
  };
} = Object.assign({}, baseConfig, coreConfig);
