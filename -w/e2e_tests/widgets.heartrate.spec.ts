import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;
// let newPage: Page;
// let context;

test.beforeAll(async ({ browser }) => {
  // context = await browser.newContext();
  // await context.addInitScript({
  //   path: '../node_modules/mouse-helper/dist/mouse-helper.js',
  // });
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

// test('Widgets: HeartRate item should be present in the sidebar', async () => {
//   // await page.goto(
//   //   'http://172.17.0.1:6007/?path=/docs/widgets-heartrate--default',
//   // );
//   await page.goto(
//     'http://localhost:6007/?path=/docs/widgets-heartrate--default',
//   );
//   // await page.evaluate(() => {
//   //   window['mouse-helper']();
//   // });
//   await page.waitForTimeout(1000);
//   await page.keyboard.press('F');
//   await expect(
//     page
//       .frameLocator('iframe[title="storybook-preview-iframe"]')
//       .getByRole('heading', { name: 'Heart Rate' }),
//   ).toBeVisible();
//   await page.mouse.move(470, 35);
//   await page.screenshot({
//     path: '../lost-pixel/widgets/HeartRateDefault.png',
//   });
// });

// test('Widgets: HeartRate - Hint is shown', async () => {
//   await page.waitForTimeout(5000);
//   // await page.mouse.move(663, 350);
//   // await page.mouse.move(660, 350, {
//   //   steps: 5,
//   // });
//   await page.mouse.move(470, 35);
//   await page.mouse.move(473, 350);
//   // await page.mouse.click(708, 240, {
//   //   button: 'left',
//   // });
//   await page.mouse.move(470, 350, {
//     steps: 5,
//   });
//   // await page.mouse.click(705, 240, {
//   //   button: 'left',
//   // });
//   // await page.mouse.click(605, 210);
//   await page.waitForTimeout(500);
//   await page.mouse.down();
//   await page.screenshot({
//     path: '../lost-pixel/widgets/HeartRateHint.png',
//   });
//   await page.mouse.up();
//   // await expect(
//   //   page
//   //     .frameLocator('iframe[title="storybook-preview-iframe"]')
//   //     .getByText('03:03 AM - 80 bpm'),
//   // ).toBeVisible();
// });

test('Widgets: HeartRate item should be present in the sidebar', async () => {
  // await page.goto(
  //   'http://172.17.0.1:6007/?path=/docs/widgets-heartrate--default',
  // );
  await page.goto(
    'http://localhost:6007/?path=/docs/widgets-heartrate--default',
  );
  await page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  );
  // await page.evaluate(() => {
  //   window['mouse-helper']();
  // });
  // await page.waitForTimeout(1000);
  // const newPagePromise = context.waitForEvent('page');
  // await page.getByRole('link', { name: 'Open canvas in new tab' }).click();
  // newPage = await newPagePromise;
  // await newPage.waitForLoadState();

  await expect(page.getByRole('heading', { name: 'Heart Rate' })).toBeVisible();
  // await page.mouse.move(470, 35);
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateDefault.png',
  });
});

test('Widgets: HeartRate - Hint is shown', async () => {
  // await page.waitForTimeout(5000);
  // await page.mouse.move(663, 350);
  // await page.mouse.move(660, 350, {
  //   steps: 5,
  // });
  // await page.mouse.move(470, 35);
  await page.mouse.move(330, 100);
  // await page.mouse.click(708, 240, {
  //   button: 'left',
  // });
  await page.mouse.move(330, 100, {
    steps: 5,
  });
  // await page.mouse.click(705, 240, {
  //   button: 'left',
  // });
  // await page.mouse.click(605, 210);
  await page.waitForTimeout(500);
  // await page.mouse.down();
  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateHint.png',
  });
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText('12:03 AM - 75 bpm'),
  ).toBeVisible();
});
