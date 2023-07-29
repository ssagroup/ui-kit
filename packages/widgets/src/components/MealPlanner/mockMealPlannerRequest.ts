import { MealPlannerItem } from './types';
type MealPlannerResp = { [key: string]: MealPlannerItem };

export const mealPlannerData: MealPlannerResp = {
  breakfast: {
    time: '8:00 AM',
    data: [
      {
        id: 1,
        name: 'Avocado salad',
        image:
          'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Favocado%2Favocado_64.png?alt=media&token=daa461dd-085c-4542-a5d4-c83a0a8efb4c',
        calories: 300,
        carbs: 10,
        protein: 50,
        fat: 40,
      },
      {
        id: 2,
        name: 'Almond milk',
        image:
          'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fmilk%2Fmilk_64.png?alt=media&token=88ab4b5d-1c1f-43e5-849f-1dbf71c5dc8b',
        calories: 300,
        carbs: 40,
        protein: 20,
        fat: 40,
      },
      {
        id: 3,
        name: 'Blueberry',
        image:
          'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fblueberry%2Fblueberry_64.png?alt=media&token=ab7c1d58-9743-478e-bcf8-aa7726ccbe78',
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fsteak%2Fsteak_64.png?alt=media&token=44f02ad7-9a56-4839-aa00-e50ff44a14aa',
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fsoup%2Fsoup_64.png?alt=media&token=fb2a8b51-a735-4669-8cdc-c2d52b23b114',
        calories: 300,
        carbs: 30,
        protein: 30,
        fat: 40,
      },
    ],
  },
};
