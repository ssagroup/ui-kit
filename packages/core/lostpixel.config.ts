import { CustomProjectConfig } from 'lost-pixel';

export const config: Partial<CustomProjectConfig> & {
  storybookShots: {
    breakpoints: number[];
  };
} = {
  storybookShots: {
    storybookUrl: './packages/core/storybook-static',
    breakpoints: [390, 900, 1440, 1920],
  },
  // @cspell:disable-next-line
  lostPixelProjectId: 'clldrwk2t4dkena0e4nu2rikp',
  apiKey: process.env.LOST_PIXEL_API_KEY,
  shotConcurrency: 10,
  compareConcurrency: 20,
};
