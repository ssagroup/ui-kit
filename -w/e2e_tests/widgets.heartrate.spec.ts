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
  await page.goto('http://172.17.0.1:6007');
  // await page.goto('http://localhost:6007');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Activity' }).click();
  await expect(page.getByText('HeartRate')).toBeVisible();
});

test('Widgets: HeartRate - Hint is shown', async () => {
  await page.getByRole('button', { name: 'HeartRate' }).click();
  await page.getByRole('link', { name: 'Default' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Open canvas in new tab' }).click();
  const page2 = await page2Promise;
  await page2.waitForTimeout(7000);
  await page2.mouse.move(546, 82);
  await expect(page2.getByText('04:03 AM - 60 bpm')).toBeVisible();

  await page2.screenshot({
    path: '../lost-pixel/widgets/HeartRateHint.png',
    fullPage: true,
  });
});
