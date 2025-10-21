import { expect, Page, test } from '@playwright/test';

import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-meal-nutrients--hint-opened__`;
const MOUSE_POSITIONS = {
  390: [
    { x: 97, y: 122 },
    { x: 97, y: 122 },
  ],
  900: [
    { x: 215, y: 123 },
    { x: 212, y: 123 },
  ],
  1440: [
    { x: 334, y: 123 },
    { x: 337, y: 123 },
  ],
  1920: [
    { x: 433, y: 125 },
    { x: 430, y: 125 },
  ],
};

const gotoPage = (page: Page) => {
  return page.goto(
    'iframe.html?args=&id=fitness-mealnutrients--default&viewMode=story',
  );
};

test.describe('Industry Specific Widgets - Fitness - MealNutrients', () => {
  test('Should be rendered', async ({ page }) => {
    await gotoPage(page);

    await expect(
      page.getByRole('heading', { name: 'Meal Nutrients' }),
    ).toBeVisible();
  });

  for (const resolution of Object.keys(SCREEN_SIZES)) {
    const viewportSize =
      SCREEN_SIZES[resolution as unknown as keyof typeof SCREEN_SIZES];
    const mouseMoves =
      MOUSE_POSITIONS[resolution as unknown as keyof typeof SCREEN_SIZES];

    if (mouseMoves == null) {
      throw new Error(
        `No mouse move for the specified resolution "${resolution}" found`,
      );
    }

    test(`[${resolution}] Tooltip is shown`, async ({ page }) => {
      await page.setViewportSize(viewportSize);
      await gotoPage(page);
      for (const { x, y } of mouseMoves) {
        await page.mouse.move(x, y);
      }
      await page.screenshot({
        path: `${SCREENSHOT_PREFIX}[w${resolution}px].png`,
      });
      await page.getByRole('combobox').click();
      await page.waitForSelector('[role="listbox"]');
      await page.screenshot({
        path: `${SCREENSHOT_PREFIX}dropdown__[w${resolution}px].png`,
      });
    });
  }
});
