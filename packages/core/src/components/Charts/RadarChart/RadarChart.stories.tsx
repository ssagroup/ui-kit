import { type StoryObj, type Meta } from '@storybook/react-webpack5';

import { RadarChart } from './';

const meta: Meta<typeof RadarChart> = {
  title: 'Charts/RadarChart',
  component: RadarChart,
  args: {
    title: 'Radar Chart',
    features: ['header'],
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
    colors: ['rgba(91, 141, 236, 1)', 'rgba(44, 187, 151, 1)'],
    keys: ['chardonnay', 'merlot'],
    indexBy: 'taste',
    legends: [{ itemWidth: 100 }],
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
        }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: { colors: ['red', 'green', 'orange'] },
};

export const FullScreen: Story = {
  args: {
    features: ['header', 'fullscreenMode'],
  },
};

export const Large: Story = {
  args: {
    data: [
      { taste: 'General React', chardonnay: 70, merlot: 58 },
      { taste: 'Redux', chardonnay: 59, merlot: 111 },
      { taste: 'Routing', chardonnay: 120, merlot: 83 },
      { taste: 'Performance', chardonnay: 80, merlot: 65 },
      { taste: 'Components Design', chardonnay: 90, merlot: 72 },
      { taste: 'Documenting', chardonnay: 110, merlot: 95 },
      { taste: 'Context API', chardonnay: 85, merlot: 77 },
      { taste: 'Errors Processing', chardonnay: 60, merlot: 50 },
    ],
    margin: { top: 20, bottom: 50 },
  },
};
