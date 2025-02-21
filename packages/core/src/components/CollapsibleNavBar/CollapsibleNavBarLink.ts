import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { CollapsibleNavBarExtendedProps } from './types';

const CollapsibleNavBarLink = styled(NavLink)<{
  navbartheme: CollapsibleNavBarExtendedProps['theme'];
  ['data-customicon']?: boolean;
}>`
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  color: ${({ theme, navbartheme }) =>
    navbartheme === 'default' ? theme.colors.white : theme.colors.greyDarker};

  svg {
    backdrop-filter: blur(0);
  }

  & > span {
    font-weight: ${({ navbartheme }) => navbartheme === 'light' && 500};
    color: ${({ theme, navbartheme }) =>
      navbartheme === 'default' ? theme.colors.white : theme.colors.greyDarker};

    ${({ theme }) => theme.mediaQueries.md} {
      display: none;
    }
  }

  div > svg {
    & path {
      fill: ${({ theme, navbartheme, ...rest }) =>
        navbartheme === 'light' &&
        !rest['data-customicon'] &&
        theme.colors.greyDropdownFocused};
    }
    & circle {
      stroke: ${({ theme, navbartheme, ...rest }) =>
        navbartheme === 'light' &&
        !rest['data-customicon'] &&
        theme.colors.greyDropdownFocused};
    }
  }

  &.active {
    cursor: default;
    backdrop-filter: blur(0);
    font-weight: 900;
    filter: ${({ navbartheme, theme }) =>
      navbartheme === 'default'
        ? `drop-shadow(-4px 4px 14px ${theme.colors.white})`
        : `drop-shadow(-4px 4px 14px ${theme.colors.greyDropdownFocused})`};
    color: ${({ theme, navbartheme }) =>
      navbartheme === 'default'
        ? theme.colors.white80
        : theme.colors.greyDarker80};
    & > span {
      font-weight: 900;
      color: ${({ theme, navbartheme }) =>
        navbartheme === 'default'
          ? theme.colors.white80
          : theme.colors.greyDarker80};
    }
    div > svg {
      filter: drop-shadow(-4px 4px 14px ${({ theme }) => theme.colors.white});
      & path {
        fill: ${({ theme, navbartheme, ...rest }) =>
          !rest['data-customicon'] && navbartheme === 'default'
            ? theme.colors.white
            : theme.colors.greyDarker};
      }
      & circle {
        stroke: ${({ theme, navbartheme, ...rest }) =>
          !rest['data-customicon'] && navbartheme === 'default'
            ? theme.colors.white
            : theme.colors.greyDarker};
      }
    }
  }
  &:not(.active):hover {
    backdrop-filter: blur(0);
    filter: ${({ theme }) =>
      `drop-shadow(-4px 4px 14px ${theme.colors.white})`};
    color: ${({ theme, navbartheme }) =>
      navbartheme === 'default' ? theme.colors.white : theme.colors.greyDarker};

    div > svg {
      filter: ${({ theme }) =>
        `drop-shadow(-4px 4px 14px ${theme.colors.white})`};
      & path {
        fill: ${({ theme, navbartheme }) =>
          navbartheme === 'default'
            ? theme.colors.white
            : theme.colors.greyDarker};
      }
      & circle {
        stroke: ${({ theme, navbartheme }) =>
          navbartheme === 'default'
            ? theme.colors.white
            : theme.colors.greyDarker};
      }
    }
  }
`;

export default CollapsibleNavBarLink;
