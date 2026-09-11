import { Theme, css } from '@emotion/react';
import { CollapsibleNavBarExtendedProps } from './types';

export const LogoWrapper = (theme: Theme) => css`
  position: relative;
  ${theme.mediaQueries.md} {
    justify-content: center;
  }
  ${theme.mediaQueries.lg} {
    justify-content: flex-start;
  }
`;

export const ContentToggle =
  (navBarTheme: CollapsibleNavBarExtendedProps['theme'], isChecked: boolean) =>
  (theme: Theme) => css`
    display: none;
    position: absolute;
    cursor: pointer;
    right: -17px;
    width: 34px;
    height: 34px;
    background: ${navBarTheme === 'default'
      ? theme.colors.greyLighter
      : theme.colors.greyFocused};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    & input {
      display: none;
    }
    & svg {
      cursor: pointer;
    }
    ${theme.mediaQueries.lg} {
      display: flex;
    }
    ${theme.mediaQueries.xlg} {
      display: flex;
      right: ${isChecked ? '-32px' : '-17px'};
    }
  `;

/**
 * The nav's own layer on top of `TreeView`.
 *
 * Everything here hangs off `TreeView`'s stable class names rather than the
 * DOM's shape. The old rules were positional (`& > div > div > div >
 * div:nth-of-type(2)`) and carried two `TODO: refactor this` markers; they
 * broke whenever a wrapper moved.
 *
 * Three layouts share these rows:
 *
 * - **mobile** (below `md`) — the nav is a full-screen overlay: icon, label,
 *   chevron and the in-place subtree are all visible, the rail popover is not.
 * - **rail** (`md` and up, closed) — 85px of icons. Only the popover trigger
 *   shows; it carries the icon and reveals the subtree as a flyout.
 * - **expanded** (`lg` and up, `.opened`) — back to the full rows.
 */
export const NavTreeStyles = (theme: Theme) => css`
  /* Design: an 8px band around each top-level row, and 8px between rows. */
  & .ssa-tree__item {
    padding: 8px 0;

    &:first-of-type {
      padding-top: 0;
    }
    &:last-of-type {
      padding-bottom: 0;
    }
  }

  & .ssa-tree__item--level-1 + .ssa-tree__item--level-1 {
    margin-top: 8px;
  }

  & .ssa-tree__row {
    gap: 20px;
    /* The row is a link or a group header, never a form control. */
    text-align: left;
  }

  /* The popover trigger only earns its place in the collapsed rail. The
     button is named explicitly because NavBarBase hides every button by
     default, so each visible control has to opt back in. */
  & .nav-rail-trigger,
  & .nav-rail-trigger button {
    display: none;
  }

  ${theme.mediaQueries.md} {
    & .ssa-tree__row {
      justify-content: center;
      padding-left: 0;
    }

    & .nav-rail-trigger {
      display: block;
    }

    & .nav-rail-trigger button {
      display: inline-flex;
    }

    & .ssa-tree__icon,
    & .ssa-tree__label,
    & .ssa-tree__toggle,
    & .ssa-tree__group {
      display: none;
    }
  }

  /* Last, so it also beats the rail's roomier top-level spacing: sub-routes
     sit closer together than top-level entries, as they did under the
     accordion. */
  & .ssa-tree__item--level-2,
  & .ssa-tree__item--level-3 {
    padding: 4px 0;
  }
`;

export const NavToggle = (isExpanded: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  transform: rotate(${isExpanded ? 180 : 0}deg);
  transition: transform 0.2s ease;
`;

/** The rail flyout's list of sub-routes. */
export const PopoverList = (theme: Theme) => css`
  display: flex;
  flex-direction: column;

  & > a {
    text-decoration: none;
    padding: 5px;
    white-space: nowrap;
    font-size: 12px;

    &[data-navbartheme='default'] {
      color: ${theme.colors.white};
      font-weight: 400;
    }

    &[data-navbartheme='light'] {
      color: ${theme.colors.greyDarker80};
      font-weight: 500;
    }

    &:hover {
      background: ${theme.colors.greyOutline};
    }
  }
`;

/** Holds the icon column open on rows that have no icon of their own. */
export const IconSpacer = css`
  display: flex;
  flex-shrink: 0;
  width: 25px;
  height: 26px;
`;

/**
 * Header block — headline, optional picture, optional person.
 *
 * Measurements come from the design's Type5 variant: an 8px stack inside the
 * 216px content column — headline at Title 2 Bold (20/28), the name a size up
 * at 24/24 on a 30px row, the picture square with a 12px radius.
 */
export const Header = (theme: Theme) => css`
  display: none;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 0;
  box-sizing: border-box;

  ${theme.mediaQueries.lg} {
    /* Only the expanded panel has room; the rail shows icons alone. */
    .opened & {
      display: flex;
    }
  }
`;

export const HeaderTitle = (theme: Theme) => css`
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: ${theme.colors.greyDarker};
  word-break: break-word;
`;

export const HeaderPerson = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const HeaderImage = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HeaderName = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 0;
  width: 100%;

  & > span {
    flex: 1 0 0;
    min-width: 0;
    font-family: 'Manrope', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    color: ${theme.colors.greyDarker};
    word-break: break-word;
  }
`;
