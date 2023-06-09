import type { Meta } from '@storybook/react';

import { HeartRate } from './index';
import { heartRateData as data } from '../../apis/sources/mock/utils/mockHeartRateRequest';

export default {
  title: 'Widgets/HeartRate',
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
