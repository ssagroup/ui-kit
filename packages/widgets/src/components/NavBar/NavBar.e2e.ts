import { test, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

test.describe.configure({ mode: 'serial' });

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-navbar-opened__`;

const gotoPage = (page: Page) => {
  return page.goto(
    'http://localhost:6007/iframe.html?id=widgets-navbar--default&viewMode=story',
  );
};

const clickAndWaitForAnimationEnd = async (page: Page) => {
  await page.locator('#storybook-root div').nth(1).click();
  await page
    .locator('div[class*="NavBarWrapper"]')
    .evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    );
};

test('[1920] Widgets: NavBar should be visible', async ({ page }) => {
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await gotoPage(page);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});

test('[1440] Widgets: NavBar should be visible', async ({ page }) => {
  await page.setViewportSize(SCREEN_SIZES[1440]);
  await gotoPage(page);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1440px].png`,
  });
});

test('[900] Widgets: NavBar should be visible after icon clicking', async ({
  page,
}) => {
  await page.setViewportSize(SCREEN_SIZES[900]);
  await gotoPage(page);
  await clickAndWaitForAnimationEnd(page);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
});

test('[390] Widgets: NavBar should be visible after icon clicking', async ({
  page,
}) => {
  await page.setViewportSize(SCREEN_SIZES[390]);
  await gotoPage(page);
  await clickAndWaitForAnimationEnd(page);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});
