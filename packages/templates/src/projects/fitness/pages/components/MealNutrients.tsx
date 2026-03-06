import { useState, useEffect } from 'react';
import { LineSeries } from '@nivo/line';

import { MealNutrientsProps, MealNutrients } from '@ssa-ui-kit/widgets';
import { useApi } from '@ssa-ui-kit/hooks';

import API from '@fitness/apis/index';

const MealNutrientsWithData = () => {
  const [options, setOptions] = useState<MealNutrientsProps['options']>([]);
  const { data: mealNutrientsData, query: loadMealNutrients } = useApi(
    API.mealNutrients.get,
    [],
  );

  useEffect(() => {
    API.mealNutrients.getOptions().then((respOptions) => {
      setOptions(respOptions);
      loadMealNutrients(respOptions[0].value);
    });
  }, []);

  return (
    <MealNutrients
      data={mealNutrientsData as unknown as LineSeries[]}
      options={options}
      onOptionChange={({ value }) => loadMealNutrients(value)}
    />
  );
};

export default MealNutrientsWithData;
