import styled from '@emotion/styled';
import { TableCell } from '@ssa-ui-kit/core';

export const BotsTableCell = styled(TableCell)`
  border: none;
  padding: 0 16px;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`;
