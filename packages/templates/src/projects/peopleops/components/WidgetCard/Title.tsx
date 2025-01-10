import styled from '@emotion/styled';
import { Typography } from '@ssa-ui-kit/core';

export const Title = styled(Typography)`
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
  }
`;
