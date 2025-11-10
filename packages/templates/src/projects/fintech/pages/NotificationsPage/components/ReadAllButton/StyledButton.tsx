import styled from '@emotion/styled';

import { Button } from '@ssa-ui-kit/core';

export const StyledButton = styled(Button)`
  padding: 0;
  height: auto;
  background: none;

  &:focus,
  &:hover {
    border: none;
    background: none;
    box-shadow: none;

    &::before {
      border: none;
    }
  }
  &:disabled {
    cursor: default;
  }

  span {
    color: ${({ theme }) => theme.colors.blueDark};
  }
`;
