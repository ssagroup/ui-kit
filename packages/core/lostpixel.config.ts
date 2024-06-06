import { baseConfig } from '../../lostpixel.base.config';
import { SCREEN_SIZES } from './src/consts';
import { CustomProjectConfig } from 'lost-pixel';

const breakpoints = Object.keys(SCREEN_SIZES).map(Number);

const coreConfig: Partial<CustomProjectConfig> & {
  storybookShots: {
    breakpoints: number[];
  };
} = {
  // TODO: check it
  // https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#storyshots-has-been-removed
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
