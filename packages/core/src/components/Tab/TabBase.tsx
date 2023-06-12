import styled from '@emotion/styled';

import { ISmallTabProps } from '@components/TabBar/types';

export const TabBase = styled.button<Pick<ISmallTabProps, 'isActive'>>`
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
    border-radius: 12px 0px 0px 12px;
  }

  &:last-child {
    border-radius: 0px 12px 12px 0px;
    margin-right: 0px;
  }

  &:focus {
    background: ${({ isActive, theme }) =>
      isActive ? theme.colors.greyFocused : theme.colors.greySelectedMenuItem};
  }
`;
