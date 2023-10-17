import { MemoryRouter, Route, Routes, Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { Meta, StoryObj } from '@storybook/react';

import { NavigationTabBar, NavigationTabBarProps } from './index';

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
      <div style={{ width: '562px', padding: '10px' }}>
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

export const WithCustomStyles: StoryObj<typeof NavigationTabBar> = (
  args: NavigationTabBarProps,
) => {
  /**
   * Colors are from here: https://paletadecolores.online/en/colors/846ef3/
   * */
  return (
    <NavigationTabBar
      {...args}
      css={css`
        a {
          color: #846ef3;
          background-color: #dfbcfc;
          padding: 4px 8px;
          border-radius: 6px;
        }

        a.active {
          color: #7560e3;
          text-decoration: underline solid #ddf36e;
          text-underline-offset: 2px;
        }
      `}
    />
  );
};
WithCustomStyles.args = {};
