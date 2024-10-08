import styled from '@emotion/styled';
import { Typography } from '@ssa-ui-kit/core';

export const BreadcrumbsBase = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: auto;
  flex: 1;
`;

export const PageName = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  line-height: 1;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
  }
`;
