import type { Meta, StoryObj } from '@storybook/react';
import { TranslationProvider } from '@contexts';
import { BarLineComplexChart } from './BarLineComplexChart';
import {
  mockData,
  mockDataWithDifferentLineType,
  mockWithDimensions,
} from './__mock__/data';
import { BarLineComplexChartProps } from './types';

export default {
  title: 'Charts/BarLineComplexChart',
  component: BarLineComplexChart,
  decorators: [
    (Story) => (
      <TranslationProvider>
        <Story />
      </TranslationProvider>
    ),
  ],
} as Meta<BarLineComplexChartProps>;

type Args = StoryObj<Partial<BarLineComplexChartProps>>;

export const Default: Args = {
  render: ({ ...args }) => (
    <BarLineComplexChart
      data={mockData}
      width="670px"
      height="220px"
      cardProps={{
        title: 'Bar & Line Complex Chart',
      }}
      {...args}
    />
  ),
};

export const WithSpline: Args = {
  ...Default,
  args: {
    lineShape: 'spline',
  },
};

export const Custom: Args = {
  ...Default,
  args: {
    data: mockDataWithDifferentLineType,
  },
};

export const WithCustomDimension: Args = {
  ...Default,
  args: {
    data: mockWithDimensions,
  },
};
