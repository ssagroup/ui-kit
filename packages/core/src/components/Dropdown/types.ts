import React from 'react';
import { DropdownOptionProps } from '@components/DropdownOptions';
import { CommonProps } from '@global-types/emotion';
import { IconProps } from '@components/Icon/types';

export type ControlledButtonProps =
  | 'onClick'
  | 'onFocus'
  | 'disabled'
  | 'type'
  | 'role'
  | 'aria-expanded'
  | 'aria-haspopup'
  | 'aria-labelledby'
  | 'aria-controls'
  | 'children';

export interface DropdownProps<P extends DropdownOptionProps>
  extends CommonProps {
  selectedItem?: P;
  onChange?: (item: P) => void;
  isDisabled?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  dropdownProps?: {
    baseProps?: React.HTMLAttributes<HTMLDivElement>;
    toggleButtonProps?: Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      ControlledButtonProps
    >;
    toggleButtonArrowProps?: Omit<IconProps, 'name' | 'size'>;
  };
}

export interface DropdownContextType {
  onChange: (item?: string) => void;
  activeItem?: DropdownOptionProps | null;
}
