import { css, useTheme } from '@emotion/react';
import { PieChart, PieChartLegend } from '@components';
import {
  defaultLegendBackgrounds,
  defaultPieChartColors,
} from './colorPalettes';
import { SegmentedPieChartProps } from './types';
import { ChartTitle, ChartTooltip, LegendItem } from './components';
import { useData } from './hooks';
import { SegmentedPieChartProvider } from './SegmentedPieChartContext';

export const SegmentedPieChart = ({
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

  const { balanceDataForTheGraph, balanceDataForTheLegend } = useData({
    data,
    legendValueRoundingDigits,
    pieChartColors,
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
      <PieChart
        data={balanceDataForTheGraph}
        animate={true}
        css={{
          width: '400px',
          margin: '40px 120px',
        }}
        isInteractive
        activeInnerRadiusOffset={0}
        activeOuterRadiusOffset={0}
        tooltip={(point) => <ChartTooltip point={point} />}
        title={<ChartTitle />}
        {...pieChartProps}>
        <PieChartLegend
          data={balanceDataForTheLegend}
          backgroundColors={legendBackgrounds}
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
      </PieChart>
    </SegmentedPieChartProvider>
  );
};
