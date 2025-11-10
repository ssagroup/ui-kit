import styled from '@emotion/styled';

import { CommonProps } from '@global-types/emotion';

const TableHead = styled.thead<CommonProps>`
  display: table-header-group;
  background: none;
  font-size: 12px;

  & tr {
    box-shadow: inset 0 -1px 0 #eaecf0;
    white-space: nowrap;
    font-weight: 700;

    &:first-of-type {
      border-top-left-radius: 20px;
    }
    &:last-child {
      cursor: default;
      border-top-right-radius: 20px;
    }

    & td,
    & th {
      font-weight: 700;
      box-shadow: rgb(234, 236, 240) 0 -1px 0 inset;
      &:first-of-type {
        padding-left: 16px;
        border-top-left-radius: 20px;
      }
      &:last-child {
        border-top-right-radius: 20px;
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`;

export default TableHead;
