import React from 'react';
import { MainSizes } from '@global-types/global';
import { ColorsKeys } from '@global-types/emotion';
import { Interpolation, SerializedStyles, Theme } from '@emotion/react';

export enum CounterVariants {
  primary = 'primary',
  secondary = 'secondary',
  error = 'error',
  warning = 'warning',
  success = 'success',
}

export type VariantStyle = {
  [k in CounterVariants]: (theme: Theme) => SerializedStyles;
};

/**
 * Extends `MainSizes` with a `tiny` slot used internally when `count` is
 * undefined — renders a small dot with no label as a presence indicator.
 */
export type CounterSizes = MainSizes & { tiny: SerializedStyles };

export type CounterProps = {
  /**
   * The numeric value to display. Values above 99 are clamped to `"99+"`.
   * When omitted, the counter renders as a tiny dot (no label).
   */
  count?: number;
  /**
   * Visual style variant. Drives the background color from `theme.palette`.
   * @default CounterVariants.primary
   */
  variant?: CounterVariants;
  /**
   * Size of the counter.
   * Ignored when `count` is undefined — the component uses `tiny` automatically.
   * @default 'medium'
   */
  size?: keyof MainSizes;
  /**
   * Optional color override. Accepts a `theme.colors` key or any valid CSS color string.
   * When provided, overrides the variant background.
   */
  color?: ColorsKeys | string;
  /**
   * Custom CSS class name.
   */
  className?: string;
  /**
   * Emotion CSS override applied after all internal styles.
   * Use for one-off layout adjustments (e.g. margins, positioning).
   */
  css?: Interpolation<Theme>;
  /**
   * Ref forwarded to the root `<div>` element.
   */
  ref?: React.Ref<HTMLDivElement>;
};
