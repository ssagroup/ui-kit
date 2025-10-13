import { DateTime } from 'luxon';

import { type Meta, type StoryObj } from '@storybook/react-webpack5';

import { seededRandom } from '@ssa-ui-kit/utils';

import { CandlestickChart, CandlestickChartProps } from './';

const generateMockData = (count = 60, stepMinutes = 1) => {
  const rand = seededRandom(10);

  const x: string[] = [];
  const open: number[] = [];
  const close: number[] = [];
  const high: number[] = [];
  const low: number[] = [];

  let prevClose = 100;
  const openDrift = 1;
  const closeSwing = 2;
  const spike = 1;

  for (let i = 0; i < count; i++) {
    const date = DateTime.now().minus({ minutes: stepMinutes * (count - i) });
    x.push(date.toISO());

    const o = prevClose + (rand() - 0.5) * openDrift;
    const c = o + (rand() - 0.5) * closeSwing;
    const h = Math.max(o, c) + rand() * spike;
    const l = Math.min(o, c) - rand() * spike;

    open.push(Number(o.toFixed(2)));
    close.push(Number(c.toFixed(2)));
    high.push(Number(h.toFixed(2)));
    low.push(Number(l.toFixed(2)));

    prevClose = c;
  }

  return { x, open, close, high, low };
};

const meta: Meta<typeof CandlestickChart> = {
  title: 'Charts/CandlestickChart',
  component: CandlestickChart,
  args: {
    title: 'Hollow Candlestick Chart',
    features: ['header'],
    data: generateMockData(),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
        }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Japanese: Story = {
  args: {
    title: 'Japanese Candlestick Chart',
    style: 'japanese',
  },
};

export const Fullscreen: Story = {
  args: {
    features: ['fullscreenMode', 'header'],
  },
};

export const Timeframe: StoryObj<
  CandlestickChartProps & { timeframe: string }
> = {
  argTypes: {
    timeframe: {
      control: { type: 'select' },
      options: [
        '1 Minute (8 hours)',
        '5 Minutes (12 hours)',
        '15 Minutes (1 day)',
        '1 Hour (2 weeks)',
        '2 Hours (2 weeks)',
        '4 Hours (1 month)',
        '1 Day (3 months)',
      ],
      mapping: {
        '1 Minute (8 hours)': '1m',
        '5 Minutes (12 hours)': '5m',
        '15 Minutes (1 day)': '15m',
        '1 Hour (2 weeks)': '1h',
        '2 Hours (2 weeks)': '2h',
        '4 Hours (1 month)': '4h',
        '1 Day (3 months)': '1d',
      },
    },
  },
  render: ({ timeframe, ...args }) => {
    let stepMinutes: number;
    let count: number;
    switch (timeframe) {
      case '1m':
        stepMinutes = 1;
        count = 8 * 60;
        break; // 8 hours
      case '5m':
        stepMinutes = 5;
        count = 12 * 12;
        break; // 12 hours
      case '15m':
        stepMinutes = 15;
        count = 24 * 4;
        break; // 1 day
      case '1h':
        stepMinutes = 60;
        count = 2 * 7 * 24;
        break; // 2 weeks
      case '2h':
        stepMinutes = 120;
        count = 2 * 7 * 12;
        break; // 2 weeks
      case '4h':
        stepMinutes = 240;
        count = (30 * 24) / 4;
        break; // 1 month
      case '1d':
        stepMinutes = 1440;
        count = 3 * 30;
        break; // 3 months
      default:
        stepMinutes = 1;
        count = 60;
    }

    const data = generateMockData(count, stepMinutes);
    return <CandlestickChart {...args} data={data} />;
  },
};
