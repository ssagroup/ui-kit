import { CustomProjectConfig } from 'lost-pixel';

export const config: Partial<CustomProjectConfig> & {
  storybookShots: {
    breakpoints: number[];
  };
} = {
  storybookShots: {
    storybookUrl: './packages/widgets/storybook-static',
    breakpoints: [390, 900, 1440, 1920],
  },
  customShots: {
    currentShotsPath: './packages/widgets/custom-shots',
  },
  // @cspell:disable-next-line
  lostPixelProjectId: 'clldrvzro4dkcna0ez80h1y2h',
  apiKey: process.env.LOST_PIXEL_API_KEY,
  shotConcurrency: 10,
  compareConcurrency: 20,
};
