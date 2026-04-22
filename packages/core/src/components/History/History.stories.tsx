import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { css } from '@emotion/react';

import { HistoryProps } from './types';
import { History } from './index';

const meta = {
  title: 'Components/History',
  component: History,
  argTypes: {
    sx: {
      control: { disable: true },
    },
    items: {
      control: { disable: true },
    },
    defaultColor: {
      control: 'color',
    },
    lineColor: {
      control: 'color',
    },
    dateWidth: {
      control: { type: 'number' },
    },
    circleSize: {
      control: { type: 'number' },
    },
  },
  parameters: {
    docs: {
      source: {
        // Avoid dynamic source extraction on very large inline JSX stories (can freeze the tab).
        type: 'code',
      },
    },
  },
} satisfies Meta<typeof History>;

export default meta;

const BLUE = '#4178e1';
const TEAL = '#4BCAB0';
const ORANGE = '#F59E0B';

const title = (text: string) => (
  <span
    css={css`
      display: block;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      color: #111;
    `}>
    {text}
  </span>
);

const subtitle = (text: string) => (
  <span
    css={css`
      display: block;
      font-size: 14px;
      line-height: 20px;
      color: #555;
    `}>
    {text}
  </span>
);

const tag = (text: string, color: string, bg: string) => (
  <span
    css={css`
      display: inline-flex;
      align-items: center;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      color: ${color};
      background-color: ${bg};
    `}>
    {text}
  </span>
);

const itemsArr = [
  {
    date: '01.06.2025',
    color: BLUE,
    content: title('Profile was Created'),
  },
  {
    date: '02.06.2025',
    color: BLUE,
    content: title('Start of Work in The Company'),
  },
  {
    date: '02.06.2025',
    color: ORANGE,
    content: (
      <div>
        {title('Status')}
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 4px;
          `}>
          {tag('on trial', '#16a34a', '#dcfce7')}
          <span
            css={css`
              color: #888;
              font-size: 14px;
            `}></span>
        </div>
      </div>
    ),
  },
  {
    date: '02.09.2025',
    color: BLUE,
    content: title('End of Probation Period'),
  },
  {
    date: '02.09.2025',
    color: ORANGE,
    content: (
      <div>
        {title('Status')}
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 4px;
          `}>
          {tag('on trial', '#16a34a', '#dcfce7')}
          <span
            css={css`
              color: #888;
              font-size: 14px;
            `}>
            ›
          </span>
          {tag('active', '#d97706', '#fef3c7')}
        </div>
      </div>
    ),
  },
  {
    date: '10.07.2026',
    color: TEAL,
    content: (
      <>
        {title('New Certification')}
        {subtitle('Microsoft Certified Professional')}
      </>
    ),
  },
  {
    date: '10.10.2026',
    color: TEAL,
    content: (
      <>
        {title('New Certification')}
        {subtitle('Microsoft Certified Solutions Associate: Web Applications')}
      </>
    ),
  },
  {
    date: '15.10.2026',
    color: BLUE,
    content: (
      <>
        {title('New Project Started')}
        {subtitle('SaaS Framework')}
      </>
    ),
  },
  {
    date: '01.11.2026',
    color: BLUE,
    content: (
      <div>
        {title('Work Schedule')}
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #555;
          `}>
          <span>Full-time</span>
          <span
            css={css`
              color: #888;
            `}>
            ›
          </span>
          <span>Part-time (Availability 50%)</span>
        </div>
      </div>
    ),
  },
  {
    date: '01.11.2026',
    color: '#74B9E8',
    content: (
      <div>
        {title('Utilization')}
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #555;
          `}>
          100
          <span
            css={css`
              color: #888;
            `}>
            › 50
          </span>
        </div>
      </div>
    ),
  },
];

export const Default: StoryObj = ({
  defaultColor,
  lineColor,
  dateWidth,
  circleSize,
}: HistoryProps) => (
  <div style={{ width: 560, padding: 24 }}>
    <History
      defaultColor={defaultColor}
      lineColor={lineColor}
      dateWidth={dateWidth}
      circleSize={circleSize}
      items={itemsArr}
    />
  </div>
);

Default.args = {
  dateWidth: 120,
  circleSize: 12,
};
Default.storyName = 'History';

export const CustomConnectorColor: StoryObj = ({
  defaultColor,
  lineColor,
  dateWidth,
  circleSize,
}: HistoryProps) => (
  <div style={{ width: 560, padding: 24 }}>
    <History
      defaultColor={defaultColor}
      lineColor={lineColor}
      dateWidth={dateWidth}
      circleSize={circleSize}
      items={itemsArr}
    />
  </div>
);

CustomConnectorColor.args = {
  dateWidth: 120,
  circleSize: 12,
  lineColor: ORANGE,
};
CustomConnectorColor.storyName = 'Custom Connector Color';
CustomConnectorColor.parameters = {
  docs: {
    description: {
      story:
        'Use the `lineColor` prop to override the default connector line color. By default the connector uses `theme.colors.greyFocused`.',
    },
  },
};
