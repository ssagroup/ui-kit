export interface MealPlannerCardProps {
  name: string;
  image: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  /** Shows a border around the avatar. @default false */
  avatarBorder?: boolean;
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
  /** Shows a border around the avatar in each meal card. @default false */
  avatarBorder?: boolean;
}
