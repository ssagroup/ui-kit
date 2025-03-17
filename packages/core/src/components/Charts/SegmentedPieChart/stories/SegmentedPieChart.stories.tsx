import type { Meta, StoryObj } from '@storybook/react';
import {
  balanceData,
  balanceMissedPartsData,
  balanceMissedPartsDataTotalAmount,
  balanceTotalAmount,
} from './fixtures';
import { SegmentedPieChart } from '../SegmentedPieChart';

const currency = 'USDT';

export default {
  title: 'Charts/SegmentedPieChart',
  component: SegmentedPieChart,
  render: (props) => <SegmentedPieChart {...props} />,
  args: {
    data: balanceData,
    totalAmount: Number(balanceTotalAmount),
    totalDimension: currency,
  },
} as Meta<typeof SegmentedPieChart>;

type Story = StoryObj<typeof SegmentedPieChart>;

export const AccountExample: Story = {
  args: {},
};

export const CustomColors: Story = {
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

export const CustomCurrency: Story = {
  args: {
    currency: 'EUR',
    totalDimension: 'PLN',
    totalAmount: 17737.12,
  },
  name: 'Custom currency, total dimension and amount',
};

export const MissedPartsData: Story = {
  args: {
    data: balanceMissedPartsData,
    totalAmount: balanceMissedPartsDataTotalAmount,
  },
};

export const PercentageRoundingDigits: Story = {
  args: {
    legendValueRoundingDigits: 1,
    legendPercentageRoundingDigits: 2,
  },
};

export const WithoutTooltip: Story = {
  args: {
    pieChartProps: {
      isInteractive: false,
    },
  },
};

export const WithoutPercentage: Story = {
  args: {
    showPercentage: false,
  },
};

export const WithoutDimensions: Story = {
  args: {
    showDimensions: false,
  },
};

export const WithTotalTooltip: Story = {
  args: {
    titleTooltipOptions: [
      {
        value: 10500,
        label: 'Option 1',
        dimension: 'USDT',
      },
      {
        value: 5000,
        label: 'Option 2',
        dimension: 'USDT',
      },
      {
        value: 2237,
        label: 'Option 3',
        dimension: 'USDT',
      },
    ],
  },
};

export const FullscreenWithTitle: Story = {
  args: {
    pieChartProps: {
      features: ['header', 'fullscreenMode'],
      cardProps: {
        title: 'Segmented Pie Chart',
      },
    },
  },
};
