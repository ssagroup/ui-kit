import styled from '@emotion/styled';

import TableCell from '@components/TableCell';

const TableHead = styled.thead`
  display: table-header-group;

  background: #eef1f7;

  & ${TableCell} {
    border-bottom: 1px solid white;
    border-right: 1px solid white;
  }
`;

export default TableHead;
