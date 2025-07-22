import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import MealNutrientsWithData from '../../pages/components/MealNutrients';

// Mock the MealNutrients widget
jest.mock('@ssa-ui-kit/widgets', () => ({
  MealNutrients: ({
    data,
    options,
    onOptionChange,
  }: {
    data: unknown;
    options: Array<{ value: string; label: string }>;
    onOptionChange: (option: { value: string }) => void;
  }) => (
    <div data-testid="meal-nutrients-widget">
      <select
        data-testid="meal-nutrients-select"
        onChange={(e) => onOptionChange({ value: e.target.value })}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div data-testid="meal-nutrients-data">{JSON.stringify(data)}</div>
    </div>
  ),
}));

// Mock the API module
const mockApiCalls = {
  mealNutrients: {
    get: jest.fn(),
    getOptions: jest.fn(),
  },
};

jest.mock('@apis/index', () => mockApiCalls);

// Mock the useApi hook
const mockUseApi = jest.fn();
jest.mock('@ssa-ui-kit/hooks', () => ({
  useApi: mockUseApi,
}));

describe('MealNutrients Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock setup
    mockUseApi.mockReturnValue({
      data: [],
      query: jest.fn(),
    });

    mockApiCalls.mealNutrients.getOptions.mockResolvedValue([
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'lunch', label: 'Lunch' },
      { value: 'dinner', label: 'Dinner' },
    ]);
  });

  it('renders without crashing', () => {
    render(<MealNutrientsWithData />);
    expect(screen.getByTestId('meal-nutrients-widget')).toBeInTheDocument();
  });

  it('loads options on mount and sets default selection', async () => {
    const mockLoadMealNutrients = jest.fn();
    mockUseApi.mockReturnValue({
      data: [{ name: 'Protein', value: 25 }],
      query: mockLoadMealNutrients,
    });

    render(<MealNutrientsWithData />);

    await waitFor(() => {
      expect(mockApiCalls.mealNutrients.getOptions).toHaveBeenCalled();
      expect(mockLoadMealNutrients).toHaveBeenCalledWith('breakfast');
    });
  });

  it('displays options in select dropdown', async () => {
    render(<MealNutrientsWithData />);

    await waitFor(() => {
      expect(screen.getByText('Breakfast')).toBeInTheDocument();
      expect(screen.getByText('Lunch')).toBeInTheDocument();
      expect(screen.getByText('Dinner')).toBeInTheDocument();
    });
  });

  it('calls API when option changes', async () => {
    const user = userEvent.setup();
    const mockLoadMealNutrients = jest.fn();

    mockUseApi.mockReturnValue({
      data: [],
      query: mockLoadMealNutrients,
    });

    render(<MealNutrientsWithData />);

    await waitFor(() => {
      expect(screen.getByTestId('meal-nutrients-select')).toBeInTheDocument();
    });

    const select = screen.getByTestId('meal-nutrients-select');
    await user.selectOptions(select, 'lunch');

    expect(mockLoadMealNutrients).toHaveBeenCalledWith('lunch');
  });

  it('displays meal nutrients data', async () => {
    const testData = [
      { name: 'Protein', value: 25 },
      { name: 'Carbs', value: 50 },
      { name: 'Fat', value: 15 },
    ];

    mockUseApi.mockReturnValue({
      data: testData,
      query: jest.fn(),
    });

    render(<MealNutrientsWithData />);

    await waitFor(() => {
      const dataDisplay = screen.getByTestId('meal-nutrients-data');
      expect(dataDisplay).toHaveTextContent(JSON.stringify(testData));
    });
  });

  it('handles empty options gracefully', () => {
    mockApiCalls.mealNutrients.getOptions.mockResolvedValue([]);

    render(<MealNutrientsWithData />);

    // Should still render without crashing
    expect(screen.getByTestId('meal-nutrients-widget')).toBeInTheDocument();
  });

  it('handles API errors gracefully', () => {
    mockApiCalls.mealNutrients.getOptions.mockRejectedValue(
      new Error('API Error'),
    );

    // Should not crash the component
    expect(() => render(<MealNutrientsWithData />)).not.toThrow();
  });
});
