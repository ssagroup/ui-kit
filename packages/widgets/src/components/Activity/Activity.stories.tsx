import type { Meta } from '@storybook/react-webpack5';

import { Activity } from './Activity';
import { mealActivityData as data } from './mockActivityRequest';

export default {
  title: 'Fitness/Activity',
  component: Activity,
  args: {
    data,
  },
} as Meta<typeof Activity>;

export const Default = {};
