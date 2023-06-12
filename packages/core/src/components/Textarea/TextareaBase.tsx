import styled from '@emotion/styled';

export const TextareaBase = styled.textarea`
  flex: 1 100%;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;

  border: ${({ theme }) => `1px solid ${theme.colors.grey}`};

  color: ${({ theme }) => theme.colors.greyDarker};

  width: 100%;
  min-height: 114px;
  padding: 14px;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;

  border: ${({ theme }) => `1px solid ${theme.colors.grey};`};

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyDarker60};
  }

  &:hover {
    border: ${({ theme }) => `1.4px solid ${theme.colors.greyDarker60};`};
  }

  &:focus {
    border: ${({ theme }) => `2px solid ${theme.colors.grey40};`};
  }

  &:disabled {
    color: ${({ theme }) => `${theme.colors.grey}`};
    border: ${({ theme }) => `1px solid  ${theme.colors.grey}`};
    background: ${({ theme }) => theme.colors.greyLighter};

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`;
