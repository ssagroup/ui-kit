import styled from '@emotion/styled';
import { TableCell } from '@ssa-ui-kit/core';

export const HRTableCell = styled(TableCell)`
  border: none;
  padding: 0 16px;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  padding: 0 16px;
  white-space: nowrap;
  height: 44px;
  &:first-of-type a {
    padding-left: 16;
  }
  & a {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 18px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`;
