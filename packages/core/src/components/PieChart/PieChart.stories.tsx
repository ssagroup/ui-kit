import type { Meta, StoryObj } from '@storybook/react';
import { css, useTheme } from '@emotion/react';
import { Typography } from '@components';

import { PieChart, PieChartLegend, pieChartPalettes } from './index';
import { fitnessData, accountData } from './stories/fixtures';

export default {
  title: 'Charts/PieChart',
  component: PieChart,
} as Meta<typeof PieChart>;

export const FitnessExample: StoryObj<typeof PieChart> = () => {
  const theme = useTheme();
  const colorNames = ['blueLight', 'turquoise'] as unknown as Array<
    keyof MainColors
  >;
  const pieChartColors = [
    theme.colors.blueLighter,
    theme.colors.turquoise,
  ] as unknown as string[];

  return (
    <div style={{ width: '400px' }}>
      <PieChart
        data={fitnessData}
        colors={pieChartColors}
        animate={false}
        title={
          <Typography
            variant="body2"
            weight="regular"
            color={theme.colors.greyDarker60}
            css={css`
              font-size: 16px;
              line-height: 16px;
              margin-top: -5px;
            `}>
            Total
            <Typography
              variant="body2"
              weight="bold"
              color={theme.colors.greyDarker}
              css={css`
                font-size: 27.65px;
                line-height: 35px;
              `}>
              143
              <Typography
                variant="body2"
                weight="regular"
                as="span"
                color={theme.colors.greyDarker60}
                css={css`
                  font-size: 16px;
                  font-weight: 600;
                  margin-left: 3px;
                `}>
                hrs
              </Typography>
            </Typography>
          </Typography>
        }>
        <PieChartLegend data={fitnessData} colors={colorNames} />
      </PieChart>
    </div>
  );
};
FitnessExample.args = {};

export const AccountExample: StoryObj<typeof PieChart> = () => {
  const theme = useTheme();
  const { legendColorNames, pieChartColors } =
    pieChartPalettes.getBalancePalette(theme);

  return (
    <div style={{ width: '400px' }}>
      <PieChart
        data={accountData}
        colors={pieChartColors}
        animate={false}
        title={
          <Typography
            variant="body2"
            weight="bold"
            color={theme.colors.greyDarker}
            css={css`
              font-size: 20px;
              line-height: 25px;
            `}>
            147358 &nbsp;
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
          data={accountData}
          colors={legendColorNames}
          renderValue={({ value, label }) =>
            label === 'Other' ? value + ' USD' : value + ' ' + label
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
  );
};
AccountExample.args = {};
