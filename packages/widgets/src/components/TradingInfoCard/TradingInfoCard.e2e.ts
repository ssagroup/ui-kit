import { test } from '@playwright/test';
import { SCREEN_SIZES } from '../../consts';

const WIDGETS_CUSTOM_SHOTS_PATH = './custom-shots/';

test('Industry Specific Widgets - Fitness - Trading Info Card Hover', async ({
  page,
}) => {
  await page.setViewportSize(SCREEN_SIZES[1920]);
  await page.goto(
    'http://localhost:6007/iframe.html?args=&id=fintech-tradinginfocard--with-tooltip&viewMode=story',
  );
  await page.getByTestId('tooltip-trigger').hover();

  await page.screenshot({
    path: `${WIDGETS_CUSTOM_SHOTS_PATH}widgets-fintech-info-card--hover__[w1920px].png`,
  });
});
