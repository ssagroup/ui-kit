import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const CUSTOM_SHOTS_PATH = './custom-shots/';

const gotoPage = (page: Page) => {
  return page.goto(
    'http://localhost:6006/iframe.html?args=&globals=&id=components-popover--default&viewMode=story',
  );
};

test('Core: Popover should be opened correctly', async ({ page }) => {
  await gotoPage(page);
  await expect(page.getByText('Trigger')).toBeVisible();
});

test('Core: Popover - Hint is shown', async ({ page }) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.getByText('Trigger').click();

  const SCREENSHOT_PREFIX = `${CUSTOM_SHOTS_PATH}components-popover--hint-opened__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});
