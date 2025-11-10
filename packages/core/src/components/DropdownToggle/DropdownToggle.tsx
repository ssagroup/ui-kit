import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { focusOutline } from '@styles/safari-focus-outline';
import { DropdownToggleProps, MultipleStylesProps } from './types';

const multipleStyles = ({ theme, selectedCount = 0 }: MultipleStylesProps) => {
  let borderColor = theme.colors.greyDropdownMain;
  let borderColorFocused = theme.colors.greyDropdownFocused;
  let backgroundColor = theme.colors.white;
  if (selectedCount > 0) {
    borderColor = theme.colors.blueDropdownWithSelectedItemsBorder;
    borderColorFocused = theme.colors.blueDropdownWithSelectedItemsBorder;
    backgroundColor = theme.colors.blueDropdownWithSelectedItems;
  }

  return css`
    justify-content: space-between;
    height: 40px;
    padding: 11px 15px 9px 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${theme.colors.greyDropdownText};
    border: 1px solid ${borderColor};
    border-radius: 5px;
    background: ${backgroundColor};
    max-width: 250px;

    &:focus {
      color: ${theme.colors.greyDropdownText};
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
    isMultiple
      ? focusOutline(theme, 'greyDropdownFocused', '5px')
      : focusOutline(theme)}

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  position: relative;

  color: ${({ colors, isOpen }) =>
    isOpen ? colors?.[0] || 'initial' : 'initial'};

  width: auto;
  padding: 8px 14px;

  font: inherit;
  font-size: 13px;
  text-align: left;
  line-height: 18px;

  border: none;
  cursor: pointer;
  outline: inherit;

  border-radius: 12px;

  background: ${({ isOpen, theme }) =>
    isOpen
      ? `linear-gradient(108.3deg, ${theme.colors.greyDarker} -0.36%, ${theme.colors.greyDark} 100%)`
      : theme.colors.greyLighter};

  &:disabled {
    background: ${({ theme }) => theme.colors.grey};
    cursor: default;
  }

  &:focus {
    color: ${({ colors, theme }) => colors?.[0] || theme.colors.greyDarker};
    background: ${({ isOpen, theme }) =>
      isOpen
        ? `linear-gradient(108.3deg, ${theme.colors.greyDarker} -0.36%, ${theme.colors.greyDark} 100%)`
        : theme.colors.greyFocused};
  }

  svg {
    path {
      stroke: ${({ colors, theme }) => colors?.[0] || theme.colors.greyDarker};
    }
  }

  ${({ isMultiple, selectedCount, theme }) =>
    isMultiple &&
    multipleStyles({
      theme,
      selectedCount,
    })}
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
