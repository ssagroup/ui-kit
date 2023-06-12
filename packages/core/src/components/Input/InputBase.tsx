import styled from '@emotion/styled';

export const InputBase = styled.input`
  flex: 1;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;

  border: ${({ theme }) => `1px solid ${theme.colors.grey}`};

  color: ${({ theme }) => theme.colors.greyDarker};

  width: 100%;
  height: 44px;
  padding: 14px;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyDarker60};
  }

  &:disabled {
    color: ${({ theme }) => `${theme.colors.grey}`};

    background: ${({ theme }) => theme.colors.greyLighter};

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }

    &:disabled,
    &:disabled:hover {
      border: ${({ theme }) => `1px solid  ${theme.colors.grey}`};
      background-image: none;
    }
  }
`;
