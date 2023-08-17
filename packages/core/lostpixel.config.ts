import { CustomProjectConfig } from 'lost-pixel';

export const config: Partial<CustomProjectConfig> = {
  storybookShots: {
    storybookUrl: './packages/core/storybook-static',
  },
  // @cspell:disable-next-line
  lostPixelProjectId: 'clldrwk2t4dkena0e4nu2rikp',
  apiKey: process.env.LOST_PIXEL_API_KEY,
};
