import type { Meta, StoryObj } from '@storybook/react';
import { css, useTheme } from '@emotion/react';
import { MainColors, Typography } from '@ssa-ui-kit/core';

import { PieChart, PieChartLegend } from './index';

const mockData = [
  {
    // cspell:disable-next-line
    id: 'XlyNrZpVvNp2Z9LqloS6',
    date: '2023-05-03T23:00:00.000Z',
    value: 88,
    label: 'stretching',
  },
  {
    // cspell:disable-next-line
    id: 'YthvgItFS3W0Sa3mRW0X',
    date: '2023-05-03T23:00:00.000Z',
    value: 55,
    label: 'cardio',
  },
];

export default {
  title: 'Widgets/PieChart',
  component: PieChart,
} as Meta<typeof PieChart>;

// TODO: rename to "example1"
export const Default: StoryObj<typeof PieChart> = () => {
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
        data={mockData}
        colors={pieChartColors}
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
        <PieChartLegend data={mockData} colors={colorNames} />
      </PieChart>
    </div>
  );
};
Default.args = {};
