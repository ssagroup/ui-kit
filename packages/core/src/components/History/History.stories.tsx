import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { css } from '@emotion/react';

import { HistoryProps } from './types';
import History from './index';

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

/*
 *
 * EXAMPLE 1
 * Default history with simple text content
 */

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
      items={[
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
          date: '02.09.2025',
          color: BLUE,
          content: title('End of Probation Period'),
        },
        {
          date: '10.07.2023',
          color: TEAL,
          content: (
            <>
              {title('New Certification')}
              {subtitle('Microsoft Certified Professional')}
            </>
          ),
        },
        {
          date: '10.07.2023',
          color: TEAL,
          content: (
            <>
              {title('New Certification')}
              {subtitle(
                'Microsoft Certified Solutions Associate: Web Applications',
              )}
            </>
          ),
        },
        {
          date: '10.07.2023',
          color: TEAL,
          content: (
            <>
              {title('New Course')}
              {subtitle('Java Android Development')}
            </>
          ),
        },
        {
          date: '10.07.2023',
          color: BLUE,
          content: (
            <>
              {title('New Project Started')}
              {subtitle('SaaS Framework')}
            </>
          ),
        },
        {
          date: '10.07.2023',
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
                {tag('active', '#16a34a', '#dcfce7')}
                <span
                  css={css`
                    color: #888;
                    font-size: 14px;
                  `}>
                  ›
                </span>
                {tag('on trial', '#d97706', '#fef3c7')}
              </div>
            </div>
          ),
        },
        {
          date: '10.07.2023',
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
          date: '10.07.2023',
          color: TEAL,
          content: (
            <>
              {title('New Exam')}
              {subtitle('Developing ASP.NET MVC Web Application')}
            </>
          ),
        },
        {
          date: '10.07.2023',
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
                <span>100</span>
                <span
                  css={css`
                    color: #888;
                  `}>
                  ›
                </span>
                <span>50</span>
              </div>
            </div>
          ),
        },
      ]}
    />
  </div>
);

Default.args = {
  defaultColor: BLUE,
  dateWidth: 120,
  circleSize: 12,
};
Default.storyName = 'History';

/*
 *
 * EXAMPLE 2
 * Custom line color and larger circles
 */

export const CustomAppearance: StoryObj = () => (
  <div style={{ width: 480, padding: 24 }}>
    <History
      defaultColor="#6366f1"
      lineColor="#c7d2fe"
      circleSize={14}
      dateWidth={110}
      items={[
        {
          date: '15.01.2026',
          content: title('Account Created'),
        },
        {
          date: '20.01.2026',
          color: '#10b981',
          content: (
            <>
              {title('Onboarding Completed')}
              {subtitle('All required steps finished')}
            </>
          ),
        },
        {
          date: '01.02.2026',
          color: '#f59e0b',
          content: (
            <>
              {title('Plan Upgraded')}
              {subtitle('Free → Professional')}
            </>
          ),
        },
        {
          date: '10.03.2026',
          color: '#ef4444',
          content: (
            <>
              {title('Subscription Cancelled')}
              {subtitle('Reason: switching provider')}
            </>
          ),
        },
      ]}
    />
  </div>
);

CustomAppearance.storyName = 'History custom appearance';
CustomAppearance.parameters = {
  controls: { disable: true },
};
