import type { Meta, StoryObj } from '@storybook/react';
import { css, useTheme } from '@emotion/react';
import Typography from '@components/Typography';

import { PieChart, PieChartLegend, pieChartPalettes } from './index';
import { accountData } from './stories/fixtures';

export default {
  title: 'Charts/SegmentedPieChart',
  component: PieChart,
} as Meta<typeof PieChart>;

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
