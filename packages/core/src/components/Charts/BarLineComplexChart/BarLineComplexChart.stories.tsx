import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TranslationProvider } from '@contexts';
import Icon from '@components/Icon';
import { BarLineComplexChart } from './BarLineComplexChart';
import {
  mockBigData,
  mockDataHorizontal,
  mockData,
  mockDataWithDifferentLineType,
  mockWithDimensions,
} from './__mock__/data';
import { BarLineChartItem, BarLineComplexChartProps } from './types';

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
        ...(args.cardProps ?? {}),
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

export const WithJsxTitle: Args = {
  ...Default,
  name: 'With JSX Title',
  parameters: {
    docs: {
      description: {
        story:
          'The `cardProps.title` prop accepts any React node. The title is rendered as a DOM overlay above the Plotly canvas so JSX (icons, tooltips, etc.) is fully supported.',
      },
    },
  },
  args: {
    data: mockDataHorizontal,
    features: ['filtering', 'fullscreenMode'],
    systemModeBarButtons: [],
    maxVisibleBars: 8,
    cardProps: {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Bar & Line Complex Chart
          <Icon name="information" size={16} />
        </div>
      ),
    },
  },
};

export const WithAsyncData = () => {
  const [queryData, setQueryData] = useState<BarLineChartItem[]>([]);
  setTimeout(() => {
    setQueryData(mockData);
  }, 500);
  return (
    <BarLineComplexChart
      data={queryData}
      width="670px"
      height="220px"
      cardProps={{
        title: 'Bar & Line Complex Chart',
      }}
    />
  );
};
