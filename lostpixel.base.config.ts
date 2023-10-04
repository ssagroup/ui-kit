import { CustomProjectConfig } from 'lost-pixel';

/**
 * https://docs.lost-pixel.com/user-docs/api-reference/lost-pixel.config.js-or-ts
 * */
export const baseConfig: Partial<CustomProjectConfig> = {
  apiKey: process.env.LOST_PIXEL_API_KEY,
  shotConcurrency: 10,
  compareConcurrency: 20,
  waitBeforeScreenshot: 2500,
};
