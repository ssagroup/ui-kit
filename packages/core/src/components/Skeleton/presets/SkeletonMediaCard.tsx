import { SkeletonGroup } from '../SkeletonGroup';
import { Skeleton } from '../Skeleton';
import { useSkeletonAppearance } from '../SkeletonContext';
import { SkeletonMediaCardProps } from '../types';
import * as S from '../styles';

/**
 * SkeletonMediaCard - A title bar over a large block: the placeholder for an
 * image, a chart or a video with a heading.
 *
 * Fills its container's width. Set `mediaHeight` to the real block's height
 * so the page does not jump when the content arrives.
 *
 * @category Components
 * @subcategory Feedback
 * @example
 * ```tsx
 * <SkeletonMediaCard mediaHeight={240} />
 * ```
 */
export const SkeletonMediaCard = ({
  count = 1,
  gap = 24,
  title = true,
  mediaHeight = 120,
  animation,
  corners,
  label,
  className,
  style,
}: SkeletonMediaCardProps) => (
  <SkeletonGroup
    animation={animation}
    corners={corners}
    label={label}
    className={className}
    style={style}>
    <div css={S.column} style={{ gap: S.toCss(gap) }}>
      {Array.from({ length: count }, (_, item) => (
        <div key={item} css={S.column} style={{ gap: 8 }}>
          {title && <Skeleton height={24} />}
          <MediaBlock height={mediaHeight} />
        </div>
      ))}
    </div>
  </SkeletonGroup>
);

/** The design gives the squared media block the thin-line 2px radius. */
const MediaBlock = ({
  height,
}: {
  height: SkeletonMediaCardProps['mediaHeight'];
}) => {
  const { corners } = useSkeletonAppearance({});
  return (
    <Skeleton
      height={height}
      radius={corners === 'squared' ? S.RADIUS.squared.line : undefined}
    />
  );
};
