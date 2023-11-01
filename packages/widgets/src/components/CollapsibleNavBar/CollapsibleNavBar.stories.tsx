import { Fragment } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { Title, Description, Source } from '@storybook/addon-docs';

import { DecoratorFunction } from '@storybook/types';
import { CollapsibleNavBar } from './CollapsibleNavBar';
import { INavBarExtendedProps } from './types';

type Args = Parameters<typeof CollapsibleNavBar>[0];

const reactRouterDecorator: DecoratorFunction<
  {
    component: typeof CollapsibleNavBar;
    storyResult: React.ReactElement;
    canvasElement: unknown;
  },
  Args
> = (Story) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

const Items: INavBarExtendedProps['items'] = [
  { path: '', iconName: 'home', title: 'Dashboard' },
  { path: 'bots', iconName: 'robot', title: 'Bots' },
  {
    prefix: 'statistics/',
    iconName: 'chart',
    title: 'Statistics',
    items: [
      { path: 'balance', title: 'Balance' },
      { path: 'max-in-work', title: 'Max in Work' },
      { path: 'orders', title: 'Orders' },
      { path: 'pnl', title: 'PNL' },
      { path: 'turnover', title: 'Turnover' },
      { path: 'hourly-pnl', title: 'Hourly PNL' },
    ],
  },
  { path: 'history', iconName: 'clock', title: 'History' },
  { path: 'settings', iconName: 'settings', title: 'Settings' },
];

export default {
  title: 'Widgets/CollapsibleNavBar',
  component: CollapsibleNavBar,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
    docs: {
      page: () => (
        <Fragment>
          <Title />
          <Description />
          <Source code={`<CollapsibleNavBar />`} />
        </Fragment>
      ),
    },
  },
  decorators: [
    reactRouterDecorator,
    (Story) => (
      <div style={{ height: '100vh', position: 'relative' }}>{Story()}</div>
    ),
  ],
  args: {
    items: Items,
  },
} as Meta<typeof CollapsibleNavBar>;

export const Default = {};
