import mockDataLoad from './utils/mockMealNutrientsRequest';

export const mealNutrients = {
  async get(id: string) {
    return await mockDataLoad.getData(id);
  },
  getOptions() {
    return mockDataLoad.getOptions();
  },
};
