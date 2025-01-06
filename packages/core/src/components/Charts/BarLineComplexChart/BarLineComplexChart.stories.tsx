import type { Meta, StoryObj } from '@storybook/react';
import { TranslationProvider } from '@contexts';
import { BarLineComplexChart } from './BarLineComplexChart';
import {
  mockBigData,
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

export const WithFiltering: Args = {
  ...Default,
  args: {
    lineShape: 'spline',
    features: ['filtering'],
  },
};

export const Custom: Args = {
  ...Default,
  args: {
    data: mockDataWithDifferentLineType,
    features: ['filtering'],
    onChange: (name, isSelected) => {
      console.log('onChange event', name, isSelected);
    },
  },
};

export const WithCustomDimension: Args = {
  ...Default,
  args: {
    data: mockWithDimensions,
    features: ['filtering'],
  },
};

export const WithFullscreen: Args = {
  ...Default,
  args: {
    features: ['filtering', 'fullscreenMode'],
  },
};

export const WithLimitation: Args = {
  ...Default,
  args: {
    data: mockBigData,
    features: ['filtering', 'fullscreenMode'],
  },
};

export const WithDisabledControls: Args = {
  ...Default,
  args: {
    data: mockBigData,
    features: ['filtering', 'fullscreenMode'],
    systemModeBarButtons: ['toImage'],
  },
};

export const Responsive: Args = {
  ...Default,
  args: {
    data: mockBigData,
    width: '100%',
    features: ['filtering', 'fullscreenMode'],
    systemModeBarButtons: [],
  },
};
