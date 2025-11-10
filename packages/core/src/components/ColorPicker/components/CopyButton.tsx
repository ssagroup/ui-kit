import styled from '@emotion/styled';

import Button from '@components/Button';

export const CopyButton = styled(Button)`
  padding: 0;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  justify-content: center;
  border: 1px solid;
  border-radius: 8px;
  border-color: ${({ theme }) => theme.colors.grey};

  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
    &::before {
      display: none;
    }
  }

  &:hover {
    svg path {
      fill: ${({ theme }) => theme.colors.greyDarker};
    }
  }
`;
