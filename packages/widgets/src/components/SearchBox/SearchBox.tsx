import { Icon } from '@ssa-ui-kit/core';
import { SearchBoxWrapper } from './SearchBoxWrapper';
import { SearchBoxInput } from './SearchBoxInput';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { debounceThrottle } from '@ssa-ui-kit/utils';
import { SearchBoxCrossIcon } from '.';
import { SearchBoxProps } from './types';

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
  const debounceThrottled = useRef(debounceThrottle(callback, callbackDelay));
  const [throttledFn, cancel] = debounceThrottled.current;

  useEffect(() => {
    cancel();

    const searchTerm = watchResult[name];
    if (autoSearchTrigger && searchTerm !== undefined) {
      throttledFn(searchTerm);
    }
  }, [watchResult]);

  const crossIconHandler = () => {
    resetField(name);
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
