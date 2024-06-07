import { test, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-progressInfo__`;

const gotoPage = (page: Page) => {
  return page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-progressinfo--default&viewMode=story',
  );
};

test.describe('Widgets: ProgressInfo', () => {
  for (const resolution of Object.keys(SCREEN_SIZES)) {
    const viewportSize =
      SCREEN_SIZES[resolution as unknown as keyof typeof SCREEN_SIZES];

    test(`[${resolution}] Renders on extra large screens`, async ({ page }) => {
      await page.setViewportSize(viewportSize);
      await gotoPage(page);
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
