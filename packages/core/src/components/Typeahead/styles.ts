import { Theme } from '@emotion/react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Wrapper from '@components/Wrapper';
import Button from '@components/Button';
import { PopoverTrigger } from '@components/Popover';
import { useTypeahead } from './useTypeahead';
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
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.blueRoyal12 : 'none'};
  &:hover {
    background: rgba(72, 125, 225, 0.06);
  }
`;

export const TypeaheadInput = (theme: Theme) => css`
  &.typeahead-input {
    color: ${theme.colors.greyDarker};
    border: none;
    border-radius: 0;
    height: 32px;
    cursor: pointer;
    padding: 0;
    background: transparent;
    text-indent: 8px;
    &:active,
    &:focus {
      min-width: 100%;
    }
  }
`;

export const TypeaheadInputPlaceholder = css`
  position: absolute;
  top: 0;
  left: -4px;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;
  color: rgba(0, 0, 0, 0.54);
  &:disabled:hover {
    cursor: default;
  }
`;

export const TypeaheadInputWrapper = css`
  height: 32px;
  z-index: 5;
  background: transparent;
  margin-left: -8px;
  &:active,
  &:focus {
    min-width: 100%;
  }
`;

export const TypeaheadItem = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  gap: 6px;
  background: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.greySelectedMenuItem
      : theme.colors.greyLighter40};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.grey : theme.colors.greyDarker};
  font-weight: 500;
  font-size: 14px;
  height: 32px;
  align-items: center;
  padding: 6px;
  user-select: none;
`;

export const TypeaheadItemLabel = styled.div<{ isDisabled?: boolean }>`
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.grey : theme.colors.greyDarker};
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
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
    background: none;
    box-shadow: none;
  }
  &:disabled {
    background: none;
  }
`;

export const TypeaheadInputsGroupWrapper = styled(Wrapper)<{
  isOpen: boolean;
}>`
  position: relative;
  flex: 1 1 0%;
  min-width: ${({ isOpen }) => (isOpen ? '50px' : 'auto')};
  flex-direction: column !important;
`;

export const TypeaheadTrigger = styled(PopoverTrigger)<{
  isOpen: boolean;
  status: ReturnType<typeof useTypeahead>['status'];
}>`
  position: relative;
  border-radius: 8px;
  border: 1px solid
    ${({ status, theme }) =>
      status === 'basic'
        ? theme.colors.grey
        : status === 'error'
        ? theme.colors.red
        : theme.colors.greenLighter};
  min-height: 44px;
  height: auto;
  background: #fff;
  gap: 8px;
  padding: 5px 28px 5px 8px;
  width: 100%;
  flex-wrap: wrap;
  border-color: ${({ isOpen, theme, status }) =>
    isOpen &&
    (status === 'error'
      ? theme.colors.red
      : status === 'success'
      ? theme.colors.greenLighter
      : theme.colors.blueRoyal)};
  background: ${({ isDisabled, theme }) =>
    isDisabled ? theme.colors.greyLighter : theme.colors.white};
  &:active,
  &:focus,
  &:hover {
    background: ${({ isDisabled, theme }) =>
      isDisabled ? theme.colors.greyLighter : theme.colors.white};
    box-shadow: none;
  }
  &:hover {
    border-color: ${({ isDisabled, theme, status }) =>
      isDisabled
        ? theme.colors.grey
        : status === 'error'
        ? theme.colors.red
        : status === 'success'
        ? theme.colors.greenLighter
        : theme.colors.greyDarker80};
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  }
  &:focus,
  &:active {
    border-color: ${({ theme, status }) =>
      status === 'error'
        ? theme.colors.red
        : status === 'success'
        ? theme.colors.greenLighter
        : theme.colors.blueRoyal};
    ${({ isDisabled, theme }) =>
      isDisabled && {
        borderColor: theme.colors.grey,
      }}
  }
`;
