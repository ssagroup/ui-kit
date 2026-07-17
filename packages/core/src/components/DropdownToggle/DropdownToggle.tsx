import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { DropdownToggleProps, MultipleStylesProps } from './types';

/** Border colors per status, mirroring Input's basic/error/success maps */
const statusBorderColors = (theme: Theme) => ({
  basic: {
    default: theme.colors.grey,
    hover: theme.colors.greyDarker80,
    accent: theme.palette.primary.light,
  },
  error: {
    default: theme.palette.error.light,
    hover: theme.palette.error.main,
    accent: theme.palette.error.dark,
  },
  success: {
    default: theme.palette.success.light,
    hover: theme.palette.success.main,
    accent: theme.palette.success.dark,
  },
});

/** Single-select dropdown: input-like look (white bg, palette borders, accent when open/focused) */
const singleDropdownStyles = ({
  theme,
  isOpen,
  disabled,
  status = 'basic',
}: {
  theme: Theme;
  isOpen: boolean;
  disabled?: boolean;
  status?: 'basic' | 'error' | 'success';
}) => {
  const colors = statusBorderColors(theme)[status];

  return css`
    border: 1px solid ${isOpen ? colors.accent : colors.default};
    background: ${disabled
      ? theme.palette.secondary.light
      : theme.colors.white};
    color: ${theme.colors.greyDarker};

    svg path {
      stroke: ${theme.colors.greyDarker80};
    }

    &:disabled {
      border-color: ${theme.colors.grey};
      color: ${theme.colors.grey};
      cursor: default;

      svg path {
        stroke: ${theme.colors.grey};
      }
    }

    &:focus:not(:disabled) {
      border-color: ${colors.accent};
      background: ${theme.colors.white};

      svg path {
        stroke: ${theme.colors.greyDarker};
      }
    }

    &:hover:not(:disabled) {
      border-color: ${isOpen ? colors.accent : colors.hover};

      svg path {
        stroke: ${theme.colors.greyDarker};
      }
    }
  `;
};

const multipleStyles = ({ theme, isOpen }: MultipleStylesProps) => {
  const borderColor = isOpen ? theme.palette.primary.main : theme.colors.grey;

  return css`
    justify-content: space-between;
    height: 40px;
    padding: 11px 15px 9px 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${theme.colors.greyDarker};
    border: 1px solid ${borderColor};
    border-radius: 12px;
    background: ${theme.colors.white};
    max-width: 250px;

    svg path {
      stroke: ${theme.colors.greyDarker};
    }

    &:disabled {
      background: ${theme.colors.greyLighter};
      border-color: ${theme.colors.grey};
      color: ${theme.colors.greyDarker60};
      cursor: default;

      svg path {
        stroke: ${theme.colors.grey};
      }
    }

    &:focus:not(:disabled) {
      border-color: ${theme.palette.primary.main};
    }

    &:hover:not(:disabled) {
      border-color: ${isOpen
        ? theme.palette.primary.main
        : theme.colors.greyDarker80};
    }
  `;
};

export const DropdownToggleBase = styled.button<
  Pick<
    DropdownToggleProps,
    'colors' | 'isOpen' | 'disabled' | 'isMultiple' | 'selectedCount' | 'status'
  >
>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  position: relative;

  width: auto;
  height: 44px;
  padding: 0 14px;

  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  line-height: 18px;

  cursor: pointer;
  outline: inherit;

  border-radius: 12px;

  /* Single dropdown: input-like (white bg, palette borders); applied when !isMultiple */
  ${({ isMultiple, isOpen, disabled, status, theme }) =>
    !isMultiple && singleDropdownStyles({ theme, isOpen, disabled, status })}

  /* Multiple dropdown: overrides above and adds its own border/background */
  ${({ isMultiple, isOpen, theme }) =>
    isMultiple &&
    multipleStyles({
      theme,
      isOpen,
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
  status,
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
    status={status}
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
