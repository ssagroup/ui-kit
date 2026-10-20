import { css, Theme } from '@emotion/react';

import { HeaderSize, HeaderTheme } from './types';

export const SIZES: Record<HeaderSize, { height: number; logo: number }> = {
  small: { height: 64, logo: 38 },
  medium: { height: 84, logo: 46 },
  large: { height: 92, logo: 46 },
};

export const MENU_WIDTH = 164;

/** From this header width up the bar shows the nav; below it, the burger. */
export const DESKTOP_MIN_WIDTH = 900;

/**
 * A container query, not a media query: the layout follows the header's own
 * width, so a Header in a narrow region of a page — or in a fixed-width
 * story frame, where Storybook's viewport does not reach — goes mobile too.
 * Same 900px as `theme.mediaQueries.md`.
 */
const desktop = `@container ssa-header (min-width: ${DESKTOP_MIN_WIDTH}px)`;

/** Design: dropdowns sit 6px below their trigger and flyouts 6px aside. */
export const MENU_OFFSET = 6;

export const resolvePalette = (theme: Theme, headerTheme: HeaderTheme) => {
  switch (headerTheme) {
    case 'dark':
      return {
        background: `linear-gradient(172deg, ${theme.colors.greyDarker} 0%, ${theme.colors.greyDark} 100%)`,
        text: theme.colors.white80,
        accent: theme.colors.blueDropdownWithSelectedItemsBorder,
        // Design: #d2d4db, which reads the same as the white80 resting
        // items on the dark bar; dimmed further so it reads as disabled.
        disabled: theme.colors.white30,
        menuBackground: theme.colors.greyGraphite,
        menuItem: theme.colors.greyBackground,
        menuItemHover: theme.colors.greyDisabled,
        menuItemOpen: theme.colors.greyDisabled,
        menuText: theme.colors.white,
        menuDisabled: theme.colors.white30,
        drawerBackground: theme.colors.greyDarker,
      };
    case 'light':
      return {
        background: theme.colors.white,
        text: theme.colors.greyDarker80,
        accent: theme.palette.primary.dark,
        disabled: theme.colors.greyFocused,
        menuBackground: theme.colors.white,
        menuItem: theme.colors.white,
        menuItemHover: theme.colors.blue6,
        menuItemOpen: theme.colors.blue12,
        menuText: theme.colors.greyDarker,
        menuDisabled: theme.colors.grey,
        drawerBackground: theme.palette.secondary.light,
      };
  }
};

export type HeaderPalette = ReturnType<typeof resolvePalette>;

const focusRing = (theme: Theme) => css`
  &:focus-visible {
    outline: 2px solid ${theme.palette.primary.main};
    outline-offset: 2px;
  }
`;

/**
 * The kit's global reset gives every element its own color, so labels and
 * currentColor icons would ignore the item's state color without this.
 */
const inheritColor = css`
  & * {
    color: inherit;
  }
`;

const resetButton = css`
  ${inheritColor};
  margin: 0;
  border: none;
  background: none;
  font: inherit;
  text-align: inherit;
  cursor: pointer;
`;

/**
 * The query container. It is the `header` itself, so consumer styles such
 * as `position: sticky` land on the outermost element; the layout that
 * the query switches lives on the bar inside.
 */
export const container = (palette: HeaderPalette) => css`
  container: ssa-header / inline-size;
  display: block;
  width: 100%;
  background: ${palette.background};
`;

export const bar = (size: HeaderSize) => css`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  column-gap: 16px;
  box-sizing: border-box;
  width: 100%;
  height: ${SIZES[size].height}px;
  padding: 0 16px;

  ${desktop} {
    grid-template-columns: auto minmax(0, 1fr) auto;
    column-gap: 24px;
    padding: 0 40px;
  }
`;

export const burger = (theme: Theme, palette: HeaderPalette) => css`
  ${resetButton};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: start;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${palette.text};

  &:hover {
    color: ${palette.accent};
  }

  ${focusRing(theme)};

  ${desktop} {
    display: none;
  }
`;

/** Holds the burger's column when there is no menu, so the logo stays centred. */
export const burgerPlaceholder = css`
  ${desktop} {
    display: none;
  }
`;

/**
 * Fixed height from the size; width follows the logo so wordmarks fit, but
 * never drops below a square, so an empty box still holds its place.
 */
export const logo = (size: HeaderSize) => css`
  display: flex;
  align-items: center;
  height: ${SIZES[size].logo}px;
  min-width: ${SIZES[size].logo}px;

  & > img,
  & > svg {
    display: block;
    max-height: 100%;
  }
`;

/**
 * The scroll container. Dropdowns are portalled, so the overflow here does
 * not clip them.
 */
export const nav = css`
  display: none;
  overflow-x: auto;
  scrollbar-width: thin;

  ${desktop} {
    display: block;
  }
`;

/** `margin: auto` centres the list while it fits and lets it scroll after. */
export const navList = css`
  display: flex;
  align-items: center;
  gap: 38px;
  width: max-content;
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

export const rightSide = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  min-width: 0;
`;

/**
 * Selected keeps the regular weight: the design's bold resizes the item and
 * shifts the whole bar as the route changes, so the state is marked by color
 * alone.
 */
export const navItem = (
  theme: Theme,
  palette: HeaderPalette,
  active: boolean,
) => css`
  ${resetButton};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;
  text-decoration: none;
  color: ${active ? palette.accent : palette.text};

  &:hover,
  &[aria-expanded='true'] {
    color: ${palette.accent};
  }

  &[aria-disabled='true'],
  &:disabled {
    color: ${palette.disabled};
    cursor: default;
  }

  ${focusRing(theme)};
`;

export const menu = (theme: Theme, palette: HeaderPalette) => css`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: ${MENU_WIDTH}px;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  border-radius: 8px;
  background: ${palette.menuBackground};
  box-shadow: -4px 4px 14px 0 ${theme.colors.greyDarker14};
`;

export const menuItem = (
  theme: Theme,
  palette: HeaderPalette,
  active: boolean,
) => css`
  ${resetButton};
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-decoration: none;
  background: ${palette.menuItem};
  color: ${active ? palette.accent : palette.menuText};

  & > span {
    flex: 1;
    min-width: 0;
  }

  &:hover {
    background: ${palette.menuItemHover};
  }

  &[aria-expanded='true'] {
    background: ${palette.menuItemOpen};
  }

  &[aria-disabled='true'],
  &:disabled {
    background: ${palette.menuItem};
    color: ${palette.menuDisabled};
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid ${theme.palette.primary.main};
    outline-offset: -2px;
  }
`;

export const drawerContent = (palette: HeaderPalette) => css`
  background: ${palette.drawerBackground};

  & > header {
    background: ${palette.drawerBackground};
  }
`;

/**
 * Chevron of a mobile group row; flips while the group is open. Pushed to the
 * row's end so every chevron shares one vertical line.
 */
export const mobileToggle = (expanded: boolean) => css`
  display: inline-flex;
  margin-left: auto;
  transform: rotate(${expanded ? 180 : 0}deg);
  transition: transform 0.15s ease;
`;
