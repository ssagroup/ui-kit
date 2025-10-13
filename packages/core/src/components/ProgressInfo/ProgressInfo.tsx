import { useEffect, useState } from 'react';

import { css, useTheme } from '@emotion/react';

import Card from '@components/Card';
import CardHeader from '@components/CardHeader';
import { PieChart, PieChartLegend } from '@components/Charts/PieChart';
import Dropdown from '@components/Dropdown';
import DropdownOption from '@components/DropdownOption';
import type { DropdownOptionProps } from '@components/DropdownOptions';
import Typography from '@components/Typography';

import { ProgressInfoTotals } from './ProgressInfoTotals';
import { getPieChartStyles } from './styles';
import {
  Period,
  PeriodOption,
  ProgressInfoItemProps,
  ProgressInfoProps,
} from './types';

export const ProgressInfo = ({ data, className }: ProgressInfoProps) => {
  const [options, setOptions] = useState<PeriodOption[]>([]);
  const [selected, setSelected] = useState<PeriodOption>();
  const [response, setResponse] = useState<ProgressInfoItemProps[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const options: PeriodOption[] = Object.keys(data)
        .filter((key) => Object.keys(data[key]).length > 0)
        .map((key) => ({ value: key, id: key }));

      setOptions(options);
      if (options.length > 0) {
        setSelected(options[0]);
        filterData(options[0].id as Period);
      }
    }
  }, [data]);

  const sumValues = (
    acc: ProgressInfoItemProps,
    cur: ProgressInfoItemProps,
  ) => {
    return {
      ...acc,
      value: acc.value + (cur?.value ? cur.value : 0),
    };
  };

  const filterData = (e: Period) => {
    const response: ProgressInfoItemProps[] = [];

    Object.keys(data[e]).forEach((key) => {
      const el = data[e][key].reduce(sumValues);

      response.push(el);
    });

    setResponse(response);
  };

  const handleChange = (e: DropdownOptionProps) => {
    filterData(e.value as Period);
  };

  return (
    <Card
      css={css`
        border-radius: 20px;
        padding-inline: 24px;
        padding-block: 24px;
      `}
      className={className}>
      <CardHeader>
        <Typography variant="h3" weight="bold">
          Progress
        </Typography>

        {Object.keys(options).length > 0 && (
          <Dropdown selectedItem={selected} onChange={handleChange}>
            {options.map((item, index) => (
              <DropdownOption key={index} value={item.value} />
            ))}
          </Dropdown>
        )}
      </CardHeader>
      {response.length > 0 ? (
        <PieChart
          data={response}
          css={getPieChartStyles(theme)}
          title={
            <ProgressInfoTotals
              theme={theme}
              total={response.reduce((sum, { value }) => sum + value, 0)}
            />
          }>
          <PieChartLegend
            data={response}
            colors={response.map(
              ({ colorTag }) =>
                colorTag || ('purple' as unknown as keyof MainColors),
            )}
            renderValue={({ value }) => value + ' hrs'}
          />
        </PieChart>
      ) : null}
    </Card>
  );
};
