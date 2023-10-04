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
    storybookUrl: './packages/widgets/storybook-static',
    breakpoints,
  },
  customShots: {
    currentShotsPath: './packages/widgets/custom-shots',
  },
  // @cspell:disable-next-line
  lostPixelProjectId: 'clldrvzro4dkcna0ez80h1y2h',
});
