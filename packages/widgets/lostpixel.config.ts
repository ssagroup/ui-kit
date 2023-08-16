import { CustomProjectConfig } from 'lost-pixel';

export const config: Partial<CustomProjectConfig> = {
  storybookShots: {
    storybookUrl: './storybook-static',
  },
  // @cspell:disable-next-line
  lostPixelProjectId: 'clldrvzro4dkcna0ez80h1y2h',
  apiKey: process.env.LOST_PIXEL_API_KEY,
};
