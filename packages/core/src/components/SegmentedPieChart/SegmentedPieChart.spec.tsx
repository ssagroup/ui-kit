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

    for (const { label } of balanceData) {
      getByRole('heading', { name: label });
      getByRole('heading', {
        name: `2818.83 U.S.D.T (16%)`,
      });
    }
  });
});
