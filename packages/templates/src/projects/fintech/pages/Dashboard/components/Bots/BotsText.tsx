import styled from '@emotion/styled';

import { Typography } from '@ssa-ui-kit/core';

export const SmallText = styled(Typography)`
  color: ${({ theme }) => theme.colors.greyDisabled};
  font-size: 12px;
  line-height: 1;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`;

export const LargeText = styled(Typography)`
  font-size: 14px;
  line-height: 1;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 16px;
  }
`;
