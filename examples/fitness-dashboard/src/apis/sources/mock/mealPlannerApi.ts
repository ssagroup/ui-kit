import { mealPlannerData } from './utils/mockMealPlannerRequest';

export const mealPlanner = {
  get() {
    return Promise.resolve(mealPlannerData);
  },
};
