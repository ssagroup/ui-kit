import { test, expect, Page } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';

const gotoPage = (page: Page) => {
  return page.goto(
    'iframe.html?args=&id=widgets-filters--default&viewMode=story',
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
  const triggerButton = page.getByTestId('trigger-button');
  const beforeContent = await triggerButton.evaluate((el) => {
    return window.getComputedStyle(el, ':before').content;
  });
  await expect(beforeContent).toEqual('"More"');
  const buttonText = await triggerButton.innerText();
  await expect(buttonText).toEqual('2');
  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-filters--more-button__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w900px].png`,
  });
});

test('Widgets: Filters - More button should be shown when items selected', async ({
  page,
}) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[390]);
  const triggerButton = page.getByTestId('trigger-button');
  const beforeContent = await triggerButton.evaluate((el) => {
    return window.getComputedStyle(el, ':before').content;
  });
  expect(beforeContent).toEqual('"More"');
  const buttonText = await triggerButton.innerText();
  expect(buttonText).toEqual('4');
  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-filters--more-button-items-selected__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});

test('Widgets: Filters - More button count notification should be changed', async ({
  page,
}) => {
  await gotoPage(page);
  await page.setViewportSize(SCREEN_SIZES[900]);
  let triggerButton = await page.getByTestId('trigger-button');
  let beforeContent = await triggerButton.evaluate((el) => {
    return window.getComputedStyle(el, ':before').content;
  });
  expect(beforeContent).toEqual('"More"');
  const buttonText = await triggerButton.innerText();
  expect(buttonText).toEqual('2');

  await page.getByText('Status: Running').click();
  await page.getByRole('button', { name: 'Stopped' }).click();
  await expect(page.getByText('Status: Running+1')).toBeVisible();

  await page.getByText('strategy #3Carrot down').click();
  await page.getByRole('button', { name: 'strategy #3 checkbox1' }).click();

  triggerButton = page.getByTestId('trigger-button');
  beforeContent = await triggerButton.evaluate((el) => {
    return window.getComputedStyle(el, ':before').content;
  });
  expect(beforeContent).toEqual('"More"');
});

test('Widgets: Filters - Filter button should be shown when items not selected', async ({
  page,
}) => {
  await page.goto(
    'iframe.html?args=&id=widgets-filters--all-items-enabled&viewMode=story',
  );
  await page.setViewportSize(SCREEN_SIZES[390]);
  const triggerButton = page.getByTestId('trigger-button');
  let beforeContent = await triggerButton.evaluate((el) => {
    return window.getComputedStyle(el, ':before').content;
  });
  expect(beforeContent).toEqual('"More"');
  const buttonText = await triggerButton.innerText();
  expect(buttonText).toEqual('1');

  await page.getByTestId('trigger-button').click();
  /* cSpell:disable */
  await page.locator('label').filter({ hasText: 'Checkcheckbox1' }).click();
  await page.locator('label').filter({ hasText: 'Checkcheckbox4' }).click();

  beforeContent = await triggerButton.evaluate((el) => {
    return window.getComputedStyle(el, ':before').content;
  });
  expect(beforeContent).toEqual('"Filter"');

  const SCREENSHOT_PREFIX = `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-filters--filter-button-items-not-selected__`;
  await page.screenshot({
    path: `${SCREENSHOT_PREFIX}[w390px].png`,
  });
});
