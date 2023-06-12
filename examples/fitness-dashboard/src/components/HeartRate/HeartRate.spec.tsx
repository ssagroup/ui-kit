import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { heartRateData as data } from '@apis/sources/mock/utils/mockHeartRateRequest';

import { HeartRate } from './index';

/**
 * The Line charts have trouble rendering in the test suite (some issues with
 * the ResizeObserver).
 * As a temporal solution, we follow Kent's advice not to test charts
 * with Jest:
 * https://kentcdodds.com/calls/01/76/nivo-charts-issue
 * */
const HeartRateLineChartMock = ({
  onMouseMove,
  colors,
}: {
  onMouseMove: (p: { data: { y: number } }) => void;
  colors?: string;
}) => (
  <div
    data-testid="chart-mock"
    css={{ color: colors }}
    onMouseMove={() => {
      onMouseMove({ data: { y: 170 } });
    }}></div>
);

jest.mock('./HeartRateLineChart', () => ({
  HeartRateLineChart: HeartRateLineChartMock,
}));

function setup(component) {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
}

describe('HeartRate', () => {
  it('Renders and reacts to mouse events', async () => {
    const { getByText, getByTestId } = setup(<HeartRate data={data} />);

    getByText('Heart Rate');
    getByText(data.data[0].y);
    getByText('BPM');
    const chartEl = getByTestId('chart-mock');

    await userEvent.hover(chartEl);

    await waitFor(() => {
      getByText(170);
    });
  });

  it('Renders with a custom color', () => {
    const chartColor = 'orange';
    const { getByTestId } = setup(<HeartRate data={data} color={chartColor} />);

    // Since we don't render the real <HeartRateLineChart /> component, we
    // just check here that we pass the "colors" prop into its mock.
    const chartEl = getByTestId('chart-mock');
    expect(chartEl).toHaveStyle(`color: ${chartColor}`);
  });

  it('Renders with a custom caption', () => {
    const caption = 'A custom caption';
    const { getByText, queryByText } = setup(
      <HeartRate data={data} caption={caption} />,
    );

    expect(queryByText('Heart Rate')).not.toBeInTheDocument();
    getByText(caption);
  });

  it('Handle empty data', () => {
    const caption = 'A custom caption';

    const { getByText, queryByText } = setup(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <HeartRate data={null} caption={caption} />,
    );

    expect(queryByText('Heart Rate')).not.toBeInTheDocument();
    expect(queryByText('BPM')).not.toBeInTheDocument();

    getByText(caption);
  });
});
