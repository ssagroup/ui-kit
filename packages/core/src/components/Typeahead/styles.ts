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

export const TypeaheadTrigger = styled(PopoverTrigger)<{
  isOpen: boolean;
}>`
  position: relative;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.greyDropdownMain};
  min-height: 44px;
  height: auto;
  background: #fff;
  gap: 3px;
  padding: 5px 8px;
  width: 200px;
  flex-wrap: wrap;
  border: ${({ isOpen }) => isOpen && '1.4px solid rgba(43, 45, 49, 0.6)'};
  &:active,
  &:focus,
  &:hover {
    background: #fff;
    box-shadow: none;
    border: 0.67 solid rgb(73, 80, 87);
  }
`;

export const TypeaheadInput = css`
  &.typeahead-input {
    border: none;
    border-radius: 0;
    height: 34px;
    cursor: pointer;
    padding: 0;
    background: transparent;
  }
`;

export const TypeaheadInputPlaceholder = css`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;
  color: rgba(0, 0, 0, 0.54);
`;

export const TypeaheadInputsGroupWrapper = css`
  position: relative;
  flex: 1 1 0%;
`;

export const TypeaheadInputWrapper = css`
  height: 34px;
  z-index: 1;
  background: transparent;
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
