import { useId } from 'react';
import { useTheme } from '@emotion/react';

import { Icon } from '@ssa-ui-kit/core';

import NavBarBase from './NavBarBase';
import NavBarWrapper from './NavBarWrapper';
import NavBarList from './NavBarList';
import NavBarItem from './NavBarItem';
import NavBarLink from './NavBarLink';
import NavToggle from './NavToggle';

import { INavBarProps } from './types';

/**
 * UI Component that shows the navigation bar
 */
export const NavBar = ({ items }: INavBarProps) => {
  const toggleId = useId();
  const theme = useTheme();

  return (
    <NavBarBase>
      <input type="checkbox" id={toggleId} />

      <NavToggle htmlFor={toggleId} />

      <NavBarWrapper>
        <NavBarList>
          {items.map(({ path, iconName }) => (
            <NavBarItem key={path}>
              <NavBarLink to={'/' + path}>
                <Icon name={iconName} color={theme.colors.grey} />
              </NavBarLink>
            </NavBarItem>
          ))}
        </NavBarList>
      </NavBarWrapper>
    </NavBarBase>
  );
};
