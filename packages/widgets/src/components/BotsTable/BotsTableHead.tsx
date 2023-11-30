import styled from '@emotion/styled';
import { TableHead } from '@ssa-ui-kit/core';

export const BotsTableHead = styled(TableHead)`
  background: none;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
  & tr td:first-of-type {
    padding-left: 16px;
  }
`;
