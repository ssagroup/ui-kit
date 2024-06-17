import { test } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';

const TEST_CASES = [
  {
    url: 'http://localhost:6006/iframe.html?args=&id=widgets-pagination--page-selected&viewMode=story',
    testTitle: 'Widgets: Pagination hover',
    screenshotPrefix: 'widgets-pagination--',
  },
  {
    url: 'http://localhost:6006/iframe.html?args=&id=widgets-pagination--disabled&viewMode=story',
    testTitle: 'Widgets: Disabled pagination hover',
    screenshotPrefix: 'widgets-pagination-disabled--',
  },
];

for (const { url, testTitle, screenshotPrefix } of TEST_CASES) {
  test(testTitle, async ({ page }) => {
    // Hover a selected page
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await page.goto(url);
    await page.getByRole('button', { name: 'Current page 5' }).hover();

    await page.screenshot({
      path: `${WIDGETS_CUSTOM_SHOTS_PATH}${screenshotPrefix}selected-hover__[w1920px].png`,
    });

    // Hover a NOT selected page
    await page.getByRole('button', { name: 'Go to page 4' }).hover();

    await page.screenshot({
      path: `${WIDGETS_CUSTOM_SHOTS_PATH}${screenshotPrefix}not-selected-hover__[w1920px].png`,
    });

    // Hover the previous page arrow
    await page.getByRole('button', { name: 'Go to previous page' }).hover();

    await page.screenshot({
      path: `${WIDGETS_CUSTOM_SHOTS_PATH}${screenshotPrefix}previous-hover__[w1920px].png`,
    });

    // Hover the next page arrow
    await page.getByRole('button', { name: 'Go to next page' }).hover();

    await page.screenshot({
      path: `${WIDGETS_CUSTOM_SHOTS_PATH}${screenshotPrefix}next-hover__[w1920px].png`,
    });
  });
}
