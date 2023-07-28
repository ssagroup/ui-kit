import { useState, useEffect } from 'react';
import { IMealNutrientsProps, MealNutrients } from '@ssa-ui-kit/widgets';
import { useApi } from '@ssa-ui-kit/hooks';

import API from '@apis/index';

const MealNutrientsWithData = () => {
  const [options, setOptions] = useState<IMealNutrientsProps['options']>([]);
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
