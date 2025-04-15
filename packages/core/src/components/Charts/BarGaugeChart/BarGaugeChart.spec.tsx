import { BarGaugeChart } from './';

describe('BarGaugeChart', () => {
  it('Should render with title', () => {
    const { getByText } = render(
      <BarGaugeChart bars={[]} title="Chart Title" features={['header']} />,
    );

    expect(getByText('Chart Title')).toBeInTheDocument();
  });

  it('Should render without title', () => {
    const { queryByText } = render(<BarGaugeChart bars={[]} />);

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render without title if header feature is not included', () => {
    const { queryByText } = render(
      <BarGaugeChart bars={[]} title="Chart Title" features={[]} />,
    );

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render with fullscreen button', () => {
    const { getByRole } = render(
      <BarGaugeChart bars={[]} features={['header', 'fullscreenMode']} />,
    );

    expect(getByRole('button', { name: 'Maximize' })).toBeInTheDocument();
  });

  it('Should render gauge bars', () => {
    const { getByText } = render(
      <BarGaugeChart
        bars={[
          { title: 'Bar1', value: 50 },
          { title: 'Bar2', value: 30 },
        ]}
      />,
    );

    expect(getByText('Bar1')).toBeInTheDocument();
    expect(getByText(50)).toBeInTheDocument();
    expect(getByText('Bar2')).toBeInTheDocument();
    expect(getByText(30)).toBeInTheDocument();
  });
});
