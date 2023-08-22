import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ page, browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('Widgets: HeartRate item should be present in the sidebar', async ({
  page,
}) => {
  await page.goto('http://172.17.0.1:6007');
  await page.waitForTimeout(7000);
  await expect(page.getByText('HeartRate')).toBeVisible();
});

test('Widgets: HeartRate - Hint is shown', async ({ page }) => {
  // await page.goto(
  //   'https://ui-kit-fitness.web.app/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  // );
  // await page.goto(
  //   // 'http://localhost:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  //   // 'http://172.17.0.1:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  //   // 'http://172.17.0.1:8080/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  //   'http://172.17.0.1:6007',
  //   // 'http://localhost:6007',
  // );
  // await page.waitForTimeout(7000);
  await page.getByText('HeartRate').click();
  await page.getByText('Default').click();
  await expect(page.getByText('Heart Rate')).toBeVisible();
  // await page.mouse.move(64, 243);
  // await page.mouse.click(64, 243);

  // // await page.mouse.move(88, 290);
  // await page.waitForTimeout(100);
  // await page.mouse.click(88, 290);
  // await page.waitForTimeout(100);
  // await page.mouse.move(481, 87);
  // await page.waitForTimeout(100);

  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateHint.png',
    fullPage: true,
  });

  // await expect(page.getByText('08:03 PM - 120 bpm')).toBeVisible();
});
