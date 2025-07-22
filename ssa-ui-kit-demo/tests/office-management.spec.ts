import { test, expect } from '@playwright/test';

test.describe('Office Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/office-management');
  });

  test('should display office management page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Office Management');
    await expect(page.getByText('Manage company offices with full CRUD operations')).toBeVisible();
  });

  test('should display office table with data', async ({ page }) => {
    // Wait for the table to load
    await expect(page.getByTestId('offices-table')).toBeVisible();
    
    // Check table headers
    await expect(page.getByTestId('sort-title')).toContainText('Title');
    await expect(page.getByTestId('sort-address')).toContainText('Address');
    await expect(page.getByTestId('sort-status')).toContainText('Status');
    
    // Check that some office rows are visible
    await expect(page.locator('[data-testid^="office-row-"]').first()).toBeVisible();
  });

  test('should allow searching offices', async ({ page }) => {
    // Search for a specific office
    await page.getByTestId('search-input').fill('New York');
    
    // Wait for search results
    await expect(page.locator('text=New York Headquarters')).toBeVisible();
    
    // Clear search
    await page.getByTestId('search-input').clear();
    await page.getByTestId('search-input').fill('NonExistentOffice');
    
    // Should show no results message
    await expect(page.getByText('No offices found matching your search.')).toBeVisible();
  });

  test('should sort offices by title', async ({ page }) => {
    // Click on title header to sort
    await page.getByTestId('sort-title').click();
    
    // Check that sort indicator appears
    await expect(page.getByTestId('sort-title')).toContainText('↑');
    
    // Click again to reverse sort
    await page.getByTestId('sort-title').click();
    await expect(page.getByTestId('sort-title')).toContainText('↓');
  });

  test('should change page size', async ({ page }) => {
    // Change page size to 5
    await page.getByTestId('page-size-select').selectOption('5');
    
    // Check that only 5 rows are displayed (or fewer if total is less)
    const rows = page.locator('[data-testid^="office-row-"]');
    await expect(rows).toHaveCount(5);
  });

  test('should open add office modal', async ({ page }) => {
    // Click add office button
    await page.getByTestId('add-office-btn').click();
    
    // Check that modal opens with correct title
    await expect(page.getByText('Add New Office')).toBeVisible();
    await expect(page.getByTestId('title-input')).toBeVisible();
    await expect(page.getByTestId('address-input')).toBeVisible();
    await expect(page.getByTestId('active-checkbox')).toBeVisible();
  });

  test('should add a new office', async ({ page }) => {
    // Open add modal
    await page.getByTestId('add-office-btn').click();
    
    // Fill form
    await page.getByTestId('title-input').fill('Test Office');
    await page.getByTestId('address-input').fill('123 Test Street, Test City');
    await page.getByTestId('active-checkbox').check();
    
    // Submit form
    await page.getByTestId('save-button').click();
    
    // Check that office was added
    await expect(page.getByText('Test Office')).toBeVisible();
    await expect(page.getByText('123 Test Street, Test City')).toBeVisible();
  });

  test('should edit an existing office', async ({ page }) => {
    // Click edit button on first office
    await page.locator('[data-testid^="edit-office-"]').first().click();
    
    // Check that modal opens with edit title
    await expect(page.getByText('Edit Office')).toBeVisible();
    
    // Update title
    await page.getByTestId('title-input').clear();
    await page.getByTestId('title-input').fill('Updated Office Title');
    
    // Submit form
    await page.getByTestId('save-button').click();
    
    // Check that office was updated
    await expect(page.getByText('Updated Office Title')).toBeVisible();
  });

  test('should delete an office', async ({ page }) => {
    // Get the text of the first office to verify deletion
    const firstOfficeTitle = await page.locator('[data-testid^="office-row-"]').first().locator('td:first-child').textContent();
    
    // Click delete button on first office
    await page.locator('[data-testid^="delete-office-"]').first().click();
    
    // Check that confirmation modal opens
    await expect(page.getByText('Confirm Delete')).toBeVisible();
    await expect(page.getByText('Are you sure you want to delete this office?')).toBeVisible();
    
    // Confirm deletion
    await page.getByTestId('confirm-delete-btn').click();
    
    // Check that office was removed (title should not be visible)
    if (firstOfficeTitle) {
      await expect(page.getByText(firstOfficeTitle)).not.toBeVisible();
    }
  });

  test('should cancel delete operation', async ({ page }) => {
    // Get initial count of offices
    const initialCount = await page.locator('[data-testid^="office-row-"]').count();
    
    // Click delete button on first office
    await page.locator('[data-testid^="delete-office-"]').first().click();
    
    // Cancel deletion
    await page.getByTestId('cancel-delete-btn').click();
    
    // Check that office count is unchanged
    await expect(page.locator('[data-testid^="office-row-"]')).toHaveCount(initialCount);
  });

  test('should navigate through pages', async ({ page }) => {
    // Set page size to 5 to ensure pagination
    await page.getByTestId('page-size-select').selectOption('5');
    
    // Check if pagination is visible (only if more than 5 offices)
    const officeCount = await page.locator('[data-testid^="office-row-"]').count();
    
    if (officeCount >= 5) {
      // Check that next button is enabled
      const nextButton = page.getByText('Next');
      if (await nextButton.isEnabled()) {
        await nextButton.click();
        
        // Check that we're on page 2
        await expect(page.getByText('Page 2 of')).toBeVisible();
        
        // Go back to page 1
        await page.getByText('Previous').click();
        await expect(page.getByText('Page 1 of')).toBeVisible();
      }
    }
  });

  test('should validate required fields in add form', async ({ page }) => {
    // Open add modal
    await page.getByTestId('add-office-btn').click();
    
    // Try to submit empty form
    await page.getByTestId('save-button').click();
    
    // Form should still be open (validation prevents submission)
    await expect(page.getByText('Add New Office')).toBeVisible();
  });

  test('should close modal on cancel', async ({ page }) => {
    // Open add modal
    await page.getByTestId('add-office-btn').click();
    
    // Cancel
    await page.getByTestId('cancel-button').click();
    
    // Modal should be closed
    await expect(page.getByText('Add New Office')).not.toBeVisible();
  });
});
