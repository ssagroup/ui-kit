import type { Meta } from '@storybook/react';

import { Calories } from './Calories';

export default {
  title: 'Industry-specific widgets/Fitness/Calories',
  component: Calories,
  argTypes: {
    max: {
      control: {
        type: 'number',
      },
    },
    currentValue: {
      control: {
        type: 'number',
      },
    },
  },
  args: {
    max: 100,
    currentValue: 70,
  },
} as Meta<typeof Calories>;

export const Default = {};
