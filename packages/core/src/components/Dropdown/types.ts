import React from 'react';
import { Interpolation, Theme } from '@emotion/react';
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
 * Provides keyboard navigation, accessibility, customizable styling, and
 * automatic viewport-aware placement of the options list.
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
 *
 * @example
 * ```tsx
 * // Force the list to always open upward (e.g. component near the bottom of the page)
 * <Dropdown
 *   selectedItem={selected}
 *   onChange={handleChange}
 *   dropdownProps={{ dropdownPosition: 'top' }}
 * >
 *   ...
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
   * Max height (px) of the options list; overflow scrolls.
   * @default 200
   */
  maxHeight?: number;

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
    > & {
      /**
       * Emotion css prop for custom styles on the toggle button.
       * Merged on top of the component's built-in styles, so any rule here
       * overrides the default appearance.
       *
       * @example
       * ```tsx
       * import { css } from '@emotion/react';
       *
       * <Dropdown
       *   dropdownProps={{
       *     toggleButton: {
       *       css: css`background: hotpink; border: none;`,
       *     },
       *   }}
       * >
       *   ...
       * </Dropdown>
       * ```
       */
      css?: Interpolation<Theme>;
    };
    /** Props for the arrow icon SVG element */
    toggleButtonArrow?: Omit<IconProps, 'name' | 'size'>;
    /**
     * Controls the opening direction of the options list.
     * - 'auto': opens downward by default; flips upward automatically when
     *   there is insufficient space below the toggle in the viewport
     * - 'top': always opens upward
     * - 'bottom': always opens downward
     * @default 'auto'
     */
    dropdownPosition?: 'auto' | 'top' | 'bottom';
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

  /**
   * Max height (px) of the options list
   */
  maxHeight?: number;

  /**
   * Ref attached to the options list element
   * Used by Dropdown to measure actual list height for placement calculation
   */
  listRef?: React.RefObject<HTMLUListElement | null>;

  /**
   * Resolved placement of the options list
   * Computed by Dropdown based on dropdownPosition prop and available viewport space
   */
  placement?: 'top' | 'bottom';
}
