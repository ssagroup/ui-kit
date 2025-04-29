import { type StoryObj, type Meta } from '@storybook/react';

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
