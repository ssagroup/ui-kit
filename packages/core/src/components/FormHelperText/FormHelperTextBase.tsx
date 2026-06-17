import styled from '@emotion/styled';

export const FormHelperTextBase = styled.span<{
  status?: string;
  isDisabled?: boolean;
}>`
  display: block;

  font-weight: 400;
  font-size: 0.75rem;

  margin: 6px 0 0 4px;

  color: ${({ theme, status = 'basic', isDisabled }) => {
    if (isDisabled) return theme.colors.grey;
    if (status === 'error') return theme.palette.error.dark;
    if (status === 'success') return theme.palette.success.dark;
    return theme.colors.greyDarker80;
  }};
`;
