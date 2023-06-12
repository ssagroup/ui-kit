import { Goal } from '@components/ListGoals/types';

export const goalsData: Array<Goal> = [
  {
    id: 'lifting_weights',
    image: '/img/dumbbell/dumbbell_42.png',
    title: 'Lifting weights',
    details: 'Goal 25 kg | 20 kg',
    completion: 79,
    color: 'yellow' as keyof MainColors,
  },
  {
    id: 'running',
    image: '/img/treadmill/treadmill_42.png',
    title: 'Running',
    details: 'Goal 25 km | 19,7 km',
    completion: 79,
    color: 'pink' as keyof MainColors,
  },
  {
    id: 'sleeping',
    image: '/img/moon/moon_42.png',
    title: 'Sleeping',
    details: 'Goal 8 hrs | 6 hrs',
    completion: 60,
    color: 'blue' as keyof MainColors,
  },
  {
    id: 'weight_loss',
    image: '/img/scales/scales_42.png',
    title: 'Weight Loss',
    details: 'Goal 10 kg | 4 kg',
    completion: 40,
    color: 'purple' as keyof MainColors,
  },
];
