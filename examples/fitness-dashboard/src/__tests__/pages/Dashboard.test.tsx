import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// We need to import the actual Dashboard component, not the template-wrapped one
import Dashboard from '../../pages/Dashboard';

// Mock all the SSA UI Kit components
jest.mock('@ssa-ui-kit/core', () => ({
  Typography: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
  ResponsiveImage: (props: Record<string, unknown>) => (
    <img {...props} alt={(props.alt as string) || 'image'} />
  ),
  ProgressInfo: (props: { data: unknown }) => (
    <div data-testid="progress-info">{JSON.stringify(props.data)}</div>
  ),
}));

jest.mock('@ssa-ui-kit/widgets', () => ({
  HeartRate: (props: { data: unknown }) => (
    <div data-testid="heart-rate">{JSON.stringify(props.data)}</div>
  ),
  Activity: (props: { data: unknown }) => (
    <div data-testid="activity">{JSON.stringify(props.data)}</div>
  ),
  Calories: (props: { currentValue: number; max: number }) => (
    <div data-testid="calories">
      Calories: {props.currentValue}/{props.max}
    </div>
  ),
  MealPlanner: (props: { data: unknown }) => (
    <div data-testid="meal-planner">{JSON.stringify(props.data)}</div>
  ),
  StepsCounter: (props: { currentValue: number; max: number }) => (
    <div data-testid="steps-counter">
      Steps: {props.currentValue}/{props.max}
    </div>
  ),
  WaterConsume: (props: {
    currentValue: number;
    maxValue: number;
    unit: string;
  }) => (
    <div data-testid="water-consume">
      Water: {props.currentValue}/{props.maxValue}
      {props.unit}
    </div>
  ),
}));

// Mock the MealNutrients component
jest.mock('../../pages/components/MealNutrients', () => {
  const MockMealNutrients = () => (
    <div data-testid="meal-nutrients">Meal Nutrients</div>
  );
  MockMealNutrients.displayName = 'MockMealNutrients';
  return MockMealNutrients;
});

// Mock the Template
jest.mock('../../pages/Template/Default', () => {
  return (Component: React.ComponentType) => Component;
});

// Mock the API module
const mockApiCalls = {
  topWidgets: {
    get: jest.fn().mockResolvedValue({
      steps: { max: 10000, current: 7500 },
      water: { current: 2, steps: [1, 2], maxValue: 3, unit: 'L' },
      calories: { max: 2000, current: 1500 },
      heartRate: { data: [70, 75, 80, 85] },
    }),
  },
  mealPlanner: {
    get: jest.fn().mockResolvedValue({
      meals: [
        { id: 1, name: 'Breakfast', calories: 300 },
        { id: 2, name: 'Lunch', calories: 500 },
      ],
      totalCalories: 800,
    }),
  },
  activity: {
    getActivities: jest.fn().mockResolvedValue([
      { id: 1, name: 'Running', duration: 30, calories: 300 },
      { id: 2, name: 'Swimming', duration: 45, calories: 400 },
    ]),
  },
  progress: {
    getProgress: jest.fn().mockResolvedValue({
      weight: 70,
      bodyFat: 15,
      muscle: 45,
    }),
  },
};

jest.mock('@apis/index', () => mockApiCalls);

// Mock the hooks
const mockUseAuth = jest.fn();
jest.mock('@hooks/useAuth', () => ({
  useAuth: mockUseAuth,
}));

const mockUseApi = jest.fn();
jest.mock('@ssa-ui-kit/hooks', () => ({
  useApi: mockUseApi,
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Set up default mock returns
    mockUseAuth.mockReturnValue({
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    });

    mockUseApi.mockImplementation((apiFunction, defaultValue) => ({
      data: defaultValue,
      loading: false,
      error: null,
      query: jest.fn(),
    }));
  });

  it('renders without crashing', () => {
    render(<Dashboard />);
    expect(document.querySelector('main')).toBeInTheDocument();
  });

  it('displays welcome message with user name', () => {
    mockUseAuth.mockReturnValue({
      user: { name: 'Jane Smith' },
    });

    render(<Dashboard />);
    expect(screen.getByText('Good Morning, Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  it('renders all widget components', () => {
    mockUseApi.mockImplementation((apiFunction, defaultValue) => {
      if (apiFunction === mockApiCalls.topWidgets.get) {
        return {
          data: {
            steps: { max: 10000, current: 7500 },
            water: { current: 2, steps: [1, 2] },
            calories: { max: 2000, current: 1500 },
            heartRate: { data: [70, 75, 80, 85] },
          },
          loading: false,
          error: null,
          query: jest.fn(),
        };
      }
      return {
        data: defaultValue,
        loading: false,
        error: null,
        query: jest.fn(),
      };
    });

    render(<Dashboard />);

    expect(screen.getByTestId('steps-counter')).toBeInTheDocument();
    expect(screen.getByTestId('water-consume')).toBeInTheDocument();
    expect(screen.getByTestId('calories')).toBeInTheDocument();
    expect(screen.getByTestId('heart-rate')).toBeInTheDocument();
    expect(screen.getByTestId('activity')).toBeInTheDocument();
    expect(screen.getByTestId('progress-info')).toBeInTheDocument();
    expect(screen.getByTestId('meal-planner')).toBeInTheDocument();
    expect(screen.getByTestId('meal-nutrients')).toBeInTheDocument();
  });

  it('displays correct data in widgets', () => {
    mockUseApi.mockImplementation((apiFunction, defaultValue) => {
      if (apiFunction === mockApiCalls.topWidgets.get) {
        return {
          data: {
            steps: { max: 10000, current: 7500 },
            water: { current: 2, steps: [1, 2] },
            calories: { max: 2000, current: 1500 },
            heartRate: { data: [70, 75, 80, 85] },
          },
          loading: false,
          error: null,
          query: jest.fn(),
        };
      }
      return {
        data: defaultValue,
        loading: false,
        error: null,
        query: jest.fn(),
      };
    });

    render(<Dashboard />);

    expect(screen.getByText('Steps: 7500/10000')).toBeInTheDocument();
    expect(screen.getByText('Calories: 1500/2000')).toBeInTheDocument();
  });

  it('calls all API endpoints on mount', async () => {
    const mockQueries = {
      loadData: jest.fn(),
      loadMealData: jest.fn(),
      loadActivitiesData: jest.fn(),
      loadProgress: jest.fn(),
    };

    mockUseApi.mockImplementation((apiFunction, defaultValue) => {
      if (apiFunction === mockApiCalls.topWidgets.get) {
        return {
          data: defaultValue,
          loading: false,
          error: null,
          query: mockQueries.loadData,
        };
      }
      if (apiFunction === mockApiCalls.mealPlanner.get) {
        return {
          data: defaultValue,
          loading: false,
          error: null,
          query: mockQueries.loadMealData,
        };
      }
      if (apiFunction === mockApiCalls.activity.getActivities) {
        return {
          data: defaultValue,
          loading: false,
          error: null,
          query: mockQueries.loadActivitiesData,
        };
      }
      if (apiFunction === mockApiCalls.progress.getProgress) {
        return {
          data: defaultValue,
          loading: false,
          error: null,
          query: mockQueries.loadProgress,
        };
      }
      return {
        data: defaultValue,
        loading: false,
        error: null,
        query: jest.fn(),
      };
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(mockQueries.loadData).toHaveBeenCalled();
      expect(mockQueries.loadMealData).toHaveBeenCalled();
      expect(mockQueries.loadActivitiesData).toHaveBeenCalled();
      expect(mockQueries.loadProgress).toHaveBeenCalled();
    });
  });

  it('renders responsive image with correct props', () => {
    render(<Dashboard />);

    const image = screen.getByAltText('Dumbbell with hand');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('dumbbell'));
  });

  it('handles missing user gracefully', () => {
    mockUseAuth.mockReturnValue({
      user: null,
    });

    render(<Dashboard />);

    // Should still render the layout
    expect(document.querySelector('main')).toBeInTheDocument();
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });
});
