import { type StoryObj, type Meta } from '@storybook/react-webpack5';

import { FunnelChart } from './';
import { FunnelChartItem } from './types';

const stages: FunnelChartItem[] = [
  { label: 'Visitors', value: 12400 },
  { label: 'Sign-ups', value: 3100 },
  { label: 'Trials', value: 940 },
  { label: 'Qualified', value: 310 },
  { label: 'Proposals', value: 120 },
  { label: 'Customers', value: 42 },
];

const formatNumber = (value: number | string) =>
  typeof value === 'number' ? value.toLocaleString('en-US') : value;

const meta = {
  title: 'Charts/FunnelChart',
  component: FunnelChart,
  tags: ['autodocs'],
  args: {
    data: stages,
    type: 'funnel',
    withPointer: false,
    withTooltip: true,
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['funnel', 'triangle'] },
  },
  parameters: {
    container: { width: 360, height: 240 },
  },
  decorators: [
    (Story, { parameters }) => (
      <div style={parameters.container}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FunnelChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Funnel: Story = {};

export const Triangle: Story = {
  args: {
    type: 'triangle',
  },
};

export const WithPointer: Story = {
  args: {
    withPointer: true,
    renderPointerLabel: (item) => formatNumber(item.value),
  },
};

export const TriangleWithPointer: Story = {
  args: {
    type: 'triangle',
    withPointer: true,
    renderPointerLabel: (item) => formatNumber(item.value),
  },
};

/**
 * Every render prop receives the whole item and its level index, so any
 * field — or custom JSX — can be shown inside the level, beside it, and in
 * the tooltip.
 */
export const CustomContent: Story = {
  args: {
    type: 'triangle',
    withPointer: true,
    data: stages.slice(0, 4),
    renderLabel: (item) => item.label.charAt(0),
    renderPointerLabel: (item, index) => (
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        <strong>{item.label}</strong>
        <span style={{ fontSize: 12, opacity: 0.6 }}>
          {formatNumber(item.value)}
          {index > 0 &&
            ` · ${Math.round((Number(item.value) / Number(stages[index - 1].value)) * 100)}%`}
        </span>
      </span>
    ),
    renderTooltip: (item, index) => (
      <>
        Level {index + 1} — <strong>{item.label}</strong>:{' '}
        {formatNumber(item.value)}
      </>
    ),
  },
  parameters: {
    container: { width: 400, height: 280 },
  },
};

/** The chart scales to fit its container; drag the corner to resize. */
export const Responsive: Story = {
  args: {
    withPointer: true,
    renderPointerLabel: (item) => formatNumber(item.value),
  },
  parameters: {
    container: {
      width: 480,
      height: 320,
      resize: 'both',
      overflow: 'hidden',
      outline: '1px dashed #ccc',
    },
  },
};

export const HiddenLabels: Story = {
  args: {
    withLabels: false,
    withPointer: true,
    renderPointerLabel: (item) => formatNumber(item.value),
  },
};

export const ZeroValues: Story = {
  args: {
    withPointer: true,
    data: [
      { label: 'Applied', value: 18 },
      { label: 'Screened', value: 0 },
      { label: 'Interviewed', value: 0 },
      { label: 'Hired', value: 0 },
    ],
  },
};

export const LargeTooltip: Story = {
  args: {
    tooltipProps: { size: 'large', color: 'white' },
  },
};

export const CustomColors: Story = {
  args: {
    data: [
      { label: 'Open', value: 1, color: '#B5B5B5' },
      { label: 'In progress', value: 2, color: '#8C8C8C' },
      { label: 'Done', value: 3, color: '#2CBB97' },
    ],
  },
};
