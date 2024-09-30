import { css, useTheme } from '@emotion/react';
import { pathOr } from '@ssa-ui-kit/utils';
import { Typography, Wrapper, PieChart, PieChartLegend } from '@components';
import {
  defaultLegendBackgrounds,
  defaultPieChartColors,
} from './colorPalettes';
import { BalanceDataForGraph, SegmentedPieChartProps } from './types';

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
  tooltipRoundingDigits = 2,
  legendValueRoundingDigits = 2,
  legendPercentageRoundingDigits = 0,
}: SegmentedPieChartProps) => {
  const theme = useTheme();

  let calculatedTotalAmount = 0;
  data.forEach((item) => {
    calculatedTotalAmount += Number(item.value);
  });
  const balanceDataForTheGraph: BalanceDataForGraph[] = [];
  const balanceDataForTheLegend: BalanceDataForGraph[] = [];
  data?.forEach((item, itemIndex) => {
    const newMainItem = {
      label: item.label,
      percentage: (Number(item.value) * 100) / calculatedTotalAmount,
      color: pieChartColors[itemIndex][0],
      id: `${itemIndex}${0}`,
      mainId: Number(item.id),
      value: item.value,
    };
    balanceDataForTheLegend.push(newMainItem);
    if (item.parts?.length) {
      item.parts?.forEach((part, partIndex) => {
        const mainPercentage =
          (Number(item.value) * 100) / calculatedTotalAmount;
        const partPercentage = (part.value * 100) / calculatedTotalAmount;
        balanceDataForTheGraph.push({
          label: item.label,
          percentage: Number(mainPercentage),
          partIndex,
          partLabel: part.label,
          partPercentage: Number(partPercentage),
          color: pieChartColors[itemIndex][partIndex],
          id: `${itemIndex}${partIndex}`,
          mainId: Number(item.id),
          value: part.value,
        });
      });
    } else {
      balanceDataForTheGraph.push(newMainItem);
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
                      label: pointData['label'],
                      percentage: pointData['percentage'].toFixed(
                        tooltipRoundingDigits,
                      ),
                    }
                  : {
                      label: pointData['partLabel'],
                      percentage: pointData['partPercentage']?.toFixed(
                        tooltipRoundingDigits,
                      ),
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
        data={balanceDataForTheLegend}
        backgroundColors={legendBackgrounds}
        renderValue={({ value, label, percentage }) => {
          const valueLocal = Number(value).toFixed(legendValueRoundingDigits);
          const percentageLocal = Number(percentage).toFixed(
            legendPercentageRoundingDigits,
          );
          return label === otherLabel
            ? valueLocal + ` ${currency}` + ` (${percentageLocal}%)`
            : valueLocal + ' ' + label + ` (${percentageLocal}%)`;
        }}
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
