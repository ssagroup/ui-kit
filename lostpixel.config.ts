import { CustomProjectConfig } from 'lost-pixel';

export const config: Partial<CustomProjectConfig> = {
  storybookShots: {
    storybookUrl: '.storybook-static',
  },

  lostPixelProjectId: 'clldjub5z3vtpit0ecdeldbxe',
  apiKey: process.env.LOST_PIXEL_API_KEY,
};
