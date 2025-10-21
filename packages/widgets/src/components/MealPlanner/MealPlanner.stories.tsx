import type { Meta } from '@storybook/react-webpack5';

import MealPlanner from './index';
import { mealPlannerData as data } from './mockMealPlannerRequest';

export default {
  title: 'Fitness/MealPlanner',
  component: MealPlanner,
  args: {
    data,
  },
} as Meta<typeof MealPlanner>;

export const Default = {};
