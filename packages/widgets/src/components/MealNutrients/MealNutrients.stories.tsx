import { useState, useEffect } from 'react';
import type { Meta } from '@storybook/react';

import { MealNutrients } from './index';
import { IMealNutrientsProps } from './types';

import mockApi from '@apis/sources/mock/utils/mockMealNutrientsRequest';
const { getData, getOptions } = mockApi;

export default {
  title: 'Widgets/MealNutrients',
  component: MealNutrients,
} as Meta<typeof MealNutrients>;

export const Default = () => {
  const [options, setOptions] = useState<IMealNutrientsProps['options']>([]);
  const [data, setData] = useState<IMealNutrientsProps['data']>([]);

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
        getData(String(value)).then(setData);
      }}
    />
  );
};