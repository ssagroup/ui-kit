import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  // page.on('request', (request) =>
  //   console.log(`Request sent: ${request.url()}`),
  // );
});

test.afterEach(async () => {
  await page.close();
});

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-heart-rate--hint-opened__`;

const gotoPage = () => {
  return page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  );
};

const waitForImg = () => {
  return page.waitForResponse(
    'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fheart%2Fheart_48.png?alt=media&token=7ef68a25-5362-48b9-b359-c46b48d1db54',
  );
};

const logImg = async (tag: string | number) => {
  // const heartImageEl = await page.evaluate(() => document.querySelector<HTMLImageElement>('img[alt="Heart"]'));
  // if (heartImageEl == null) {
  //   throw new Error('No image found!');
  // }
  const heartImageEl = await page
    .getByRole('img', { name: 'Heart' })
    .boundingBox();

  if (heartImageEl == null) {
    throw new Error('No image found!');
  }

  console.log(tag, 'img', heartImageEl.width, heartImageEl.height);
};

test('Widgets: HeartRate item should be opened correctly', async () => {
  await gotoPage();
  await expect(page.getByRole('heading', { name: 'Heart Rate' })).toBeVisible();
});

test('[1920] Widgets: HeartRate - Hint is shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await gotoPage();
  await logImg(1920);
  await page.mouse.move(453, 125);
  await page.mouse.move(450, 125);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});

test('[1440] Widgets: HeartRate - Hint is shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[1440]);
  await gotoPage();
  await logImg(1440);
  await page.mouse.move(334, 123);
  await page.mouse.move(337, 123);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1440px].png`,
  });
});

test('[900] Widgets: HeartRate - Hint is shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[900]);
  await gotoPage();
  await logImg(900);
  await page.mouse.move(215, 123);
  await page.mouse.move(212, 123);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
});

test('[390] Widgets: HeartRate - Hint is shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[390]);
  await gotoPage();
  await logImg(390);
  await page.mouse.move(97, 122);
  await page.mouse.move(97, 122);
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});
