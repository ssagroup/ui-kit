import { withTheme, css } from '@emotion/react';
import { Typography, MainColors } from '@ssa-ui-kit/core';

import { PieChart, PieChartLegend } from '@components/PieChart';
import { BalancePieChartProps } from './types';

const colorNames = [
  'yellow',
  'blue',
  'green',
  'yellowWarm',
  'blueLight',
  'turquoise',
] as unknown as Array<keyof MainColors>;

// TODO: add the ability to customize
export const BalancePieChart = withTheme(
  ({ total, currency, data, theme }: BalancePieChartProps) => {
    const pieChartColors = [
      theme.colors.yellow,
      theme.colors.blue,
      theme.colors.green,
      theme.colors.yellowLighter,
      theme.colors.blueLight,
      theme.colors.turquoise,
    ] as unknown as string[];
    return (
      <PieChart
        data={data}
        colors={pieChartColors}
        animate={false}
        title={
          <Typography
            variant="body2"
            weight="bold"
            color={theme.colors.greyDarker}
            css={css`
              font-size: 20px;
              line-height: 25px;
            `}>
            {total}
            <Typography
              variant="body2"
              weight="regular"
              as="div"
              color={theme.colors.greyDarker80}
              css={css`
                font-size: 14px;
              `}>
              {currency}
            </Typography>
          </Typography>
        }>
        <PieChartLegend
          data={data}
          colors={colorNames}
          markerStyles={css`
            width: 10px;
            height: 10px;
          `}
          labelListStyles={css`
            h6 {
              font-weight: 700;
            }
          `}
          valueListStyles={css`
            h6 {
              color: ${theme.colors.greyDarker80};
            }
          `}
          renderValue={({ id, legendValue }) =>
            id === 'Other'
              ? legendValue + ' ' + currency
              : legendValue + ' ' + id
          }
        />
      </PieChart>
    );
  },
);
