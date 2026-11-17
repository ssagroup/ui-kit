import styled from '@emotion/styled';
import {
  FIELD_LABEL_GAP,
  FIELD_LABEL_LINE_HEIGHT,
  FieldGeometryProps,
} from '@styles/fieldControl';

export const LabelBase = styled.label<
  { isDisabled?: boolean } & FieldGeometryProps
>`
  display: inline-block;

  /* Under fieldGeometryV2, top-aligned, so inside a plain block parent the
     label's line box is exactly label + gap tall. On the default baseline the
     parent's strut adds ~2px and the control below sits lower than it does in
     a flex or grid parent. */
  vertical-align: ${({ fieldGeometryV2 }) =>
    fieldGeometryV2 ? 'top' : 'baseline'};

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
