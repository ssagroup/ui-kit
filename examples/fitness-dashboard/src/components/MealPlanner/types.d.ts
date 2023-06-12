export interface MealPlannerCardProps {
  name: string;
  image: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export type MealPlannerData = MealPlannerCardProps & { id: number };

export interface MealPlannerItem {
  time: string;
  data: Array<MealPlannerData>;
}

export interface MealPlannerProps {
  data: {
    [mealName: string]: MealPlannerItem;
  };
}
