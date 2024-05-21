import { useId, useState } from 'react';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';

import { RadioBase } from './RadioBase';
import { RadioProps } from './types';

const Radio = ({
  id,
  name = '',
  value,
  isChecked,
  isDisabled,
  isRequired,
  onChange,
  text,
  className,
}: RadioProps) => {
  const theme = useTheme();

  const autoGenId = useId();
  const [isHovered, setIsHovered] = useState(false);
  const radioId = id || autoGenId;

  return (
    <RadioBase
      htmlFor={radioId}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <input
        id={radioId}
        type="radio"
        value={value}
        checked={isChecked}
        onChange={() => typeof onChange === 'function' && onChange(value)}
        disabled={isDisabled}
        required={isRequired}
        name={name}
      />
      <Icon
        name={isChecked ? 'radio-on' : 'circle'}
        size={20}
        color={
          theme.colors[
            isDisabled ? 'greyFocused40' : isHovered ? 'green60' : 'green'
          ]
        }
      />
      {text ? <span data-testid={id}>{text}</span> : null}
    </RadioBase>
  );
};

export default Radio;
