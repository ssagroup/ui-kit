import styled from '@emotion/styled';
import { TableHead } from '@ssa-ui-kit/core';
import { TableCellBot } from './TableCellBot';
import { TableRowBot } from './TableRowBot';

export const TableHeadBot = styled(TableHead)`
  background: none;
  ${TableRowBot} ${TableCellBot}:first-of-type {
    padding-left: 16px;
  }
`;
