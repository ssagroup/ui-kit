import styled from '@emotion/styled';
import { TableRow } from '@ssa-ui-kit/core';

export const BotsTableRow = styled(TableRow)<{ isDisabled?: boolean }>`
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
