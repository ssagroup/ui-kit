import { type StoryObj, type Meta } from '@storybook/react';
import { seededRandom } from '@ssa-ui-kit/utils';
import { DateTime } from 'luxon';

import { CandlestickChart } from './';

const generateMockData = () => {
  const minutes = 60;
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

  for (let i = 0; i < minutes; i++) {
    const date = DateTime.now().minus({ minutes: minutes - i });
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
