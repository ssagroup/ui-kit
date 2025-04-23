import {
  Children,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
} from 'react';

import Radio from '@components/Radio';

import { RadioGroupBase } from './RadioGroupBase';
import { RadioGroupProps } from './types';

const RadioGroup = ({
  name,
  isRequired,
  externalState,
  onChange,
  children,
  className,
}: RadioGroupProps) => {
  const [activeValue, setActiveValue] = useState(externalState);

  useEffect(() => {
    setActiveValue(externalState);
  }, [externalState]);

  const onRadioValueChange = (value: string) => {
    setActiveValue(value);
    onChange(value);
  };

  return (
    <RadioGroupBase
      role="radiogroup"
      aria-required={isRequired}
      className={className}>
      {Children.map(children, (child) => {
        /* istanbul ignore else*/
        if (isValidElement(child) && child.type === Radio) {
          const { id, value, isDisabled, text } = child.props;

          return cloneElement(child, {
            key: id,
            name,
            value,
            isChecked: activeValue === value,
            isDisabled,
            isRequired,
            text,
            onChange: onRadioValueChange,
          });
        }
      })}
    </RadioGroupBase>
  );
};

export default RadioGroup;
