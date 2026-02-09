import { CommonProps } from '@global-types/emotion';
import { FieldError } from 'react-hook-form';

/**
 * Allowed value types for Typeahead options
 */
export type TypeaheadValue = string | number;

/**
 * Props for TypeaheadOption component
 * Record type that allows any string or number properties.
 * Common properties include: value, label, children, avatar, etc.
 */
export type TypeaheadOptionProps = Record<string, TypeaheadValue>;

/**
 * Props for the Typeahead component
 *
 * An advanced autocomplete component with search-as-you-type functionality.
 * Supports single and multiple selection, filtering, custom rendering, and
 * React Hook Form integration for validation.
 *
 * @example
 * ```tsx
 * <Typeahead
 *   name="language"
 *   label="Language"
 *   placeholder="Select language"
 *   validationSchema={{ required: 'Required' }}>
 *   {options.map(opt => (
 *     <TypeaheadOption key={opt.id} value={opt.id} label={opt.name}>
 *       {opt.name}
 *     </TypeaheadOption>
 *   ))}
 * </Typeahead>
 * ```
 */
export interface TypeaheadProps {
  /**
   * Controlled selected items (array of values)
   * When provided, controls the selected items externally
   */
  selectedItems?: Array<TypeaheadValue>;

  /**
   * Default selected items for uncontrolled mode
   */
  defaultSelectedItems?: Array<TypeaheadValue>;

  /**
   * Enable multiple selection mode
   * When true, allows selecting multiple options
   * @default false
   */
  isMultiple?: boolean;

  /**
   * Whether the component is disabled
   * Disabled typeahead cannot be interacted with
   * @default false
   */
  isDisabled?: boolean;

  /**
   * TypeaheadOption components as children
   * Each child should be a TypeaheadOption component
   */
  children?: React.ReactNode;

  /**
   * Custom CSS class name for the trigger input
   */
  className?: string;

  /**
   * Custom CSS class name for the popover container
   */
  popoverClassName?: string;

  /**
   * Custom CSS class name for the options list
   */
  optionsClassName?: string;

  /**
   * Custom CSS class name for the wrapper container
   */
  wrapperClassName?: string;

  /**
   * Width of the component
   * Can be a number (pixels) or string (CSS value)
   * @default 300
   */
  width?: string | number;

  /**
   * Controlled open state
   * When provided, controls dropdown open/closed state externally
   */
  isOpen?: boolean;

  /**
   * Icon or element to display at the start of the input
   */
  startIcon?: React.ReactNode;

  /**
   * Icon or element to display at the end of the input
   */
  endIcon?: React.ReactNode;

  /**
   * Custom CSS class name for the start icon
   */
  startIconClassName?: string;

  /**
   * Custom CSS class name for the end icon
   */
  endIconClassName?: string;

  /**
   * Form field name (required for React Hook Form integration)
   * @default 'typeahead-search'
   */
  name?: string;

  /**
   * Label text displayed above the input
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Field error from React Hook Form
   */
  error?: FieldError;

  /**
   * Whether to show success state
   * @default false
   */
  success?: boolean;

  /**
   * Validation schema for React Hook Form
   * Used for form validation rules
   */
  validationSchema?: Record<string, unknown>;

  /**
   * Placeholder text for the input
   * @default 'Select something'
   */
  placeholder?: string | null;

  /**
   * Whether to filter options based on input
   * When false, all options are always shown
   * @default true
   */
  filterOptions?: boolean;

  /**
   * Whether to automatically select the first option on filter
   * @default true
   */
  autoSelect?: boolean;

  /**
   * Allow adding custom values not in the options list.
   * When true, the current input is shown as the first dropdown option (highlighted)
   * and can be selected or added with Enter.
   * @default true
   */
  allowCustomValues?: boolean;

  /**
   * Callback fired when an option is selected/deselected
   * Receives the selected item value and whether it's selected
   */
  onChange?: (selectedItem: TypeaheadValue, isSelected: boolean) => void;

  /**
   * Callback fired when "Clear All" is clicked (multiple mode)
   */
  onClearAll?: () => void;

  /**
   * Callback fired when a selected item's remove button is clicked
   * Receives the item value to be removed
   */
  onRemoveSelectedClick?: (selectedItem: TypeaheadValue) => void;

  /**
   * Callback fired when the selection becomes empty or non-empty
   * Receives a boolean indicating if selection is empty
   */
  onEmptyChange?: (isEmpty?: boolean) => void;

  /**
   * Custom render function for options
   * Allows customizing the appearance of each option
   * Receives value, input text, and label
   */
  renderOption?: (data: {
    value: string | number;
    input: string;
    label: string;
  }) => React.ReactNode;
}

/**
 * Props used by the useTypeahead hook
 * Internal type that picks specific props from TypeaheadProps
 */
export type UseTypeaheadProps = Pick<
  TypeaheadProps,
  | 'selectedItems'
  | 'defaultSelectedItems'
  | 'isDisabled'
  | 'children'
  | 'isMultiple'
  | 'onChange'
  | 'onClearAll'
  | 'onRemoveSelectedClick'
  | 'onEmptyChange'
  | 'renderOption'
  | 'isOpen'
  | 'className'
  | 'startIcon'
  | 'endIcon'
  | 'startIconClassName'
  | 'endIconClassName'
  | 'name'
  | 'validationSchema'
  | 'error'
  | 'success'
  | 'placeholder'
  | 'filterOptions'
  | 'autoSelect'
  | 'allowCustomValues'
>;

/**
 * Props for TypeaheadOptions container component
 */
export interface TypeaheadItemsListProps extends CommonProps {
  children?: React.ReactNode;
  noItemsMessage?: string;
}

/**
 * Props for TypeaheadOption component
 */
export interface TypeaheadItemProps extends CommonProps {
  /**
   * Whether this option is currently selected
   */
  isActive?: boolean;

  /**
   * Whether this option is disabled
   */
  isDisabled?: boolean;

  /**
   * Value of the option (must be unique)
   */
  value?: string | number;

  /**
   * Label text for the option
   * Used for filtering and display
   */
  label?: string | number;

  /**
   * Content to display in the option
   * Can be custom React nodes
   */
  children?: React.ReactNode;

  /**
   * Avatar or icon to display before the option content
   */
  avatar?: React.ReactNode;

  /**
   * Click handler for the option
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * When true, option is a user-typed custom value (shown first, highlighted in blue)
   */
  isCustomValue?: boolean;

  /**
   * ARIA role for the option (e.g. 'option')
   */
  role?: string;

  /**
   * ARIA selected state
   */
  'aria-selected'?: boolean;
}
