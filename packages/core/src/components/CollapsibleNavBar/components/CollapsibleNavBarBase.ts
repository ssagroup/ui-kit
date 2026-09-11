import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import NavBarBase from '@components/NavBar/NavBarBase';
import { CollapsibleNavBarExtendedProps } from '../types';

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
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    &.opened {
      min-width: 272px;
      width: 294px;

      & > div:nth-of-type(2) {
        /* 216px of content between 32px gutters, per the design. The width
           grows with the right gutter so the rows keep their old column and
           only full-bleed content — a header picture — stops short of the
           edge. */
        width: 272px;
        padding-left: 29.5px;
        padding-right: 29.5px;
        box-sizing: border-box;
        & img {
          margin-left: 0;
        }
        /* Back to full rows: the rail's popover trigger stands down and the
           icon, label, chevron and in-place subtree return. Selectors are
           TreeView's stable class names, not DOM positions. */
        & .nav-rail-trigger,
        & .nav-rail-trigger button {
          display: none;
        }

        & .ssa-tree__row {
          justify-content: flex-start;
        }

        & .ssa-tree__icon,
        & .ssa-tree__label,
        & .ssa-tree__toggle {
          display: flex;
        }

        & .ssa-tree__group {
          display: block;
        }
      }
    }
  }
`;
