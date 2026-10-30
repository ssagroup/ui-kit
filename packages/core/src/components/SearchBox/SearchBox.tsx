import { KeyboardEvent, useEffect, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { useDebouncedCallback } from '@ssa-ui-kit/hooks';
import Icon from '@components/Icon';
import { SearchBoxWrapper } from './SearchBoxWrapper';
import { SearchBoxInput } from './SearchBoxInput';
import { SearchBoxCrossIcon } from '.';
import { SearchBoxProps } from './types';

/**
 * SearchBox - Compact search field with a debounced callback
 *
 * A search input for toolbars and table headers. Calls `callback` with the
 * term once the user stops typing (`callbackDelay`, default 500 ms) or right
 * away on Enter.
 *
 * Features:
 * - Debounced `callback`; Enter cancels the pending call and calls it at once
 * - Search icon when empty, clear button once the field has text
 * - `autoSearchTrigger={false}` to search on Enter only
 * - Fixed width: 139px, 180px from the `md` breakpoint
 *
 * Driven by react-hook-form: pass `register`, `control` and `resetField`
 * from `useForm()`. No `FormProvider` is needed. SearchBox watches the whole
 * form, so keep it in its own `useForm()`; changes to other fields re-send
 * the current term.
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
 *   callback={(term) => setQuery(term)}
 *   inputProps={{ 'aria-label': 'Search products' }}
 * />
 * ```
 *
 * @see {@link Input} - Base input component used internally
 *
 * @accessibility
 * - Renders no label: pass `inputProps={{ 'aria-label': '...' }}`
 * - Enter searches immediately
 * - The clear button is focusable but has no accessible name
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
