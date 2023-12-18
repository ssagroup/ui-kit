import styled from '@emotion/styled';

export const TextareaBase = styled.textarea`
  flex: 1 100%;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;

  border: none;
  box-shadow: ${({ theme }) => `inset 0 0 1.5px 0 ${theme.colors.grey}`};

  color: ${({ theme }) => theme.colors.greyDarker};

  width: 100%;
  min-height: 114px;
  padding: 14px;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyDarker60};
  }

  &:hover {
    box-shadow: ${({ theme }) =>
      `inset 0 0 1.5px 0 ${theme.colors.greyDarker60}`};
  }

  &:focus {
    box-shadow: ${({ theme }) => `inset 0 0 1.5px 0 ${theme.colors.grey40}`};
  }

  &:disabled {
    color: ${({ theme }) => `${theme.colors.grey}`};
    box-shadow: ${({ theme }) => `inset 0 0 1.5px 0 ${theme.colors.grey}`};
    background: ${({ theme }) => theme.colors.greyLighter};

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`;
