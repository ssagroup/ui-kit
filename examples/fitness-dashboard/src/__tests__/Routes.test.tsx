import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import Routes from '../Routes';

// Mock the Dashboard component
jest.mock('../pages/Dashboard', () => {
  const MockDashboard = () => (
    <div data-testid="dashboard">Dashboard Component</div>
  );
  MockDashboard.displayName = 'MockDashboard';
  return MockDashboard;
});

// Mock the API module
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
      name: 'John Doe',
      email: 'john@example.com',
    }),
  },
  mealNutrients: {
    get: jest.fn().mockResolvedValue([]),
    getOptions: jest.fn().mockResolvedValue([]),
  },
}));

// Mock the hooks
jest.mock('@ssa-ui-kit/hooks', () => ({
  useApi: jest.fn((apiFunction, defaultValue) => ({
    data: defaultValue,
    loading: false,
    error: null,
    query: jest.fn(),
  })),
}));

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes />
    </MemoryRouter>,
  );
};

describe('Routes Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dashboard on root path', () => {
    renderWithRouter(['/']);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders dashboard on /stats path', () => {
    renderWithRouter(['/stats']);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders dashboard on /calendar path', () => {
    renderWithRouter(['/calendar']);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders dashboard on /trainings path', () => {
    renderWithRouter(['/trainings']);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders dashboard on /measurements path', () => {
    renderWithRouter(['/measurements']);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders dashboard on /diet path', () => {
    renderWithRouter(['/diet']);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders dashboard on /notification path', () => {
    renderWithRouter(['/notification']);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders dashboard on /settings path', () => {
    renderWithRouter(['/settings']);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('handles multiple route changes', () => {
    const { rerender } = renderWithRouter(['/']);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();

    rerender(
      <MemoryRouter initialEntries={['/stats']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();

    rerender(
      <MemoryRouter initialEntries={['/settings']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});
