import { useState, useEffect } from 'react';
import { css } from '@emotion/react';

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  LargeDropdown,
  IDropdownLargeItemProp,
} from '@ssa-ui-kit/core';

import { MealPlannerCard } from './MealPlannerCard';

import { MealPlannerProps, MealPlannerData } from './types';

export const MealPlanner = ({ data }: MealPlannerProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [options, setOptions] = useState<IDropdownLargeItemProp[]>([]);

  const handleChange = (e: IDropdownLargeItemProp) =>
    setSelectedOption(e.val.toLowerCase());

  useEffect(() => {
    if (data == null || typeof data !== 'object') {
      return;
    }

    setOptions(
      Object.keys(data).map((item, index) => ({
        id: index,
        val: `${item.charAt(0).toUpperCase()}${item.slice(1)}`,
        extraVal: data[item].time,
      })),
    );
  }, [data]);

  useEffect(() => {
    if (options?.length > 0 && selectedOption == null) {
      handleChange(options[0]);
    }
  }, [options]);

  return (
    <div>
      <CardHeader transparent>
        <Typography variant="h4" weight="bold" css={{ lineHeight: 'normal' }}>
          Meal Planner
        </Typography>

        {options?.length > 0 && (
          <LargeDropdown
            onChange={handleChange}
            selectedItem={options[0]}
            items={options}
          />
        )}
      </CardHeader>
      <Card>
        <CardContent
          css={css`
            flex-direction: column;
            width: 100%;
          `}>
          {selectedOption &&
            data[selectedOption].data.map(
              ({ id, ...props }: MealPlannerData) => (
                <MealPlannerCard key={id} {...props} />
              ),
            )}
        </CardContent>
      </Card>
    </div>
  );
};
