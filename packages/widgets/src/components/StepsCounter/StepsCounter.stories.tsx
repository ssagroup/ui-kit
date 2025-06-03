import type { Meta } from '@storybook/react-webpack5';

import { StepsCounter } from './StepsCounter';

export default {
  title: 'Fitness/StepsCounter',
  component: StepsCounter,
} as Meta<typeof StepsCounter>;

export const Default = {
  args: {
    max: 3000,
    currentValue: 2500,
    unit: 'L',
  },
};
