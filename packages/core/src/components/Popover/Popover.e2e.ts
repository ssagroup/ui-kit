import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

const CUSTOM_SHOTS_PATH = './custom-shots/';

test('Core: Popover should be opened correctly', async () => {
  await page.goto(
    'http://localhost:6006/iframe.html?args=&globals=&id=components-popover--default&viewMode=story',
  );
  await expect(page.getByText('Trigger')).toBeVisible();
});

test('Core: Popover - Hint is shown', async () => {
  await page.waitForTimeout(500);
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.waitForTimeout(100);
  await page.mouse.wheel(0, 1400);
  await page.getByText('Trigger').click();

  const SCREENSHOT_PREFIX = `${CUSTOM_SHOTS_PATH}components-popover--hint-opened__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});
