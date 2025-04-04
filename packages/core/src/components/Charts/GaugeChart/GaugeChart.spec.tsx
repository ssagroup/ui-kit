import { GaugeChart } from './';

describe('GaugeChart', () => {
  it('Should render with title', () => {
    const { getByText } = render(
      <GaugeChart
        minValue={0}
        maxValue={100}
        value={50}
        title="Chart Title"
        features={['header']}
      />,
    );

    expect(getByText('Chart Title')).toBeInTheDocument();
  });

  it('Should render without title', () => {
    const { queryByText } = render(
      <GaugeChart minValue={0} maxValue={100} value={50} />,
    );

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render without title if header feature is not included', () => {
    const { queryByText } = render(
      <GaugeChart
        minValue={0}
        maxValue={100}
        value={50}
        title="Chart Title"
        features={[]}
      />,
    );

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render with fullscreen button', () => {
    const { getByRole } = render(
      <GaugeChart
        minValue={0}
        maxValue={100}
        value={50}
        features={['header', 'fullscreenMode']}
      />,
    );

    expect(getByRole('button', { name: 'Maximize' })).toBeInTheDocument();
  });
});
