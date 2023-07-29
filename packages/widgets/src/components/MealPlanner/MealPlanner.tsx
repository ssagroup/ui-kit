import { useState, useEffect } from 'react';
import { css } from '@emotion/react';

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Dropdown,
  DropdownOption,
  IDropdownOption,
} from '@ssa-ui-kit/core';

import { MealPlannerCard } from './MealPlannerCard';

import { MealPlannerProps, MealPlannerData } from './types';
import styled from '@emotion/styled';

const CustomOption = styled(DropdownOption)`
  text-align: left;
  line-height: 18px;
  font-size: 11px;
`;

export const MealPlanner = ({ data }: MealPlannerProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [options, setOptions] = useState<IDropdownOption[]>([]);

  const handleChange = (e: IDropdownOption) => {
    const value = e.value.toString().toLowerCase();

    setSelectedOption(value);
  };

  useEffect(() => {
    if (data == null || typeof data !== 'object') {
      return;
    }

    setOptions(
      Object.keys(data).map((item, index) => ({
        id: index,
        value: `${item.charAt(0).toUpperCase()}${item.slice(1)}`,
        label: `${item.charAt(0).toUpperCase()}${item.slice(1)} | ${
          data[item].time
        }`,
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
          <Dropdown selectedItem={options[0]} onChange={handleChange}>
            {options.map((item, index) => (
              <CustomOption
                key={index}
                value={item.value}
                label={item.label.toString()}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  {item.value}
                </span>
                &nbsp;|&nbsp;
                <span style={{ fontSize: 11, fontWeight: 500 }}>
                  {item.extraVal}
                </span>
              </CustomOption>
            ))}
          </Dropdown>
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
