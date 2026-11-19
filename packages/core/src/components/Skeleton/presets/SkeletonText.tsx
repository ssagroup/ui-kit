import { SkeletonGroup } from '../SkeletonGroup';
import { Skeleton } from '../Skeleton';
import { SkeletonTextProps } from '../types';
import * as S from '../styles';

/**
 * SkeletonText - A paragraph placeholder: full-width lines with a shorter
 * last line.
 *
 * Fills its container's width. Set `lines` to the number of lines the real
 * text usually takes, and `lineHeight` to its size (12px by default, the
 * design's body line).
 *
 * @category Components
 * @subcategory Feedback
 * @example
 * ```tsx
 * <SkeletonText lines={4} lastLineWidth="40%" />
 * ```
 */
export const SkeletonText = ({
  lines = 3,
  lineHeight = 12,
  gap = 8,
  lastLineWidth = '60%',
  animation,
  corners,
  label,
  className,
  style,
}: SkeletonTextProps) => (
  <SkeletonGroup
    animation={animation}
    corners={corners}
    label={label}
    className={className}
    style={style}>
    <div css={S.column} style={{ gap: S.toCss(gap) }}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          height={lineHeight}
          width={lines > 1 && index === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  </SkeletonGroup>
);
