import type { Meta } from '@storybook/react';

import { WaterConsume } from './WaterConsume';

export default {
  title: 'Industry-specific widgets/Fitness/WaterConsume',
  component: WaterConsume,
} as Meta<typeof WaterConsume>;

export const Default = {
  args: {
    minValue: 0,
    maxValue: 3,
    currentValue: 2.7,
    unit: 'L',
    active: 3,
    steps: [
      {
        title: '600ml',
        caption: '2pm - 4pm',
      },
      {
        title: '500ml',
        caption: '11am - 2pm',
      },
      {
        title: '1000ml',
        caption: '9am - 11am',
      },
      {
        title: '700ml',
        caption: '6am - 8am',
      },
    ],
  },
};
