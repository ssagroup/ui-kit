import { type StoryObj, type Meta } from '@storybook/react';

import { TreeMapChart } from '@components/Charts/TreeMapChart';

const meta: Meta<typeof TreeMapChart> = {
  title: 'Charts/TreeMap',
  component: TreeMapChart,
  args: {
    features: ['header'],
    data: {
      name: 'root',
      children: [
        {
          name: 'node1',
          value: 10,
        },
        {
          name: 'node2',
          value: 20,
        },
        {
          name: 'node3',
          value: 30,
        },
        {
          name: 'node4',
          value: 40,
        },
        {
          name: 'node5',
          value: 50,
        },
        {
          name: 'node6',
          children: [
            {
              name: 'node6-1',
              value: 10,
            },
            {
              name: 'node6-2',
              value: 20,
            },
          ],
        },
      ],
    },
    title: 'TreeMap Chart',
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutWidgetCard: Story = {
  args: { features: [] },
};

export const CustomColors: Story = {
  args: { colors: ['red', 'green', 'orange'] },
};

export const FullScreen: Story = {
  args: {
    features: ['header', 'fullscreenMode'],
  },
};
