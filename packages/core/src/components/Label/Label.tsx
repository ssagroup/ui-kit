import { useId } from 'react';
import { css } from '@emotion/react';
import { FIELD_LABEL_GAP, FIELD_LABEL_LINE_HEIGHT } from '@styles/fieldControl';

import { Chip } from '@components/Chip';
import { resolveDisabled } from '@utils/deprecation';
import { useFeatureFlag } from '@contexts/FeatureFlags';
import { LabelProps } from './types';
import { LabelBase, RequiredMark } from './LabelBase';

/**
 * The label's own bottom/left margin moves to the row, and the row is held
 * at the label's 18px line height: the 20px badge overhangs by a pixel each
 * way instead of pushing the control down. Inline, like the bare
 * inline-block label, so it sits in the parent's line box the same way and
 * fields with and without a badge stay aligned side by side.
 */
const row = css`
  display: inline-flex;
  vertical-align: baseline;
  &[data-field-geometry='v2'] {
    vertical-align: top;
  }
  align-items: center;
  gap: 8px;
  height: ${FIELD_LABEL_LINE_HEIGHT}px;
  min-width: 0;
  margin: 0 0 ${FIELD_LABEL_GAP}px 4px;

  & > label {
    flex: 0 1 auto;
    min-width: 0;
    margin: 0;
  }
`;

const badgeStyles = css`
  flex: none;
  height: 20px;
  padding: 0 8px;
`;

/**
 * Builds the default badge id for a label's `htmlFor`, so a field can point
 * its control's `aria-describedby` at the badge.
 *
 * @example
 * ```tsx
 * <input id="email" aria-describedby={getLabelBadgeId('email')} />
 * ```
 */
export const getLabelBadgeId = (htmlFor: string) => `${htmlFor}-badge`;

const Label = ({
  children,
  htmlFor,
  id,
  badge,
  className,
  disabled,
  isDisabled,
  required,
  onMouseEnter,
  onMouseLeave,
}: LabelProps) => {
  const generatedId = useId();
  const isLabelDisabled = resolveDisabled('Label', disabled, isDisabled);
  const fieldGeometryV2 = useFeatureFlag('fieldGeometryV2');
  const label = (
    <LabelBase
      fieldGeometryV2={fieldGeometryV2}
      htmlFor={htmlFor}
      id={id}
      isDisabled={isLabelDisabled}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
      {required && (
        <RequiredMark
          aria-hidden="true"
          isDisabled={isLabelDisabled}
          data-testid="label-required-mark">
          *
        </RequiredMark>
      )}
    </LabelBase>
  );

  if (!badge) {
    return label;
  }

  return (
    <div css={row} data-field-geometry={fieldGeometryV2 ? 'v2' : undefined}>
      {label}
      <Chip
        id={
          badge.id ??
          (htmlFor ? getLabelBadgeId(htmlFor) : `${generatedId}-badge`)
        }
        label={badge.text}
        color={badge.color}
        variant="outlined"
        size="small"
        showIcon={false}
        css={badgeStyles}
      />
    </div>
  );
};

export default Label;
