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
        skill: 'Hard Skills',
        Senior: 80,
        Middle: 58,
        color: '#FF0000',
      },
      {
        skill: 'Soft Skills',
        Senior: 79,
        Middle: 111,
        color: '#FF0000',
      },
      {
        skill: 'Foreign language',
        Senior: 130,
        Middle: 83,
        color: '#FF0000',
      },
    ],
    colors: ['rgba(91, 141, 236, 1)', 'rgba(44, 187, 151, 1)'],
    keys: ['Senior', 'Middle'],
    indexBy: 'skill',
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
      { skill: 'General React', Senior: 3.5, Middle: 2.8 },
      { skill: 'Redux', Senior: 3.6, Middle: 2.7 },
      { skill: 'Routing', Senior: 3.9, Middle: 2.4 },
      { skill: 'Performance', Senior: 3.2, Middle: 3.0 },
      { skill: 'Components Design', Senior: 3.75, Middle: 3.1 },
      { skill: 'Documenting', Senior: 3.2, Middle: 3.3 },
      { skill: 'Context API', Senior: 3.8, Middle: 2.6 },
      { skill: 'Errors Processing', Senior: 3.0, Middle: 3.1 },
    ],
    margin: { top: 20, bottom: 50 },
  },
};
