import type { Meta } from '@storybook/react';

import { mealPlannerData as data } from '@apis/sources/mock/utils/mockMealPlannerRequest';

import MealPlanner from './index';

export default {
  title: 'Widgets/MealPlanner',
  component: MealPlanner,
  args: {
    data,
  },
} as Meta<typeof MealPlanner>;

export const Default = {};
