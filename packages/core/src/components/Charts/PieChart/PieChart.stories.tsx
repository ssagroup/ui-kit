import { Fragment, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css, useTheme } from '@emotion/react';
import { css as cssString } from '@emotion/css';
import Typography from '@components/Typography';
import {
  PieChart,
  PieChartLegend,
  PieChartLegendItem,
  pieChartPalettes,
  PieChartProps,
  PieChartTooltipProps,
} from './index';
import {
  fitnessData,
  accountData,
  optionsDataBig,
  optionsDataBigDecimal,
} from './stories/fixtures';

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
  );
};
FitnessExample.args = {};

export const AccountExample: StoryObj<typeof PieChart> = () => {
  const theme = useTheme();
  const { legendColorNames, pieChartColors } =
    pieChartPalettes.getBalancePalette(theme);

  return (
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
          18183 &nbsp;
          <Typography
            variant="body2"
            weight="regular"
            as="span"
            color={theme.colors.greyDarker80}
            css={css`
              font-size: 14px;
            `}>
            USDT
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
  );
};
AccountExample.args = {};

export const CustomColors: StoryObj<typeof PieChart> = () => {
  const theme = useTheme();
  const colors = ['#F7931A', '#50AF95', '#6f93d1', '#d37070'];

  return (
    <PieChart
      data={accountData}
      colors={colors}
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
          18183 &nbsp;
          <Typography
            variant="body2"
            weight="regular"
            as="span"
            color={theme.colors.greyDarker80}
            css={css`
              font-size: 14px;
            `}>
            USDT
          </Typography>
        </Typography>
      }>
      <PieChartLegend
        data={accountData}
        backgroundColors={colors}
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
  );
};
CustomColors.args = {};

export const FullscreenAndTitle: StoryObj<typeof PieChart> = () => {
  const theme = useTheme();
  const [isFullscreenMode, setFullscreenMode] = useState(false);
  const { legendColorNames, pieChartColors } =
    pieChartPalettes.getBalancePalette(theme);

  return (
    <PieChart
      data={optionsDataBig}
      onFullscreenModeChange={setFullscreenMode}
      colors={pieChartColors}
      activeHighlight
      isInteractive
      innerRadius={0}
      padAngle={0}
      cornerRadius={0}
      css={{
        padding: 20,
      }}
      activeInnerRadiusOffset={0}
      activeOuterRadiusOffset={isFullscreenMode ? 40 : 7}
      features={['header', 'fullscreenMode']}
      cardProps={{
        title: 'Options',
      }}
      tooltip={() => <Fragment></Fragment>}>
      <PieChartLegend
        data={optionsDataBig}
        colors={legendColorNames}
        activeHighlight
        markerStyles={css`
          width: 10px;
          height: 10px;
        `}
        labelListStyles={css`
          li {
            height: 34px;
          }
          h6 {
            color: ${theme.colors.greyDarker};
            font-size: 14px;
            &:nth-of-type(1) {
              font-weight: 500;
            }
            &:nth-of-type(2) {
              font-weight: 700;
              font-size: 12px;
            }
          }
        `}
        valueListStyles={css`
          li {
            justify-content: flex-end;
            height: ${isFullscreenMode ? 'auto' : '34px'};
          }
          h6 {
            color: ${theme.colors.greyDarker};
            font-weight: 700;
            font-size: 12px;
          }
        `}
      />
    </PieChart>
  );
};
FullscreenAndTitle.args = {};

const WithTooltipTemplate: StoryObj<
  Pick<PieChartProps, 'data' | 'legendOutputType'> & {
    tooltipOutputType: PieChartTooltipProps['outputType'];
    tooltipIsEnabled: PieChartTooltipProps['isEnabled'];
    tooltipIsFullscreenEnabled: PieChartTooltipProps['isFullscreenEnabled'];
    tooltipDimension: PieChartTooltipProps['dimension'];
    tooltipValueRoundingDigits: PieChartTooltipProps['valueRoundingDigits'];
    tooltipPercentageRoundingDigits: PieChartTooltipProps['percentageRoundingDigits'];
  }
> = {
  render: ({
    data: pieChartData = optionsDataBigDecimal,
    legendOutputType = 'percentage',
    tooltipDimension,
    tooltipIsEnabled,
    tooltipIsFullscreenEnabled,
    tooltipOutputType,
    tooltipPercentageRoundingDigits,
    tooltipValueRoundingDigits,
  }) => {
    const theme = useTheme();
    const [isFullscreenMode, setFullscreenMode] = useState(false);
    const { legendColorNames, pieChartColors } =
      pieChartPalettes.getBalancePalette(theme);
    const tooltipProps: PieChartTooltipProps = {
      dimension: tooltipDimension,
      isEnabled: tooltipIsEnabled,
      isFullscreenEnabled: tooltipIsFullscreenEnabled,
      outputType: tooltipOutputType,
      percentageRoundingDigits: tooltipPercentageRoundingDigits,
      valueRoundingDigits: tooltipValueRoundingDigits,
    };

    return (
      <PieChart
        data={pieChartData}
        onFullscreenModeChange={setFullscreenMode}
        colors={pieChartColors}
        activeHighlight
        isInteractive
        innerRadius={0}
        padAngle={0}
        cornerRadius={0}
        css={{
          padding: 20,
        }}
        activeInnerRadiusOffset={0}
        activeOuterRadiusOffset={isFullscreenMode ? 40 : 7}
        features={['header', 'fullscreenMode']}
        cardProps={{
          title: 'Options',
          contentClassName: cssString`
            max-width: ${isFullscreenMode ? '100%' : '440px !important'};
          `,
        }}
        legendOutputType={legendOutputType}
        tooltipProps={{
          isEnabled: true,
          ...tooltipProps,
        }}
        width={'500px'}>
        <PieChartLegend
          data={pieChartData as PieChartLegendItem[]}
          useChartData
          colors={legendColorNames}
          activeHighlight
          markerStyles={css`
            width: 10px;
            height: 10px;
          `}
          labelListStyles={css`
            li {
              height: 34px;
            }
            h6 {
              color: ${theme.colors.greyDarker};
              font-size: 14px;
              &:nth-of-type(1) {
                font-weight: 500;
              }
              &:nth-of-type(2) {
                font-weight: 700;
                font-size: 12px;
              }
            }
          `}
          valueListStyles={css`
            li {
              justify-content: flex-end;
              height: ${isFullscreenMode ? 'auto' : '34px'};
            }
            h6 {
              color: ${theme.colors.greyDarker};
              font-weight: 700;
              font-size: 12px;
            }
          `}
          renderValue={(item, legendOutputType) => {
            switch (legendOutputType) {
              case 'percentage':
                return `${item.percentage}%`;
              case 'value+percentage':
                return `${item.value} (${item.percentage}%)`;
              default:
                return item.value;
            }
          }}
        />
      </PieChart>
    );
  },
};

export const WithTooltip = {
  ...WithTooltipTemplate,
  args: {
    legendOutputType: 'value',
    tooltipOutputType: 'value',
    tooltipDimension: 'm',
  },
  argTypes: {
    legendOutputType: {
      options: ['value', 'percentage', 'value+percentage'],
      control: { type: 'radio' },
    },
    tooltipIsEnabled: {
      control: { type: 'boolean' },
    },
    tooltipIsFullscreenEnabled: {
      control: { type: 'boolean' },
    },
    tooltipOutputType: {
      options: [
        'value',
        'value+dimension',
        'dimension',
        'percentage',
        'value+percentage',
        'value+dimension+percentage',
      ],
      control: { type: 'radio' },
    },
    tooltipDimension: {
      control: { type: 'text' },
    },
    tooltipValueRoundingDigits: {
      control: { type: 'number' },
    },
    tooltipPercentageRoundingDigits: {
      control: { type: 'number' },
    },
  },
};
