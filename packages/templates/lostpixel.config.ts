import { CustomProjectConfig } from 'lost-pixel';

import { baseConfig } from '../../lostpixel.base.config';

import { SCREEN_SIZES } from './src/consts';

const breakpoints = Object.keys(SCREEN_SIZES).map(Number);

const currentConfig: Partial<CustomProjectConfig> & {
  storybookShots: {
    breakpoints: number[];
  };
} = {
  storybookShots: {
    storybookUrl: './packages/templates/storybook-static',
    breakpoints,
    // https://docs.lost-pixel.com/user-docs/api-reference/mask
    mask: [{ selector: '.lostpixel-ignore' }],
  },
  // @cspell:disable-next-line
  lostPixelProjectId: 'cm1asdwb508l4101yl9675sn2',
};

export const config: Partial<CustomProjectConfig> & {
  storybookShots: {
    breakpoints: number[];
  };
} = Object.assign({}, baseConfig, currentConfig);
