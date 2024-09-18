import { MayHaveLabel } from '@nivo/pie';
import type { Meta, StoryObj } from '@storybook/react';
import { css, useTheme } from '@emotion/react';
import { pathOr } from '@ssa-ui-kit/utils';
import Typography from '@components/Typography';
import Wrapper from '@components/Wrapper';
import { balanceData, balanceDataTotal } from './stories/fixtures';
import { PieChart, PieChartLegend, pieChartPalettes } from '.';

export default {
  title: 'Charts/SegmentedPieChart',
  component: PieChart,
} as Meta<typeof PieChart>;

interface BalanceData extends MayHaveLabel {
  mainLabel: string;
  mainPercentage: number;
  partLabel: string;
  partPercentage: number;
  id: number | string;
  value: number | string;
  color: string;
}

// TODO: widget from story?
export const AccountExample: StoryObj<typeof PieChart> = () => {
  const theme = useTheme();
  const { legendBackgrounds, pieChartColors } =
    pieChartPalettes.getAccountPalette(theme);

  // making flat data structure
  const balanceDataForTheGraph: Array<BalanceData> = [];
  balanceData.forEach((item, itemIndex) => {
    item.parts.forEach((part, partIndex) => {
      balanceDataForTheGraph.push({
        mainLabel: item.label,
        mainPercentage: item.percentage,
        partLabel: part.label,
        partPercentage: part.percentage,
        color: '#ffa',
        id: `${itemIndex}${partIndex}`,
        value: part.percentage,
      });
    });
  });

  // generating colors for data;
  // const pieChartColorsNew = [];

  return (
    <div style={{ padding: 50 }}>
      <div style={{ width: '400px' }}>
        <PieChart
          data={balanceDataForTheGraph}
          // colors={pieChartColors}
          animate={true}
          isInteractive
          activeInnerRadiusOffset={0}
          activeOuterRadiusOffset={0}
          tooltip={(point) => {
            const pointData = pathOr<typeof point, BalanceData>({}, [
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
AccountExample.args = {};
