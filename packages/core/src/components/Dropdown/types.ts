import React from 'react';
import type { FieldError } from 'react-hook-form';
import { Interpolation, Theme } from '@emotion/react';
import { DropdownOptionProps } from '@components/DropdownOptions';
import { CommonProps } from '@global-types/emotion';
import { IconProps } from '@components/Icon/types';
import { LabelBadge } from '@components/Label/types';

export enum DropdownPositions {
  top = 'top',
  bottom = 'bottom',
  auto = 'auto',
}

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
 *   { value: 1, label: 'Option 1' },
 *   { value: 2, label: 'Option 2' },
 * ];
 *
 * <Dropdown
 *   selectedItem={items[0]}
 *   onChange={(item) => console.log(item)}
 *   placeholder="Select an option"
 * >
 *   {items.map(item => (
 *     <DropdownOption key={item.value} value={item.value} label={item.label} />
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
 *   dropdownProps={{ dropdownPosition: DropdownPositions.top }}
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
  disabled?: boolean;

  /**
   * @deprecated Use `disabled` instead. Removed in the next major release.
   */
  isDisabled?: boolean;

  /**
   * Placeholder text displayed when no item is selected
   * @default 'Select something'
   */
  placeholder?: string;

  /**
   * `DropdownOption` elements, optionally wrapped in `DropdownOptionGroup`.
   * Groups must be direct children.
   */
  children?: React.ReactNode;

  /**
   * Custom CSS class name for the toggle button
   */
  className?: string;

  /**
   * Initial open state. Read on mount only — changing it later has no effect.
   */
  isOpen?: boolean;

  /**
   * Max height (px) of the options list; overflow scrolls.
   * @default 200
   */
  maxHeight?: number;
  /**
   * Shows a border around the avatar in the selected-item display.
   * @default false
   */
  avatarBorder?: boolean;

  /**
   * Label text displayed above the dropdown
   */
  label?: string;

  /**
   * Status badge to the right of the label, e.g.
   * `{ text: 'default', color: 'grey' }`. Announced as the toggle's
   * description. Needs a `label`.
   */
  labelBadge?: LabelBadge;

  /**
   * Helper text displayed below the dropdown
   * Shown when no errors are present
   */
  helperText?: string;

  /**
   * React Hook Form field error object
   * Used to display validation error messages
   */
  errors?: FieldError;

  /**
   * Whether to display success state styling
   * When true, status is set to 'success'
   * @default false
   */
  success?: boolean;

  /**
   * Leading icon shown in the toggle button when no selected item avatar is present.
   * Ignored once an item with an `avatar` is selected — the avatar always takes priority.
   */
  icon?: IconProps['name'];

  /**
   * Width of the dropdown.
   * Can be a number (pixels) or a string (any CSS value, e.g. `'100%'`).
   *
   * The value is applied to the outer field wrapper; the positioning base and
   * the toggle button are stretched to fill it. All three have to be sized,
   * because each one shrink-wraps on its own — but only the outermost carries
   * the value, so a relative width like `'60%'` resolves against the
   * surrounding container rather than compounding at every level.
   *
   * Setting the width from the outside via `className` / `css` only reaches the
   * toggle button, which cannot grow past a shrink-wrapped parent.
   *
   * Has no default: when omitted, the dropdown sizes itself to its content,
   * matching the behaviour of previous versions.
   *
   * @example
   * ```tsx
   * // Fill the surrounding form column
   * <Dropdown width="100%" selectedItem={selected} onChange={handleChange}>
   *   ...
   * </Dropdown>
   * ```
   */
  width?: string | number;

  /**
   * Props object for sub-components
   * Allows fine-grained control over component parts
   */
  dropdownProps?: {
    /**
     * Props for the wrapper div element.
     *
     * For sizing prefer the top-level `width` prop — it also reaches the outer
     * field wrapper, which this slot cannot.
     */
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
     * - DropdownPositions.auto: opens downward by default; flips upward automatically when
     *   there is insufficient space below the toggle in the viewport
     * - DropdownPositions.top: always opens upward
     * - DropdownPositions.bottom: always opens downward
     * @default DropdownPositions.auto
     */
    dropdownPosition?: DropdownPositions;
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

  /**
   * Option highlighted by the keyboard or the pointer. Focus stays on the
   * toggle, so the list is driven from there.
   */
  activeValue?: string | number | null;

  /** Moves the highlight; called by the list on pointer moves. */
  setActiveValue?: (value: string | number | null) => void;
}
