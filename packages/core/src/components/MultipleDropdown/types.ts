import type { FieldError } from 'react-hook-form';
import { DropdownOptionProps } from '@components/DropdownOptions/types';
import { LabelBadge } from '@components/Label/types';

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
   * Selected options, matched to the `DropdownOption`s by `value`.
   * Seeds the internal selection and resets it whenever it changes or the
   * parent re-renders, so keep it in state and update it from `onChange`.
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
  disabled?: boolean;

  /**
   * Disables the dropdown, preventing any user interaction
   *
   * @deprecated Use `disabled` instead. Removed in the next major release.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Placeholder shown in the toggle button when no item is selected
   * @default 'Select something'
   */
  placeholder?: string;

  /**
   * When nothing is selected, shows `placeholder` after the `label`.
   * Set to `false` to show the `label` alone. Has no effect once something
   * is selected.
   * @default true
   */
  showPlaceholder?: boolean;

  /**
   * `DropdownOption` elements, optionally wrapped in `DropdownOptionGroup`s.
   * They are read as data, not rendered: `styled()`/`css` on an option has
   * no effect.
   */
  children?: React.ReactNode;

  /**
   * Custom CSS class name forwarded to the toggle button.
   * Useful for styling via `styled(MultipleDropdown)`.
   */
  className?: string;

  /**
   * Initial open state. Read on mount only — later changes are ignored.
   * @default false
   */
  isOpen?: boolean;

  /**
   * Label prefix shown in the toggle button before the selected value(s)
   * e.g. `label="Strategy"` renders "Strategy: Value". Multi-select mode
   * only — with `isMultiple={false}` the toggle shows the value alone.
   */
  label?: string;

  /**
   * Field label displayed above the dropdown, and the toggle's accessible
   * name. Not the same as `label`, which is the prefix inside the toggle.
   */
  fieldLabel?: string;

  /**
   * Status badge to the right of the field label, e.g.
   * `{ text: 'default', color: 'grey' }`. Announced as the toggle's
   * description. Needs a `fieldLabel`.
   */
  labelBadge?: LabelBadge;

  /**
   * Helper text displayed below the dropdown. Replaced by the error message
   * while `errors` is set.
   */
  helperText?: string;

  /**
   * React Hook Form field error. Shows the error border and its `message`
   * below the dropdown.
   */
  errors?: FieldError;

  /**
   * Shows the success border.
   * @default false
   */
  success?: boolean;

  /**
   * Callback fired when an option is toggled
   * @param selectedItem - The value of the toggled option
   * @param isSelected   - `true` if the option was just selected, `false` if deselected
   */
  onChange?: (selectedItem: string | number, isSelected: boolean) => void;

  /**
   * Max height (px) of the options list; overflow scrolls.
   * @default 200
   */
  maxHeight?: number;

  /**
   * Width of the dropdown.
   * Can be a number (pixels) or a string (any CSS value, e.g. `'100%'`).
   *
   * The value is applied to the outer field wrapper; the positioning base and
   * the toggle button are stretched to fill it, so a relative width like
   * `'60%'` resolves against the surrounding container instead of compounding.
   * Extra room is filled with more selected values before the `+N` badge. It also clears the base's
   * default `min-width` and the toggle's `max-width`, which would otherwise cap
   * the value.
   *
   * Has no default: when omitted, the dropdown sizes itself to its content,
   * matching the behaviour of previous versions.
   */
  width?: string | number;
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

  /**
   * Max height (px) of the options list
   */
  maxHeight?: number;

  /**
   * Highlighted option, driven by the toggle's keyboard and the pointer
   */
  activeValue?: string | number | null;

  /**
   * Updates the highlighted option
   */
  setActiveValue?: (value: string | number | null) => void;
}
