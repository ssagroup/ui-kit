import { css, Theme } from '@emotion/react';

import { ColorsKeys } from '@global-types/emotion';

import {
  DividerColor,
  DividerLength,
  DividerSize,
  DividerVariant,
} from './types';

/** Line thickness per size, in px. */
export const STROKE: Record<DividerSize, number> = {
  small: 1,
  medium: 2,
  large: 3,
};

/** Defaults from the design. */
export const DEFAULT_GAP = 12;
export const DEFAULT_SPACING = 8;
export const DEFAULT_ICON_SIZE = 20;

/*
 * Dash and dot spacing measured from the design, in px of line spine. Both
 * leave a 2 + 2 * stroke gap (4 / 6 / 8px): a dash is 4px long, a dot has no
 * length. The round caps add half a stroke at each end, so a 1px dot is a 1px
 * circle and a 1px dash reads as 5px.
 */
export const dashArray = (variant: DividerVariant, stroke: number) => {
  const gap = 2 + 2 * stroke;
  switch (variant) {
    case 'dashed':
      return `4 ${gap}`;
    case 'dotted':
      return `0 ${gap}`;
    default:
      return undefined;
  }
};

export const toCss = (value: DividerLength | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

/**
 * Line, text and icon colours. The two presets only colour the line; a
 * custom colour (theme key or CSS colour) paints all three.
 */
export const resolveColors = (
  theme: Theme,
  color: DividerColor,
): { line: string; text: string; icon: string } => {
  switch (color) {
    case 'subtle':
      return {
        line: theme.colors.greyFocused as string,
        text: theme.colors.greyDarker as string,
        icon: theme.colors.greyDarker80 as string,
      };
    case 'strong':
      return {
        line: 'rgba(85, 87, 90, 0.64)',
        text: theme.colors.greyDarker as string,
        icon: theme.colors.greyDarker80 as string,
      };
    default: {
      const custom = (theme.colors[color as ColorsKeys] as string) ?? color;
      return { line: custom, text: custom, icon: custom };
    }
  }
};

export const root = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  min-width: 0;
`;

export const horizontal = css`
  flex-direction: row;
  max-width: 100%;
`;

/* Shrink to the line and content, also in a block parent. */
export const vertical = css`
  flex-direction: column;
  width: fit-content;
`;

/*
 * A line piece. The svg sits absolutely inside it so percentage lengths always
 * resolve, inset by half a stroke at both ends for the round caps.
 */
export const segment = css`
  position: relative;
  flex: 1 0 16px;

  & > svg {
    position: absolute;
    display: block;
    overflow: visible;
  }
`;

export const content = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 1 auto;
  min-width: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2857;
  text-align: center;
  overflow-wrap: anywhere;
`;
