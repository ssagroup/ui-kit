import { KeyboardEvent, useEffect, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { useDebouncedCallback } from '@ssa-ui-kit/hooks';
import Icon from '@components/Icon';
import { SearchBoxWrapper } from './SearchBoxWrapper';
import { SearchBoxInput } from './SearchBoxInput';
import { SearchBoxCrossIcon } from '.';
import { SearchBoxProps } from './types';

/**
 * SearchBox - Search input component with debounced callbacks
 *
 * A specialized search input component that combines Input functionality with
 * search-specific features like debounced callbacks, clear button, and search
 * icon. Automatically triggers search callbacks as the user types (with debounce)
 * or immediately when Enter key is pressed.
 *
 * Features:
 * - Debounced search callbacks to reduce API calls
 * - Visual feedback: search icon when empty, clear icon when has value
 * - Enter key for immediate search execution
 * - Configurable auto-search trigger
 * - React Hook Form integration for form state management
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * const { control, register, resetField } = useForm();
 *
 * <SearchBox
 *   name="search"
 *   placeholder="Search products..."
 *   control={control}
 *   register={register}
 *   resetField={resetField}
 *   callback={(term) => {
 *     console.log('Searching for:', term);
 *     // Perform search API call
 *   }}
 *   callbackDelay={500}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Manual search only (no auto-trigger)
 * <SearchBox
 *   name="query"
 *   control={control}
 *   register={register}
 *   resetField={resetField}
 *   callback={handleSearch}
 *   autoSearchTrigger={false}
 *   placeholder="Press Enter to search"
 * />
 * ```
 *
 * @see {@link Input} - Base input component used internally
 *
 * @requires React Hook Form - Must be used within FormProvider context
 *
 * @accessibility
 * - Full keyboard navigation support
 * - Enter key triggers search
 * - Clear button accessible via keyboard
 * - Screen reader friendly
 */
export const SearchBox = ({
  name,
  placeholder = 'Search by name',
  control,
  callbackDelay = 500,
  autoSearchTrigger = true,
  register,
  resetField,
  callback,
  ...rest
}: SearchBoxProps) => {
  const watchResult = useWatch({ control });
  const inputRef = useRef<HTMLInputElement>(null);

  const [debouncedFn, cancel] = useDebouncedCallback(callback, callbackDelay);

  useEffect(() => {
    const searchTerm = watchResult[name];
    if (autoSearchTrigger && searchTerm !== undefined) {
      debouncedFn(searchTerm);
    }
  }, [watchResult]);

  const crossIconHandler = () => {
    resetField(name, {
      defaultValue: '',
    });
    inputRef.current?.focus();
  };

  const EndElement = !watchResult[name] ? (
    <div data-testid="search-icon">
      <Icon name="search" size={15} color="#55575A" />
    </div>
  ) : (
    <SearchBoxCrossIcon onClick={crossIconHandler} />
  );

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      cancel();
      callback(watchResult[name]);
    }
  };

  return (
    <SearchBoxWrapper>
      <SearchBoxInput
        name={name}
        endElement={EndElement}
        register={register}
        control={control}
        placeholder={placeholder}
        status="custom"
        onKeyUp={onKeyUp}
        {...rest}
        ref={inputRef}
      />
    </SearchBoxWrapper>
  );
};
