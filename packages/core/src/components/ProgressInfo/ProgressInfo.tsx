import { useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import {
  Card,
  CardHeader,
  Typography,
  DropdownOptionProps,
  Dropdown,
  DropdownOption,
} from '@components';

import { PieChart, PieChartLegend } from '@components/PieChart';
import { ProgressInfoTotals } from './ProgressInfoTotals';

import {
  ProgressInfoItemProps,
  Period,
  ProgressInfoProps,
  PeriodOption,
} from './types';

import { getPieChartStyles } from './styles';

export const ProgressInfo = ({ data, className }: ProgressInfoProps) => {
  const [options, setOptions] = useState<PeriodOption[]>([]);
  const [selected, setSelected] = useState<PeriodOption>();
  const [response, setResponse] = useState<ProgressInfoItemProps[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const options: PeriodOption[] = [];

      Object.keys(data).forEach((key) => {
        Object.keys(data[key]).length > 0
          ? options.push({ value: key, id: key })
          : null;
      });

      setOptions(options);
      setSelected(options[0]);

      filterData(options[0].id as Period);
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
