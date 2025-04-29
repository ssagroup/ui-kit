import { RadarChart } from './';

const mockData = {
  data: [
    {
      taste: 'fruity',
      chardonnay: 70,
      merlot: 58,
      color: '#FF0000',
    },
    {
      taste: 'bitter',
      chardonnay: 59,
      merlot: 111,
      color: '#FF0000',
    },
    {
      taste: 'heavy',
      chardonnay: 120,
      merlot: 83,
      color: '#FF0000',
    },
  ],
  keys: ['chardonnay', 'merlot'],
  indexBy: 'taste',
};

describe('RadarChart', () => {
  it('Should render with title', () => {
    const { getByText } = render(
      <RadarChart {...mockData} title="Chart Title" features={['header']} />,
    );

    expect(getByText('Chart Title')).toBeInTheDocument();
  });

  it('Should render without title', () => {
    const { queryByText } = render(<RadarChart {...mockData} />);

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render without title if header feature is not included', () => {
    const { queryByText } = render(
      <RadarChart {...mockData} title="Chart Title" features={[]} />,
    );

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render with fullscreen button', () => {
    const { getByRole } = render(
      <RadarChart {...mockData} features={['header', 'fullscreenMode']} />,
    );

    expect(getByRole('button', { name: 'Maximize' })).toBeInTheDocument();
  });
});
