import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Wrapper,
  DropdownOptionProps,
} from '@ssa-ui-kit/core';

import { ActivityResp } from './types';
import { contentWrapper } from './styles';

import ActivityItem from './ActivityItem';
import { DropdownOption } from '@ssa-ui-kit/core';
import { Dropdown } from '@ssa-ui-kit/core';

export const Activity = ({ data }: { data: ActivityResp }) => {
  const [selected, setSelected] = useState<string>('');
  const [options, setOptions] = useState<DropdownOptionProps[]>([]);

  useEffect(() => {
    if (data == null || typeof data !== 'object') {
      return;
    }

    setOptions(
      Object.keys(data).map((item, index) => ({
        id: index,
        value: `${item.charAt(0).toUpperCase()}${item.slice(1)}`,
      })),
    );
  }, [data]);

  useEffect(() => {
    if (options?.length > 0 && !selected) {
      handleChange(options[0]);
    }
  }, [options]);

  const handleChange = (e: DropdownOptionProps) => {
    const value = e.value.toString().toLowerCase();

    setSelected(value);
  };

  return (
    <Card
      css={css`
        border-radius: 20px;
        padding-inline: 24px;
        padding-block: 24px;
      `}>
      <CardHeader>
        <Typography variant="h3" weight="bold">
          Activity
        </Typography>

        {options?.length > 0 && (
          <Dropdown selectedItem={options[0]} onChange={handleChange}>
            {options.map((item, index) => (
              <DropdownOption key={index} value={item.value} />
            ))}
          </Dropdown>
        )}
      </CardHeader>
      <CardContent
        css={css`
          width: 100%;
          flex-direction: column;
        `}>
        <Wrapper css={contentWrapper}>
          {Array.isArray(data[selected]) &&
            data[selected].map((item, index) => (
              <ActivityItem key={index} {...item} />
            ))}
        </Wrapper>
      </CardContent>
    </Card>
  );
};
