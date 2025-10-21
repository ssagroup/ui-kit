import { useEffect, useState } from 'react';

import API from '@fitness/apis/index';

import { useApi } from '@ssa-ui-kit/hooks';
import { MealNutrients, MealNutrientsProps } from '@ssa-ui-kit/widgets';

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
      data={mealNutrientsData}
      options={options}
      onOptionChange={({ value }) => loadMealNutrients(value)}
    />
  );
};

export default MealNutrientsWithData;
