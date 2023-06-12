import { MealPlannerItem } from '@components/widgets/MealPlanner/types';

export type TopWidgetsResp = {
  calories: {
    current: number;
    max: number;
  };
  steps: {
    current: number;
    max: number;
    unit: string;
  };
  water: {
    current: number;
    max: number;
    unit?: string;
    steps: Array<{ caption: string; done: boolean; title: string }>;
  };
  heartRate: {
    id: string;
    data: Array<{ x: number; y: number }>;
  };
  [x: string | number | symbol]: unknown;
};

export type MealPlannerResp = { [key: string]: MealPlannerItem };

export type User = {
  id: string;
  name: string;
  email: string;
  weight: number;
  height: number;
  age: number;
};
