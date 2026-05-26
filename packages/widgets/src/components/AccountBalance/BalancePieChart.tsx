import { useState } from 'react';
import { withTheme, css } from '@emotion/react';
import {
  PieChart,
  PieChartFeatures,
  PieChartLegend,
  pieChartPalettes,
  mainTheme,
} from '@ssa-ui-kit/core';
import { BalancePieChartTitle } from './BalancePieChartTitle';

import { BalancePieChartProps } from './types';
import { useAccountBalanceContext } from './AccountBalanceContext';

export const BalancePieChart = withTheme(
  ({
    data,
    theme,
    chartColorPalette,
    legendColorPalette,
    pieChartProps = {},
    activeHighlight = false,
    onFullscreenModeChange,
  }: BalancePieChartProps) => {
    const {
      variant = 'valueList',
      fullscreenModeFeature,
      currency,
    } = useAccountBalanceContext();
    const [isFullscreenMode, setFullscreenMode] = useState(false);
    const { legendColorNames, pieChartColors } =
      pieChartPalettes.getBalancePalette(theme);
    const featuresList = new Set<PieChartFeatures>();

    const filteredIndexes: number[] = [];
    const chartData = data?.filter((item, index) => {
      const isSaved = item.value !== 0;
      if (!isSaved) {
        filteredIndexes.push(index);
      }
      return isSaved;
    });
    const isAllValuesZero = data.length > 0 && chartData.length === 0;
    const chartColors = (chartColorPalette || pieChartColors).filter(
      (item, index) => !filteredIndexes.includes(index),
    );
    const chartDataWithZeroFallback = isAllValuesZero
      ? [{ id: '__zero__', value: 1, label: '__zero__' }]
      : chartData;
    const chartColorsWithZeroFallback = isAllValuesZero
      ? [theme.palette.secondary.dark as string]
      : chartColors;

    if (chartColorsWithZeroFallback.length < chartDataWithZeroFallback.length) {
      for (
        let i = 0;
        i <
        chartDataWithZeroFallback.length - chartColorsWithZeroFallback.length;
        i++
      ) {
        chartColorsWithZeroFallback.push(
          mainTheme.colors.purpleLighter as string,
        );
      }
    }

    if (Object.keys(pieChartProps.cardProps || {}).length) {
      featuresList.add('header');
    }
    if (fullscreenModeFeature) {
      featuresList.add('header');
      featuresList.add('fullscreenMode');
    }

    const handleFullscreenModeChange = (pieChartFullscreenMode: boolean) => {
      setFullscreenMode(pieChartFullscreenMode);
      onFullscreenModeChange?.(pieChartFullscreenMode);
    };
    return (
      <PieChart
        data={chartDataWithZeroFallback}
        features={Array.from(featuresList)}
        colors={chartColorsWithZeroFallback}
        onFullscreenModeChange={handleFullscreenModeChange}
        animate={false}
        title={<BalancePieChartTitle />}
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
          activeHighlight={activeHighlight}
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
