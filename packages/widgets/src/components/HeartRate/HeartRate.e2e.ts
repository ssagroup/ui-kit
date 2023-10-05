import { test, expect, Page } from '@playwright/test';
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
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-heart-rate--hint-opened__`;

const gotoPage = () => {
  return page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  );
};

/**
 * The BPM value is always different on screenshots.
 * That's why we ignore it to avoid re-approving every time.
 * */
const replaceBPMValue = () => {
  return page
    .locator('span[class*="BPMValueStyles"]')
    .evaluate((element: HTMLSpanElement) => (element.textContent = 'N'));
};

test('Widgets: HeartRate renders correctly', async () => {
  await gotoPage();
  await expect(page.getByRole('heading', { name: 'Heart Rate' })).toBeVisible();
});

test('[1920] Widgets: HeartRate - Tooltip is shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await gotoPage();
  await page.mouse.move(453, 125);
  await page.mouse.move(450, 125);
  await replaceBPMValue();
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});

test('[1440] Widgets: HeartRate - Tooltip is shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[1440]);
  await gotoPage();
  await page.mouse.move(334, 123);
  await page.mouse.move(337, 123);
  await replaceBPMValue();
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1440px].png`,
  });
});

test('[900] Widgets: HeartRate - Tooltip is shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[900]);
  await gotoPage();
  await page.mouse.move(215, 123);
  await page.mouse.move(212, 123);
  await replaceBPMValue();
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
});

test('[390] Widgets: HeartRate - Tooltip is shown', async () => {
  await page.setViewportSize(SCREEN_SIZES[390]);
  await gotoPage();
  await page.mouse.move(97, 122);
  await page.mouse.move(97, 122);
  await replaceBPMValue();
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});
