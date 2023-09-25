import { test, Page } from '@playwright/test';
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

test('Widgets: Statistic Card hover', async () => {
  // Hover a selected page
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-statisticcard--price-card&viewMode=story',
  );
  await page.getByTestId('hover-element').hover();

  await page.screenshot({
    path: `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-statistic-card--hover__[w1920px].png`,
  });
});
