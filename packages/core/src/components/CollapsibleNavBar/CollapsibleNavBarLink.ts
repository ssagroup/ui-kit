import styled from '@emotion/styled';
import NavBarLink from '@components/NavBar/NavBarLink';
import { CollapsibleNavBarExtendedProps } from './types';

const CollapsibleNavBarLink = styled(NavBarLink)<{
  navBarTheme: CollapsibleNavBarExtendedProps['theme'];
}>`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.colors.white80};

  svg {
    backdrop-filter: blur(0);
  }

  &:not(.active):hover {
    backdrop-filter: blur(0);
    filter: ${({ theme }) =>
      `drop-shadow(-4px 4px 14px ${theme.colors.white})`};
    color: ${({ theme }) => theme.colors.white};

    div > svg {
      & path {
        fill: ${({ theme }) => theme.colors.white};
      }
      & circle {
        stroke: ${({ theme }) => theme.colors.white};
      }
    }
  }

  & > span {
    color: ${({ theme, navBarTheme }) =>
      navBarTheme === 'default'
        ? theme.colors.white80
        : theme.colors.greyDarker};

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
    & > span {
      color: ${({ theme, navBarTheme }) =>
        navBarTheme === 'default'
          ? theme.colors.white80
          : theme.colors.greyDarker};
    }
    div > svg {
      & path {
        fill: ${({ theme, navBarTheme }) =>
          navBarTheme === 'default'
            ? theme.colors.white
            : theme.colors.greyDarker};
      }
    }
  }
`;

export default CollapsibleNavBarLink;
