import { test, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterEach(async () => {
  await page.close();
});

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-navbar-opened__`;

const gotoPage = () => {
  return page.goto(
    'http://localhost:6007/iframe.html?id=widgets-navbar--default&viewMode=story',
  );
};

test('[1920] Widgets: NavBar should be visible', async () => {
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await gotoPage();
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});

test('[1440] Widgets: NavBar should be visible', async () => {
  await page.setViewportSize(SCREEN_SIZES[1440]);
  await gotoPage();
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1440px].png`,
  });
});

test('[900] Widgets: NavBar should be visible after icon clicking', async () => {
  await page.setViewportSize(SCREEN_SIZES[900]);
  await gotoPage();
  await page.locator('#storybook-root div').nth(1).click();
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
});

test('[390] Widgets: NavBar should be visible after icon clicking', async () => {
  await page.setViewportSize(SCREEN_SIZES[390]);
  await gotoPage();
  await page.locator('#storybook-root div').nth(1).click();
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});
