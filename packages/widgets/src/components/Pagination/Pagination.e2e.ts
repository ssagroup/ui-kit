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

test('Widgets: Pagination hover', async () => {
  // Hover a selected page
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-pagination--page-selected&viewMode=story',
  );
  await page.getByRole('button', { name: 'Current page 5' }).hover();

  await page.screenshot({
    path: `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-pagination--selected-hover__[w1920px].png`,
  });

  // Hover a NOT selected page
  await page.getByRole('button', { name: 'Go to page 4' }).hover();

  await page.screenshot({
    path: `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-pagination--not-selected-hover__[w1920px].png`,
  });

  // Hover the previous page arrow
  await page.getByRole('button', { name: 'Go to previous page' }).hover();

  await page.screenshot({
    path: `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-pagination--previous-hover__[w1920px].png`,
  });

  // Hover the next page arrow
  await page.getByRole('button', { name: 'Go to next page' }).hover();

  await page.screenshot({
    path: `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-pagination--next-hover__[w1920px].png`,
  });
});
