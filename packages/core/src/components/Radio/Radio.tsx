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
  text,
  colors,
  className,
  onChange,
}: RadioProps) => {
  const theme = useTheme();

  const autoGenId = useId();
  const [isHovered, setIsHovered] = useState(false);
  const radioId = id || autoGenId;

  const disabledColor = colors?.disabled || theme.colors.greyFocused40;
  const hoveredColor = colors?.hovered || theme.colors.green60;
  const defaultColor = colors?.default || theme.colors.green;

  return (
    <RadioBase
      htmlFor={radioId}
      className={className}
      focusShadowColor={colors?.focusShadow}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
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
          isDisabled ? disabledColor : isHovered ? hoveredColor : defaultColor
        }
      />
      {text ? <span data-testid={id}>{text}</span> : null}
    </RadioBase>
  );
};

export default Radio;
