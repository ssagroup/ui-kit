import { css, SerializedStyles, Theme } from '@emotion/react';

/**
 * Shared skin for floating surfaces (Tooltip, Popover).
 *
 * Tooltip and Popover stay separate components on purpose — they have
 * different roles, interactions and focus behavior — but they render the same
 * surface, so the visual tokens live here instead of being duplicated (and
 * drifting) in each component's own styles.
 */

/**
 * Color scheme of a floating surface — mirrors the `Color` dimension of the
 * design.
 * - `grey`: light grey surface with dark text
 * - `white`: white surface with dark text — bordered by default
 * - `dark`: dark surface with white text
 * - `nonOpaque`: semi-transparent white surface with dark text
 */
export type FloatingSurfaceColor = 'grey' | 'white' | 'dark' | 'nonOpaque';

/** Padding/typography scale of a floating surface. */
export type FloatingSurfaceSize = 'small' | 'medium' | 'large';

export const small = css`
  font-size: 8px;
  line-height: normal;
  padding: 6px 12px;
`;

export const medium = css`
  font-size: 12px;
  line-height: 16px;
  padding: 8px 16px;
`;

export const large = css`
  font-size: 14px;
  line-height: 18px;
  padding: 12px 20px;
`;

export const surfaceSizes: Record<FloatingSurfaceSize, SerializedStyles> = {
  small,
  medium,
  large,
};

export const grey = (theme: Theme) => css`
  background: ${theme.palette.secondary.light};
  color: ${theme.colors.greyDarker};
`;

export const white = (theme: Theme) => css`
  background: ${theme.colors.white};
  color: ${theme.colors.greyDarker};
`;

export const dark = (theme: Theme) => css`
  background: ${theme.colors.greyBackground};
  color: ${theme.colors.white};
`;

export const nonOpaque = (theme: Theme) => css`
  background: ${theme.colors.white64};
  color: ${theme.colors.greyDarker};
`;

export const surfaceColors: Record<
  FloatingSurfaceColor,
  (theme: Theme) => SerializedStyles
> = {
  grey,
  white,
  dark,
  nonOpaque,
};

/** Background color of a surface — also used to fill its arrow. */
export const surfaceBackgrounds: Record<
  FloatingSurfaceColor,
  (theme: Theme) => string | undefined
> = {
  grey: (theme) => theme.palette.secondary.light,
  white: (theme) => theme.colors.white,
  dark: (theme) => theme.colors.greyBackground,
  nonOpaque: (theme) => theme.colors.white64,
};

/**
 * Text color of a surface, as an explicit value.
 *
 * Needed wherever `currentColor`/inheritance can't be relied on — a global
 * `* { color: … }` reset (Storybook ships one, and consumer apps often do too)
 * sets the computed color of every element it matches, including nested SVGs,
 * so `currentColor` there resolves to the reset's value rather than the
 * surface's.
 */
export const surfaceTextColors: Record<
  FloatingSurfaceColor,
  (theme: Theme) => string | undefined
> = {
  grey: (theme) => theme.colors.greyDarker,
  white: (theme) => theme.colors.greyDarker,
  dark: (theme) => theme.colors.white,
  nonOpaque: (theme) => theme.colors.greyDarker,
};

export const border = (theme: Theme) => css`
  border: 1px solid ${theme.colors.grey};
`;

export const shadow = (theme: Theme) => css`
  box-shadow: 0 10px 40px ${theme.colors.greyShadow};
`;

export const radius = css`
  border-radius: 8px;
`;

/**
 * Headline rendered above the surface content.
 *
 * `color` is set explicitly rather than left to inheritance: a global
 * `* { color: … }` reset (Storybook ships one, and consumer apps often do too)
 * outranks an inherited value, so the headline would otherwise ignore the
 * surface color.
 */
export const title = css`
  font-weight: 700;
  color: inherit;
`;

/** Applied to the surface when a title is rendered alongside its content. */
export const withTitle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

/**
 * Whether a border is drawn by default for a given color — only the white
 * surface is outlined in the design, but the two are independent and either
 * default can be overridden.
 */
export const isBorderedByDefault = (color?: FloatingSurfaceColor) =>
  color === 'white';
