import styled from '@emotion/styled';
import { Table, TableBody } from '@ssa-ui-kit/core';
import { TableHeadBot } from './TableHeadBot';
import { TableCellBot } from './TableCellBot';
import { TableRowBot } from './TableRowBot';

export const TableBot = styled(Table)`
  background: none;
  ${TableHeadBot} ${TableCellBot}:first-of-type {
    border-top-left-radius: 20px;
  }
  ${TableHeadBot} ${TableCellBot}:last-child {
    border-top-right-radius: 20px;
  }
  ${TableBody} ${TableRowBot}:last-child ${TableCellBot}:first-of-type {
    border-bottom-left-radius: 20px;
  }
  ${TableBody} ${TableRowBot}:last-child ${TableCellBot}:last-child {
    border-bottom-right-radius: 20px;
  }
  ${TableBody} ${TableRowBot}:not([aria-disabled='true']):hover {
    ${TableCellBot} {
      background-color: #eef1f7;
    }
  }
`;
