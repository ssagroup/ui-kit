import type { Meta, StoryObj } from '@storybook/react';
import {
  balanceData,
  balanceMissedPartsData,
  balanceMissedPartsDataTotalAmount,
  balanceTotalAmount,
} from './fixtures';
import { SegmentedPieChart } from '../SegmentedPieChart';

export default {
  title: 'Widgets/SegmentedPieChart',
  component: SegmentedPieChart,
} as Meta<typeof SegmentedPieChart>;

type Args = StoryObj<Partial<Parameters<typeof SegmentedPieChart>[0]>>;

const currency = 'USDT';
const StoryTemplate: Args = {
  render: ({ ...args }) => (
    <SegmentedPieChart
      data={balanceData}
      totalAmount={Number(balanceTotalAmount)}
      totalDimension={currency}
      {...args}
    />
  ),
};

export const AccountExample = {
  ...StoryTemplate,
  args: {},
};

export const CustomColors = {
  ...StoryTemplate,
  args: {
    legendBackgrounds: [
      'linear-gradient(90deg, #6A9FDC 0%, #85BCE8 100%)',
      'linear-gradient(247deg, #A34EC6 14.71%, #D678F8 85.29%)',
      'linear-gradient(296deg, #5FD1E4 16.38%, #7AE4F5 83.62%)',
      'linear-gradient(68deg, #D77A61 12.3%, #E89C91 88.95%)',
    ],
    pieChartColors: [
      ['#6A9FDC', '#85BCE8', '#A3D7F2', '#BAE7FF', '#D1F2FF'],
      ['#A34EC6', '#D678F8', '#E597FF', '#F5C0FF', '#FFD9FF'],
      ['#5FD1E4', '#7AE4F5', '#A1F3FF', '#C0FFFF', '#D9FFFF'],
      ['#D77A61', '#E89C91', '#F1B5A4', '#FFC3B5', '#FFDACC'],
    ],
  },
};

export const CustomCurrency = {
  ...StoryTemplate,
  args: {
    currency: 'EUR',
    totalDimension: 'PLN',
    totalAmount: 17737.12,
  },
};

CustomCurrency.storyName = 'Custom currency, total dimension and amount';

export const MissedPartsData = {
  ...StoryTemplate,
  args: {
    data: balanceMissedPartsData,
    totalAmount: balanceMissedPartsDataTotalAmount,
  },
};

export const PercentageRoundingDigits = {
  ...StoryTemplate,
  args: {
    legendValueRoundingDigits: 1,
    legendPercentageRoundingDigits: 2,
  },
};

export const WithoutTooltip = {
  ...StoryTemplate,
  args: {
    pieChartProps: {
      isInteractive: false,
    },
  },
};

export const WithoutPercentage = {
  ...StoryTemplate,
  args: {
    showPercentage: false,
  },
};

export const WithoutDimensions = {
  ...StoryTemplate,
  args: {
    showDimensions: false,
  },
};
