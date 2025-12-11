import { BigNumberChart } from './';

const ResponsiveLineMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/line', () => ({
  ResponsiveLine: ResponsiveLineMock,
}));

describe('BigNumberChart', () => {
  it('Should render with title', () => {
    const { getByText } = render(
      <BigNumberChart data={[]} title="Chart Title" features={['header']} />,
    );

    expect(getByText('Chart Title')).toBeInTheDocument();
  });

  it('Should render without title', () => {
    const { queryByText } = render(<BigNumberChart data={[]} />);

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render without title if header feature is not included', () => {
    const { queryByText } = render(
      <BigNumberChart data={[]} title="Chart Title" features={[]} />,
    );

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render with fullscreen button', () => {
    const { getByRole } = render(
      <BigNumberChart data={[]} features={['header', 'fullscreenMode']} />,
    );

    expect(getByRole('button', { name: 'Maximize' })).toBeInTheDocument();
  });

  it('Should show last value', () => {
    const { getByText } = render(
      <BigNumberChart
        data={[
          { x: '1', y: 321 },
          { x: '2', y: 123 },
        ]}
      />,
    );

    expect(getByText('123')).toBeInTheDocument();
  });
});
