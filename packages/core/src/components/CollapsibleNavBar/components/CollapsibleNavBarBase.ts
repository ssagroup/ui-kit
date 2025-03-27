import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import NavBarBase from '@components/NavBar/NavBarBase';
import { CollapsibleNavBarExtendedProps } from '../types';

// TODO: refactor this
const popupIconsToggle = (isVisible: boolean) => css`
  & a > button {
    display: ${isVisible ? 'block' : 'none'};
  }
  & > div > div > div > div:first-of-type {
    display: ${isVisible ? 'block' : 'none'};
    & > button {
      display: ${isVisible ? 'block' : 'none'};
    }
  }
`;

// TODO: refactor this
const staticIconsToggle = (isVisible: boolean) => css`
  & a > div {
    display: ${isVisible ? 'flex' : 'none'};
  }
  & > div > div > div > div:nth-of-type(2) {
    display: ${isVisible ? 'flex' : 'none'};
  }
  & > div > div > div:nth-of-type(2) {
    display: ${isVisible ? 'block' : 'none'};
  }
`;

const backgroundByTheme = (
  theme: Theme,
  navBarTheme: CollapsibleNavBarExtendedProps['theme'],
) => css`
  background: ${navBarTheme === 'default'
    ? `linear-gradient(
      108.3deg,
      ${theme.colors.greyDarker} -0.36%,
      ${theme.colors.greyDarker} 100%
    );`
    : `linear-gradient(
        143deg,
        #e7ebf1 -4.16%,
        #d7d9dd 29%,
        #cccdd2 63.74%,
        #e1e4ea 87.68%
      );`};
`;

export const CollapsibleNavBarBase = styled(NavBarBase)<{
  'data-theme': CollapsibleNavBarExtendedProps['theme'];
}>`
  padding: 15px 0 0 15px;
  position: absolute;

  & li {
    ${popupIconsToggle(false)}
  }

  &.opened {
    ${({ theme, ...rest }) => backgroundByTheme(theme, rest['data-theme'])}
    align-items: flex-start;
    min-width: 100%;
    width: 100%;
    height: 100%;

    & > div:nth-of-type(2) {
      ${({ theme }) => theme.mediaQueries.upToMd} {
        background: none;
      }
    }

    ${({ theme }) => theme.mediaQueries.md} {
      height: initial;
    }
  }

  & > input[type='checkbox'] {
    &:checked {
      & ~ div:first-of-type {
        background-color: ${({ theme, ...rest }) =>
          rest['data-theme'] === 'default'
            ? '#4a4d51'
            : theme.colors.greyFocused};

        & label span {
          opacity: 1;
          transform: rotate(45deg) translate(-5px, -9px);
          background: ${({ theme, ...rest }) =>
            rest['data-theme'] === 'default'
              ? theme.colors.white
              : theme.colors.greyDarker};

          &:nth-last-of-type(3) {
            opacity: 0;
            transform: rotate(0deg) scale(0.2, 0.2);
          }

          &:nth-last-of-type(2) {
            transform: rotate(-45deg) translate(-2px, 8px);
          }
        }
      }

      & ~ div:nth-of-type(2) {
        display: block;
        border-radius: 0;
        height: calc(100vh - 60px);

        ${({ theme }) => theme.mediaQueries.xlg} {
          border-radius: 0;
          height: 100vh;
        }
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 85px;
    padding: 0;
    position: static;
    z-index: 0;
    min-width: unset;

    & li {
      ${staticIconsToggle(false)}
      ${popupIconsToggle(true)}
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    &.opened {
      min-width: 240px;
      width: 291px;

      & > div:nth-of-type(2) {
        width: 240px;
        padding-left: 29.5px;
        & img {
          margin-left: 0;
        }
        & li {
          justify-content: flex-start;
          & button {
            display: flex;
          }
          ${staticIconsToggle(true)}
          ${popupIconsToggle(false)}

          & > a > span {
            display: block;
          }

          & div > div > div:nth-of-type(2) {
            display: flex;
          }
        }
      }
    }
  }
`;
