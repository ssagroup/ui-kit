import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Meta } from '@storybook/react';

import { NavigationTabBar } from './NavigationTabBar';

export default {
  title: 'Widgets/NavigationTabBar',
  component: NavigationTabBar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Story />} />
        </Routes>
      </BrowserRouter>
    ),
  ],
  args: {
    links: [
      {
        id: 'information',
        to: '/information',
        children: 'Information',
      },
      {
        id: 'configuration',
        to: '/configuration',
        children: 'Configuration',
      },
      {
        id: 'logs',
        to: '/logs',
        children: 'Logs',
      },
      {
        id: 'history',
        to: '/History',
        children: 'History',
      },
      {
        id: 'monitor',
        to: '/Monitor',
        children: 'Monitor',
      },
    ],
  },
} as Meta<typeof NavigationTabBar>;

export const Default = {};
