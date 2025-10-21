import { expect, Page, test } from '@playwright/test';

import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';

const gotoPage = (page: Page) => {
  return page.goto(
    'iframe.html?args=&id=widgets-searchbox--default&viewMode=story',
  );
};

test('Widgets: SearchBox should be opened correctly', async ({ page }) => {
  await page.setViewportSize(SCREEN_SIZES[900]);
  await gotoPage(page);
  await page.waitForSelector('#formElement-search');

  const inputElement = await page.getByPlaceholder('Search by name');
  expect(inputElement).toBeVisible();

  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-searchbox--search-icon__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
});

test('Widgets: SearchBox - cross icon should be shown', async ({ page }) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[900]);

  const inputElement = await page.getByPlaceholder('Search by name');
  await inputElement.type('test');

  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-searchbox--cross-icon__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
});
