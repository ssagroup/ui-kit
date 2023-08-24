import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

const WIDGETS_CUSTOM_SHOTS_PATH = '../packages/widgets/custom-shots/';

test('Widgets: HeartRate item should be present in the sidebar', async () => {
  await page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  );
  await expect(page.getByRole('heading', { name: 'Heart Rate' })).toBeVisible();
});

test('Widgets: HeartRate - Hint is shown', async () => {
  await page.mouse.move(330, 100);
  await page.mouse.move(330, 100, {
    steps: 5,
  });
  await page.waitForTimeout(500);
  // await expect(page.getByText('09:03 PM - 75 bpm')).toBeVisible();

  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-heart-rate--hint-opened__`;
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1440px].png`,
  });
  await page.setViewportSize({ width: 900, height: 900 });
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
  await page.setViewportSize({ width: 390, height: 390 });
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});
