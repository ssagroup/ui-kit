import { Fragment } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { Title, Description, Source } from '@storybook/addon-docs';

import { NavBar } from './NavBar';
import { DecoratorFunction } from '@storybook/types';
import { NavBarExtended } from './NavBarExtended';
import { INavBarExtendedProps } from './types';

type Args = Parameters<typeof NavBar>[0];

const reactRouterDecorator: DecoratorFunction<
  {
    component: typeof NavBar;
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

const Items = [
  { path: 'stats', iconName: 'stats' },
  { path: 'calendar', iconName: 'calendar' },
  { path: 'trainings', iconName: 'trainings' },
  { path: 'measurements', iconName: 'measurements' },
  { path: 'diet', iconName: 'diet' },
  { path: 'notification', iconName: 'notification' },
  { path: 'settings', iconName: 'settings' },
];

export default {
  title: 'Widgets/NavBar',
  component: NavBar,
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
    docs: {
      page: () => (
        <Fragment>
          <Title />
          <Description />
          <Source code={`<NavBar />`} />
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
} as Meta<typeof NavBar>;

export const Default = {};

const VIEWPORTS = {
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1440px',
      height: '1080px',
    },
  },
};

export const WideScreen = {
  component: NavBar,
  parameters: {
    viewport: {
      viewports: VIEWPORTS,
      defaultViewport: 'laptop',
    },
  },
};

const extendedItems: INavBarExtendedProps['items'] = [
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

export const Extended: StoryObj<typeof NavBar> = () => (
  <NavBarExtended items={extendedItems} />
);

Extended.parameters = {};
