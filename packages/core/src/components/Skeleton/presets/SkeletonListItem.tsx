import { SkeletonGroup } from '../SkeletonGroup';
import { Skeleton } from '../Skeleton';
import { SkeletonListItemProps } from '../types';
import * as S from '../styles';

/**
 * SkeletonListItem - An avatar beside a title, lines of text and chips: the
 * placeholder for a person, a notification, a comment.
 *
 * Fills its container's width; the title takes 60% of the text column. Use
 * `count` for a list, `lines` and `chips` to match the real item, and
 * `trailing` when the real item has a badge and an icon at the end of its
 * title row.
 *
 * @category Components
 * @subcategory Feedback
 * @example
 * ```tsx
 * <SkeletonListItem count={5} chips={2} trailing />
 * ```
 */
export const SkeletonListItem = ({
  count = 1,
  gap = 24,
  avatar = true,
  avatarSize = 48,
  lines = 2,
  chips = 1,
  trailing = false,
  animation,
  corners,
  label,
  className,
  style,
}: SkeletonListItemProps) => (
  <SkeletonGroup
    animation={animation}
    corners={corners}
    label={label}
    className={className}
    style={style}>
    <div css={S.column} style={{ gap: S.toCss(gap) }}>
      {Array.from({ length: count }, (_, item) => (
        <div key={item} css={S.row} style={{ gap: 16 }}>
          {avatar && <Skeleton shape="circle" width={avatarSize} />}
          <div css={S.column} style={{ gap: 8 }}>
            <div
              css={S.row}
              style={{ justifyContent: 'space-between', gap: 16 }}>
              <Skeleton height={24} width="60%" />
              {trailing && (
                <div css={S.row} style={{ width: 'auto', gap: 8 }}>
                  <Skeleton height={24} width={80} />
                  <Skeleton shape="circle" width={24} />
                </div>
              )}
            </div>
            {Array.from({ length: lines }, (_, line) => (
              <Skeleton key={line} height={12} />
            ))}
            {chips > 0 && (
              <div css={S.row} style={{ gap: 8 }}>
                {Array.from({ length: chips }, (_, chip) => (
                  <Skeleton key={chip} height={32} width={80} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </SkeletonGroup>
);
