import { useId } from 'react';
import { css } from '@emotion/react';

import { Chip } from '@components/Chip';
import { resolveDisabled } from '@utils/deprecation';
import { LabelProps } from './types';
import { LabelBase } from './LabelBase';

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
  align-items: center;
  gap: 8px;
  height: 18px;
  min-width: 0;
  margin: 0 0 6px 4px;

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
  onMouseEnter,
  onMouseLeave,
}: LabelProps) => {
  const generatedId = useId();
  const label = (
    <LabelBase
      htmlFor={htmlFor}
      id={id}
      isDisabled={resolveDisabled('Label', disabled, isDisabled)}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
    </LabelBase>
  );

  if (!badge) {
    return label;
  }

  return (
    <div css={row}>
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
