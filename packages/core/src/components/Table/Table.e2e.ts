import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const CORE_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${CORE_CUSTOM_SHOTS_PATH}widgets-bots-table--`;

const gotoPage = (page: Page) => {
  return page.goto(
    'iframe.html?args=&id=components-table--styled-table&viewMode=story',
  );
};

test.describe('Industry Specific Widgets - Training - BotsTable', () => {
  test('Renders correctly', async ({ page }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await expect(page.getByText('Bot name 1')).toBeVisible();
  });

  test('Opens menu with copy/archive items', async ({ page }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await page
      .getByRole('row', {
        name: 'Bot name 6 27.07.23 Kraken Pending ETH/USD -100 USD Arrow Down -15% Arrow Down More vertical',
      })
      .getByTestId('more-trigger-button')
      .click();

    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}menu-opened_[w1920px].png`,
    });
  });

  test('"Run Reason" modal should be shown', async ({ page }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await page
      .getByRole('row', {
        name: 'Bot name 6 27.07.23 Kraken Pending ETH/USD -100 USD Arrow Down -15% Arrow Down More vertical',
      })
      .getByTestId('run-reason-trigger-button')
      .click();

    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}run-reason-modal_[w1920px].png`,
    });
  });
});
