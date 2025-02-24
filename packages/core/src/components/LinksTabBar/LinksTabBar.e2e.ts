import { test, expect } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';

test('Widgets: LinksTabBar', async ({ page }) => {
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.goto(
    'iframe.html?args=&id=widgets-linkstabbar--default&viewMode=story',
  );

  await expect(page.getByText('Current route: Information')).toBeVisible();
  await page.getByRole('link', { name: 'Information' }).focus();

  await page.screenshot({
    path: `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-linkstabbar--current-focus__[w1920px].png`,
  });

  await page.getByRole('link', { name: 'Configuration' }).focus();
  await page.screenshot({
    path: `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-linkstabbar--non-current-focus__[w1920px].png`,
  });
});
