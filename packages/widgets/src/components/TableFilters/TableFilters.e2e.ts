import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterEach(async () => {
  await page.close();
});

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-table-filters--opened__`;

const gotoPage = () => {
  return page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-tablefilters--default&viewMode=story',
  );
};

test('Widgets: TableFilters should be opened correctly', async () => {
  await gotoPage();
  await expect(page.getByText('More')).toBeVisible();
});

test('Widgets: TableFilters - should be shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await gotoPage();
  await page.getByText('More').click();

  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});
