import { useEffect, useState } from 'react';

import type { Meta } from '@storybook/react-webpack5';

import { MealNutrients } from './index';
import { mockStaticApi } from './mockMealNutrientsRequest';
import { MealNutrientsProps } from './types';
const { getData, getOptions } = mockStaticApi;

export default {
  title: 'Fitness/MealNutrients',
  component: MealNutrients,
} as Meta<typeof MealNutrients>;

export const Default = () => {
  const [options, setOptions] = useState<MealNutrientsProps['options']>([]);
  const [data, setData] = useState<MealNutrientsProps['data']>([]);

  useEffect(() => {
    getOptions()
      .then((respOptions) => {
        setOptions(respOptions);
        return getData(respOptions[0].value);
      })
      .then(setData);
  }, []);

  return (
    <MealNutrients
      data={data}
      options={options}
      onOptionChange={({ value }) => {
        getData(String(value) as 'd' | 'w' | 'm').then(setData);
      }}
    />
  );
};
