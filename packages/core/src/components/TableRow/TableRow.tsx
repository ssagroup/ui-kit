import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

const TableRow = styled.tr<CommonProps & { isDisabled?: boolean }>`
  display: table-row;
  outline: 0;
  vertical-align: middle;

  border: none;
  padding: 0 16px;
  height: 44px;
  & tr:first-of-type {
    padding-left: 18px;
  }
  ${({ isDisabled }) =>
    isDisabled && {
      opacity: 0.6,
      cursor: 'default',
      userSelect: 'none',
    }}
`;

export default TableRow;
