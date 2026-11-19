import { WidgetCardBase } from '@components/WidgetCard/WidgetCardBase';

import { SkeletonGroup } from '../SkeletonGroup';
import { Skeleton } from '../Skeleton';
import { SkeletonText } from './SkeletonText';
import { SkeletonWidgetCardProps } from '../types';
import * as S from '../styles';

/**
 * SkeletonWidgetCard - A dashboard widget placeholder: the `WidgetCard`
 * frame with a title bar and a body.
 *
 * The body is a `SkeletonText` unless you pass children, e.g. a tall
 * `Skeleton` standing in for a chart. Place several in your own grid for a
 * dashboard.
 *
 * @category Components
 * @subcategory Feedback
 * @example
 * ```tsx
 * <SkeletonWidgetCard>
 *   <Skeleton height={200} />
 * </SkeletonWidgetCard>
 * ```
 */
export const SkeletonWidgetCard = ({
  title = true,
  children,
  width,
  height,
  animation,
  corners,
  label,
  className,
  style,
}: SkeletonWidgetCardProps) => (
  <SkeletonGroup
    animation={animation}
    corners={corners}
    label={label}
    className={className}
    style={{ width: S.toCss(width) ?? '100%', ...style }}>
    <WidgetCardBase width="100%" height={S.toCss(height)}>
      <div css={S.column} style={{ gap: 16, paddingBlock: 8 }}>
        {title && <Skeleton height={24} width="40%" />}
        {children ?? <SkeletonText />}
      </div>
    </WidgetCardBase>
  </SkeletonGroup>
);
