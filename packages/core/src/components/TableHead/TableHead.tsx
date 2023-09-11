import styled from '@emotion/styled';

import TableCell from '@components/TableCell';
import { CommonProps } from '@global-types/emotion';

const TableHead = styled.thead<CommonProps>({
  display: 'table-header-group',
  background: '#eef1f7',
  [`& ${TableCell}`]: {
    borderBottom: '1px solid white',
    borderRight: '1px solid white',
  },
});

export default TableHead;
