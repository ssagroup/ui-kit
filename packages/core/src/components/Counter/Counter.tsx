import { useTheme } from '@emotion/react';

import { CounterProps, CounterVariants } from './types';
import {
  variantStyles,
  sizeStyles,
  CounterBase,
  makeColorOverride,
} from './styles';

const MAX_COUNT = 99;

/**
 * Counter - Compact numeric indicator for displaying counts or notification badges.
 *
 * ### Sizing
 * Accepts `'small' | 'medium' | 'large'` via the `size` prop (default `'medium'`).
 * When `count` is omitted the counter shrinks to a small dot (`dot` size) — useful
 * as a presence indicator with no number shown.
 *
 * ### Color
 * Background is driven by `theme.palette[variant].main` for the five semantic variants.
 * Pass `color` to override: a `theme.colors` key resolves to the design token value,
 * any other string is used as a raw CSS color.
 *
 * ### CSS override
 * Pass `css` to apply one-off Emotion styles on top of all internal styles
 * (size → variant → color → css). Useful for margins, positioning, or shape tweaks.
 *
 * ### Overflow
 * Values above 99 are automatically clamped to `"99+"`.
 *
 * @example
 * ```tsx
 * // Basic usage — primary variant, medium size
 * <Counter count={5} />
 * ```
 *
 * @example
 * ```tsx
 * // Overflow label
 * <Counter count={120} variant={CounterVariants.error} size="large" />
 * // renders "99+"
 * ```
 *
 * @example
 * ```tsx
 * // Raw hex color override
 * <Counter count={3} color="#F7931A" />
 * ```
 *
 * @example
 * ```tsx
 * // theme.colors key as color
 * <Counter count={7} color="purple" />
 * ```
 *
 * @example
 * ```tsx
 * // Empty dot indicator (no count)
 * <Counter variant={CounterVariants.error} />
 * ```
 *
 * @example
 * ```tsx
 * // CSS override for layout / shape
 * <Counter count={3} css={{ marginLeft: 8, borderRadius: 4 }} />
 * ```
 */
export const Counter = ({
  count,
  variant = CounterVariants.primary,
  size = 'medium',
  color,
  className,
  css,
  ref,
}: CounterProps) => {
  const theme = useTheme();
  const isEmpty = count === undefined;
  const label = !isEmpty && count > MAX_COUNT ? `${MAX_COUNT}+` : count;

  const appliedVariantStyle = variantStyles[variant](theme);
  const appliedSizeStyle = sizeStyles[!isEmpty ? size : 'dot'];

  const colorOverride = color ? makeColorOverride(theme, color) : undefined;

  return (
    <CounterBase
      ref={ref}
      css={[appliedSizeStyle, appliedVariantStyle, colorOverride, css]}
      className={className}>
      {label}
    </CounterBase>
  );
};

export default Counter;
