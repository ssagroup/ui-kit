import { defineConfig } from '@playwright/test';
import { createConfig } from '../../playwright.base.config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(
  createConfig({
    webServer: {
      command: 'pnpm sb:dev',
      port: 6007,
      reuseExistingServer: !process.env.CI,
    },
  }),
);
