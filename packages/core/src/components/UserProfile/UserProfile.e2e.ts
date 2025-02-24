import { test, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const CUSTOM_SHOTS_PATH = './custom-shots/';

const gotoPage = (page: Page) => {
  return page.goto(
    'iframe.html?args=&id=widgets-userprofile--default&viewMode=story',
  );
};

test('Widgets: UserProfile is opened', async ({ page }) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.getByTestId('trigger-button').click();

  const SCREENSHOT_PREFIX = `${CUSTOM_SHOTS_PATH}widgets-user-profile--is-opened__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});
