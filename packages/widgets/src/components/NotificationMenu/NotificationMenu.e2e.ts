import { test, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const CUSTOM_SHOTS_PATH = './custom-shots/';

const gotoPage = (page: Page) => {
  return page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-notificationmenu--default&viewMode=story',
  );
};

test('[1920] Widgets: NotificationMenu is opened', async ({ page }) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.getByTestId('trigger-button').click();

  const SCREENSHOT_PREFIX = `${CUSTOM_SHOTS_PATH}widgets-notification-menu--is-opened__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});

test('[1440] Widgets: NotificationMenu is opened', async ({ page }) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[1440]);
  await page.getByTestId('trigger-button').click();

  const SCREENSHOT_PREFIX = `${CUSTOM_SHOTS_PATH}widgets-notification-menu--is-opened__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1440px].png`,
  });
});

test('[900] Widgets: NotificationMenu is opened', async ({ page }) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[900]);
  await page.getByTestId('trigger-button').click();

  const SCREENSHOT_PREFIX = `${CUSTOM_SHOTS_PATH}widgets-notification-menu--is-opened__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
});

test('[390] Widgets: NotificationMenu is opened', async ({ page }) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[390]);
  await page.getByTestId('trigger-button').click();

  const SCREENSHOT_PREFIX = `${CUSTOM_SHOTS_PATH}widgets-notification-menu--is-opened__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});
