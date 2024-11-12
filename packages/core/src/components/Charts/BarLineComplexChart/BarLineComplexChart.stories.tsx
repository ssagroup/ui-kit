import type { Meta, StoryObj } from '@storybook/react';
import { BarLineComplexChart } from './BarLineComplexChart';
import { mockConfig, mockData } from './__mock__/data';
import { BarLineComplexChartProps } from './types';
import { TranslationProvider } from '@contexts';

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
      chartConfig={mockConfig}
      width="670px"
      height="220px"
      cardProps={{
        title: 'Bar & Line Complex Chart',
      }}
      {...args}
    />
  ),
};
