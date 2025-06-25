import { useState, useId, useEffect, useRef } from 'react';
import { useTheme } from '@emotion/react';
import { CheckboxBase } from './CheckboxBase';
import Icon from '@components/Icon';

import { CheckboxProps } from './types';

const Checkbox = ({
  text,
  id,
  onChange,
  isDisabled,
  externalState,
  initialState,
  isIndeterminate,
  name = '',
  isRequired = false,
  ref,
  register,
  ...rest
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(Boolean(initialState));
  const autoGenId = useId();
  const theme = useTheme();
  const checkboxInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // istanbul ignore else
    if (checkboxInputRef.current) {
      // Browsers drop the "indeterminate" state after the "checked" state
      // changes. We keep the component in the "indeterminate" state until the
      // prop's value changes to false or is removed.
      checkboxInputRef.current.indeterminate = Boolean(isIndeterminate);
    }
  }, [isIndeterminate, isChecked]);

  useEffect(() => {
    if (typeof externalState === 'boolean') {
      setIsChecked(Boolean(externalState));
    }
  }, [externalState]);

  const checkboxId = id || autoGenId;

  return (
    <CheckboxBase htmlFor={checkboxId} {...rest}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          const newIsChecked = !isChecked;
          setIsChecked(newIsChecked);
          onChange?.(newIsChecked);
        }}
        disabled={isDisabled}
        ref={(node: HTMLInputElement) => {
          checkboxInputRef.current = node;
          if (ref) {
            ref.current = node;
          }
        }}
        name={name}
        required={isRequired}
        {...register}
      />
      <div>
        {isIndeterminate ? (
          <Icon name="minus" size={12} color={theme.colors.white} />
        ) : isChecked ? (
          <Icon name="check" size={12} color={theme.colors.white} />
        ) : null}
      </div>
      {['string', 'number'].includes(typeof text) ? <span>{text}</span> : text}
    </CheckboxBase>
  );
};

export default Checkbox;
