import type { Meta } from '@storybook/react-webpack5';

import { mealPlannerData as data } from './mockMealPlannerRequest';

import MealPlanner from './index';

export default {
  title: 'Fitness/MealPlanner',
  component: MealPlanner,
  args: {
    data,
  },
} as Meta<typeof MealPlanner>;

export const Default = {};
