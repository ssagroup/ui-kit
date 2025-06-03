import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from '@components/ProgressBar';
import ProgressVertical from '@components/ProgressVertical';
import ProgressLegendItem from '@components/ProgressLegendItem';
import ProgressLegend from '@components/ProgressLegend';

import Progress from './index';
import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';

type Args = Parameters<typeof ProgressBar>[0];

export default {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    color: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [
        'pink',
        'yellow',
        'green',
        'turquoise',
        'purple',
        'blueLight',
        'blue',
      ],
      control: {
        type: 'select',
      },
    },
  },
} as Meta<typeof Progress>;

export const Vertical: StoryObj = (args: Args) => {
  return (
    <div
      style={{
        display: 'flex',
        height: 200,
        width: '100%',
      }}>
      <div
        style={{
          height: 200,
          paddingInline: 20,
        }}>
        <ProgressVertical>
          <ProgressBar percentage={args.percentage} color={args.color} />
          <ProgressLegend>
            <ProgressLegendItem position="end" percentage={100}>
              3000
            </ProgressLegendItem>
            <ProgressLegendItem position="current" percentage={args.percentage}>
              1500
            </ProgressLegendItem>
            <ProgressLegendItem position="start" percentage={0}>
              0
            </ProgressLegendItem>
          </ProgressLegend>
        </ProgressVertical>
      </div>

      <div
        style={{
          height: 200,
          paddingInline: 20,
        }}>
        <ProgressVertical>
          <ProgressLegend>
            <ProgressLegendItem position="end" percentage={100}>
              <span
                style={{
                  textAlign: 'right',
                  display: 'block',
                  paddingRight: 6,
                }}>
                100%
              </span>
            </ProgressLegendItem>
            <ProgressLegendItem position="current" percentage={30}>
              <span
                style={{
                  textAlign: 'right',
                  display: 'block',
                  paddingRight: 6,
                }}>
                30%
              </span>
            </ProgressLegendItem>
            <ProgressLegendItem position="start" percentage={0}>
              <span
                style={{
                  textAlign: 'right',
                  display: 'block',
                  paddingRight: 6,
                }}>
                0%
              </span>
            </ProgressLegendItem>
          </ProgressLegend>
          <ProgressBar percentage={30} color={args.color} />
        </ProgressVertical>
      </div>

      <div
        style={{
          height: 200,
          paddingInline: 20,
        }}>
        <ProgressVertical>
          <ProgressLegend>
            <ProgressLegendItem position="current" percentage={30}>
              <span
                style={{
                  textAlign: 'right',
                  display: 'block',
                  paddingRight: 6,
                }}>
                30%
              </span>
            </ProgressLegendItem>
          </ProgressLegend>
          <ProgressBar percentage={30} color={args.color} />
        </ProgressVertical>
      </div>

      <div
        style={{
          height: 200,
          paddingInline: 20,
        }}>
        <ProgressVertical>
          <ProgressBar percentage={30} color={args.color} />
          <ProgressLegend>
            <ProgressLegendItem position="current" percentage={30}>
              <span
                style={{
                  textAlign: 'right',
                  display: 'block',
                  paddingRight: 6,
                }}>
                30%
              </span>
            </ProgressLegendItem>
          </ProgressLegend>
        </ProgressVertical>
      </div>

      <div
        style={{
          height: 200,
          paddingInline: 20,
        }}>
        <ProgressVertical>
          <ProgressBar percentage={30} color={args.color} />
        </ProgressVertical>
      </div>
    </div>
  );
};
Vertical.args = {
  percentage: 30,
  color: 'blue',
};

export const Horizontal: StoryObj = (args: Args) => {
  return (
    <div>
      <div
        style={{
          paddingBlock: 20,
        }}>
        <Progress>
          <ProgressLegend>
            <ProgressLegendItem percentage={80}> 80% </ProgressLegendItem>
          </ProgressLegend>
          <ProgressBar percentage={args.percentage} color={args.color} />
        </Progress>
      </div>

      <div
        style={{
          paddingBlock: 20,
        }}>
        <Progress>
          <ProgressBar percentage={60} color={args.color} />
          <ProgressLegend>
            <ProgressLegendItem percentage={60}> 60% </ProgressLegendItem>
          </ProgressLegend>
        </Progress>
      </div>

      <div
        style={{
          paddingBlock: 20,
        }}>
        <Progress>
          <ProgressBar percentage={args.percentage} color={args.color} />
        </Progress>
      </div>

      <div
        style={{
          paddingBlock: 20,
        }}>
        <Progress>
          <ProgressBar percentage={45} color={args.color} />
          <ProgressLegend>
            <ProgressLegendItem position="start" percentage={0}>
              {' '}
              0%{' '}
            </ProgressLegendItem>
            <ProgressLegendItem position="current" percentage={45}>
              {' '}
              45%{' '}
            </ProgressLegendItem>
            <ProgressLegendItem position="end" percentage={100}>
              {' '}
              100%{' '}
            </ProgressLegendItem>
          </ProgressLegend>
        </Progress>
      </div>
    </div>
  );
};
Horizontal.args = {
  percentage: 80,
  color: 'blue',
};

export const WithTooltip: StoryObj = (args: Args) => (
  <Progress>
    <Tooltip
      enableHover
      enableClientPoint
      enableClick={false}
      hasArrow={false}
      placement="right-start">
      <TooltipTrigger>
        <ProgressBar percentage={args.percentage} color={args.color} />
      </TooltipTrigger>
      <TooltipContent style={{ padding: 8 }}>
        <span>{args.percentage}% completed</span>
      </TooltipContent>
    </Tooltip>
  </Progress>
);
WithTooltip.args = {
  percentage: 80,
  color: 'blue',
};
