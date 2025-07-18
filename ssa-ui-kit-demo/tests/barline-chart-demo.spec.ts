import { test, expect } from '@playwright/test';

test.describe('BarLineComplexChart Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/barline-chart');
  });

  test('should display the BarLineComplexChart demo page', async ({ page }) => {
    // Check if the page title is displayed
    await expect(page.getByRole('heading', { name: 'BarLineComplexChart Demo' })).toBeVisible();
    
    // Check if the subtitle is displayed
    await expect(page.getByText('Explore the powerful BarLineComplexChart component with different datasets and configurations')).toBeVisible();
  });

  test('should have chart configuration section', async ({ page }) => {
    // Check if Configuration section exists
    await expect(page.getByRole('heading', { name: 'Chart Configuration' })).toBeVisible();
    
    // Check if dataset selection is present
    await expect(page.getByText('Select Dataset:')).toBeVisible();
    
    // Check if line shape selection is present
    await expect(page.getByText('Line Shape:')).toBeVisible();
    
    // Check if features selection is present
    await expect(page.getByText('Features:')).toBeVisible();
  });

  test('should display the chart', async ({ page }) => {
    // Check if the chart is displayed with default settings
    await expect(page.getByTestId('barline-complex-chart')).toBeVisible();
    
    // Should show sales performance by default
    await expect(page.getByRole('heading', { name: 'Sales Performance Dashboard' })).toBeVisible();
  });

  test('should switch between datasets', async ({ page }) => {
    // Switch to Revenue & Profit dataset
    await page.getByRole('button', { name: 'Revenue & Profit' }).click();
    await expect(page.getByRole('heading', { name: 'Revenue & Profit Analysis' })).toBeVisible();
    
    // Switch to Employee Metrics dataset
    await page.getByRole('button', { name: 'Employee Metrics' }).click();
    await expect(page.getByRole('heading', { name: 'Employee Performance Metrics' })).toBeVisible();
    
    // Switch back to Sales Performance
    await page.getByRole('button', { name: 'Sales Performance' }).click();
    await expect(page.getByRole('heading', { name: 'Sales Performance Dashboard' })).toBeVisible();
  });

  test('should toggle line shape', async ({ page }) => {
    // Linear should be selected by default
    const linearButton = page.getByRole('button', { name: 'Linear' });
    const splineButton = page.getByRole('button', { name: 'Spline' });
    
    // Click spline
    await splineButton.click();
    
    // Click back to linear
    await linearButton.click();
    
    // Buttons should be clickable without errors
    await expect(linearButton).toBeVisible();
    await expect(splineButton).toBeVisible();
  });

  test('should toggle features', async ({ page }) => {
    const filteringBtn = page.getByTestId('filtering-feature-btn');
    const fullscreenBtn = page.getByTestId('fullscreen-feature-btn');
    const headerBtn = page.getByTestId('header-feature-btn');
    
    // Toggle filtering off
    await filteringBtn.click();
    
    // Toggle fullscreen off
    await fullscreenBtn.click();
    
    // Toggle header on
    await headerBtn.click();
    
    // Toggle filtering back on
    await filteringBtn.click();
    
    // All buttons should be visible and clickable
    await expect(filteringBtn).toBeVisible();
    await expect(fullscreenBtn).toBeVisible();
    await expect(headerBtn).toBeVisible();
  });

  test('should display information cards', async ({ page }) => {
    // Check for information sections
    await expect(page.getByRole('heading', { name: 'Features Overview' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data Structure' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Use Cases' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Code Example' })).toBeVisible();
    
    // Check for specific feature descriptions
    await expect(page.getByText('Filtering:')).toBeVisible();
    await expect(page.getByText('Fullscreen Mode:')).toBeVisible();
    await expect(page.getByText('Interactive Tooltips:')).toBeVisible();
    await expect(page.getByText('Mixed Chart Types:')).toBeVisible();
    await expect(page.getByText('Dual Y-Axis:')).toBeVisible();
  });

  test('should display code example', async ({ page }) => {
    // Check if code example section exists
    await expect(page.getByRole('heading', { name: 'Code Example' })).toBeVisible();
    
    // Check if code contains expected imports and usage
    const codeBlock = page.locator('pre');
    await expect(codeBlock).toContainText('import { BarLineComplexChart }');
    await expect(codeBlock).toContainText('<BarLineComplexChart');
    await expect(codeBlock).toContainText('data={data}');
    await expect(codeBlock).toContainText('features={[\'filtering\', \'fullscreenMode\']}');
  });

  test('should display data structure information', async ({ page }) => {
    // Check data structure details
    await expect(page.getByText('type')).toBeVisible();
    await expect(page.getByText('selected')).toBeVisible();
    await expect(page.getByText('marker.color')).toBeVisible();
    await expect(page.getByText('valueDimension')).toBeVisible();
    await expect(page.getByText('yaxis')).toBeVisible();
  });

  test('should display use cases', async ({ page }) => {
    // Check use cases list
    await expect(page.getByText('Financial dashboards')).toBeVisible();
    await expect(page.getByText('Performance analytics')).toBeVisible();
    await expect(page.getByText('Sales reporting')).toBeVisible();
    await expect(page.getByText('KPI monitoring')).toBeVisible();
    await expect(page.getByText('Comparative analysis')).toBeVisible();
  });

  test('should be accessible via navigation', async ({ page }) => {
    // Start from main page
    await page.goto('/');
    
    // Click on BarLine Chart nav item
    await page.getByRole('link', { name: 'BarLine Chart' }).click();
    
    // Verify we're on the BarLine Chart demo page
    await expect(page.getByRole('heading', { name: 'BarLineComplexChart Demo' })).toBeVisible();
    await expect(page.url()).toContain('/barline-chart');
  });

  test('should maintain responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if elements are still visible and accessible
    await expect(page.getByRole('heading', { name: 'BarLineComplexChart Demo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Chart Configuration' })).toBeVisible();
    await expect(page.getByTestId('barline-complex-chart')).toBeVisible();
    
    // Dataset buttons should still be clickable
    await expect(page.getByRole('button', { name: 'Sales Performance' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Revenue & Profit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Employee Metrics' })).toBeVisible();
  });

  test('should have proper chart interactivity', async ({ page }) => {
    // Wait for chart to load
    await expect(page.getByTestId('barline-complex-chart')).toBeVisible();
    
    // The chart should be interactive (this tests that Plotly is loaded correctly)
    const chartContainer = page.getByTestId('barline-complex-chart');
    await expect(chartContainer).toBeVisible();
    
    // Switch datasets to test chart updates
    await page.getByRole('button', { name: 'Revenue & Profit' }).click();
    await page.waitForTimeout(500); // Allow time for chart to update
    
    await page.getByRole('button', { name: 'Employee Metrics' }).click();
    await page.waitForTimeout(500); // Allow time for chart to update
    
    // Chart should still be visible after dataset changes
    await expect(chartContainer).toBeVisible();
  });

  test('should handle feature combinations correctly', async ({ page }) => {
    // Test different feature combinations
    const filteringBtn = page.getByTestId('filtering-feature-btn');
    const fullscreenBtn = page.getByTestId('fullscreen-feature-btn');
    const headerBtn = page.getByTestId('header-feature-btn');
    
    // Start with all features off
    await filteringBtn.click(); // Turn off (default is on)
    await fullscreenBtn.click(); // Turn off (default is on)
    
    // Chart should still be visible
    await expect(page.getByTestId('barline-complex-chart')).toBeVisible();
    
    // Turn on header
    await headerBtn.click();
    await expect(page.getByTestId('barline-complex-chart')).toBeVisible();
    
    // Turn filtering back on
    await filteringBtn.click();
    await expect(page.getByTestId('barline-complex-chart')).toBeVisible();
    
    // Turn fullscreen back on
    await fullscreenBtn.click();
    await expect(page.getByTestId('barline-complex-chart')).toBeVisible();
  });
});
