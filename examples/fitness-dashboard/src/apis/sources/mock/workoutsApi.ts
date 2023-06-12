import { workoutsData } from './utils/mockWorkoutsRequest';

export const workouts = {
  get() {
    return Promise.resolve(workoutsData);
  },
};
