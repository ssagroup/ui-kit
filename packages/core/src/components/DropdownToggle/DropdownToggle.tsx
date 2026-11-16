import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { resolveAriaProp } from '@utils/deprecation';
import {
  FIELD_CONTROL_BORDER_WIDTH,
  FIELD_CONTROL_BOX_SIZING,
  FIELD_CONTROL_HEIGHT,
  FIELD_CONTROL_RADIUS,
} from '@styles/fieldControl';
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

  /* Height, padding and radius come from DropdownToggleBase, so this toggle
     matches the single dropdown and the other form fields; only the look
     differs. */
  return css`
    font-size: 14px;
    font-weight: 500;
    color: ${theme.colors.greyDarker};
    border: ${FIELD_CONTROL_BORDER_WIDTH}px solid ${borderColor};
    background: ${theme.colors.white};

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
  justify-content: space-between;
  gap: 8px;

  position: relative;

  width: auto;

  /* A <button> keeps shrink-to-fit sizing even as a block-level flex container,
     so width: auto alone would let a long label grow it past its container. */
  max-width: 100%;
  box-sizing: ${FIELD_CONTROL_BOX_SIZING};
  height: ${FIELD_CONTROL_HEIGHT}px;
  padding: 0 14px;

  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  line-height: 18px;

  cursor: pointer;
  outline: inherit;

  border-radius: ${FIELD_CONTROL_RADIUS}px;

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
  'aria-labelledby': ariaLabelledbyNative,
  'aria-controls': ariaControlsNative,
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
    aria-labelledby={resolveAriaProp(
      'DropdownToggle',
      'aria-labelledby',
      ariaLabelledbyNative,
      ariaLabelledby,
    )}
    aria-controls={resolveAriaProp(
      'DropdownToggle',
      'aria-controls',
      ariaControlsNative,
      ariaControls,
    )}
    aria-expanded={isOpen}
    aria-haspopup="listbox">
    {children}
  </DropdownToggleBase>
);

export default DropdownToggle;
