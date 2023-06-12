import type { Meta } from '@storybook/react';

import ProgressCircle from './index';

export default {
  title: 'Components/Progress/Circle',
  component: ProgressCircle,
  argTypes: {
    infoContent: {
      table: {
        type: {
          summary: 'string | element',
        },
      },
      type: { name: 'string' },
    },
    color: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [
        'pink',
        'yellow',
        'green',
        'turquoise',
        'purple',
        'blueLight',
        'blue',
      ],
      control: {
        type: 'select',
      },
    },
  },
} as Meta<typeof ProgressCircle>;

export const Default = {
  args: {
    max: 100,
    currentValue: 50,
    color: 'purple',
    infoContent: '50% done',
    size: 180,
  },
};
