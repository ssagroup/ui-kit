import type { Meta } from '@storybook/react';

import { mealActivityData as data } from './mockActivityRequest';

import { Activity } from './Activity';

export default {
  title: 'Widgets/Activity',
  component: Activity,
  args: {
    data,
  },
} as Meta<typeof Activity>;

export const Default = {};
