import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

const TableBody = styled.tbody<CommonProps>`
  display: table-row-group;

  & tr:last-child td:first-of-type {
    border-bottom-left-radius: 20px;
  }
  & tr:last-child td:last-child {
    border-bottom-right-radius: 20px;
  }
  & tr:not([aria-disabled='true']):hover {
    & td {
      background-color: #eef1f7;
    }
  }
`;

export default TableBody;
