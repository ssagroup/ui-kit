import styled from '@emotion/styled';

const getPadding = ({
  $paddingLeft,
  $paddingRight,
}: {
  $paddingLeft?: number;
  $paddingRight?: number;
}) => {
  const paddingRight = $paddingRight ? `${$paddingRight}px` : '14px';
  const paddingLeft = $paddingLeft ? `${$paddingLeft}px` : '14px';
  return `14px ${paddingRight} 14px ${paddingLeft}`;
};

export const InputBase = styled.input<{
  $paddingLeft?: number;
  $paddingRight?: number;
}>`
  flex: 1;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-origin: border-box;
  background-clip: padding-box, border-box;

  border: ${({ theme }) => `1px solid ${theme.colors.grey}`};

  color: ${({ theme }) => theme.colors.greyDarker};

  width: 100%;
  height: 44px;
  padding: ${(props) => getPadding(props)};

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
