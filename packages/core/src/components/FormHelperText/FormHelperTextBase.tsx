import styled from '@emotion/styled';

export const FormHelperTextBase = styled.span<{
  status?: string;
}>`
  display: block;

  font-weight: 400;
  font-size: 0.688rem;

  margin: 6px 0 0 4px;

  color: ${({ theme, status = 'basic' }) => {
    if (status === 'error') return theme.palette.error.main;
    if (status === 'success') return theme.palette.success.main;
    return theme.colors.greyDarker60;
  }};
`;
