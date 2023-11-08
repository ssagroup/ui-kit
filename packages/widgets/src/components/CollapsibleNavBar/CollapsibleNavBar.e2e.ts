import { test, Page, expect } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

test.describe.configure({ mode: 'serial' });

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';
const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-collapsiblenavbar-opened__`;

const gotoPage = (page: Page) => {
  return page.goto(
    'http://localhost:6007/iframe.html?args=&id=widgets-collapsiblenavbar--items&viewMode=story',
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

  test('[1440] Should be visible', async ({ page }) => {
    await page.setViewportSize(SCREEN_SIZES[1440]);
    await gotoPage(page);
    await page.locator('nav ul');
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1440px].png`,
    });
  });

  test('[1440] Statistics submenu should be showed after Statistics icon hovered', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[1440]);
    await gotoPage(page);
    await page.locator('ul > li:nth-of-type(3) button').first().hover();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1440px]_statistics_submenu_popover.png`,
    });
  });

  test('[1440] Side menu should be expanded after toggle icon clicked', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[1440]);
    await gotoPage(page);
    await page.click('label[for=contentToggler]');
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1440px]_side_menu_expanded.png`,
    });
  });

  test('[1440] Statistics submenu should be showed after Statistics item clicked (expanded state)', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[1440]);
    await gotoPage(page);
    await page.click('label[for=contentToggler]');
    await page.click('#chartstatisticsaccordion');
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w1440px]_statistics_submenu_expanded.png`,
    });
  });

  test('[899] Should be visible', async ({ page }) => {
    await page.setViewportSize({ width: 899, height: 1200 });
    await gotoPage(page);
    await page.locator('nav ul');
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w899px].png`,
    });
  });

  test('[899] Statistics submenu should be showed after Statistics icon hovered', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 899, height: 1200 });
    await gotoPage(page);
    await page.locator('ul > li:nth-of-type(3) button').first().hover();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w899px]_statistics_submenu_popover.png`,
    });
  });

  test('[389] Hamburger menu icon should be visible by default', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[390]);
    await gotoPage(page);
    await page.locator('nav ui');
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w389px]_default.png`,
    });
  });

  test('[389] Menu content should be visible after icon clicked', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[390]);
    await gotoPage(page);
    await page.click('nav > div:nth-of-type(1) > label');
    await expect(page.getByText('Dashboard')).toBeVisible();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w389px]_menu_opened.png`,
    });
  });

  test('[389] Statistics submenu should be visible after Statistics item clicked', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[390]);
    await gotoPage(page);
    await page.click('nav > div:nth-of-type(1) > label');
    await page.getByText('Statistics').click();
    await expect(page.getByText('Max in Work')).toBeVisible();
    await page.screenshot({
      path: `${SCREENSHOT_PREFIX}[w389px]_statistics_submenu.png`,
    });
  });
});
