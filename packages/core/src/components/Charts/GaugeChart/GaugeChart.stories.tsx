import { type StoryObj, type Meta } from '@storybook/react-webpack5';

import { GaugeChart } from './';

const meta = {
  title: 'Charts/GaugeChart',
  component: GaugeChart,
  tags: ['autodocs'],
  args: {
    title: 'Gauge',
    minValue: 0,
    maxValue: 100,
    value: 85,
    withTrack: true,
    maxLabel: 'max',
    minLabel: 'min',
    totalLabel: 'Total',
    unitLabel: 'hrs',
    features: ['header'],
  },
  render: (args) => <GaugeChart ticks={[args.value]} {...args} />,
  decorators: [
    (Story) => (
      <div
        style={{
          height: '250px',
          width: '355px',
        }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Segmented: Story = {
  args: {
    withTrack: false,
    minValue: 0,
    maxValue: 100,
    ticks: [0, 20, 40, 60, 80, 100],
    segments: [
      { id: 'Low', value: 25, color: '#99E176' },
      { id: 'Medium', value: 50, color: '#F9F789' },
      { id: 'High', value: 75, color: '#FDC67D' },
      { id: 'Max', value: 100, color: '#FF7379' },
    ],
  },
};

export const NoLabels: Story = {
  args: {
    withLabels: false,
    withNeedle: false,
    ticks: [],
  },
};

export const FillScreen: Story = {
  args: {
    features: ['header', 'fullscreenMode'],
  },
};
