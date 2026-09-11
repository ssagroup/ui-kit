import { CSSObject, css } from '@emotion/react';

import theme from '@themes/main';

import { TreeLevel, TreeViewProps } from './types';

type TreeTheme = NonNullable<TreeViewProps['theme']>;

/**
 * Row colours per theme.
 *
 * `light` is straight from the design: `system/label/secondary` at rest,
 * `system/label/primary` once the row is engaged, `system/primary/dark` for
 * the selected row. `dark` is the sidebar palette, for `CollapsibleNavBar`.
 */
type RowColors = {
  rest?: string;
  engaged?: string;
  selected?: string;
  icon?: string;
};

const ROW_COLORS: Record<TreeTheme, RowColors> = {
  light: {
    rest: theme.colors.greyDarker80,
    engaged: theme.colors.greyDarker,
    selected: theme.palette.primary.dark,
    icon: theme.colors.greyDarker80,
  },
  dark: {
    rest: theme.colors.white80,
    engaged: theme.colors.white,
    selected: theme.colors.blueCool,
    icon: theme.colors.white80,
  },
};

/** Level 1 sits a weight above the deeper levels, at rest and when engaged. */
const REST_WEIGHT: Record<TreeLevel, number> = { 1: 600, 2: 500, 3: 500 };
const ENGAGED_WEIGHT: Record<TreeLevel, number> = { 1: 700, 2: 600, 3: 600 };

export const ICON_SIZE = 24;
export const TOGGLE_SIZE = 20;

export const root = css`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`;

export const group = css`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`;

export const item = css`
  list-style: none;
  width: 100%;

  &:focus {
    outline: none;
  }

  &:focus-visible > .ssa-tree__row {
    outline: 2px solid ${theme.palette.primary.main};
    outline-offset: -2px;
    border-radius: 4px;
  }
`;

export const row = (
  navTheme: TreeTheme,
  level: TreeLevel,
  indent: number,
  state: {
    isSelected: boolean;
    isEngaged: boolean;
    isDisabled: boolean;
    activeColor?: string;
  },
): CSSObject => {
  const { isSelected, isEngaged, isDisabled, activeColor } = state;
  // `activeColor` replaces only the selected colour; rest, hover and the
  // engaged path stay with the theme.
  const colors = activeColor
    ? { ...ROW_COLORS[navTheme], selected: activeColor }
    : ROW_COLORS[navTheme];

  return {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    padding: '8px 0',
    paddingLeft: indent || undefined,
    boxSizing: 'border-box',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    textDecoration: 'none',
    fontFamily: "'Manrope', sans-serif",
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 0,
    cursor: isDisabled ? 'default' : 'pointer',
    opacity: isDisabled ? 0.4 : 1,
    pointerEvents: isDisabled ? 'none' : undefined,
    // Weight moves only on selection and on the selected path — both are
    // navigation-driven. Hover changes colour alone, so pointing at a row can
    // never reflow it.
    fontWeight: isSelected
      ? 700
      : isEngaged
        ? ENGAGED_WEIGHT[level]
        : REST_WEIGHT[level],
    color: isSelected
      ? colors.selected
      : isEngaged
        ? colors.engaged
        : colors.rest,
    transition: 'color 0.15s ease',

    // The kit's global stylesheet carries a `* { color: … }` rule, which beats
    // plain inheritance on every descendant — so the row's colour has to be
    // handed down explicitly rather than simply inherited. A custom row that
    // uses its own markup needs `color: inherit` for the same reason.
    '& .ssa-tree__label, & .ssa-tree__toggle': {
      color: 'inherit',
    },

    // `currentColor` is no help here for the same reason: the `*` rule resets
    // `color` on the path itself, so the resolved value has to be written out.
    '& .ssa-tree__toggle svg path': {
      fill: isSelected
        ? colors.selected
        : isEngaged
          ? colors.engaged
          : colors.rest,
    },

    // Kit icons paint with `fill` on paths and `stroke` on circles, so both
    // are driven here rather than through Icon's `color` prop — hover has to
    // move the colour without a re-render.
    '& .ssa-tree__icon svg': {
      '& path': {
        fill: isSelected || isEngaged ? colors.engaged : colors.icon,
      },
      '& circle': {
        stroke: isSelected || isEngaged ? colors.engaged : colors.icon,
      },
    },

    '&:hover': isDisabled
      ? undefined
      : {
          color: isSelected ? colors.selected : colors.engaged,
          '& .ssa-tree__toggle svg path': {
            fill: isSelected ? colors.selected : colors.engaged,
          },
          '& .ssa-tree__icon svg': {
            '& path': { fill: colors.engaged },
            '& circle': { stroke: colors.engaged },
          },
        },
  };
};

export const icon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
`;

export const label = css`
  flex: 1 0 0;
  min-width: 0;
  word-break: break-word;
`;

export const toggle = (isExpanded: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${TOGGLE_SIZE}px;
  height: ${TOGGLE_SIZE}px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
  transform: rotate(${isExpanded ? 180 : 0}deg);
  transition: transform 0.2s ease;

  & svg path {
    fill: currentColor;
  }
`;
