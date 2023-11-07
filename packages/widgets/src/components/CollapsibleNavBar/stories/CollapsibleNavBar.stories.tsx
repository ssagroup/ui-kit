import { Fragment } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { Title, Description, Source } from '@storybook/addon-docs';

import { DecoratorFunction } from '@storybook/types';
import { CollapsibleNavBar } from '../CollapsibleNavBar';
import { INavBarExtendedProps } from '../types';

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

export const Items: INavBarExtendedProps['items'] = [
  { path: '', iconName: 'home', iconSize: 20, title: 'Dashboard' },
  { path: 'bots', iconName: 'robot', iconSize: 24, title: 'Bots' },
  {
    prefix: 'statistics/',
    iconName: 'chart',
    iconSize: 22,
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
  { path: 'history', iconName: 'clock', iconSize: 24, title: 'History' },
  { path: 'settings', iconName: 'settings', iconSize: 20, title: 'Settings' },
];

export default {
  title: 'Widgets/CollapsibleNavBar',
  component: CollapsibleNavBar,
  parameters: {
    layout: 'fullscreen',
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
