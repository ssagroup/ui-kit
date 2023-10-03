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
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-navbar-opened__`;

test('Widgets: NavBar should be visible after icon clicking', async () => {
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.goto(
    'http://localhost:6007/iframe.html?id=widgets-navbar--default&viewMode=story',
  );

  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });

  await page.setViewportSize(SCREEN_SIZES[1440]);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1440px].png`,
  });

  await page.setViewportSize(SCREEN_SIZES[900]);
  await page.locator('#storybook-root div').nth(1).click();
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });

  await page.setViewportSize(SCREEN_SIZES[390]);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});
