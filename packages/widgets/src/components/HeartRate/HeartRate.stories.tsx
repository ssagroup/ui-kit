import type { Meta } from '@storybook/react-webpack5';

import { HeartRate } from './index';
import { heartRateData as data } from './mockHeartRateRequest';

export default {
  title: 'Fitness/HeartRate',
  component: HeartRate,
  argTypes: {
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
  args: {
    data,
  },
} as Meta<typeof HeartRate>;

export const Default = {};
