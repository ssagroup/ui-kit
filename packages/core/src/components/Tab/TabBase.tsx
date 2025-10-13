import styled from '@emotion/styled';

import { TabBaseProps } from '@components/TabBar/types';

export const TabBase = styled.button<TabBaseProps>`
  height: 34px;
  border: 0;
  outline: 0;
  padding: 0 14px;
  margin: 0 1px 0 0;
  color: ${({ theme }) => theme.colors.greyDarker};
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.greyFocused : theme.colors.greyLighter};
  font-size: 14px;
  line-height: 15px;
  cursor: pointer;

  &:first-of-type {
    border-radius: 12px 0 0 12px;
  }

  &:last-child {
    border-radius: 0 12px 12px 0;
    margin-right: 0;
  }

  &:focus {
    background: ${({ isActive, theme }) =>
      isActive ? theme.colors.greyFocused : theme.colors.greySelectedMenuItem};
  }
`;
