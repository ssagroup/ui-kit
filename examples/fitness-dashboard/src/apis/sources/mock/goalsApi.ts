import { goalsData } from './utils/mockGoalsRequest';

export const goals = {
  get() {
    return Promise.resolve(goalsData);
  },
};
