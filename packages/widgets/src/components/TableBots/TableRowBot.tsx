import styled from '@emotion/styled';
import { TableRow } from '@ssa-ui-kit/core';
import { TableCellBot } from './TableCellBot';

export const TableRowBot = styled(TableRow)<{ isDisabled?: boolean }>`
  border: none;
  padding: 0 16px;
  height: 44px;
  ${({ isDisabled }) =>
    isDisabled && {
      opacity: 0.6,
    }}
  ${TableCellBot}:first-of-type {
    padding-left: 18px;
  }
`;
