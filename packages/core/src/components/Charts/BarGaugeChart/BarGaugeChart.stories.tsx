import { useEffect, useRef, useState } from 'react';
import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import { useTheme } from '@emotion/react';

import { BarGaugeChart } from './BarGaugeChart';
import {
  GaugeBarProps,
  GaugeBarThreshold,
  GaugeBarValueFormatter,
} from './types';

const meta = {
  title: 'Charts/BarGaugeChart',
  component: BarGaugeChart,
  render: (args) => {
    const theme = useTheme();
    const thresholds: GaugeBarThreshold[] = [
      {
        value: 60,
        color: theme.colors.yellowLighter!,
      },
      {
        value: 80,
        color: theme.colors.pink!,
      },
    ];
    const valueFormatter: GaugeBarValueFormatter = (v, color) => (
      <div css={{ color, width: '75px', textAlign: 'right' }}>
        {v} <span css={{ fontSize: '14px', color }}>%</span>
      </div>
    );
    const bars = args.bars?.map((bar) => ({
      // [Circular] fix
      thresholds: [...thresholds],
      valueFormatter,
      ...bar,
    }));
    return <BarGaugeChart {...args} bars={bars} />;
  },
  args: {
    title: 'BarGauge Chart',
    features: ['header'],
    bars: [
      {
        value: 30,
        title: 'Bar 1',
      },
      {
        value: 75,
        title: 'Bar 2',
      },
      {
        value: 90,
        title: 'Bar 3',
      },
    ],
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '250px',
        }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof BarGaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutHeader: Story = { args: { features: [] } };

export const FillScreen: Story = {
  args: {
    features: ['header', 'fullscreenMode'],
  },
};

export const Dynamic: Story = {
  parameters: {
    lostpixel: {
      disable: true,
    },
  },
  render: (args) => {
    const theme = useTheme();
    const direction = useRef(0);
    const [value, setValue] = useState(50);

    useEffect(() => {
      const interval = setInterval(() => {
        const options = [-1, 1];
        direction.current = options[Math.floor(Math.random() * options.length)];
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) =>
          Math.max(0, Math.min(100, prev + direction.current)),
        );
      }, 50);
      return () => clearInterval(interval);
    }, []);

    const bars: GaugeBarProps[] = [
      {
        value,
        valueFormatter: (v, color) => (
          <div css={{ color, width: '100px', textAlign: 'right' }}>
            {v.toFixed(2)} <span css={{ fontSize: '14px', color }}>%</span>
          </div>
        ),
        thresholds: [
          {
            value: 60,
            color: theme.colors.yellowLighter!,
          },
          {
            value: 80,
            color: theme.colors.pink!,
          },
        ],
      },
    ];
    return <BarGaugeChart {...args} bars={bars} />;
  },
};
