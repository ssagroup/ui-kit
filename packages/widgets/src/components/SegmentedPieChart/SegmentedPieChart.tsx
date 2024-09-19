import { css, useTheme } from '@emotion/react';
import { pathOr } from '@ssa-ui-kit/utils';
import {
  Typography,
  Wrapper,
  PieChart,
  PieChartLegend,
} from '@ssa-ui-kit/core';
import { getAccountPalette } from './colorPalettes';
import { BalanceDataForGraph, SegmentedPieChartProps } from './types';

/**
 * TODO:
 * - pass PieChart props
 * - pass color [[], [], ...]
 * - pass data
 * - pass styles?
 * - pass labels (like USD)
 * - add tests?
 * - don't we need changed to the "core" library?
 */
export const SegmentedPieChart = ({
  balanceData,
  balanceDataTotal,
}: SegmentedPieChartProps) => {
  const theme = useTheme();
  const { legendBackgrounds, pieChartColors } = getAccountPalette(theme);

  const balanceDataForTheGraph: BalanceDataForGraph[] = [];
  balanceData.forEach((item, itemIndex) => {
    item.parts.forEach((part, partIndex) => {
      balanceDataForTheGraph.push({
        mainLabel: item.label,
        mainPercentage: item.percentage,
        partLabel: part.label,
        partPercentage: part.percentage,
        color: pieChartColors[itemIndex][partIndex],
        id: `${itemIndex}${partIndex}`,
        mainId: item.id,
        value: part.percentage,
      });
    });
  });

  return (
    <div style={{ padding: 50 }}>
      <div style={{ width: '400px' }}>
        <PieChart
          data={balanceDataForTheGraph}
          animate={true}
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
              {balanceDataTotal} &nbsp;
              <Typography
                variant="body2"
                weight="regular"
                as="span"
                color={theme.colors.greyDarker80}
                css={css`
                  font-size: 14px;
                `}>
                USD
              </Typography>
            </Typography>
          }>
          <PieChartLegend
            data={balanceData}
            backgroundColors={legendBackgrounds}
            renderValue={({ value, label, percentage }) =>
              label === 'Other'
                ? value + ' USD' + ` (${percentage}%)`
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
          />
        </PieChart>
      </div>
    </div>
  );
};
