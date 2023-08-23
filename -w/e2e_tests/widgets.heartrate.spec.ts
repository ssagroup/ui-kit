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
  await page.goto('http://172.17.0.1:6007/?path=/docs/widgets-heartrate--docs');
  // await page.goto('http://localhost:6007/?path=/docs/widgets-heartrate--docs');
  await page.waitForTimeout(1000);
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole('heading', { name: 'Heart Rate' }),
  ).toBeVisible();
  await page.screenshot({
    path: '../../lost-pixel/widgets/HeartRateDefault2.png',
    fullPage: true,
  });
});

// test('Widgets: HeartRate - Hint is shown', async () => {
//   await page.waitForTimeout(5000);
//   await page.mouse.move(663, 350);
//   await page.mouse.move(660, 350, {
//     steps: 5,
//   });
//   await page.waitForTimeout(500);
//   await expect(
//     page
//       .frameLocator('iframe[title="storybook-preview-iframe"]')
//       .getByText('03:03 AM - 80 bpm'),
//   ).toBeVisible();

//   await page.screenshot({
//     path: '../../lost-pixel/widgets/HeartRateHint2.png',
//     fullPage: true,
//   });
// });
