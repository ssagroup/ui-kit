import { css, useTheme } from '@emotion/react';
import { pathOr } from '@ssa-ui-kit/utils';
import { Typography, Wrapper, PieChart, PieChartLegend } from '@components';
import {
  defaultLegendBackgrounds,
  defaultPieChartColors,
} from './colorPalettes';
import { BalanceDataForGraph, SegmentedPieChartProps } from './types';

/**
 * - first, do stories
 * - second, make corrections to this component, if it needed
 */
export const SegmentedPieChart = ({
  data,
  pieChartProps,
  pieChartLegendProps,
  legendBackgrounds = defaultLegendBackgrounds,
  pieChartColors = defaultPieChartColors,
  currency = 'USD',
  otherLabel = 'Other',
  totalAmount,
  totalDimension,
}: SegmentedPieChartProps) => {
  const theme = useTheme();

  let calculatedTotalAmount = 0;
  data.forEach((item) => {
    calculatedTotalAmount += item.value;
  });
  const balanceDataForTheGraph: BalanceDataForGraph[] = [];
  data?.forEach((item, itemIndex) => {
    if (item.parts?.length) {
      item.parts?.forEach((part, partIndex) => {
        balanceDataForTheGraph.push({
          mainLabel: item.label,
          mainPercentage: (item.value * 100) / calculatedTotalAmount,
          partIndex,
          partLabel: part.label,
          partPercentage: (part.value * 100) / calculatedTotalAmount,
          color: pieChartColors[itemIndex][partIndex],
          id: `${itemIndex}${partIndex}`,
          mainId: item.id,
          value: (part.value * 100) / calculatedTotalAmount,
        });
      });
    } else {
      balanceDataForTheGraph.push({
        mainLabel: item.label,
        mainPercentage: (item.value * 100) / calculatedTotalAmount,
        color: pieChartColors[itemIndex][0],
        id: `${itemIndex}${0}`,
        mainId: item.id,
        value: (item.value * 100) / calculatedTotalAmount,
      });
    }
  });

  return (
    <PieChart
      data={balanceDataForTheGraph}
      animate={true}
      css={{
        width: 500,
        padding: 50,
      }}
      isInteractive
      activeInnerRadiusOffset={0}
      activeOuterRadiusOffset={0}
      tooltip={(point) => {
        const pointData = pathOr<typeof point, BalanceDataForGraph>({}, [
          'datum',
          'data',
        ])(point);
        return (
          <Wrapper
            css={{
              background: theme.colors.greyLighter,
              flexDirection: 'column',
              borderRadius: 8,
              padding: 5,
              fontSize: 12,
              fontWeight: 500,
            }}>
            {['main', 'part'].map((item) => {
              if (item === 'part' && !pointData['partLabel']) {
                return null;
              }
              const currentItem =
                item === 'main'
                  ? {
                      label: pointData['mainLabel'],
                      percentage: pointData['mainPercentage'],
                    }
                  : {
                      label: pointData['partLabel'],
                      percentage: pointData['partPercentage'],
                    };
              return (
                <Wrapper
                  key={item}
                  css={{
                    justifyContent: 'space-between',
                    gap: 10,
                  }}>
                  <span css={{ fontWeight: 600 }}>{currentItem.label}</span>
                  <span>{currentItem['percentage']}%</span>
                </Wrapper>
              );
            })}
          </Wrapper>
        );
      }}
      title={
        <Typography
          variant="body2"
          weight="bold"
          color={theme.colors.greyDarker}
          css={css`
            font-size: 20px;
            line-height: 25px;
          `}>
          {totalAmount} &nbsp;
          <Typography
            variant="body2"
            weight="regular"
            as="span"
            color={theme.colors.greyDarker80}
            css={css`
              font-size: 14px;
            `}>
            {totalDimension}
          </Typography>
        </Typography>
      }
      {...pieChartProps}>
      <PieChartLegend
        data={data}
        backgroundColors={legendBackgrounds}
        renderValue={({ value, label, percentage }) =>
          label === otherLabel
            ? value + ` ${currency}` + ` (${percentage}%)`
            : value + ' ' + label + ` (${percentage}%)`
        }
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
  );
};
