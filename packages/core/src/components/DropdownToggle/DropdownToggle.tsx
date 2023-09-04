import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import { focusOutline } from '@styles/safari-focus-outline';

interface IDropdownToggleProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLButtonElement, Element>) => void;
  isOpen: boolean;
  isMultiple?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  ariaLabelledby: string;
  ariaControls: string;
  colors?: Array<string | undefined>;
  className?: string;
}

// TODO: Rewrite other styles: arrow's down color, sizes, checkbox...
const multipleStyles = (theme: Theme, isOpen: boolean) => css`
  height: 40px;
  gap: 14px;
  padding: 11px 15px 9px 10px;
  color: ${theme.colors.greyDropdownText};
  border: 1px solid ${theme.colors.greyDropdownMain};
  border-radius: 5px;
  background: ${isOpen ? theme.colors.white : theme.colors.white};

  &:focus {
    color: ${theme.colors.greyDropdownText};
    background: ${isOpen ? theme.colors.white : theme.colors.white};
    &::before {
      border-color: ${theme.colors.greyDropdownFocused};
    }
  }
`;

export const DropdownToggleBase = styled.button<
  Pick<IDropdownToggleProps, 'colors' | 'isOpen' | 'disabled' | 'isMultiple'>
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

  ${({ isMultiple, isOpen, theme }) =>
    isMultiple && multipleStyles(theme, isOpen)}
`;

const DropdownToggle = ({
  onClick,
  onFocus,
  isOpen,
  isMultiple,
  disabled,
  children,
  ariaLabelledby,
  ariaControls,
  colors,
  className,
}: IDropdownToggleProps) => (
  <DropdownToggleBase
    className={className}
    colors={colors}
    isOpen={isOpen}
    isMultiple={isMultiple}
    onClick={(e) => {
      // Safari doesn't support focus on buttons 🤔
      (e.currentTarget as HTMLButtonElement).focus();
      onClick && onClick(e);
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
