import Button from '@components/Button';
import { PopoverTrigger } from '@components/Popover';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { TypeaheadItemProps } from './types';

export const TypeaheadOptionsBase = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  background: #fff;
  border-radius: 8px;
  filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
  backdrop-filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
`;

export const TypeaheadOption = styled.li<TypeaheadItemProps>`
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background: ${({ theme }) => theme.colors.greyLighter};
  }
`;

export const TypeaheadTrigger = styled(PopoverTrigger)`
  border-radius: 0;
  border: 1px solid ${({ theme }) => theme.colors.greyDropdownMain};
  min-height: 44px;
  height: auto;
  background: #fff;
  gap: 3px;
  padding: 5px 8px;
  width: 200px;
  flex-wrap: wrap;
  &:active,
  &:focus,
  &:hover {
    background: #fff;
    box-shadow: none;
  }
`;

export const TypeaheadInput = css`
  &.typeahead-input {
    border: none;
    border-radius: 0;
    height: 34px;
    cursor: pointer;
  }
`;

export const TypeaheadInputWrapper = css`
  flex: 1 1 0%;
  height: 34px;
`;

export const TypeaheadItem = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.greyLighter};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.greyDarker};
  font-weight: 500;
  font-size: 13px;
  height: 34px;
  align-items: center;
  padding: 4px 8px;
  user-select: none;
`;

export const TypeaheadItemLabel = styled.div`
  margin-right: 4px;
  cursor: default;
`;

export const TypeaheadItemCross = styled(Button)`
  background: none;
  padding: 0;
  &:active,
  &:focus,
  &:hover {
    background: none;
    box-shadow: none;
  }
`;
