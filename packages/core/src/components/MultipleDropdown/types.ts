import { DropdownOptionProps } from '@components/DropdownOptions/types';

/**
 * Props for the MultipleDropdown component
 *
 * A dropdown that supports selecting one or more options from a list.
 * In multi-select mode (`isMultiple=true`) options toggle independently and
 * a `+N` badge is shown for overflow. In single-select mode the menu closes
 * after a pick. Forwards its ref to the root container div.
 *
 * @example
 * ```tsx
 * <MultipleDropdown
 *   label="Fruits"
 *   selectedItems={[{ value: 'apple' }]}
 *   onChange={(value, isSelected) => handleChange(value, isSelected)}
 * >
 *   <DropdownOption value="apple">Apple</DropdownOption>
 *   <DropdownOption value="banana">Banana</DropdownOption>
 * </MultipleDropdown>
 * ```
 */
export type DropdownProps<P extends DropdownOptionProps> = {
  /**
   * List of currently selected items
   * Each entry must match one of the DropdownOption values
   * @default []
   */
  selectedItems?: P[];

  /**
   * Enables multi-select mode — each option toggles independently.
   * When `false` the dropdown behaves like a single-select and closes on pick.
   * @default true
   */
  isMultiple?: boolean;

  /**
   * Disables the dropdown, preventing any user interaction
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Placeholder shown in the toggle button when no item is selected
   * @default 'Select something'
   */
  placeholder?: string;

  /**
   * When `true` the placeholder value is included in the displayed list.
   * Set to `false` to hide it and show only the badge count.
   * @default true
   */
  showPlaceholder?: boolean;

  /**
   * DropdownOption components to render as selectable items
   */
  children?: React.ReactNode;

  /**
   * Custom CSS class name forwarded to the toggle button.
   * Useful for styling via `styled(MultipleDropdown)`.
   */
  className?: string;

  /**
   * Controlled open state — when provided, overrides internal open/close logic
   */
  isOpen?: boolean;

  /**
   * Label prefix shown in the toggle button before the selected value(s)
   * e.g. `label="Strategy"` renders "Strategy: Value"
   */
  label?: string;

  /**
   * Callback fired when an option is toggled
   * @param selectedItem - The value of the toggled option
   * @param isSelected   - `true` if the option was just selected, `false` if deselected
   */
  onChange?: (selectedItem: string | number, isSelected: boolean) => void;
};

/**
 * Context value shared with child DropdownOption components via MultipleDropdownContext
 */
export interface DropdownContextType<T extends DropdownOptionProps> {
  /**
   * Function called when an option is clicked
   */
  onChange: (item: T) => void;

  /**
   * Whether multi-select mode is active
   */
  isMultiple?: boolean;

  /**
   * Map of all option values to their current state (including `isSelected`)
   */
  allItems: Record<string | number, T>;
}
