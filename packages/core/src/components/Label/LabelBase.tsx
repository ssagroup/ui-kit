import styled from '@emotion/styled';
import { FIELD_LABEL_GAP, FIELD_LABEL_LINE_HEIGHT } from '@styles/fieldControl';

export const LabelBase = styled.label<{ isDisabled?: boolean }>`
  display: inline-block;

  flex: 1;
  font-weight: 500;
  font-size: 1rem;
  line-height: ${FIELD_LABEL_LINE_HEIGHT}px;

  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.grey : theme.colors.greyDarker};

  margin: 0 0 ${FIELD_LABEL_GAP}px 4px;
`;

/**
 * The required `*`. Inline in the label's own line box, so it adds no height:
 * the label block stays line height + gap. Greys out with a disabled label.
 */
export const RequiredMark = styled.span<{ isDisabled?: boolean }>`
  margin-left: 2px;
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.grey : theme.palette.error.main};
`;
