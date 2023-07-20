import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { Icon } from '@ssa-ui-kit/core';

import NavBarBase from './NavBarBase';
import NavBarWrapper from './NavBarWrapper';
import NavBarList from './NavBarList';
import NavBarItem from './NavBarItem';
import NavBarLink from './NavBarLink';
import NavToggle from './NavToggle';

/**
 *
 * UI Component that shows the navigation bar
 */
export const NavBar = () => {
  const { pathname } = useLocation();
  const theme = useTheme();

  return (
    <NavBarBase>
      <input type="checkbox" id="nav" />

      <NavToggle />

      <NavBarWrapper>
        <NavBarList>
          <NavBarItem>
            <NavBarLink to="/" active={pathname === '/'}>
              <Icon name="home" color={theme.colors.grey} />
            </NavBarLink>
          </NavBarItem>
          <NavBarItem>
            <NavBarLink to="/stats" active={pathname === '/stats'}>
              <Icon name="stats" color={theme.colors.grey} />
            </NavBarLink>
          </NavBarItem>
          <NavBarItem>
            <NavBarLink to="/calendar" active={pathname === '/calendar'}>
              <Icon name="calendar" color={theme.colors.grey} />
            </NavBarLink>
          </NavBarItem>
          <NavBarItem>
            <NavBarLink to="/trainings" active={pathname === '/trainings'}>
              <Icon name="trainings" color={theme.colors.grey} />
            </NavBarLink>
          </NavBarItem>
          <NavBarItem>
            <NavBarLink
              to="/measurements"
              active={pathname === '/measurements'}>
              <Icon name="measurements" color={theme.colors.grey} />
            </NavBarLink>
          </NavBarItem>
          <NavBarItem>
            <NavBarLink to="/diet" active={pathname === '/diet'}>
              <Icon name="diet" color={theme.colors.grey} />
            </NavBarLink>
          </NavBarItem>
          <NavBarItem>
            <NavBarLink
              to="/notification"
              active={pathname === '/notification'}>
              <Icon name="notification" color={theme.colors.grey} />
            </NavBarLink>
          </NavBarItem>
          <NavBarItem>
            <NavBarLink to="/settings" active={pathname === '/settings'}>
              <Icon name="settings" color={theme.colors.grey} />
            </NavBarLink>
          </NavBarItem>
        </NavBarList>
      </NavBarWrapper>
    </NavBarBase>
  );
};
