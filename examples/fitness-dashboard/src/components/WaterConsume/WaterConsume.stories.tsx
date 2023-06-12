import type { Meta } from '@storybook/react';

import { WaterConsume } from './WaterConsume';

export default {
  title: 'Widgets/WaterConsume',
  component: WaterConsume,
} as Meta<typeof WaterConsume>;

export const Default = {
  args: {
    max: 3,
    currentValue: 50,
    steps: [
      {
        title: '1500ml',
        caption: '11am - 2pm',
        done: false,
      },
      {
        title: '500ml',
        caption: '11am - 2pm',
        done: false,
      },
      {
        title: '1000ml',
        caption: '9am - 11am',
        done: true,
      },
      {
        title: '700ml',
        caption: '6am - 0am',
        done: true,
      },
    ],
  },
};
