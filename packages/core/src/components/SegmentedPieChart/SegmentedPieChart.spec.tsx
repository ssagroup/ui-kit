import { SegmentedPieChart } from './index';
import { balanceData, balanceTotalAmount } from './stories/fixtures';

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

describe('SegmentedPieChart', () => {
  it('Renders with a Legend', () => {
    const { getByTestId, getByRole, getByText } = render(
      <SegmentedPieChart
        data={balanceData}
        totalAmount={balanceTotalAmount}
        totalDimension="USD"
      />,
    );

    getByTestId('responsive-pie');
    getByText(balanceTotalAmount);

    for (const { label, value, percentage } of balanceData) {
      getByRole('heading', { name: label });
      if (label === 'Other') {
        getByRole('heading', { name: `${value} USD (${percentage}%)` });
      } else {
        getByRole('heading', { name: `${value} ${label} (${percentage}%)` });
      }
    }
  });
});
