import { css, keyframes, Theme } from '@emotion/react';

import { ColorsKeys } from '@global-types/emotion';
import { darkenColor, getReadableColor } from '@utils/colorUtils';

import {
  FloatingActionButtonColor,
  FloatingActionButtonPosition,
  FloatingActionButtonSize,
} from './types';

type SizeTokens = {
  /** Height, and width when icon-only. */
  box: number;
  /** Glyph size when icon-only. */
  iconOnly: number;
  /** Glyph size next to a label. */
  iconLabelled: number;
  paddingLeft: number;
  paddingRight: number;
  gap: number;
  fontSize: number;
  lineHeight: number;
};

/**
 * Figma draws labelled FABs 4px taller than icon-only ones of the same size;
 * that is a design bug, so both use the icon-only height here.
 */
export const SIZES: Record<FloatingActionButtonSize, SizeTokens> = {
  extraSmall: {
    box: 32,
    iconOnly: 16,
    iconLabelled: 16,
    paddingLeft: 8,
    paddingRight: 12,
    gap: 4,
    fontSize: 12,
    lineHeight: 16,
  },
  small: {
    box: 36,
    iconOnly: 20,
    iconLabelled: 16,
    paddingLeft: 12,
    paddingRight: 16,
    gap: 4,
    fontSize: 14,
    lineHeight: 18,
  },
  medium: {
    box: 40,
    iconOnly: 24,
    iconLabelled: 20,
    paddingLeft: 20,
    paddingRight: 24,
    gap: 8,
    fontSize: 14,
    lineHeight: 18,
  },
  large: {
    box: 44,
    iconOnly: 24,
    iconLabelled: 24,
    paddingLeft: 24,
    paddingRight: 32,
    gap: 8,
    fontSize: 16,
    lineHeight: 24,
  },
};

/** Gap between the trigger and the menu, and between menu items. */
const MENU_GAP = 12;
const ITEM_GAP = 8;

export type ColorTokens = {
  background: string;
  hover: string;
  active: string;
  foreground: string;
};

/**
 * Resolves `color` to the four colors a FAB paints with. The two named
 * colors follow the design tokens; anything else is a theme key or CSS
 * color whose foreground is picked for contrast.
 */
export const resolveColors = (
  theme: Theme,
  color: FloatingActionButtonColor,
): ColorTokens => {
  switch (color) {
    case 'primary':
      return {
        background: theme.palette.primary.main,
        hover: theme.palette.primary.dark,
        active: theme.palette.primary.dark,
        foreground: theme.colors.white!,
      };
    case 'secondary':
      return {
        background: theme.palette.secondary.light,
        hover: theme.palette.secondary.main,
        active: theme.palette.secondary.dark,
        foreground: theme.colors.greyDarker!,
      };
    default: {
      const background = theme.colors[color as ColorsKeys] ?? color;
      return {
        background,
        hover: darkenColor(background, 0.08),
        active: darkenColor(background, 0.14),
        foreground: getReadableColor(
          background,
          theme.colors.greyDarker!,
          theme.colors.white!,
        ),
      };
    }
  }
};

export const container = (
  position: FloatingActionButtonPosition,
  x: number,
  y: number,
) => {
  const [vertical, horizontal] = position.split('-');
  return css`
    position: fixed;
    ${vertical}: ${y}px;
    ${horizontal}: ${x}px;
    z-index: 1000;
    display: flex;

    /* The trigger comes first in the DOM (focus order), the menu grows away from the corner. */
    flex-direction: ${vertical === 'bottom' ? 'column-reverse' : 'column'};
    align-items: ${horizontal === 'right' ? 'flex-end' : 'flex-start'};
    gap: ${MENU_GAP}px;
  `;
};

/*
 * One keyframes per direction: written inline in css they would share a
 * global name, and the last menu rendered would set both directions.
 */
const menuInFromBelow = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
`;

const menuInFromAbove = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
`;

export const menu = (position: FloatingActionButtonPosition) => css`
  display: flex;
  flex-direction: column;
  align-items: ${position.endsWith('right') ? 'flex-end' : 'flex-start'};
  gap: ${ITEM_GAP}px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${position.startsWith('bottom')
        ? menuInFromBelow
        : menuInFromAbove}
      150ms ease-out;
  }
`;

export const button = (
  theme: Theme,
  {
    size,
    colors,
    shadow,
    round,
    labelled,
  }: {
    size: FloatingActionButtonSize;
    colors: ColorTokens;
    shadow: boolean;
    round: boolean;
    labelled: boolean;
  },
) => {
  const s = SIZES[size];
  const elevation = `-4px 4px 14px ${theme.colors.greyDarker14}`;
  return css`
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    gap: ${s.gap}px;
    height: ${s.box}px;
    ${labelled
      ? `padding: 0 ${s.paddingRight}px 0 ${s.paddingLeft}px;`
      : `width: ${s.box}px; padding: 0;`}
    border: none;
    border-radius: ${round ? `${s.box / 2}px` : '8px'};
    background: ${colors.background};
    color: ${colors.foreground};
    box-shadow: ${shadow ? elevation : 'none'};
    font-family: inherit;
    font-size: ${s.fontSize}px;
    font-weight: 500;
    line-height: ${s.lineHeight}px;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 150ms ease;

    &:hover {
      background: ${colors.hover};
    }

    &:active {
      background: ${colors.active};
    }

    &:focus-visible {
      outline: 1px solid ${theme.colors.blue};
      outline-offset: 0;
      box-shadow: inset 0 0 0 1px
        ${theme.colors.white}${shadow ? `, ${elevation}` : ''};
    }

    &:disabled {
      background: ${theme.colors.grey};
      color: ${theme.colors.white};
      box-shadow: none;
      cursor: default;
    }

    & > svg {
      flex-shrink: 0;
    }

    /* The global reset paints every element greyDarker; icons drawn with currentColor must follow the button. */
    & svg,
    & svg * {
      color: inherit;
    }
  `;
};
