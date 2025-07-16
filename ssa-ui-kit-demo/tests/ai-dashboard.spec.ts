import { test, expect } from '@playwright/test';

test.describe('AI Dashboard Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai-dashboard');
  });

  test('should display the AI Dashboard Generator page', async ({ page }) => {
    // Check if the page title is displayed
    await expect(page.getByRole('heading', { name: 'AI Dashboard Generator' })).toBeVisible();
    
    // Check if the subtitle is displayed
    await expect(page.getByText('Generate custom dashboards using Claude Sonnet 4 and SSA UI Kit components')).toBeVisible();
  });

  test('should have configuration section', async ({ page }) => {
    // Check if Configuration section exists
    await expect(page.getByRole('heading', { name: 'Configuration' })).toBeVisible();
    
    // Check if API key input is present
    await expect(page.getByTestId('api-key-input')).toBeVisible();
    await expect(page.getByLabel('Anthropic API Key')).toBeVisible();
  });

  test('should have dashboard request section', async ({ page }) => {
    // Check if Dashboard Request section exists
    await expect(page.getByRole('heading', { name: 'Dashboard Request' })).toBeVisible();
    
    // Check if prompt textarea is present
    await expect(page.getByTestId('dashboard-prompt')).toBeVisible();
    await expect(page.getByLabel('Dashboard Description')).toBeVisible();
    
    // Check if generate button is present
    await expect(page.getByTestId('generate-button')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Generate Dashboard' })).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit without filling required fields
    await page.getByTestId('generate-button').click();
    
    // Check if validation errors appear (implementation may vary based on form validation)
    // Note: This test may need adjustment based on the actual validation implementation
  });

  test('should accept input in form fields', async ({ page }) => {
    // Fill API key field
    await page.getByTestId('api-key-input').fill('test-api-key');
    
    // Fill dashboard description
    await page.getByTestId('dashboard-prompt').fill('Create a dashboard to show staff related data with some nice design');
    
    // Verify inputs were filled
    await expect(page.getByTestId('api-key-input')).toHaveValue('test-api-key');
    await expect(page.getByTestId('dashboard-prompt')).toHaveValue('Create a dashboard to show staff related data with some nice design');
  });

  test('should show loading state when generating', async ({ page }) => {
    // Mock the API call to prevent actual requests
    await page.route('**/v1/messages', async route => {
      // Delay the response to test loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          content: [{ text: 'Mock dashboard component code' }]
        })
      });
    });

    // Fill required fields
    await page.getByTestId('api-key-input').fill('test-api-key');
    await page.getByTestId('dashboard-prompt').fill('Create a test dashboard');
    
    // Click generate button
    await page.getByTestId('generate-button').click();
    
    // Check loading state
    await expect(page.getByText('Generating...')).toBeVisible();
    await expect(page.getByTestId('generate-button')).toBeDisabled();
  });

  test('should display generated dashboard', async ({ page }) => {
    // Mock the API call with a successful response
    await page.route('**/v1/messages', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          content: [{ 
            text: `import { Card, Typography } from '@ssa-ui-kit/core';
            
            export const GeneratedDashboard = () => {
              return (
                <Card>
                  <Typography variant="h2">Staff Dashboard</Typography>
                  <Typography>Mock generated dashboard content</Typography>
                </Card>
              );
            };` 
          }]
        })
      });
    });

    // Fill required fields
    await page.getByTestId('api-key-input').fill('test-api-key');
    await page.getByTestId('dashboard-prompt').fill('Create a test dashboard');
    
    // Submit form
    await page.getByTestId('generate-button').click();
    
    // Wait for generation to complete and check if result is displayed
    await expect(page.getByRole('heading', { name: 'Generated Dashboard Code' })).toBeVisible({ timeout: 10000 });
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock an API error
    await page.route('**/v1/messages', async route => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          error: { message: 'Invalid API key' }
        })
      });
    });

    // Fill required fields
    await page.getByTestId('api-key-input').fill('invalid-key');
    await page.getByTestId('dashboard-prompt').fill('Create a test dashboard');
    
    // Submit form
    await page.getByTestId('generate-button').click();
    
    // Check if error is displayed
    await expect(page.getByText(/error/i)).toBeVisible({ timeout: 10000 });
  });

  test('should be accessible via navigation', async ({ page }) => {
    // Start from main page
    await page.goto('/');
    
    // Click on AI Dashboard nav item
    await page.getByRole('link', { name: 'AI Dashboard' }).click();
    
    // Verify we're on the AI Dashboard page
    await expect(page.getByRole('heading', { name: 'AI Dashboard Generator' })).toBeVisible();
    await expect(page.url()).toContain('/ai-dashboard');
  });

  test('should maintain responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if elements are still visible and accessible
    await expect(page.getByRole('heading', { name: 'AI Dashboard Generator' })).toBeVisible();
    await expect(page.getByTestId('api-key-input')).toBeVisible();
    await expect(page.getByTestId('dashboard-prompt')).toBeVisible();
    await expect(page.getByTestId('generate-button')).toBeVisible();
  });
});
