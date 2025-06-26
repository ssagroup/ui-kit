import { test, Page, expect } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

test.describe.configure({ mode: 'serial' });

const CORE_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${CORE_CUSTOM_SHOTS_PATH}widgets-collapsiblenavbar-opened__`;
const MOBILE_SIZE = { width: 899, height: 1200 };

const gotoPage = (page: Page) => {
  return page.goto(
    'iframe.html?args=&id=widgets-collapsiblenavbar--default&viewMode=story',
  );
};

test.describe('Widgets: CollapsibleNavBar', () => {
  test('[1920] Should be visible', async ({ page }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await page.locator('nav ul');
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1920px].png`,
    });
  });

  test('[1920] Statistics submenu should be shown after Statistics icon hovered', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await page.locator('ul > li:nth-of-type(3) button').first().hover();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1920px]_statistics_submenu_popover.png`,
    });
  });

  test('[1920] Side menu should be expanded after toggle icon clicked', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await page.getByTestId('collapsible-nav-content-toggle-label').click();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1920px]_side_menu_expanded.png`,
    });
  });

  test('[1920] Statistics submenu should be showed after Statistics item clicked (expanded state)', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await page.getByTestId('collapsible-nav-content-toggle-label').click();
    await page.getByTestId('accordion-title').click();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1920px]_statistics_submenu_expanded.png`,
    });
  });

  test('[1439] Should be visible', async ({ page }) => {
    await page.setViewportSize({ width: 1439, height: 1200 });
    await gotoPage(page);
    await page.locator('nav ul');
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1439px].png`,
    });
  });

  test('[1439] Statistics submenu should be shown after Statistics icon hovered', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1439, height: 1200 });
    await gotoPage(page);
    await page.locator('ul > li:nth-of-type(3) button').first().hover();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1439px]_statistics_submenu_popover.png`,
    });
  });

  test('[899] Hamburger menu icon should be visible by default', async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE_SIZE);
    await gotoPage(page);
    await page.locator('nav ui');
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w899px]_default.png`,
    });
  });

  test('[899] Menu content should be visible after icon clicked', async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE_SIZE);
    await gotoPage(page);
    await page.click('nav > div:nth-of-type(1) > label');
    await expect(page.getByText('Dashboard')).toBeVisible();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w899px]_menu_opened.png`,
    });
  });

  test('[899] Statistics submenu should be visible after Statistics item clicked', async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE_SIZE);
    await gotoPage(page);
    await page.click('nav > div:nth-of-type(1) > label');
    await page.getByText('Statistics').click();
    await expect(page.getByText('Max in Work')).toBeVisible();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w899px]_statistics_submenu.png`,
    });
  });
});
