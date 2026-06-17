import styled from '@emotion/styled';

export const InputBase = styled.input<{ showBorders: boolean }>`
  flex: 1;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;

  border: ${({ showBorders, theme }) =>
    showBorders ? `1px solid ${theme.colors.grey}` : 'none'};

  color: ${({ theme }) => theme.colors.greyDarker};

  width: 100%;
  height: 44px;
  padding: 14px;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyDarker80};
  }

  &:disabled {
    color: ${({ theme }) => `${theme.colors.grey}`};

    background: ${({ theme }) => theme.palette.secondary.light};

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }

    &:disabled,
    &:disabled:hover {
      border: ${({ showBorders, theme }) =>
        showBorders ? `1px solid  ${theme.colors.grey}` : 'none'};
      background-image: none;
    }
  }
`;
