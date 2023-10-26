import { withTheme, css } from '@emotion/react';
import { Typography, MainColors } from '@ssa-ui-kit/core';

import { PieChart, PieChartLegend } from '@components/PieChart';
import { useTextResize } from './useTextResize';

import { BalancePieChartProps, BalancePieChartTitleProps } from './types';

const colorNames = [
  'yellow',
  'blue',
  'green',
  'yellowWarm',
  'blueLight',
  'turquoise',
] as unknown as Array<keyof MainColors>;

const BalancePieChartTitle = withTheme(
  ({ total, currency, theme }: BalancePieChartTitleProps) => {
    const ref = useTextResize();
    return (
      <Typography
        ref={ref}
        variant="body2"
        weight="bold"
        color={theme.colors.greyDarker}
        css={css`
          font-size: 14px;
          padding: 0 13px;
          ${theme.mediaQueries.md} {
            font-size: 16px;
          }
          line-height: 1;
        `}>
        {total}
        <Typography
          variant="body2"
          weight="regular"
          as="span"
          color={theme.colors.greyDarker80}
          css={css`
            display: block;
            font-size: 12px;
            ${theme.mediaQueries.md} {
              font-size: 14px;
            }
            line-height: 25px;
          `}>
          {currency}
        </Typography>
      </Typography>
    );
  },
);

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
          <BalancePieChartTitle
            theme={theme}
            total={total}
            currency={currency}
          />
        }
        css={css`
          div:nth-of-type(1) {
            width: 100px;
            height: 100px;
          }

          ${theme.mediaQueries.md} {
            div:nth-of-type(1) {
              width: 120px;
              height: 120px;
            }
          }
        `}>
        <PieChartLegend
          data={data}
          colors={colorNames}
          markerStyles={css`
            width: 10px;
            height: 10px;
            margin-right: 5px;
          `}
          labelListStyles={css`
            gap: 5px;
            h6 {
              font-weight: 700;
              font-size: 14px;
            }

            ${theme.mediaQueries.lg} {
              margin-left: -20%;
            }
          `}
          valueListStyles={css`
            gap: 5px;
            h6 {
              color: ${theme.colors.greyDarker80};
              font-size: 12px;
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
