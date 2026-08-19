import { css, Theme } from '@emotion/react';
import { TooltipColor } from './types';

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

/**
 * Font size/line height the chart tooltips were rendered at before the sizes
 * above were aligned with the design. The chart legend spec keeps 9.26px, so
 * they pin it explicitly instead of following the `small` size token.
 */
export const chartTooltipText = css`
  font-size: 0.579rem; // 9.26px
  line-height: 0.75rem; // 12px
`;

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

export const border = (theme: Theme) => css`
  border: 1px solid ${theme.colors.grey};
`;

export const shadow = (theme: Theme) => css`
  box-shadow: 0 10px 40px ${theme.colors.greyShadow};
`;

/** Background color of the tooltip surface — also used to fill the arrow. */
export const backgroundColors: Record<
  TooltipColor,
  (theme: Theme) => string | undefined
> = {
  grey: (theme) => theme.palette.secondary.light,
  white: (theme) => theme.colors.white,
  dark: (theme) => theme.colors.greyBackground,
  nonOpaque: (theme) => theme.colors.white64,
};

/**
 * Headline rendered above the tooltip content when `title` is passed.
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

/** Applied to the content surface when a `title` is rendered alongside it. */
export const withTitle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
