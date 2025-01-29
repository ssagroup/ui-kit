import type { Meta, StoryObj } from '@storybook/react';
import { TranslationProvider } from '@contexts';
import { BarLineComplexChart } from './BarLineComplexChart';
import {
  mockBigData,
  mockDataHorizontal,
  mockData,
  mockDataWithDifferentLineType,
  mockWithDimensions,
} from './__mock__/data';
import { BarLineChartItem, BarLineComplexChartProps } from './types';
import { useState } from 'react';

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

export const DefaultTest = () => {
  const [qData, setQData] = useState<BarLineChartItem[]>([]);
  setTimeout(() => {
    setQData(mockData);
  }, 5000);
  return (
    <BarLineComplexChart
      data={qData}
      width="670px"
      height="220px"
      cardProps={{
        title: 'Bar & Line Complex Chart',
      }}
    />
  );
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

export const WithFullscreenByDefault: Args = {
  ...Default,
  args: {
    features: ['filtering', 'fullscreenMode'],
    isFullscreenModeInitial: true,
  },
};

export const WithDisabledScaling: Args = {
  ...Default,
  args: {
    features: ['filtering', 'fullscreenMode'],
    layout: {
      xaxis: { fixedrange: true },
      yaxis: { fixedrange: true },
      yaxis2: { fixedrange: true },
    },
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

export const ModeBarAlwaysVisible: Args = {
  ...Default,
  args: {
    data: mockBigData,
    features: ['filtering', 'fullscreenMode'],
    systemModeBarButtons: [],
    config: {
      displayModeBar: true,
    },
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

export const Horizontal: Args = {
  ...Default,
  args: {
    data: mockDataHorizontal,
    features: ['filtering', 'fullscreenMode'],
    systemModeBarButtons: [],
    maxVisibleBars: 8,
  },
};
