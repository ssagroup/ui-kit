import { TreeMapChart, TreeNode } from './';

const mockData: TreeNode = {
  name: 'root',
  children: [
    { name: 'node1', value: 10 },
    { name: 'node2', value: 10 },
    { name: 'node3', value: 10 },
  ],
};

describe('TreeMapChart', () => {
  it('Should render with title', () => {
    const { getByText } = render(
      <TreeMapChart
        data={mockData}
        title="Chart Title"
        features={['header']}
      />,
    );

    expect(getByText('Chart Title')).toBeInTheDocument();
  });

  it('Should render without title', () => {
    const { queryByText } = render(<TreeMapChart data={mockData} />);

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render without title if header feature is not included', () => {
    const { queryByText } = render(
      <TreeMapChart data={mockData} title="Chart Title" features={[]} />,
    );

    expect(queryByText('Chart Title')).not.toBeInTheDocument();
  });

  it('Should render with fullscreen button', () => {
    const { getByRole } = render(
      <TreeMapChart data={mockData} features={['header', 'fullscreenMode']} />,
    );

    expect(getByRole('button', { name: 'Maximize' })).toBeInTheDocument();
  });
});
