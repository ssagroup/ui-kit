import React from 'react';
import { DropdownOptionProps } from '@components/DropdownOptions';
import { CommonProps } from '@global-types/emotion';
import { IconProps } from '@components/Icon/types';

/**
 * Props that are controlled by Dropdown component
 * These props cannot be passed via dropdownProps.toggleButton
 */
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

/**
 * Props for the Dropdown component
 *
 * A select-like dropdown component that allows users to choose one option from
 * a list. Uses compound component pattern with DropdownOption children.
 * Provides keyboard navigation, accessibility, and customizable styling.
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: 1, value: 'Option 1' },
 *   { id: 2, value: 'Option 2' },
 * ];
 *
 * <Dropdown
 *   selectedItem={items[0]}
 *   onChange={(item) => console.log(item)}
 *   placeholder="Select an option"
 * >
 *   {items.map(item => (
 *     <DropdownOption key={item.id} value={item.id}>
 *       {item.value}
 *     </DropdownOption>
 *   ))}
 * </Dropdown>
 * ```
 */
export interface DropdownProps<
  P extends DropdownOptionProps,
> extends CommonProps {
  /**
   * Currently selected item
   * When provided, this item will be displayed in the toggle button
   */
  selectedItem?: P;

  /**
   * Callback function called when an option is selected
   * Receives the selected DropdownOptionProps object
   */
  onChange?: (item: P) => void;

  /**
   * Whether the dropdown is disabled
   * Disabled dropdowns cannot be opened or interacted with
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Placeholder text displayed when no item is selected
   * @default 'Select something'
   */
  placeholder?: string;

  /**
   * DropdownOption components as children
   * Each child must be a DropdownOption component
   */
  children?: React.ReactNode;

  /**
   * Custom CSS class name for the toggle button
   */
  className?: string;

  /**
   * Controlled open state
   * When provided, controls dropdown open/closed state externally
   */
  isOpen?: boolean;

  /**
   * Props object for sub-components
   * Allows fine-grained control over component parts
   */
  dropdownProps?: {
    /** Props for the wrapper div element */
    base?: React.HTMLAttributes<HTMLDivElement>;
    /** Props for the toggle button element (excluding controlled props) */
    toggleButton?: Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      ControlledButtonProps
    >;
    /** Props for the arrow icon SVG element */
    toggleButtonArrow?: Omit<IconProps, 'name' | 'size'>;
  };
}

/**
 * Dropdown context value
 * Provides selection state and change handler to child DropdownOption components
 */
export interface DropdownContextType {
  /**
   * Function to handle option selection
   * Called when a DropdownOption is clicked
   */
  onChange: (item?: string) => void;

  /**
   * Currently active/selected item
   * Used to highlight the selected option
   */
  activeItem?: DropdownOptionProps | null;
}
