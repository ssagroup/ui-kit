import { withTheme, css } from '@emotion/react';

import {
  PieChart,
  PieChartLegend,
  pieChartPalettes,
  PieChartProps,
} from '@ssa-ui-kit/core';
import { BalancePieChartTitle } from './BalancePieChartTitle';

import { BalancePieChartProps } from './types';
import { useState } from 'react';

export const BalancePieChart = withTheme(
  ({
    total,
    currency,
    data,
    theme,
    chartColorPalette,
    legendColorPalette,
    variant = 'valueList',
    pieChartProps = {},
    fullscreenModeFeature = false,
  }: BalancePieChartProps) => {
    const [isFullscreenMode, setFullscreenMode] = useState(false);
    const { legendColorNames, pieChartColors } =
      pieChartPalettes.getBalancePalette(theme);
    const featuresList: PieChartProps['features'] = ['header'];
    if (fullscreenModeFeature) {
      featuresList.push('fullscreenMode');
    }

    const handleFullscreenModeChange = (pieChartFullscreenMode: boolean) => {
      setFullscreenMode(pieChartFullscreenMode);
    };
    return (
      <PieChart
        data={data}
        features={featuresList}
        colors={chartColorPalette || pieChartColors}
        onFullscreenModeChange={handleFullscreenModeChange}
        animate={false}
        title={
          <BalancePieChartTitle
            theme={theme}
            total={total}
            currency={currency}
          />
        }
        css={
          !isFullscreenMode &&
          css`
            div:nth-of-type(1) {
              width: 100px;
              height: 100px;
            }

            ${theme.mediaQueries.lg} {
              div:nth-of-type(1) {
                width: 120px;
                height: 120px;
              }
            }
          `
        }
        width={'100%'}
        {...pieChartProps}>
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
            gap: 0;
            li {
              height: 22.5px;
            }
            h6 {
              font-weight: 700;
              line-height: 22.5px;
              font-size: ${!isFullscreenMode && '12px'};
              ${theme.mediaQueries.md} {
                font-size: ${!isFullscreenMode && '13px'};
              }
              ${theme.mediaQueries.lg} {
                font-size: ${!isFullscreenMode && '14px'};
              }
            }

            ${theme.mediaQueries.lg} {
              margin-left: ${isFullscreenMode ? 'unset' : '-20%'};
            }
          `}
          valueListStyles={css`
            gap: 0;
            li {
              height: 22.5px;
            }
            h6 {
              line-height: 22.5px;
              color: ${theme.colors.greyDarker80};
              font-size: ${isFullscreenMode ? '12px' : '11px'};
              ${theme.mediaQueries.lg} {
                font-size: 12px;
              }
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
