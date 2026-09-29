import { Theme } from '@emotion/react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Wrapper from '@components/Wrapper';
import Button from '@components/Button';
import { PopoverTrigger } from '@components/Popover';
import { useTypeahead } from './useTypeahead';
import { TypeaheadItemProps } from './types';

// TODO: automatically calculate max-height
// https://github.com/ssagroup/ui-kit/issues/385
export const TypeaheadOptionsBase = styled.ul`
  padding: 4px;
  margin: 0;
  list-style: none;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
  backdrop-filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
  overflow-y: auto;
  max-height: 350px;
`;

export const TypeaheadOption = styled.li<TypeaheadItemProps>`
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  gap: 8px;
  padding: 8px 12px;
  min-height: 40px;
  line-height: 18px;
  justify-content: space-between;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.blue12 : 'none'};
  &:hover {
    background: ${({ theme }) => theme.colors.blue12};
  }
`;

export const TypeaheadInput = (theme: Theme) => css`
  &.typeahead-input {
    flex: 1;
    width: 100%;
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

export const TypeaheadInputPlaceholder = (theme: Theme) => css`
  position: absolute;
  top: 0;
  left: -4px;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;
  color: ${theme.colors.greyDarker80};
  &:disabled:hover {
    cursor: default;
  }
`;

export const TypeaheadInputWrapper = css`
  flex: 1;
  width: 100%;
  height: 32px;
  z-index: 5;
  background: transparent;
  margin-left: -8px;
  &:active,
  &:focus {
    min-width: 100%;
  }
`;

export const TypeaheadItem = styled.div<{
  isDisabled?: boolean;
  isCustomValue?: boolean;
  singleLine?: boolean;
  isOutOfFlow?: boolean;
  canShrink?: boolean;
}>`
  display: flex;
  gap: 6px;
  background: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.greySelectedMenuItem
      : theme.colors.greyLighter40};
  border-radius: 24px;
  border: 1px solid
    ${({ theme, isCustomValue }) =>
      isCustomValue ? theme.palette.primary.main : theme.colors.grey};
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.grey : theme.colors.greyDarker};
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  min-height: 20px;
  align-items: center;
  padding: 4px 8px 4px 12px;
  user-select: none;
  overflow: hidden;
  ${({ singleLine, canShrink }) =>
    singleLine && {
      flexShrink: canShrink ? 1 : 0,
      minWidth: 0,
    }}
  ${({ isOutOfFlow }) =>
    isOutOfFlow && {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'max-content',
      visibility: 'hidden',
      pointerEvents: 'none',
    }}
`;

export const TypeaheadItemAvatar = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const TypeaheadItemLabel = styled.div<{
  isDisabled?: boolean;
  isCustomValue?: boolean;
  singleLine?: boolean;
}>`
  color: ${({ theme, isDisabled, isCustomValue }) =>
    isDisabled
      ? theme.colors.grey
      : isCustomValue
        ? theme.palette.primary.main
        : theme.colors.greyDarker};
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: default;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ singleLine }) =>
    singleLine && {
      display: 'block',
      whiteSpace: 'nowrap',
      minWidth: 0,
    }}
`;

/*
  Holds the chips and the counter on a single-line trigger. It shrinks before
  the input group does, and clips chips that overflow for the one frame before
  the visible count is re-measured.
*/
export const TypeaheadSelectedRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
`;

export const TypeaheadSelectedCounter = styled.div`
  flex-shrink: 0;
`;

/*
  Counter is a pill sized by horizontal padding, so a single digit comes out
  wider than tall. A min-width equal to its small height keeps it a circle up
  to two digits; only the clamped 99+ label grows into a pill.
*/
export const TypeaheadCounterCircle = {
  boxSizing: 'border-box',
  width: 'auto',
  minWidth: 24,
  padding: '0 4px',
} as const;

export const TypeaheadItemCross = styled(Button)<{
  isCustomValue?: boolean;
}>`
  background: none;
  padding: 0;
  height: auto;

  &:active,
  &:focus,
  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    background: none;
    box-shadow: none;
  }

  &:disabled {
    background: none;
  }
`;

export const TypeaheadInputsGroupWrapper = styled(Wrapper)<{
  isOpen: boolean;
  singleLine?: boolean;
}>`
  position: relative;
  flex: ${({ singleLine }) => (singleLine ? '1 0 50px' : '1 1 0')};
  min-height: 32px;
  min-width: ${({ isOpen, singleLine }) =>
    isOpen || singleLine ? '50px' : 'auto'};
  flex-direction: column !important;
`;

export const TypeaheadTrigger = styled(PopoverTrigger)<{
  isOpen: boolean;
  status: ReturnType<typeof useTypeahead>['status'];
}>`
  position: relative;
  border-radius: 12px;
  border: 1px solid
    ${({ status, theme }) =>
      status === 'basic'
        ? theme.colors.grey
        : status === 'error'
          ? theme.palette.error.light
          : theme.palette.success.light};
  min-height: 44px;
  height: auto;
  background: ${({ theme }) => theme.colors.white};
  gap: 8px;
  padding: 5px 28px 5px 14px;
  width: 100%;
  flex-wrap: wrap;
  &[data-single-line='true'] {
    flex-wrap: nowrap;
    overflow: hidden;
  }
  border-color: ${({ isOpen, theme, status }) =>
    isOpen &&
    (status === 'error'
      ? theme.palette.error.dark
      : status === 'success'
        ? theme.palette.success.dark
        : theme.palette.primary.light)};
  background: ${({ isDisabled, theme }) =>
    isDisabled ? theme.palette.secondary.light : theme.colors.white};
  &:active,
  &:focus,
  &:hover {
    background: ${({ isDisabled, theme }) =>
      isDisabled ? theme.palette.secondary.light : theme.colors.white};
    box-shadow: none;
  }
  &:hover {
    border-color: ${({ isDisabled, theme, status }) =>
      isDisabled
        ? theme.colors.grey
        : status === 'error'
          ? theme.palette.error.main
          : status === 'success'
            ? theme.palette.success.main
            : theme.colors.greyDarker80};
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  }
  &:focus,
  &:active {
    border-color: ${({ theme, status }) =>
      status === 'error'
        ? theme.palette.error.dark
        : status === 'success'
          ? theme.palette.success.dark
          : theme.palette.primary.light};
    ${({ isDisabled, theme }) =>
      isDisabled && {
        borderColor: theme.colors.grey,
      }}
  }
`;
