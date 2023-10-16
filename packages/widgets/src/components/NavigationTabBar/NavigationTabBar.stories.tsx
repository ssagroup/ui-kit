import { MemoryRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Meta } from '@storybook/react';

import { NavigationTabBar } from './NavigationTabBar';

const links = [
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
    to: '/history',
    children: 'History',
  },
  {
    id: 'monitor',
    to: '/monitor',
    children: 'Monitor',
  },
];

const RoutePlaceholder = ({ children }: { children: React.ReactNode }) => (
  <div>Current route: {children}</div>
);

export default {
  title: 'Widgets/NavigationTabBar',
  component: NavigationTabBar,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#F5F5F5', width: '562px' }}>
        <MemoryRouter initialEntries={[links[0].to]}>
          <Routes>
            <Route
              element={
                <div>
                  <Story />
                  <div style={{ marginTop: '25px' }}>
                    <Outlet />
                  </div>
                </div>
              }>
              {links.map((link, index) => (
                <Route
                  key={index}
                  path={link.to}
                  element={<RoutePlaceholder>{link.children}</RoutePlaceholder>}
                />
              ))}
            </Route>
          </Routes>
        </MemoryRouter>
      </div>
    ),
  ],
  args: {
    links,
  },
} as Meta<typeof NavigationTabBar>;

export const Default = {};
