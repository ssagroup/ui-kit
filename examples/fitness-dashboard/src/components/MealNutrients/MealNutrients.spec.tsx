import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResizeObserver from 'resize-observer-polyfill';

import API from '@apis/index';

import { MealNutrients } from './index';

/**
 * The Line charts have trouble rendering in the test suite (some issues with
 * the ResizeObserver).
 * As a temporal solution, we follow Kent's advice not to test charts
 * with Jest:
 * https://kentcdodds.com/calls/01/76/nivo-charts-issue
 * */
const MealNutrientsLineChartMock = () => {
  return <div data-testid="chart-mock"></div>;
};

global.ResizeObserver = ResizeObserver;

jest.mock('./MealNutrientsLineChart', () => ({
  MealNutrientsLineChart: MealNutrientsLineChartMock,
}));

jest.mock('./useChartConfig', () => {
  const useChartConfigMock = () => ({
    xScale: { type: 'time', format: '%L', precision: 'month' },
    axisBottom: {
      tickSize: 0,
      tickPadding: 30,
      legend: '',
      tickValues: 7,
      tickRotation: 30,
      format: jest.fn(),
    },
  });
  return {
    __esModule: true,
    default: useChartConfigMock,
  };
});

function setup(component) {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
}

describe('MealNutrients', () => {
  it('renders', async () => {
    const { getByTestId, getByText } = setup(<MealNutrients />);

    getByText('Meal Nutrients');

    await waitFor(() => {
      getByTestId('chart-mock');
      getByTestId('dropdown');
    });
  });

  it('renders with a custom caption', async () => {
    const caption = 'A custom caption';
    const { getByTestId, getByText } = setup(
      <MealNutrients caption={caption} />,
    );

    getByText(caption);

    await waitFor(() => {
      getByTestId('chart-mock');
      getByTestId('dropdown');
    });
  });

  it('test api error', async () => {
    jest.spyOn(API.mealNutrients, 'get').mockImplementationOnce(() => {
      throw new Error('Something went wrong');
    });
    jest.spyOn(API.mealNutrients, 'getOptions').mockImplementationOnce(() => {
      throw new Error('Something went wrong');
    });

    const caption = 'A custom caption';
    const { queryByTestId, getByText } = setup(
      <MealNutrients caption={caption} />,
    );

    getByText(caption);

    await waitFor(() => {
      expect(queryByTestId('chart-mock')).not.toBeInTheDocument();
    });
  });
});
