import { forwardRef } from 'react';
import { useTheme } from '@emotion/react';

import { useSkeletonAppearance } from './SkeletonContext';
import { SkeletonProps } from './types';
import * as S from './styles';

const DEFAULT_HEIGHT = 16;
const DEFAULT_CIRCLE_SIZE = 48;
/** Lines this thin or thinner take the smaller squared radius. */
const THIN_LINE_MAX_HEIGHT = 12;

/**
 * Skeleton - A grey placeholder block shown in place of content that is
 * still loading. Every skeleton layout in the kit is built from it.
 *
 * ### Size
 * The block fills its container's width by default, so it follows whatever
 * layout it sits in. Set `width` and `height` to mirror the content it stands
 * for: a number is pixels, a string any CSS length (`'60%'`, `'12rem'`).
 * A circle defaults to 48px and stays round when only `width` is set.
 *
 * ### Look
 * `animation` is `wave` (a band sweeps across), `pulse` (the block fades in
 * and out) or `none`; `corners` is `rounded` or `squared`. Set both once on a
 * `SkeletonGroup` instead of on each piece.
 *
 * ### Accessibility
 * The block is hidden from screen readers. Wrap the loading region in a
 * `SkeletonGroup`, which marks it busy and announces it once.
 *
 * @category Components
 * @subcategory Feedback
 * @example
 * ```tsx
 * <SkeletonGroup>
 *   <Skeleton shape="circle" width={48} />
 *   <Skeleton height={24} width="60%" />
 *   <Skeleton height={12} />
 * </SkeletonGroup>
 * ```
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  function Skeleton(
    {
      shape = 'rect',
      width,
      height,
      radius,
      animation: ownAnimation,
      corners: ownCorners,
      className,
      style,
    },
    ref,
  ) {
    const theme = useTheme();
    const { animation, corners } = useSkeletonAppearance({
      animation: ownAnimation,
      corners: ownCorners,
    });

    const isCircle = shape === 'circle';
    const resolvedWidth = width ?? (isCircle ? DEFAULT_CIRCLE_SIZE : '100%');
    const resolvedHeight =
      height ?? (isCircle ? resolvedWidth : DEFAULT_HEIGHT);
    const isThin =
      typeof resolvedHeight === 'number' &&
      resolvedHeight <= THIN_LINE_MAX_HEIGHT;
    const resolvedRadius = isCircle
      ? '50%'
      : (radius ?? S.RADIUS[corners][isThin ? 'line' : 'block']);

    const animationCss =
      animation === 'wave'
        ? S.wave(theme)
        : animation === 'pulse'
          ? S.pulse(theme)
          : S.still(theme);

    // Sizes go through inline style, not css: every distinct width would
    // otherwise become a new emotion class.
    return (
      <span
        ref={ref}
        aria-hidden="true"
        data-skeleton=""
        className={className}
        css={animationCss}
        style={{
          width: S.toCss(resolvedWidth),
          height: S.toCss(resolvedHeight),
          borderRadius: S.toCss(resolvedRadius),
          // A fixed size (an avatar, a chip) holds in a flex row; a relative
          // one shrinks with the row instead of pushing out of it.
          flexShrink: isCircle || typeof resolvedWidth === 'number' ? 0 : 1,
          ...style,
        }}
      />
    );
  },
);
