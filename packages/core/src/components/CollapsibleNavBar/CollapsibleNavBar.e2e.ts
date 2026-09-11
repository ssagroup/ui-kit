import { test, Page, expect } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

test.describe.configure({ mode: 'serial' });

const MOBILE_SIZE = { width: 899, height: 1200 };

const gotoPage = (page: Page) => {
  return page.goto(
    'iframe.html?args=&id=widgets-collapsiblenavbar--default&viewMode=story',
  );
};

/**
 * Hovers a row's collapsed-rail icon.
 *
 * The rail replaces each row with a popover trigger, so the icon to hover is
 * the trigger inside the row whose (hidden) label matches. Selecting by label
 * rather than by `li:nth-of-type` keeps this from silently pointing at the
 * wrong row when the menu changes.
 */
const hoverRailIcon = async (page: Page, label: string) => {
  const row = page
    .locator('.ssa-tree__item')
    .filter({ hasText: label })
    .first();
  await row.locator('.nav-rail-trigger button').first().hover();
};

test.describe('Widgets: CollapsibleNavBar', () => {
  test('[1920] Should be visible', async ({ page }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await expect(page.locator('.ssa-tree')).toBeVisible();
    await expect(
      page
        .locator('[data-testid="collapsible-nav-bar-trigger-button"]')
        .first(),
    ).toBeVisible();
  });

  test('[1920] Statistics submenu should be shown after Statistics icon hovered', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await hoverRailIcon(page, 'Statistics');

    // The rail hides the in-place subtree, so the flyout is the only route to
    // a sub-page while collapsed.
    await expect(page.getByRole('link', { name: 'Max in Work' })).toBeVisible();
  });

  test('[1920] Side menu should be expanded after toggle icon clicked', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await page.getByTestId('collapsible-nav-content-toggle-label').click();

    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(
      page
        .locator('[data-testid="collapsible-nav-bar-trigger-button"]')
        .first(),
    ).not.toBeVisible();
  });

  test('[1920] Statistics submenu should be showed after Statistics item clicked (expanded state)', async ({
    page,
  }) => {
    await page.setViewportSize(SCREEN_SIZES[1920]);
    await gotoPage(page);
    await page.getByTestId('collapsible-nav-content-toggle-label').click();
    await page.getByText('Statistics').click();
    await expect(page.getByText('Max in Work')).toBeVisible();
  });

  test('[1439] Should be visible', async ({ page }) => {
    await page.setViewportSize({ width: 1439, height: 1200 });
    await gotoPage(page);
    await expect(page.locator('.ssa-tree')).toBeVisible();
  });

  test('[1439] Statistics submenu should be shown after Statistics icon hovered', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1439, height: 1200 });
    await gotoPage(page);
    await hoverRailIcon(page, 'Statistics');

    await expect(page.getByRole('link', { name: 'Max in Work' })).toBeVisible();
  });

  test('[899] Hamburger menu icon should be visible by default', async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE_SIZE);
    await gotoPage(page);
    await expect(
      page.getByTestId('collapsible-nav-toggle-label'),
    ).toBeVisible();
    await expect(page.getByText('Dashboard')).not.toBeVisible();
  });

  test('[899] Menu content should be visible after icon clicked', async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE_SIZE);
    await gotoPage(page);
    await page.click('nav > div:nth-of-type(1) > label');
    await expect(page.getByText('Dashboard')).toBeVisible();
  });

  test('[899] Statistics submenu should be visible after Statistics item clicked', async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE_SIZE);
    await gotoPage(page);
    await page.click('nav > div:nth-of-type(1) > label');
    await page.getByText('Statistics').click();
    await expect(page.getByText('Max in Work')).toBeVisible();
  });
});
