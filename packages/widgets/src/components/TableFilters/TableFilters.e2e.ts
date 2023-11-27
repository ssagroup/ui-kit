import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-table-filters--opened__`;

const gotoPage = (page: Page) => {
  return page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-tablefilters--default&viewMode=story',
  );
};

test.describe('Widgets: TableFilters', () => {
  test('Renders correctly', async ({ page }) => {
    await gotoPage(page);
    const triggerButton = page.getByTestId('trigger-button');
    const beforeContent = await triggerButton.evaluate((el) => {
      return window.getComputedStyle(el, ':before').content;
    });
    expect(beforeContent).toEqual('"More"');
  });

  test('Opens popover', async ({ page }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await page.getByTestId('trigger-button').click();

    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1920px].png`,
    });
  });
});
