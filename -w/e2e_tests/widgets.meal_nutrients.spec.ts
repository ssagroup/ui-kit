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

const WIDGETS_CUSTOM_SHOTS_PATH = '../packages/widgets/custom-shots/';

test('Widgets: Meal Nutrients item should opened correctly', async () => {
  await page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-mealnutrients--default&viewMode=story',
  );
  await expect(
    page.getByRole('heading', { name: 'Meal Nutrients' }),
  ).toBeVisible();
});

test('Widgets: Meal Nutrients - Hint is shown', async () => {
  await page.waitForTimeout(500);

  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-meal-nutrients--hint-opened__`;
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.mouse.move(433, 125);
  await page.mouse.move(430, 125);
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
