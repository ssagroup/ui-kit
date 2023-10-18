import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';

const gotoPage = (page: Page) => {
  return page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-filters--default&viewMode=story',
  );
};

test('Widgets: Filters should be opened correctly', async ({ page }) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await expect(page.getByText('strategy #3Carrot down')).toBeVisible();
  await expect(page.getByText('More')).not.toBeVisible();
  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-filters--default__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w1920px].png`,
  });
});

test('Widgets: Filters - More button should be shown', async ({ page }) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[900]);
  await expect(page.getByText('More2')).toBeVisible();
  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-filters--more-button__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
});

test('Widgets: Filters - More button count notification should be changed', async ({
  page,
}) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[900]);
  await expect(page.getByText('More2')).toBeVisible();

  await page.getByText('Status: Running').click();
  await page.getByRole('button', { name: 'Stopped' }).click();
  await expect(page.getByText('Status: Running+1')).toBeVisible();

  await page.getByText('strategy #3Carrot down').click();
  await page.getByRole('button', { name: 'strategy #3 checkbox1' }).click();
  await expect(page.getByText('More3')).toBeVisible();
});
