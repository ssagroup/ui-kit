import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { CollapsibleNavBarExtendedProps } from './types';

const CollapsibleNavBarLink = styled(NavLink)<{
  navBarTheme: CollapsibleNavBarExtendedProps['theme'];
}>`
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  color: ${({ theme, navBarTheme }) =>
    navBarTheme === 'default'
      ? theme.colors.white80
      : theme.colors.greyDarker80};

  svg {
    backdrop-filter: blur(0);
  }

  & > span {
    font-weight: ${({ navBarTheme }) => navBarTheme === 'light' && 500};
    color: ${({ theme, navBarTheme }) =>
      navBarTheme === 'default'
        ? theme.colors.white80
        : theme.colors.greyDarker80};

    ${({ theme }) => theme.mediaQueries.md} {
      display: none;
    }
  }

  div > svg {
    & path {
      fill: ${({ theme, navBarTheme }) =>
        navBarTheme === 'light' && theme.colors.greyDropdownFocused};
    }
    & circle {
      stroke: ${({ theme, navBarTheme }) =>
        navBarTheme === 'light' && theme.colors.greyDropdownFocused};
    }
  }

  &.active {
    cursor: default;
    backdrop-filter: blur(0);
    filter: drop-shadow(-4px 4px 14px ${({ theme }) => theme.colors.white});
    color: ${({ theme, navBarTheme }) =>
      navBarTheme === 'default' ? theme.colors.white : theme.colors.greyDarker};
    & > span {
      font-weight: ${({ navBarTheme }) =>
        navBarTheme === 'default' ? 500 : 600};
      color: ${({ theme, navBarTheme }) =>
        navBarTheme === 'default'
          ? theme.colors.white80
          : theme.colors.greyDarker80};
    }
    div > svg {
      filter: drop-shadow(-4px 4px 14px ${({ theme }) => theme.colors.white});
      & path {
        fill: ${({ theme, navBarTheme }) =>
          navBarTheme === 'default'
            ? theme.colors.white
            : theme.colors.greyDarker};
      }
      & circle {
        stroke: ${({ theme, navBarTheme }) =>
          navBarTheme === 'default'
            ? theme.colors.white
            : theme.colors.greyDarker};
      }
    }
  }
  &:not(.active):hover {
    backdrop-filter: blur(0);
    filter: ${({ theme }) =>
      `drop-shadow(-4px 4px 14px ${theme.colors.white})`};
    color: ${({ theme, navBarTheme }) =>
      navBarTheme === 'default' ? theme.colors.white : theme.colors.greyDarker};

    div > svg {
      filter: ${({ theme }) =>
        `drop-shadow(-4px 4px 14px ${theme.colors.white})`};
      & path {
        fill: ${({ theme, navBarTheme }) =>
          navBarTheme === 'default'
            ? theme.colors.white
            : theme.colors.greyDarker};
      }
      & circle {
        stroke: ${({ theme, navBarTheme }) =>
          navBarTheme === 'default'
            ? theme.colors.white
            : theme.colors.greyDarker};
      }
    }
  }
`;

export default CollapsibleNavBarLink;
