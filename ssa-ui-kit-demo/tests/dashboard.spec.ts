import { test, expect } from '@playwright/test';

test.describe('Staff Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/another-page');
    // Wait for the dashboard to load
    await page.waitForSelector('[data-testid="department-efficiency-chart"]');
  });

  test('should display dashboard header and title', async ({ page }) => {
    // Check main dashboard title
    await expect(page.locator('h1')).toContainText('Staff Performance Dashboard');
    
    // Check subtitle
    await expect(page.getByText('Real-time insights into team efficiency')).toBeVisible();
  });

  test('should display action buttons and handle interactions', async ({ page }) => {
    // Check refresh button
    const refreshButton = page.getByTestId('refresh-button');
    await expect(refreshButton).toBeVisible();
    await expect(refreshButton).toContainText('Refresh');
    
    // Check export button
    const exportButton = page.getByTestId('export-button');
    await expect(exportButton).toBeVisible();
    await expect(exportButton).toContainText('Export Report');
    
    // Test refresh button click
    page.once('dialog', dialog => {
      expect(dialog.message()).toContain('Data refresh completed!');
      dialog.accept();
    });
    await refreshButton.click();
    
    // Test export button click
    page.once('dialog', dialog => {
      expect(dialog.message()).toContain('Staff report export feature would be implemented here');
      dialog.accept();
    });
    await exportButton.click();
  });

  test('should display department efficiency chart with correct data', async ({ page }) => {
    const chartContainer = page.getByTestId('department-efficiency-chart');
    await expect(chartContainer).toBeVisible();
    
    // Check chart title
    await expect(page.getByText('Department Efficiency')).toBeVisible();
    await expect(page.getByText('Performance metrics across different departments')).toBeVisible();
    
    // Check that efficiency values are displayed for each department
    await expect(page.getByTestId('efficiency-engineering-value')).toBeVisible();
    await expect(page.getByTestId('efficiency-marketing-value')).toBeVisible();
    await expect(page.getByTestId('efficiency-sales-value')).toBeVisible();
    await expect(page.getByTestId('efficiency-hr-value')).toBeVisible();
    
    // Verify the actual percentage values
    await expect(page.getByTestId('efficiency-engineering-value')).toContainText('85%');
    await expect(page.getByTestId('efficiency-marketing-value')).toContainText('92%');
    await expect(page.getByTestId('efficiency-sales-value')).toContainText('78%');
    await expect(page.getByTestId('efficiency-hr-value')).toContainText('96%');
  });

  test('should display skill competency chart with correct data', async ({ page }) => {
    const chartContainer = page.getByTestId('skill-competency-chart');
    await expect(chartContainer).toBeVisible();
    
    // Check chart title
    await expect(page.getByText('Technical Skill Competency')).toBeVisible();
    await expect(page.getByText('Average skill levels across key technologies')).toBeVisible();
    
    // Check that skill values are displayed
    await expect(page.getByTestId('skill-react-value')).toBeVisible();
    await expect(page.getByTestId('skill-nodejs-value')).toBeVisible();
    await expect(page.getByTestId('skill-devops-value')).toBeVisible();
    await expect(page.getByTestId('skill-design-value')).toBeVisible();
    
    // Verify the actual percentage values
    await expect(page.getByTestId('skill-react-value')).toContainText('88%');
    await expect(page.getByTestId('skill-nodejs-value')).toContainText('82%');
    await expect(page.getByTestId('skill-devops-value')).toContainText('75%');
    await expect(page.getByTestId('skill-design-value')).toContainText('90%');
  });

  test('should display workload chart with correct data', async ({ page }) => {
    const chartContainer = page.getByTestId('workload-chart');
    await expect(chartContainer).toBeVisible();
    
    // Check chart title
    await expect(page.getByText('Quarterly Workload')).toBeVisible();
    await expect(page.getByText('Resource allocation and capacity planning')).toBeVisible();
    
    // Check that workload values are displayed
    await expect(page.getByTestId('workload-q1-value')).toBeVisible();
    await expect(page.getByTestId('workload-q2-value')).toBeVisible();
    await expect(page.getByTestId('workload-q3-value')).toBeVisible();
    
    // Verify the actual percentage values
    await expect(page.getByTestId('workload-q1-value')).toContainText('70%');
    await expect(page.getByTestId('workload-q2-value')).toContainText('85%');
    await expect(page.getByTestId('workload-q3-value')).toContainText('92%');
  });

  test('should display team distribution pie chart', async ({ page }) => {
    const chartContainer = page.getByTestId('team-distribution-chart');
    await expect(chartContainer).toBeVisible();
    
    // Check chart title
    await expect(page.getByText('Team Distribution')).toBeVisible();
    await expect(page.getByText('Current team composition by specialization')).toBeVisible();
    
    // The pie chart should be rendered (we can't easily test exact values, but we can test presence)
    await expect(chartContainer).toBeVisible();
  });

  test('should display summary statistics', async ({ page }) => {
    // Check all summary stats are visible
    await expect(page.getByTestId('total-employees')).toBeVisible();
    await expect(page.getByTestId('avg-efficiency')).toBeVisible();
    await expect(page.getByTestId('projects-active')).toBeVisible();
    await expect(page.getByTestId('satisfaction-score')).toBeVisible();
    
    // Check the actual values
    await expect(page.getByTestId('total-employees')).toContainText('30');
    await expect(page.getByTestId('avg-efficiency')).toContainText('87.8%');
    await expect(page.getByTestId('projects-active')).toContainText('12');
    await expect(page.getByTestId('satisfaction-score')).toContainText('4.7/5');
    
    // Check labels
    await expect(page.getByText('Total Employees')).toBeVisible();
    await expect(page.getByText('Average Efficiency')).toBeVisible();
    await expect(page.getByText('Active Projects')).toBeVisible();
    await expect(page.getByText('Satisfaction Score')).toBeVisible();
  });

  test('should have responsive layout on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Dashboard should still be accessible
    await expect(page.locator('h1')).toContainText('Staff Performance Dashboard');
    
    // Charts should adapt to mobile view
    await expect(page.getByTestId('department-efficiency-chart')).toBeVisible();
    await expect(page.getByTestId('skill-competency-chart')).toBeVisible();
    await expect(page.getByTestId('workload-chart')).toBeVisible();
    await expect(page.getByTestId('team-distribution-chart')).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check that main heading has proper heading level
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    
    // Check that buttons have proper labels
    const refreshButton = page.getByTestId('refresh-button');
    const exportButton = page.getByTestId('export-button');
    
    await expect(refreshButton).toHaveAttribute('type', 'button');
    await expect(exportButton).toHaveAttribute('type', 'button');
    
    // Check color contrast and readability
    await expect(mainHeading).toHaveCSS('color', /rgb\(\d+, \d+, \d+\)/);
  });

  test('should load all charts without errors', async ({ page }) => {
    // Wait for all charts to be rendered
    await page.waitForSelector('[data-testid="department-efficiency-chart"]');
    await page.waitForSelector('[data-testid="skill-competency-chart"]');
    await page.waitForSelector('[data-testid="workload-chart"]');
    await page.waitForSelector('[data-testid="team-distribution-chart"]');
    
    // Check that no error messages are displayed
    await expect(page.getByText('Error')).not.toBeVisible();
    await expect(page.getByText('Failed to load')).not.toBeVisible();
    
    // Check that all data points are rendered
    const allTestIds = [
      'efficiency-engineering-value',
      'efficiency-marketing-value', 
      'efficiency-sales-value',
      'efficiency-hr-value',
      'skill-react-value',
      'skill-nodejs-value',
      'skill-devops-value',
      'skill-design-value',
      'workload-q1-value',
      'workload-q2-value',
      'workload-q3-value'
    ];
    
    for (const testId of allTestIds) {
      await expect(page.getByTestId(testId)).toBeVisible();
    }
  });
});
