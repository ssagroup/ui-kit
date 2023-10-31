import styled from '@emotion/styled';
import { Table } from '@ssa-ui-kit/core';

export const BotsTableWrapper = styled(Table)`
  background: none;
  & thead td:first-of-type {
    border-top-left-radius: 20px;
  }
  & thead td:last-child {
    border-top-right-radius: 20px;
  }
  & tbody tr:last-child td:first-of-type {
    border-bottom-left-radius: 20px;
  }
  & tbody tr:last-child td:last-child {
    border-bottom-right-radius: 20px;
  }
  & tbody tr:not([aria-disabled='true']):hover {
    & td {
      background-color: #eef1f7;
    }
  }
`;
