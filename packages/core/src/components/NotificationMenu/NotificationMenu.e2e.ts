import { Page, test } from '@playwright/test';

import { SCREEN_SIZES } from '../../consts';

const CUSTOM_SHOTS_PATH = './custom-shots/';

const gotoPage = (page: Page) => {
  return page.goto(
    'iframe.html?args=&id=widgets-notificationmenu--default&viewMode=story',
  );
};

for (const resolution of Object.keys(SCREEN_SIZES)) {
  const viewportSize =
    SCREEN_SIZES[resolution as unknown as keyof typeof SCREEN_SIZES];
  test(`[${resolution}] Widgets: NotificationMenu is opened`, async ({
    page,
  }) => {
    await gotoPage(page);
    await page.setViewportSize(viewportSize);
    await page.getByTestId('trigger-button').click();

    const SCREENSHOT_PREFIX = `${CUSTOM_SHOTS_PATH}widgets-notification-menu--is-opened__`;
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w${resolution}px].png`,
    });
  });
}
