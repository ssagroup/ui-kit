import { useState, useEffect, useRef } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Dropdown,
  DropdownOption,
} from '@ssa-ui-kit/core';

import { MealNutrientsLineChart } from './MealNutrientsLineChart';
import useChartConfig from './useChartConfig';
import { MealNutrientsProps, UseChartConfig, OptionType } from './types';

/**
 *
 * UI Component that shows the nutrients consumed by the user
 */
export const MealNutrients = ({
  caption = 'Meal Nutrients',
  options,
  data,
  onOptionChange,
}: MealNutrientsProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionType>();
  const containerRef = useRef<HTMLDivElement>(null);

  const chartConfig = useChartConfig(
    containerRef,
    data,
    selectedOption?.precision as Parameters<UseChartConfig>[2],
  );

  useEffect(() => {
    if (options?.length > 0 && selectedOption == null) {
      handleChange(options[0]);
    }
  }, [options]);

  const handleChange = (e: OptionType) => {
    const item = options.filter((item) => item.value === e.value)[0];

    setSelectedOption(item);
    onOptionChange && onOptionChange(item);
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
