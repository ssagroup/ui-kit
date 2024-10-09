import styled from '@emotion/styled';

export const TableRow = styled.a<{ isDisabled?: boolean }>`
  display: table-row;
  outline: 0;
  vertical-align: middle;
  border: none;
  padding: 0 16px;
  height: 44px;
  ${({ isDisabled }) =>
    isDisabled && {
      opacity: 0.6,
      cursor: 'default',
      userSelect: 'none',
    }}
  & tr:first-of-type {
    padding-left: 18px;
  }
`;
