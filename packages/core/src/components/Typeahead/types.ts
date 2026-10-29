import { CommonProps } from '@global-types/emotion';
import { FieldError } from 'react-hook-form';
import { LabelBadge } from '@components/Label/types';

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
   * Controlled selected values (array, even in single-select mode).
   * When provided, controls the selection externally: update it from
   * `onChange`, and from `onClearAll`, which clearing all does not report
   * through `onChange`.
   */
  value?: Array<TypeaheadValue>;

  /**
   * Initially selected values, for uncontrolled mode.
   */
  defaultValue?: Array<TypeaheadValue>;

  /**
   * Controlled selected items (array of values)
   *
   * @deprecated Use `value` instead. Removed in the next major release.
   */
  selectedItems?: Array<TypeaheadValue>;

  /**
   * Default selected items for uncontrolled mode
   *
   * @deprecated Use `defaultValue` instead. Removed in the next major release.
   */
  defaultSelectedItems?: Array<TypeaheadValue>;

  /**
   * Enable multiple selection mode
   * When true, allows selecting multiple options
   * @default false
   */
  isMultiple?: boolean;

  /**
   * Keep the multiple-selection trigger on a single line.
   * Shows as many selected items as fit, then a `+N` counter for the rest,
   * instead of wrapping onto new lines. Selected items are truncated with an
   * ellipsis and show their full label in a tooltip.
   * Has no effect unless `isMultiple` is set.
   * @default false
   */
  singleLine?: boolean;

  /**
   * Whether the component is disabled
   * Disabled typeahead cannot be interacted with
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the component is disabled
   *
   * @deprecated Use `disabled` instead. Removed in the next major release.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * `TypeaheadOption` elements, optionally wrapped in `TypeaheadOptionGroup`s.
   * They are read as data, not rendered.
   */
  children?: React.ReactNode;

  /**
   * Custom CSS class name for the trigger (the bordered box around the
   * chips and the input). A `css` prop lands here too.
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
   * Width of the whole field (label, trigger and helper text).
   * Can be a number (pixels) or string (CSS value). Use this rather than a
   * `css` width, which only sizes the trigger.
   * @default 300
   */
  width?: string | number;

  /**
   * Initial open state. Read on mount only — later changes are ignored.
   * @default false
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
   * Form field name. Inside a `FormProvider` the selection is registered
   * under it; it also builds the input's id, so give every typeahead on a
   * page its own.
   * @default 'typeahead-search'
   */
  name?: string;

  /**
   * Label text displayed above the input
   */
  label?: string;

  /**
   * Status badge to the right of the label, e.g.
   * `{ text: 'mapped', color: 'primary' }`. Announced as the input's
   * description. Needs a `label`.
   */
  labelBadge?: LabelBadge;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Field error from React Hook Form. Shows the error border and its
   * `message` in place of the helper text. Inside a `FormProvider` the
   * field's own error is shown as well.
   */
  error?: FieldError;

  /**
   * Whether to show success state
   * @default false
   */
  success?: boolean;

  /**
   * React Hook Form rules for the field, e.g. `{ required: 'Required' }`.
   * Validated when the list closes and on submit.
   */
  validationSchema?: Record<string, unknown>;

  /**
   * Placeholder text for the input; `null` for none
   * @default 'Select something'
   */
  placeholder?: string | null;

  /**
   * Whether to filter options by the typed text (matched against `label`,
   * falling back to `value`). When false, all options are always shown and
   * `autoSelect` is off.
   * @default true
   */
  filterOptions?: boolean;

  /**
   * Selects an option as soon as the typed text equals its label
   * (case-insensitive). In single-select mode, typing anything else clears
   * the selection. Needs `filterOptions`.
   * @default true
   */
  autoSelect?: boolean;

  /**
   * Allow adding custom values not in the options list.
   * When true, the current input is shown as the first dropdown option (highlighted)
   * and can be selected or added with Enter.
   * @default false
   */
  allowCustomValues?: boolean;

  /**
   * Callback fired when an option is selected/deselected
   * Receives the option value and whether it is now selected. In
   * single-select mode picking another option reports only the new one;
   * picking the selected option again deselects it.
   */
  onChange?: (selectedItem: TypeaheadValue, isSelected: boolean) => void;

  /**
   * Callback fired when the trigger's clear button (the cross at the end)
   * is clicked. `onChange` is not called for the cleared values.
   */
  onClearAll?: () => void;

  /**
   * Callback fired when a chip's remove button is clicked (multiple mode),
   * after `onChange` has reported the removal
   * Receives the item value to be removed
   */
  onRemoveSelectedClick?: (selectedItem: TypeaheadValue) => void;

  /**
   * Callback fired when the selection becomes empty or non-empty
   * Receives a boolean indicating if selection is empty
   */
  onEmptyChange?: (isEmpty?: boolean) => void;

  /**
   * Custom render function for options. Replaces every row's content
   * (including an option's `children`); receives the option's value and
   * label and the current input text.
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
  | 'singleLine'
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
  | 'label'
>;

/**
 * Props for TypeaheadOptions container component
 */
export interface TypeaheadItemsListProps extends CommonProps {
  /**
   * Ignored: the options come from the `TypeaheadOption` children of
   * `Typeahead`, through context.
   *
   * @deprecated Has no effect. Removed in the next major release.
   */
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
  disabled?: boolean;

  /**
   * Whether this option is disabled
   *
   * @deprecated Use `disabled` instead. Removed in the next major release.
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
   * Content of the option's row, instead of `label`.
   * Can be custom React nodes; `label` stays the text that is filtered on
   * and shown once selected.
   */
  children?: React.ReactNode;

  /**
   * Avatar or icon to display before the option content
   */
  avatar?: React.ReactNode;

  /**
   * Ignored: options are read as data and never mounted. Use the
   * Typeahead's `onChange`.
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
