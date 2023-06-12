import { mealActivityData } from './utils/mockActivityRequest';

export const activity = {
  getActivities() {
    return Promise.resolve(mealActivityData);
  },
  getOptions() {
    return Promise.resolve(Object.keys(mealActivityData));
  },
};
