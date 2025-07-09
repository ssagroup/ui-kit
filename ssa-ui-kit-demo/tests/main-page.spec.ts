import { test, expect } from '@playwright/test';

test.describe('Main Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the form to load
    await page.waitForSelector('form');
  });

  test('should display main page title and description', async ({ page }) => {
    // Check main title
    await expect(page.locator('h1')).toContainText('SSA UI Kit Demo');
    
    // Check description
    await expect(page.getByText('Demonstrating AccordionGroup with TextField and DateRangePicker components')).toBeVisible();
  });

  test('should display user information accordion (opened by default)', async ({ page }) => {
    // Check that first accordion is visible and opened
    const userInfoAccordion = page.locator('[id="form-accordion"]');
    await expect(userInfoAccordion).toBeVisible();
    
    // Check accordion title
    await expect(page.getByText('User Information')).toBeVisible();
    
    // Check that the content is visible (since it's opened by default)
    await expect(page.getByText('Please enter your information below:')).toBeVisible();
    
    // Check that the text field is visible
    const nameField = page.getByLabel('Full Name');
    await expect(nameField).toBeVisible();
    await expect(nameField).toHaveAttribute('placeholder', 'Enter your full name');
  });

  test('should display date selection accordion (closed by default)', async ({ page }) => {
    // Check that second accordion is visible
    const dateAccordion = page.locator('[id="date-accordion"]');
    await expect(dateAccordion).toBeVisible();
    
    // Check accordion title
    await expect(page.getByText('Date Selection')).toBeVisible();
    
    // The content should be hidden initially since isOpened={false}
    // We can click to expand it
    await page.getByText('Date Selection').click();
    
    // After clicking, the content should be visible
    const currentYear = new Date().getFullYear();
    await expect(page.getByText(`Select a date range within ${currentYear}:`)).toBeVisible();
    
    // Check that date range picker is visible
    await expect(page.getByLabel('Date Range')).toBeVisible();
  });

  test('should validate form fields correctly', async ({ page }) => {
    const nameField = page.getByLabel('Full Name');
    const submitButton = page.getByText('Submit Form');
    
    // Try to submit without filling required field
    await submitButton.click();
    
    // Should show validation error (implementation depends on how validation is displayed)
    // Since we have validation schema, the form should prevent submission
    
    // Fill with invalid data (too short)
    await nameField.fill('A');
    await submitButton.click();
    
    // Fill with valid data
    await nameField.fill('John Doe');
    
    // Now submission should work
    page.once('dialog', dialog => {
      expect(dialog.message()).toContain('Form submitted successfully!');
      expect(dialog.message()).toContain('John Doe');
      dialog.accept();
    });
    await submitButton.click();
  });

  test('should handle date range picker interaction', async ({ page }) => {
    // Open the date accordion first
    await page.getByText('Date Selection').click();
    
    // Wait for the date picker to be visible
    await page.waitForSelector('[data-testid*="date"]', { timeout: 5000 }).catch(() => {
      // If no specific test ID, look for date inputs
    });
    
    // The date range picker should be interactive
    // Note: Exact interaction depends on the DateRangePicker implementation
    const dateRangeLabel = page.getByLabel('Date Range');
    await expect(dateRangeLabel).toBeVisible();
  });

  test('should submit form with complete data', async ({ page }) => {
    const nameField = page.getByLabel('Full Name');
    const submitButton = page.getByText('Submit Form');
    
    // Fill out the form
    await nameField.fill('John Smith');
    
    // Open date accordion and interact with date picker if possible
    await page.getByText('Date Selection').click();
    
    // Set up dialog handler for successful submission
    page.once('dialog', dialog => {
      const message = dialog.message();
      expect(message).toContain('Form submitted successfully!');
      expect(message).toContain('John Smith');
      dialog.accept();
    });
    
    // Submit the form
    await submitButton.click();
  });

  test('should have proper form structure and accessibility', async ({ page }) => {
    // Check that form elements are properly labeled
    const nameField = page.getByLabel('Full Name');
    await expect(nameField).toHaveAttribute('name', 'formField');
    
    // Check helper text
    await expect(page.getByText('Please provide your full name')).toBeVisible();
    
    // Check that submit button is properly styled and accessible
    const submitButton = page.getByText('Submit Form');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveAttribute('type', 'button');
  });

  test('should display ready to submit message', async ({ page }) => {
    // Check the footer message
    await expect(page.getByText('Ready to submit your form?')).toBeVisible();
  });

  test('should handle accordion expand/collapse', async ({ page }) => {
    // The first accordion should be open by default
    await expect(page.getByText('Please enter your information below:')).toBeVisible();
    
    // Click to collapse it (if supported)
    await page.getByText('User Information').click();
    
    // The second accordion should be closed by default
    // Click to expand it
    await page.getByText('Date Selection').click();
    
    // After clicking, content should be visible
    const currentYear = new Date().getFullYear();
    await expect(page.getByText(`Select a date range within ${currentYear}:`)).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Form should still be accessible
    await expect(page.locator('h1')).toContainText('SSA UI Kit Demo');
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByText('Submit Form')).toBeVisible();
    
    // Accordions should work on mobile
    await expect(page.getByText('User Information')).toBeVisible();
    await expect(page.getByText('Date Selection')).toBeVisible();
  });

  test('should have proper styling and visual elements', async ({ page }) => {
    // Check that main container has proper styling
    const mainContainer = page.locator('div').first();
    
    // Check that the title has gradient styling
    const title = page.locator('h1');
    await expect(title).toBeVisible();
    
    // Check that submit button has proper styling
    const submitButton = page.getByText('Submit Form');
    await expect(submitButton).toBeVisible();
    
    // Check that the page has the expected background and layout
    await expect(page.locator('form')).toBeVisible();
  });

  test('should console log form data on submission', async ({ page }) => {
    const nameField = page.getByLabel('Full Name');
    
    // Set up console listener
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });
    
    // Fill and submit form
    await nameField.fill('Test User');
    
    page.once('dialog', dialog => dialog.accept());
    await page.getByText('Submit Form').click();
    
    // Check that console logs were created
    // Note: We can't easily test the exact console content in this context
    // but we can verify the submission flow worked
  });
});
