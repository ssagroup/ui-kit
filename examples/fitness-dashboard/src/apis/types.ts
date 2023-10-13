import { MealPlannerItem } from '@ssa-ui-kit/widgets';

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
