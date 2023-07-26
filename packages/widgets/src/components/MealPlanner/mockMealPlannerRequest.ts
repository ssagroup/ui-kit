import { MealPlannerItem } from './types';
type MealPlannerResp = { [key: string]: MealPlannerItem };

export const mealPlannerData: MealPlannerResp = {
  breakfast: {
    time: '8:00 AM',
    data: [
      {
        id: 1,
        name: 'Avocado salad',
        image: '/img/avocado/avocado_64.png',
        calories: 300,
        carbs: 10,
        protein: 50,
        fat: 40,
      },
      {
        id: 2,
        name: 'Almond milk',
        image: '/img/milk/milk_64.png',
        calories: 300,
        carbs: 40,
        protein: 20,
        fat: 40,
      },
      {
        id: 3,
        name: 'Blueberry',
        image: '/img/blueberry/blueberry_64.png',
        calories: 300,
        carbs: 40,
        protein: 30,
        fat: 30,
      },
    ],
  },
  lunch: {
    time: '1:00 PM',
    data: [
      {
        id: 4,
        name: 'Beef steak',
        image: '/img/steak/steak_64.png',
        calories: 300,
        carbs: 10,
        protein: 50,
        fat: 40,
      },
    ],
  },
  dinner: {
    time: '7:00 PM',
    data: [
      {
        id: 5,
        name: 'Soup',
        image: '/img/soup/soup_64.png',
        calories: 300,
        carbs: 30,
        protein: 30,
        fat: 40,
      },
    ],
  },
};
