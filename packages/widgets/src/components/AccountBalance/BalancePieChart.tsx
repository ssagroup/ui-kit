import { withTheme, css } from '@emotion/react';

import {
  PieChart,
  PieChartLegend,
  pieChartPalettes,
} from '@components/PieChart';
import { BalancePieChartTitle } from './BalancePieChartTitle';

import { BalancePieChartProps } from './types';

export const BalancePieChart = withTheme(
  ({
    total,
    currency,
    data,
    theme,
    chartColorPalette,
    legendColorPalette,
    variant = 'valueList',
  }: BalancePieChartProps) => {
    const { legendColorNames, pieChartColors } =
      pieChartPalettes.getBalancePalette(theme);
    return (
      <PieChart
        data={data}
        colors={chartColorPalette || pieChartColors}
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
          colors={legendColorPalette || legendColorNames}
          variant={variant}
          currency={currency}
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
