import {
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@components/Popover';
import FormHelperText from '@components/FormHelperText';
import Wrapper from '@components/Wrapper';
import Label, { getLabelBadgeId } from '@components/Label';
import { resolveDeprecatedProp, resolveDisabled } from '@utils/deprecation';
import { TypeaheadContext } from './Typeahead.context';
import { useTypeahead } from './useTypeahead';
import {
  TypeaheadOptions,
  TypeaheadTrigger,
  TypeaheadFocusTrap,
} from './components';
import { TypeaheadProps } from './types';

/**
 * Typeahead - Advanced autocomplete search component with dropdown functionality
 *
 * A powerful autocomplete component that provides search-as-you-type functionality
 * with dropdown suggestions. Supports both single and multiple selection modes,
 * filtering, custom rendering, custom values (user-typed values not in options list),
 * and integrates seamlessly with React Hook Form for validation and form management.
 *
 * Works on its own or inside a react-hook-form `FormProvider`, where it
 * registers under `name`. Options are read as data: their props are used,
 * the elements are never rendered, so `styled()`/`css` on an option has no
 * effect.
 *
 * Component structure:
 * - Typeahead (root container with context)
 *   - TypeaheadTrigger (search input with selected items display)
 *   - TypeaheadOptions (filtered dropdown options list)
 *   - FormHelperText (validation messages and helper text)
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * // Single selection with React Hook Form
 * const form = useForm();
 * return (
 *   <FormProvider {...form}>
 *     <Typeahead
 *       name="language"
 *       label="Programming Language"
 *       placeholder="Select a language"
 *       validationSchema={{ required: 'Language is required' }}>
 *       {languages.map(lang => (
 *         <TypeaheadOption key={lang.id} value={lang.id} label={lang.name}>
 *           {lang.name}
 *         </TypeaheadOption>
 *       ))}
 *     </Typeahead>
 *   </FormProvider>
 * );
 * ```
 *
 * @example
 * ```tsx
 * // Multiple selection
 * <Typeahead
 *   name="tags"
 *   isMultiple
 *   label="Tags"
 *   value={selected}
 *   onChange={(item, isSelected) => handleToggle(item, isSelected)}>
 *   {options.map(opt => (
 *     <TypeaheadOption key={opt.id} value={opt.id} label={opt.label} />
 *   ))}
 * </Typeahead>
 * ```
 *
 * @example
 * ```tsx
 * // With custom values - allows users to type and add values not in options
 * <Typeahead
 *   name="tags"
 *   isMultiple
 *   allowCustomValues={true}
 *   label="Tags">
 *   {options.map(opt => (
 *     <TypeaheadOption key={opt.id} value={opt.id} label={opt.label} />
 *   ))}
 * </Typeahead>
 * // Users can type "custom-tag" and press Enter to add it
 * // Custom values appear in blue in the dropdown and selected items
 * ```
 *
 * @example
 * ```tsx
 * // With custom option rendering
 * <Typeahead
 *   name="users"
 *   label="Select User"
 *   renderOption={({ label, input }) => highlightInputMatch(label, input)}>
 *   {users.map(user => (
 *     <TypeaheadOption key={user.id} value={user.id} label={user.name} />
 *   ))}
 * </Typeahead>
 * ```
 *
 * @example
 * ```tsx
 * // Schema validation in Form Builder (JsonSchemaForm)
 * // For single select - use 'required' in schema
 * const schema = {
 *   type: 'string',
 *   title: 'Select field title',
 *   enum: ['Option 1', 'Option 2'],
 *   // required: ['selectField'] // Add to top-level required array
 * };
 *
 * // For multiple select (array) - use 'required' + 'minItems'
 * const schema = {
 *   type: 'array',
 *   title: 'Select multiple fields title',
 *   items: {
 *     type: 'string',
 *     enum: ['Option 1', 'Option 2', 'Option 3'],
 *   },
 *   minItems: 1, // Ensures at least one item is selected
 *   // required: ['selectMultipleField'] // Add to top-level required array
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Schema validation in standalone mode (React Hook Form)
 * // For single select - use 'required' in validationSchema
 * <Typeahead
 *   name="language"
 *   label="Language"
 *   validationSchema={{
 *     required: 'Language is required',
 *   }}>
 *   {options.map(opt => (
 *     <TypeaheadOption key={opt.id} value={opt.id} label={opt.label} />
 *   ))}
 * </Typeahead>
 *
 * // For multiple select - use 'validate' function to check array length
 * <Typeahead
 *   name="tags"
 *   isMultiple
 *   label="Tags"
 *   validationSchema={{
 *     validate: (value: string[]) => {
 *       if (!value || value.length === 0) {
 *         return 'At least one tag is required';
 *       }
 *       return true;
 *     },
 *   }}>
 *   {options.map(opt => (
 *     <TypeaheadOption key={opt.id} value={opt.id} label={opt.label} />
 *   ))}
 * </Typeahead>
 * ```
 *
 * @note Validation differences:
 * - **Form Builder (JsonSchemaForm)**: Uses JSON Schema validation. For arrays, use `minItems` property
 *   (e.g., `minItems: 1` to require at least one selection). The `required` array at the schema root
 *   marks fields as required.
 * - **Standalone mode**: Uses React Hook Form validation. For arrays, use a `validate` function to check
 *   array length, as React Hook Form doesn't have a built-in `minItems` rule. The `required` rule works
 *   for single select fields.
 *
 * @see {@link TypeaheadOption} - Child component for individual options
 * @see {@link Popover} - Used for dropdown positioning
 *
 * @accessibility
 * - ARIA attributes set according to WAI-ARIA combobox pattern
 * - Keyboard navigation (Arrow keys, Enter, Escape, Tab)
 * - Screen reader friendly
 * - Focus management with trap
 * - Search input filtering
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
 */
export const Typeahead = ({
  name = 'typeahead-search',
  label,
  labelBadge,
  value,
  defaultValue,
  selectedItems,
  defaultSelectedItems,
  isOpen,
  disabled,
  isDisabled,
  isMultiple,
  singleLine,
  children,
  className,
  startIcon,
  endIcon,
  error,
  success,
  helperText,
  validationSchema,
  placeholder = 'Select something',
  startIconClassName,
  endIconClassName,
  popoverClassName,
  optionsClassName,
  wrapperClassName,
  filterOptions,
  autoSelect = true,
  allowCustomValues = false,
  width = 300,
  onChange,
  onEmptyChange,
  onClearAll,
  onRemoveSelectedClick,
  renderOption,
}: TypeaheadProps) => {
  const isTypeaheadDisabled = resolveDisabled(
    'Typeahead',
    disabled,
    isDisabled,
  );
  const resolvedValue = resolveDeprecatedProp({
    component: 'Typeahead',
    prop: 'value',
    value,
    deprecatedProp: 'selectedItems',
    deprecatedValue: selectedItems,
  });
  const resolvedDefaultValue = resolveDeprecatedProp({
    component: 'Typeahead',
    prop: 'defaultValue',
    value: defaultValue,
    deprecatedProp: 'defaultSelectedItems',
    deprecatedValue: defaultSelectedItems,
  });
  const hookResult = useTypeahead({
    name,
    selectedItems: resolvedValue,
    defaultSelectedItems: resolvedDefaultValue,
    isOpen,
    isDisabled: isTypeaheadDisabled,
    isMultiple,
    singleLine,
    children,
    className,
    startIcon,
    endIcon,
    startIconClassName,
    endIconClassName,
    error,
    success,
    validationSchema,
    placeholder,
    filterOptions,
    autoSelect,
    allowCustomValues,
    onChange,
    onEmptyChange,
    renderOption,
    onRemoveSelectedClick,
    onClearAll,
    label,
  });

  // Input renders its control with this id.
  const inputId = `formElement-${hookResult.inputName}`;
  const badge =
    label && labelBadge
      ? { ...labelBadge, id: getLabelBadgeId(inputId) }
      : undefined;
  const contextValue = badge
    ? {
        ...hookResult,
        inputAriaProps: {
          ...hookResult.inputAriaProps,
          'aria-describedby': badge.id,
        },
      }
    : hookResult;

  return (
    <TypeaheadContext.Provider value={contextValue}>
      <Wrapper
        css={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          width,
        }}
        className={wrapperClassName}
        data-testid="typeahead">
        {label && (
          <Label
            id={hookResult.labelId}
            htmlFor={inputId}
            badge={badge}
            disabled={isTypeaheadDisabled}
            data-testid="typeahead-label">
            {label}
          </Label>
        )}
        <Popover
          keyboardHandlers={false}
          floatingOptions={{
            onOpenChange: hookResult.handleOpenChange,
            open: hookResult.isOpen,
          }}>
          <TypeaheadFocusTrap>
            <>
              <TypeaheadTrigger />
              <PopoverContent
                className={popoverClassName}
                // No shadow here: the list draws its own, with rounded corners.
                css={{
                  width: hookResult.triggerRef.current?.clientWidth,
                  zIndex: 1100,
                }}
                isFocusManagerDisabled>
                <PopoverDescription css={{ width: '100%' }}>
                  {hookResult.isOpen ? (
                    <TypeaheadOptions className={optionsClassName} />
                  ) : null}
                </PopoverDescription>
              </PopoverContent>
            </>
          </TypeaheadFocusTrap>
        </Popover>
        {(hookResult.status === 'error' || helperText) && (
          <FormHelperText
            role="status"
            status={hookResult.status}
            disabled={isTypeaheadDisabled}
            data-testid="helper-text">
            {hookResult.error
              ? hookResult.error?.message?.toString()
              : helperText}
          </FormHelperText>
        )}
      </Wrapper>
    </TypeaheadContext.Provider>
  );
};
