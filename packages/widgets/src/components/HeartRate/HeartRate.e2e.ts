import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-heart-rate--hint-opened__`;

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
    { x: 453, y: 125 },
    { x: 450, y: 125 },
  ],
};

const gotoPage = (page: Page) => {
  return page.goto(
    'iframe.html?args=&id=fitness-heartrate--default&viewMode=story',
  );
};

const waitForImg = (page: Page) => {
  return page.getByRole('img', { name: 'Heart' }).waitFor();
};

/**
 * The BPM value is always different on screenshots.
 * That's why we ignore it to avoid re-approving every time.
 * */
const replaceBPMValue = (page: Page) => {
  return page
    .locator('span[class*="BPMValueStyles"]')
    .evaluate((element: HTMLSpanElement) => (element.textContent = 'N'));
};

test.describe('Industry Specific Widgets - Fitness - HeartRate', () => {
  test('Renders correctly', async ({ page }) => {
    await gotoPage(page);
    await expect(
      page.getByRole('heading', { name: 'Heart Rate' }),
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
      await Promise.all([replaceBPMValue(page), waitForImg(page)]);
      await page.screenshot({
        path: `${SCREENSHOT_PREFIX}[w${resolution}px].png`,
      });
    });
  }
});
