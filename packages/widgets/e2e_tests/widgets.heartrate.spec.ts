import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from './consts';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';

test('Widgets: HeartRate item should be opened correctly', async () => {
  await page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  );
  await expect(page.getByRole('heading', { name: 'Heart Rate' })).toBeVisible();
});

test('Widgets: HeartRate - Hint is shown', async () => {
  await page.waitForTimeout(500);
  // await expect(page.getByText('09:03 PM - 75 bpm')).toBeVisible();

  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-heart-rate--hint-opened__`;
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.mouse.move(453, 125);
  await page.mouse.move(450, 125);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
  await page.setViewportSize(SCREEN_SIZES[1440]);
  await page.mouse.move(334, 123);
  await page.mouse.move(337, 123);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1440px].png`,
  });
  await page.setViewportSize(SCREEN_SIZES[900]);
  await page.mouse.move(215, 123);
  await page.mouse.move(212, 123);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
  await page.setViewportSize(SCREEN_SIZES[390]);
  await page.mouse.move(97, 122);
  await page.mouse.move(97, 122);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});
