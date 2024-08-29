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
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  gap: 8px;
  padding: 12px;
  height: 40px;
  &:hover {
    background: rgba(72, 125, 225, 0.06);
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
  gap: 8px;
  padding: 5px 8px;
  width: 200px;
  flex-wrap: wrap;
  border: ${({ isOpen }) => isOpen && '1px solid rgba(43, 45, 49, 0.6)'};
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
    height: 32px;
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
  height: 32px;
  z-index: 1;
  background: transparent;
`;

export const TypeaheadItem = styled.div`
  display: flex;
  gap: 6px;
  background: ${({ theme }) => theme.colors.greyLighter40};
  border-radius: 24px;
  border: 1px solid #c3c5cc;
  color: ${({ theme }) => theme.colors.greyDarker};
  font-weight: 500;
  font-size: 14px;
  height: 32px;
  align-items: center;
  padding: 6px;
  user-select: none;
`;

export const TypeaheadItemLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: default;
`;

export const TypeaheadItemCross = styled(Button)`
  background: none;
  padding: 0;
  padding-right: 5;
  &:active,
  &:focus,
  &:hover {
    background: none;
    box-shadow: none;
  }
`;
