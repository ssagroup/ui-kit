import { test, expect } from '@playwright/test';

test('Widgets: HeartRate - Hint is shown', async ({ page }) => {
  // await page.goto(
  //   'https://ui-kit-fitness.web.app/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  // );
  await page.goto(
    // 'http://localhost:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
    // 'http://172.17.0.1:6007/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
    'http://172.17.0.1:8080/iframe.html?args=&id=widgets-heartrate--default&viewMode=story',
  );

  await page.mouse.move(50, 99);

  await page.screenshot({
    path: '../lost-pixel/widgets/HeartRateHint.png',
    fullPage: true,
  });

  await expect(page.getByText('08:03 PM - 120 bpm')).toBeVisible();
});
