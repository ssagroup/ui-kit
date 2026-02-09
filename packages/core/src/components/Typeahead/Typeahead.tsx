import { useTheme } from '@emotion/react';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@components/Popover';
import FormHelperText from '@components/FormHelperText';
import Wrapper from '@components/Wrapper';
import Label from '@components/Label';
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
 * filtering, custom rendering, and integrates seamlessly with React Hook Form
 * for validation and form management.
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
 *   selectedItems={selected}
 *   onChange={(item, isSelected) => handleToggle(item, isSelected)}>
 *   {options.map(opt => (
 *     <TypeaheadOption key={opt.id} value={opt.id}>
 *       {opt.label}
 *     </TypeaheadOption>
 *   ))}
 * </Typeahead>
 * ```
 *
 * @example
 * ```tsx
 * // With custom option rendering
 * <Typeahead
 *   name="users"
 *   label="Select User"
 *   renderOption={({ value, label, input }) => (
 *     <div>
 *       <Avatar src={users[value].avatar} />
 *       <span>{highlightMatch(label, input)}</span>
 *     </div>
 *   )}>
 *   {users.map(user => (
 *     <TypeaheadOption key={user.id} value={user.id} label={user.name} />
 *   ))}
 * </Typeahead>
 * ```
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
  selectedItems,
  defaultSelectedItems,
  isOpen,
  isDisabled,
  isMultiple,
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
  allowCustomValues = true,
  width = 300,
  onChange,
  onEmptyChange,
  onClearAll,
  onRemoveSelectedClick,
  renderOption,
}: TypeaheadProps) => {
  const theme = useTheme();
  const hookResult = useTypeahead({
    name,
    selectedItems,
    defaultSelectedItems,
    isOpen,
    isDisabled,
    isMultiple,
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
  });

  return (
    <TypeaheadContext.Provider value={hookResult}>
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
            htmlFor={hookResult.inputName}
            isDisabled={isDisabled}
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
                css={{
                  width: hookResult.triggerRef.current?.clientWidth,
                  boxShadow: `-4px 4px 14px 0px ${theme.colors.greyDarker14}`,
                  zIndex: 100,
                }}
                isFocusManagerDisabled>
                <PopoverDescription css={{ width: '100%' }}>
                  {hookResult.isOpen ? (
                    <TypeaheadOptions className={optionsClassName}>
                      {children}
                    </TypeaheadOptions>
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
            disabled={isDisabled}
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
