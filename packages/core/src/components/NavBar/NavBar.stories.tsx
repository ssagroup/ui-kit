import { Fragment } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Description, Primary, Subtitle, Title } from '@storybook/addon-docs';
import { Decorator, Meta } from '@storybook/react-webpack5';

import { NavBar } from './NavBar';

const reactRouterDecorator: Decorator = (Story) => {
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
    source: {
      type: 'code',
    },
    docs: {
      inlineStories: false,
      page: () => (
        <Fragment>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
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
