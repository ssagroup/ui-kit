import type { Meta } from '@storybook/react-webpack5';

import { mealActivityData as data } from './mockActivityRequest';

import { Activity } from './Activity';

export default {
  title: 'Fitness/Activity',
  component: Activity,
  args: {
    data,
  },
} as Meta<typeof Activity>;

export const Default = {};
