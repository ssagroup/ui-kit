import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import { css } from '@emotion/css';

import {
  TreeMapChart,
  TreeMapTooltipBase,
} from '@components/Charts/TreeMapChart';

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
type Story = StoryObj<typeof TreeMapChart>;

export const Default: Story = {};

export const WithoutWidgetCard: Story = {
  args: { features: [] },
};

export const CustomColors: Story = {
  args: { colors: ['red', 'green', 'orange'] },
};

export const CustomColorsCallback: Story = {
  args: {
    colors: ({ treeDepth, data }) => {
      const colors = ['red', 'green', 'orange'];
      return data.color ?? colors[treeDepth % colors.length];
    },
  },
};

export const FullScreen: Story = {
  args: {
    features: ['header', 'fullscreenMode'],
  },
};

export const Square: Story = {
  args: {
    widgetCardProps: {
      contentClassName: css`
        width: unset !important;
        max-width: 100% !important;
        aspect-ratio: 1/1;
      `,
    },
  },
};

export const LabelSkipSize: Story = {
  args: {
    widgetCardProps: {
      contentClassName: css`
        width: unset !important;
        max-width: 100% !important;
        aspect-ratio: 1/1;
      `,
    },
    labelSkipSize: 30,
    features: ['header'],
    data: {
      name: 'root',
      children: [
        {
          name: 'node1',
          value: 50,
        },
        {
          name: 'node2',
          value: 100,
        },
        {
          name: 'node3',
          value: 3,
        },
        {
          name: 'node4',
          value: 2,
        },
        {
          name: 'node5',
          value: 1,
        },
      ],
    },
  },
};

export const CustomTooltip: Story = {
  parameters: {
    docs: {
      source: {
        code: `
          <TreeMapChart
            {...args}
            tooltip={(data) => (
              <TreeMapTooltipBase css={{ padding: '8px 16px', display: 'block' }}>
                <h3>{new Date().toLocaleString()}</h3>
                <p>{data.node.label}</p>
              </TreeMapTooltipBase>
            )}
          />
        `,
      },
    },
  },
  args: {
    tooltip: (data) => (
      <TreeMapTooltipBase css={{ padding: '8px 16px', display: 'block' }}>
        <h3>{new Date().toLocaleString()}</h3>
        <p>{data.node.label}</p>
      </TreeMapTooltipBase>
    ),
  },
};
