import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

const TableCell = styled.td<{ align?: string } & CommonProps>`
  display: table-cell;

  vertical-align: inherit;
  text-align: ${({ align }) => (align ? align : 'left')};

  border-bottom: 1px solid #eef1f7;
  border-right: 1px solid #eef1f7;

  padding: 14px;
`;

export default TableCell;
