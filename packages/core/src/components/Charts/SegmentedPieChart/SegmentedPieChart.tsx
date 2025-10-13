import { css, useTheme } from '@emotion/react';

import { PieChartComponent, PieChartLegend } from '@components';
import {
  useFullscreenMode,
  WithFullscreenMode,
} from '@components/FullscreenModeContext';

import {
  defaultLegendBackgrounds,
  defaultPieChartColors,
} from './colorPalettes';
import { ChartTitle, ChartTooltip, LegendItem } from './components';
import { useData } from './hooks';
import { SegmentedPieChartProvider } from './SegmentedPieChartContext';
import { SegmentedPieChartProps } from './types';

export const SegmentedPieChartComponent = ({
  data,
  pieChartProps,
  pieChartLegendProps,
  legendBackgrounds = defaultLegendBackgrounds,
  pieChartColors = defaultPieChartColors,
  currency = 'USDT',
  otherLabel = 'Other',
  totalAmount,
  totalDimension,
  legendValueRoundingDigits = 2,
  legendPercentageRoundingDigits = 0,
  showDimensions = true,
  showPercentage = true,
  titleTooltipOptions,
  tooltipConfig,
  renderTitleTooltipContent,
}: SegmentedPieChartProps) => {
  const theme = useTheme();
  const { isFullscreenMode } = useFullscreenMode();

  const { balanceDataForTheGraph, balanceDataForTheLegend, legendColors } =
    useData({
      data,
      legendValueRoundingDigits,
      pieChartColors,
      legendBackgrounds,
    });

  return (
    <SegmentedPieChartProvider
      legendPercentageRoundingDigits={legendPercentageRoundingDigits}
      legendValueRoundingDigits={legendValueRoundingDigits}
      totalAmount={totalAmount}
      totalDimension={totalDimension}
      titleTooltipOptions={titleTooltipOptions}
      showDimensions={showDimensions}
      showPercentage={showPercentage}
      otherLabel={otherLabel}
      currency={currency}
      renderTitleTooltipContent={renderTitleTooltipContent}
      tooltipConfig={tooltipConfig}>
      <PieChartComponent
        data={balanceDataForTheGraph}
        animate={true}
        css={{
          ...(isFullscreenMode
            ? { padding: '20px' }
            : { margin: '40px 120px' }),
        }}
        isInteractive
        activeInnerRadiusOffset={0}
        activeOuterRadiusOffset={0}
        tooltip={(point) => <ChartTooltip point={point} />}
        title={<ChartTitle />}
        {...pieChartProps}>
        <PieChartLegend
          data={balanceDataForTheLegend}
          backgroundColors={legendColors}
          renderValue={(props) => (
            <LegendItem
              {...props}
              legendValueRoundingDigits={
                props.legendValueRoundingDigits as number
              }
            />
          )}
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
          {...pieChartLegendProps}
        />
      </PieChartComponent>
    </SegmentedPieChartProvider>
  );
};

export const SegmentedPieChart = WithFullscreenMode(
  SegmentedPieChartComponent,
) as typeof SegmentedPieChartComponent;
