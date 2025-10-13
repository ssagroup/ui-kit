import styled from '@emotion/styled';

import { CommonProps } from '@global-types/emotion';

const TableCell = styled.td<{ align?: string } & CommonProps>`
  display: table-cell;

  vertical-align: inherit;
  text-align: ${({ align }) => (align ? align : 'left')};

  border: none;
  padding: 0 16px;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  height: 44px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`;

export default TableCell;
