import styled from '@emotion/styled';
import { focusOutline } from '@styles/safari-focus-outline';

interface IDropdownToggleProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLButtonElement, Element>) => void;
  isOpen: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  ariaLabelledby: string;
  ariaControls: string;
  colors?: Array<string | undefined>;
  className?: string;
}

export const DropdownToggleBase = styled.button<
  Pick<IDropdownToggleProps, 'colors' | 'isOpen' | 'disabled'>
>`
  ${({ theme }) => focusOutline(theme)}

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  position: relative;

  width: auto;
  padding: 8px 14px 8px 14px;

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
`;

const DropdownToggle = ({
  onClick,
  onFocus,
  isOpen,
  disabled,
  children,
  ariaLabelledby,
  ariaControls,
  colors,
  className,
}: IDropdownToggleProps) => {
  return (
    <DropdownToggleBase
      className={className}
      colors={colors}
      isOpen={isOpen}
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
};

export default DropdownToggle;
