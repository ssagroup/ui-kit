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

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';

test('Widgets: TableFilters should be opened correctly', async () => {
  await page.goto(
    'http://localhost:6006/iframe.html?id=widgets-tablefilters--default&viewMode=story',
  );
  await expect(page.getByText('More')).toBeVisible();
});

test('Widgets: TableFilters - should be shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.waitForTimeout(100);
  await page.getByText('More').click();

  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-table-filters--opened__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});
