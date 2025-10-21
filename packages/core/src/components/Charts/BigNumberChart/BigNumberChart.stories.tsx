import { useEffect, useState } from 'react';

import { DateTime } from 'luxon';

import { type Meta, type StoryObj } from '@storybook/react-webpack5';

import { seededRandom } from '@ssa-ui-kit/utils';

import { BigNumberChart } from './';

const generateMockData = () => {
  const days = 15;
  const rand = seededRandom(10);

  const data = new Array(days)
    .fill(0)
    .map((_, index) => ({
      x: DateTime.now()
        .minus({ days: index + 1 })
        .toMillis(),
      y: Math.floor(rand() * 100),
    }))
    .reverse();

  return data;
};

const meta = {
  title: 'Charts/BigNumberChart',
  component: BigNumberChart,
  args: {
    title: 'BigNumber Chart',
    features: ['header'],
    valueFormat: (value) => (
      <span>
        {value.y?.toString()}{' '}
        <span css={{ fontWeight: '500', fontSize: '16px' }}>K</span>
      </span>
    ),
    trendLineProps: {
      tooltipValueFormat: (value) => {
        const date = DateTime.fromMillis(Number(value.x));
        return date.toRelative();
      },
    },
    data: generateMockData(),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '200px',
        }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof BigNumberChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutHeader: Story = { args: { features: [] } };

export const FillScreen: Story = {
  args: {
    features: ['header', 'fullscreenMode'],
  },
};

export const NonInteractive: Story = {
  args: {
    interactive: false,
  },
};

export const Dynamic: Story = {
  parameters: {
    lostpixel: {
      disable: true,
    },
  },
  args: {
    trendLineProps: {
      curve: 'monotoneX',
      tooltipValueFormat: (value) => {
        const date = DateTime.fromMillis(Number(value.x));
        return date.toRelative();
      },
    },
    features: ['header', 'fullscreenMode'],
  },
  render: (args) => {
    const [data, setData] = useState(generateMockData());
    useEffect(() => {
      const interval = setInterval(() => {
        setData((prevData) => {
          const value = Math.floor(Math.random() * 100);
          const nextDay = DateTime.fromMillis(
            prevData.at(-1)?.x as number,
          ).plus({ day: 1 });
          const newData = [
            ...prevData.slice(1),
            { x: nextDay.toMillis(), y: value },
          ];
          return newData;
        });
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    return <BigNumberChart {...args} data={data} />;
  },
};
