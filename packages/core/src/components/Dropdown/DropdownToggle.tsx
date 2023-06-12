import styled from '@emotion/styled';
import { IDropdownToggleProps } from '@components/Dropdown/types';

export const DropdownToggleBase = styled.button<
  Pick<IDropdownToggleProps, 'isOpen' | 'disabled'>
>`
  position: relative;
  border: none;
  padding: 0;
  font: inherit;
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
    background: ${({ isOpen, theme }) =>
      isOpen
        ? `linear-gradient(108.3deg, ${theme.colors.greyDarker} -0.36%, ${theme.colors.greyDark} 100%)`
        : theme.colors.greyFocused};
  }

  /* This is for Safari to make a rounded outline */
  &:focus::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border: ${({ theme }) => `1px solid ${theme.colors.greyDarker}`};
    border-radius: 12px;
  }
`;

export const DropdownToggle = ({
  onClick,
  onFocus,
  isOpen,
  disabled,
  children,
  ariaLabelledby,
  ariaControls,
}: IDropdownToggleProps) => {
  return (
    <DropdownToggleBase
      isOpen={isOpen}
      onClick={(e) => {
        // Safari doesn't support focus on buttons 🤔
        (e.currentTarget as HTMLButtonElement).focus();
        onClick(e);
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
};
