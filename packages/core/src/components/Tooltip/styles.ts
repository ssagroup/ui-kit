import { css } from '@emotion/react';

/**
 * The tooltip surface is styled from the shared floating-surface tokens, which
 * Popover renders from too. Re-exported under the historical names so
 * `styles.small`, `styles.dark`, … stay part of the public Tooltip API.
 */
export {
  small,
  medium,
  large,
  grey,
  white,
  dark,
  nonOpaque,
  border,
  shadow,
  title,
  withTitle,
  surfaceBackgrounds as backgroundColors,
} from '@styles/floatingSurface';

/**
 * Font size/line height the chart tooltips were rendered at before the sizes
 * above were aligned with the design. The chart legend spec keeps 9.26px, so
 * they pin it explicitly instead of following the `small` size token.
 */
export const chartTooltipText = css`
  font-size: 0.579rem; // 9.26px
  line-height: 0.75rem; // 12px
`;
