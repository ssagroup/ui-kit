import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { Title, Description, Source } from '@storybook/addon-docs';

import { NavBar } from './NavBar';

const reactRouterDecorator = (Story) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </BrowserRouter>
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
      width: '2560px',
      height: '1600px',
    },
  },
};

export const VisibleByDefaultOnMobile = {
  component: NavBar,
  args: {
    isVisible: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

export const WideScreen = {
  component: NavBar,
  parameters: {
    viewport: {
      viewports: VIEWPORTS,
      defaultViewport: 'Laptop',
    },
  },
};
