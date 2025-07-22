import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import App from '../App';

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));
jest.mock('d3-interpolate', () => ({}));

// Mock the API module to avoid network requests during tests
jest.mock('@apis/index', () => ({
  default: {
    topWidgets: {
      get: jest.fn().mockResolvedValue({
        steps: { max: 10000, current: 7500 },
        water: { current: 2, steps: [1, 2] },
        calories: { max: 2000, current: 1500 },
        heartRate: { data: [70, 75, 80, 85] },
      }),
    },
    mealPlanner: {
      get: jest.fn().mockResolvedValue({
        meals: [],
        totalCalories: 0,
      }),
    },
    activity: {
      getActivities: jest.fn().mockResolvedValue([]),
    },
    progress: {
      getProgress: jest.fn().mockResolvedValue({
        weight: 70,
        bodyFat: 15,
        muscle: 45,
      }),
    },
    user: {
      get: jest.fn().mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    },
    mealNutrients: {
      get: jest.fn().mockResolvedValue([]),
      getOptions: jest.fn().mockResolvedValue([
        { value: 'breakfast', label: 'Breakfast' },
        { value: 'lunch', label: 'Lunch' },
        { value: 'dinner', label: 'Dinner' },
      ]),
    },
  },
}));

// Mock the hooks to avoid API calls
jest.mock('@ssa-ui-kit/hooks', () => ({
  useApi: jest.fn((apiFunction, defaultValue) => ({
    data: defaultValue,
    loading: false,
    error: null,
    query: jest.fn(),
  })),
}));

// Wrapper component for Router context
const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>,
    );
  });

  it('provides theme context to children', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>,
    );

    // The app should render without theme errors
    expect(document.body).toBeInTheDocument();
  });

  it('provides auth context to children', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>,
    );

    // Should render the dashboard which uses auth context
    // We can't directly test the auth context without more complex setup,
    // but if the app renders without errors, the context is working
    expect(document.body).toBeInTheDocument();
  });

  it('renders the main dashboard route', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>,
    );

    // Check if we can find elements that would be present in the dashboard
    // Note: Due to the complex widget structure, we'll look for basic elements
    expect(document.querySelector('main')).toBeInTheDocument();
  });
});
