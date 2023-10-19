import { Icon } from '@ssa-ui-kit/core';
import { SearchBoxWrapper } from './SearchBoxWrapper';
import { SearchBoxInput } from './SearchBoxInput';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { propOr, debounceThrottle } from '@ssa-ui-kit/utils';
import { SearchBoxCrossIcon } from './SearchBoxCrossIcon';
import { SearchBoxProps } from './types';

export const SearchBox = ({
  name,
  placeholder = 'Search by name',
  control,
  callbackDelay = 5000,
  register,
  resetField,
  callback,
  ...rest
}: SearchBoxProps) => {
  const watchResult = useWatch({ control });
  const [isEmpty, setIsEmpty] = useState(true);
  const [enterKeyPressed, setEnterKeyPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [throttledFn, cancel] = debounceThrottle(callback, callbackDelay);

  useEffect(() => {
    const searchTerm = propOr('', name)(watchResult);
    setIsEmpty(!searchTerm);

    if (enterKeyPressed) {
      console.log('>>>cancelling...');
      cancel();
      setEnterKeyPressed(false);
    } else {
      console.log('>>>calling...');
      throttledFn(searchTerm);
    }
  }, [watchResult, enterKeyPressed]);

  const crossIconHandler = () => {
    resetField(name);
    inputRef.current?.focus();
  };

  const EndElement = isEmpty ? (
    <Icon name="search" size={15} color="#55575A" />
  ) : (
    <SearchBoxCrossIcon onClick={crossIconHandler} />
  );

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setEnterKeyPressed(true);
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
