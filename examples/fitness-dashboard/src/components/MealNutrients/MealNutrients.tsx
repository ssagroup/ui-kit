import { useState, useEffect, useRef } from 'react';
import { LineSvgProps } from '@nivo/line';

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Dropdown,
  DropdownOption,
  IDropdownOption,
} from '@ssa-ui-kit/core';

import { useApi } from '@ssa-ui-kit/hooks';

import API from '@apis/index';

import { MealNutrientsLineChart } from './MealNutrientsLineChart';
import useChartConfig from './useChartConfig';
import { IMealNutrientsProps, UseChartConfig } from './types';

type OptionType = IDropdownOption & {
  [key: string | number | symbol]: unknown;
};

/**
 *
 * UI Component that shows the nutrients consumed by the user
 */
export const MealNutrients = ({
  caption = 'Meal Nutrients',
}: IMealNutrientsProps) => {
  const { data: options, query: loadOptions } = useApi<OptionType[]>(
    API.mealNutrients.getOptions,
    [],
  );
  const { data, query: loadNutrients } = useApi<LineSvgProps['data']>(
    API.mealNutrients.get,
    [],
  );
  const [selectedOption, setSelectedOption] = useState<OptionType>();
  const containerRef = useRef<HTMLDivElement>(null);

  const chartConfig = useChartConfig(
    containerRef,
    data,
    selectedOption?.precision as Parameters<UseChartConfig>[2],
  );

  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    if (options?.length > 0 && selectedOption == null) {
      handleChange(options[0]);
    }
  }, [options]);

  useEffect(() => {
    if (selectedOption != null) {
      loadNutrients(selectedOption?.value);
    }
  }, [selectedOption]);

  const handleChange = (e: IDropdownOption) => {
    const item = options.filter((item) => item.value === e.value)[0];

    setSelectedOption(item as OptionType);
  };

  return (
    <div ref={containerRef}>
      <CardHeader transparent>
        <Typography variant="h4" weight="bold" css={{ lineHeight: 'normal' }}>
          {caption}
        </Typography>

        {options?.length > 0 && (
          <Dropdown selectedItem={options[0]} onChange={handleChange}>
            {options.map((item) => (
              <DropdownOption
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
          </Dropdown>
        )}
      </CardHeader>
      <Card>
        <CardContent direction="column" css={{ width: '100%' }}>
          <div
            css={{
              height: '227px',
              svg: {
                overflow: 'visible',
              },
            }}>
            {data?.length > 0 && (
              <MealNutrientsLineChart data={data} {...chartConfig} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
