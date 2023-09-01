import { useState, useId, useEffect, useRef } from 'react';
import { useTheme } from '@emotion/react';
import { CheckboxBase } from './CheckboxBase';
import Icon from '@components/Icon';

import { ICheckboxProps } from './types';

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
}: ICheckboxProps) => {
  const [isChecked, setIsChecked] = useState(Boolean(initialState));
  const autoGenId = useId();
  const theme = useTheme();
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // istanbul ignore else
    if (checkboxRef.current) {
      // Browsers drop the "indeterminate" state after the "checked" state
      // changes. We keep the component in the "indeterminate" state until the
      // prop's value changes to false or is removed.
      checkboxRef.current.indeterminate = Boolean(isIndeterminate);
    }
  }, [isIndeterminate, isChecked]);

  useEffect(() => {
    setIsChecked(Boolean(externalState));
  }, [externalState]);

  const checkboxId = id || autoGenId;

  return (
    <CheckboxBase htmlFor={checkboxId}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          const newIsChecked = !isChecked;
          setIsChecked(newIsChecked);
          onChange(newIsChecked);
        }}
        disabled={isDisabled}
        ref={checkboxRef}
        name={name}
        required={isRequired}
      />
      <div>
        {isIndeterminate ? (
          <Icon name="minus" size={12} color={theme.colors.white} />
        ) : isChecked ? (
          <Icon name="check" size={12} color={theme.colors.white} />
        ) : null}
      </div>
      {text ? <span>{text}</span> : null}
    </CheckboxBase>
  );
};

export default Checkbox;
