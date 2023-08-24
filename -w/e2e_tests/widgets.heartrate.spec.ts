import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('Widgets: HeartRate item should be present in the sidebar', async () => {
  await page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  );

  await expect(page.getByRole('heading', { name: 'Heart Rate' })).toBeVisible();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateDefault__[w1920px].png',
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateDefault__[w1440px].png',
  });
  await page.setViewportSize({ width: 900, height: 900 });
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateDefault__[w900px].png',
  });
  await page.setViewportSize({ width: 390, height: 390 });
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateDefault__[w390px].png',
  });
});

test('Widgets: HeartRate - Hint is shown', async () => {
  await page.mouse.move(330, 100);
  await page.mouse.move(330, 100, {
    steps: 5,
  });
  await page.waitForTimeout(500);
  // await expect(page.getByText('09:03 PM - 75 bpm')).toBeVisible();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateHint__[w1920px].png',
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateHint__[w1440px].png',
  });
  await page.setViewportSize({ width: 900, height: 900 });
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateHint__[w900px].png',
  });
  await page.setViewportSize({ width: 390, height: 390 });
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateHint__[w390px].png',
  });
});
