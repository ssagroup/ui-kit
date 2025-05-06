import { defineConfig } from '@playwright/test';
import { createConfig } from '../../playwright.base.config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(
  createConfig({
    webServer: {
      command: 'pnpm sb:dev',
      port: 6009,
      reuseExistingServer: !process.env.CI,
    },
  }),
);
