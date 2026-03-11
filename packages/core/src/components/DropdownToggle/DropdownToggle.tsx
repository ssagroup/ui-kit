import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { focusOutline } from '@styles/safari-focus-outline';
import { DropdownToggleProps, MultipleStylesProps } from './types';

/** Single-select dropdown: input-like look (white bg, palette borders, primary when open) */
const singleDropdownStyles = ({
  theme,
  isOpen,
  disabled,
}: {
  theme: Theme;
  isOpen: boolean;
  disabled?: boolean;
}) => css`
  border: 1px solid ${isOpen ? theme.palette.primary.main : theme.colors.grey};
  background: ${disabled ? theme.colors.greyLighter : theme.colors.white};
  color: ${theme.colors.greyDarker};

  &:disabled {
    border-color: ${theme.colors.grey};
    color: ${theme.colors.greyDarker60};
    cursor: default;

    svg path {
      stroke: ${theme.colors.grey};
    }
  }

  &:focus:not(:disabled) {
    border-color: ${theme.palette.primary.main};
    background: ${theme.colors.white};
  }

  &:hover:not(:disabled) {
    border-color: ${isOpen
      ? theme.palette.primary.main
      : theme.colors.greyDarker80};
  }
`;

const multipleStyles = ({ theme, selectedCount = 0 }: MultipleStylesProps) => {
  let borderColor = theme.colors.grey;
  let borderColorFocused = theme.palette.primary.main;
  let backgroundColor = theme.colors.white;
  if (selectedCount > 0) {
    borderColor =
      theme.colors.blueDropdownWithSelectedItemsBorder ?? theme.colors.grey;
    borderColorFocused =
      theme.colors.blueDropdownWithSelectedItemsBorder ??
      theme.palette.primary.main;
    backgroundColor =
      theme.colors.blueDropdownWithSelectedItems ?? theme.colors.white;
  }

  return css`
    justify-content: space-between;
    height: 40px;
    padding: 11px 15px 9px 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${theme.colors.greyDarker};
    border: 1px solid ${borderColor};
    border-radius: 12px;
    background: ${backgroundColor};
    max-width: 250px;

    &:focus {
      background: ${backgroundColor};
      &::before {
        border-color: ${borderColorFocused};
      }
    }

    svg {
      path {
        stroke: ${theme.colors.greyDarker};
      }
    }
  `;
};

export const DropdownToggleBase = styled.button<
  Pick<
    DropdownToggleProps,
    'colors' | 'isOpen' | 'disabled' | 'isMultiple' | 'selectedCount'
  >
>`
  ${({ isMultiple, theme }) =>
    isMultiple ? focusOutline(theme, 'greyDropdownFocused', '5px') : css``}

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  position: relative;

  width: auto;
  padding: 8px 14px;

  font: inherit;
  font-size: 13px;
  text-align: left;
  line-height: 18px;

  cursor: pointer;
  outline: inherit;

  border-radius: 12px;

  /* Single dropdown: input-like (white bg, palette borders); applied when !isMultiple */
  ${({ isMultiple, isOpen, disabled, theme }) =>
    !isMultiple && singleDropdownStyles({ theme, isOpen, disabled })}

  /* Multiple dropdown: overrides above and adds its own border/background */
  ${({ isMultiple, selectedCount, theme }) =>
    isMultiple &&
    multipleStyles({
      theme,
      selectedCount,
    })}

  /* Text/icon color for single dropdown (multiple has its own in multipleStyles) */
  ${({ isMultiple, theme }) =>
    !isMultiple &&
    css`
      color: ${theme.colors.greyDarker};
      svg path {
        stroke: ${theme.colors.greyDarker};
      }
    `}
`;

const DropdownToggle = ({
  onClick,
  onFocus,
  isOpen,
  isMultiple,
  selectedCount,
  disabled,
  children,
  ariaLabelledby,
  ariaControls,
  colors,
  className,
  ...restProps
}: DropdownToggleProps) => (
  <DropdownToggleBase
    {...restProps}
    className={className}
    colors={colors}
    isOpen={isOpen}
    type="button"
    isMultiple={isMultiple}
    selectedCount={selectedCount}
    onClick={(e) => {
      // Safari doesn't support focus on buttons 🤔
      (e.currentTarget as HTMLButtonElement).focus();
      if (onClick) {
        onClick(e);
      }
    }}
    onFocus={onFocus}
    disabled={disabled}
    role="combobox"
    aria-labelledby={ariaLabelledby}
    aria-controls={ariaControls}
    aria-expanded={isOpen}
    aria-haspopup="listbox">
    {children}
  </DropdownToggleBase>
);

export default DropdownToggle;
