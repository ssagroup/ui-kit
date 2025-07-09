# SSA UI Kit Demo - End-to-End Tests

This directory contains comprehensive Playwright tests for the SSA UI Kit Demo application, specifically focusing on the Staff Dashboard and form functionality.

## Test Coverage

### 🎯 Staff Dashboard Tests (`tests/dashboard.spec.ts`)
- **Header and Navigation**: Validates dashboard title, subtitle, and action buttons
- **Chart Rendering**: Tests all three BarGaugeChart components:
  - Department Efficiency Chart (Engineering, Marketing, Sales, HR)
  - Technical Skill Competency Chart (React/TypeScript, Node.js, DevOps, UI/UX)
  - Quarterly Workload Chart (Q1, Q2, Q3 projects)
- **PieChart Display**: Team Distribution chart with specialization breakdown
- **Summary Statistics**: Total employees, average efficiency, active projects, satisfaction score
- **Interactive Elements**: Refresh and Export buttons with alert handling
- **Responsive Design**: Mobile viewport testing
- **Accessibility**: ARIA attributes, color contrast, keyboard navigation

### 📋 Main Page Tests (`tests/main-page.spec.ts`)
- **Form Structure**: AccordionGroup with TextField and DateRangePicker
- **Form Validation**: Required field validation and length constraints
- **Accordion Behavior**: Expand/collapse functionality
- **Form Submission**: Complete form workflow with react-hook-form integration
- **Responsive Layout**: Mobile-friendly testing
- **Accessibility**: Form labels, helper text, semantic HTML

### 🧭 Navigation Tests (`tests/navigation.spec.ts`)
- **Page Routing**: Navigation between main page and dashboard
- **CollapsibleNavBar**: Responsive navigation component
- **URL Handling**: Direct URL navigation and route validation
- **Layout Consistency**: Cross-page layout verification

## Setup and Installation

### Prerequisites
- Node.js (version 16 or higher)
- pnpm package manager
- A modern browser (Chrome, Firefox, or Safari)

### Installation

1. **Install Playwright dependencies**:
   ```bash
   pnpm install
   ```

2. **Install Playwright browsers**:
   ```bash
   pnpm exec playwright install
   ```

## Running Tests

### Development Mode
Start the development server and run tests interactively:

```bash
# Start the dev server (in one terminal)
pnpm dev

# Run tests with UI (in another terminal)
pnpm test:e2e:ui
```

### Automated Testing
Run all tests automatically (includes server startup):

```bash
# Run all tests
pnpm test:e2e

# Run specific test file
pnpm test:e2e tests/dashboard.spec.ts

# Run in debug mode
pnpm test:e2e:debug

# View test report
pnpm test:e2e:report
```

### Platform-Specific Test Runners

**Windows**:
```cmd
run-tests.bat
```

**Unix/Linux/macOS**:
```bash
./run-tests.sh
```

## Configuration

The Playwright configuration (`playwright.config.ts`) includes:

- **Multiple Browsers**: Chrome, Firefox, Safari testing
- **Responsive Testing**: Desktop and mobile viewports
- **Automatic Server**: Starts dev server before tests
- **Retry Logic**: Configurable retry attempts for CI/CD
- **Parallel Execution**: Faster test runs with parallel workers

## Test Data and Scenarios

### Dashboard Mock Data
The dashboard tests verify the following data points:

**Department Efficiency**:
- Engineering: 85%
- Marketing: 92% 
- Sales: 78%
- HR: 96%

**Technical Skills**:
- React/TypeScript: 88%
- Node.js/Backend: 82%
- DevOps/Cloud: 75%
- UI/UX Design: 90%

**Quarterly Workload**:
- Q1 Projects: 70%
- Q2 Projects: 85%
- Q3 Projects: 92%

**Summary Statistics**:
- Total Employees: 30
- Average Efficiency: 87.8%
- Active Projects: 12
- Satisfaction Score: 4.7/5

### Form Testing Scenarios
- Valid form submission with complete data
- Required field validation
- Input length validation (minimum 2 characters)
- Date range picker within current year
- Accordion expand/collapse behavior

## Best Practices

### Test Isolation
Each test is isolated and can run independently. Tests use `beforeEach` hooks to ensure consistent starting states.

### Data-TestId Strategy
Tests use `data-testid` attributes for reliable element selection:
```html
<div data-testid="department-efficiency-chart">
<div data-testid="efficiency-engineering-value">
```

### Wait Strategies
Tests implement proper wait strategies:
- `waitForSelector()` for element visibility
- `waitForLoadState()` for page load completion
- Dialog handling for form submissions

### Cross-Browser Compatibility
All tests are configured to run on:
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

## Troubleshooting

### Common Issues

1. **Server Not Starting**: Ensure port 5173 is available
2. **Browser Not Found**: Run `pnpm exec playwright install`
3. **Test Timeouts**: Increase timeout in `playwright.config.ts`
4. **Chart Loading**: Some charts may need additional wait time

### Debug Mode
For debugging failing tests:

```bash
pnpm test:e2e:debug
```

This opens the Playwright inspector for step-by-step debugging.

### CI/CD Integration
The test suite is designed for CI/CD with:
- Headless browser execution
- JUnit XML reporting
- Screenshot/video capture on failures
- Retry logic for flaky tests

## Extending Tests

To add new tests:

1. Create new `.spec.ts` files in the `tests/` directory
2. Follow the existing pattern for test structure
3. Use descriptive test names and group related tests
4. Add appropriate `data-testid` attributes to components
5. Update this README with new test coverage

## Dependencies

- `@playwright/test`: Core testing framework
- `typescript`: Type support for test files
- Vite dev server integration via `webServer` config

For more information, see the [Playwright documentation](https://playwright.dev/docs/intro).
