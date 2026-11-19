import {
  FIELD_CONTROL_HEIGHT,
  FIELD_LABEL_GAP,
  FIELD_LABEL_LINE_HEIGHT,
} from '@styles/fieldControl';

import { SkeletonGroup } from '../SkeletonGroup';
import { Skeleton } from '../Skeleton';
import { SkeletonFormProps } from '../types';
import * as S from '../styles';

const FIELD_GAP = 20;
const BUTTON_WIDTH = 120;

/**
 * SkeletonForm - A placeholder form: labelled fields at the kit's field
 * height, and a button under them.
 *
 * The label line and the control use the same geometry as the kit's form
 * fields (an 18px label line, a 6px gap, a 44px control), so the form keeps
 * its height when the real fields replace it. `columns` lays the fields out
 * in a grid, as in a two-column settings form.
 *
 * @category Components
 * @subcategory Feedback
 * @example
 * ```tsx
 * <SkeletonForm fields={6} columns={2} />
 * ```
 */
export const SkeletonForm = ({
  fields = 3,
  columns = 1,
  actions = true,
  animation,
  corners,
  label,
  className,
  style,
}: SkeletonFormProps) => (
  <SkeletonGroup
    animation={animation}
    corners={corners}
    label={label}
    className={className}
    style={style}>
    <div css={S.column} style={{ gap: FIELD_GAP }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: FIELD_GAP,
        }}>
        {Array.from({ length: fields }, (_, index) => (
          <div key={index} css={S.column} style={{ gap: FIELD_LABEL_GAP }}>
            <div
              css={S.row}
              style={{ height: FIELD_LABEL_LINE_HEIGHT, alignItems: 'center' }}>
              <Skeleton height={12} width="30%" />
            </div>
            <Skeleton height={FIELD_CONTROL_HEIGHT} />
          </div>
        ))}
      </div>
      {actions && (
        <Skeleton height={FIELD_CONTROL_HEIGHT} width={BUTTON_WIDTH} />
      )}
    </div>
  </SkeletonGroup>
);
