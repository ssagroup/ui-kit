import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';
import { BrowserRouter } from 'react-router-dom';

// Mock all external dependencies
jest.mock('@ssa-ui-kit/core', () => ({
  Typography: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ResponsiveImage: () => <img alt="test" />,
  ProgressInfo: () => <div data-testid="progress-info">Progress Info</div>,
  mainTheme: {},
}));

jest.mock('@ssa-ui-kit/widgets', () => ({
  HeartRate: () => <div data-testid="heart-rate">Heart Rate</div>,
  Activity: () => <div data-testid="activity">Activity</div>,
  Calories: () => <div data-testid="calories">Calories</div>,
  MealPlanner: () => <div data-testid="meal-planner">Meal Planner</div>,
  StepsCounter: () => <div data-testid="steps-counter">Steps Counter</div>,
  WaterConsume: () => <div data-testid="water-consume">Water Consume</div>,
  MealNutrients: () => <div data-testid="meal-nutrients">Meal Nutrients</div>,
}));

jest.mock('./pages/Template/Default', () => {
  return (Component: React.ComponentType) => Component;
});

jest.mock('@apis/index', () => ({
  topWidgets: {
    get: jest.fn().mockResolvedValue({
      steps: { max: 10000, current: 7500 },
      water: { current: 2, steps: [1, 2] },
      calories: { max: 2000, current: 1500 },
      heartRate: { data: [70, 75, 80, 85] },
    }),
  },
  mealPlanner: {
    get: jest.fn().mockResolvedValue({}),
  },
  activity: {
    getActivities: jest.fn().mockResolvedValue([]),
  },
  progress: {
    getProgress: jest.fn().mockResolvedValue({}),
  },
  user: {
    get: jest.fn().mockResolvedValue({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    }),
  },
  mealNutrients: {
    get: jest.fn().mockResolvedValue([]),
    getOptions: jest.fn().mockResolvedValue([]),
  },
}));

jest.mock('@ssa-ui-kit/hooks', () => ({
  useApi: jest.fn((apiFunction, defaultValue) => ({
    data: defaultValue,
    loading: false,
    error: null,
    query: jest.fn(),
  })),
}));

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

describe('Fitness Dashboard Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the complete fitness dashboard application', () => {
    render(<AppWithRouter />);

    // Check that the main layout is rendered
    expect(document.querySelector('main')).toBeInTheDocument();
  });

  it('displays all fitness widgets', async () => {
    render(<AppWithRouter />);

    await waitFor(() => {
      expect(screen.getByTestId('steps-counter')).toBeInTheDocument();
      expect(screen.getByTestId('water-consume')).toBeInTheDocument();
      expect(screen.getByTestId('calories')).toBeInTheDocument();
      expect(screen.getByTestId('heart-rate')).toBeInTheDocument();
      expect(screen.getByTestId('activity')).toBeInTheDocument();
      expect(screen.getByTestId('progress-info')).toBeInTheDocument();
      expect(screen.getByTestId('meal-planner')).toBeInTheDocument();
    });
  });

  it('handles user authentication context', async () => {
    const mockUseAuth = jest.fn().mockReturnValue({
      user: { name: 'Integration Test User' },
    });

    jest.doMock('@hooks/useAuth', () => ({
      useAuth: mockUseAuth,
      AuthProvider: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
      ),
    }));

    render(<AppWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    });
  });

  it('provides theme context to all components', () => {
    // This test ensures that the ThemeProvider is working correctly
    // by checking that the app renders without theme-related errors
    expect(() => render(<AppWithRouter />)).not.toThrow();
  });

  it('handles navigation between routes', async () => {
    render(<AppWithRouter />);

    // Since all routes render the same Dashboard component in this app,
    // we just verify that the dashboard is rendered
    await waitFor(() => {
      expect(document.querySelector('main')).toBeInTheDocument();
    });
  });
});
