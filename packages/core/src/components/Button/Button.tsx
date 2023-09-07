import { useState, forwardRef } from 'react';
import { useTheme } from '@emotion/react';

import Wrapper from '@components/Wrapper/Wrapper';

import { ButtonBase } from './ButtonBase';
import {
  WhiteButtonText,
  GreyButtonText,
  GreyLightButtonText,
  DisabledButtonText,
} from './ButtonText';
import { IButtonProps, IButtonVariants } from './types';
import {
  large,
  medium,
  small,
  primary,
  secondary,
  tertiary,
  buttonBlock,
  iconWrapperLeft,
  iconWrapperRight,
} from './styles';

const mapSizes: MainSizes = {
  small,
  medium,
  large,
};

const mapVariants: IButtonVariants = {
  primary,
  secondary,
  tertiary,
};

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  function Button(
    {
      block = false,
      size = 'small',
      text,
      startIcon,
      endIcon,
      variant = 'primary',
      type = 'button',
      className,
      isDisabled,
      onClick,
    },
    ref,
  ) {
    if (!text && !startIcon && !endIcon) {
      throw new Error('Button must have text or icon');
    }

    const theme = useTheme();

    const [isHovered, setIsHovered] = useState(false);

    const isPrimary = variant === 'primary';
    const isTertiary = variant === 'tertiary';
    const noMargin = !text ? { margin: 0 } : {};

    const variantStyles = mapVariants[variant] && mapVariants[variant](theme);

    const btn = (
      <ButtonBase
        ref={ref}
        css={[mapSizes[size], variantStyles]}
        type={type}
        disabled={isDisabled}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}>
        {startIcon ? (
          <span style={noMargin} css={[iconWrapperRight]}>
            {startIcon}
          </span>
        ) : null}
        {text ? (
          typeof text === 'function' ? (
            text(isHovered)
          ) : isDisabled ? (
            <DisabledButtonText text={text} size={size} />
          ) : isPrimary ? (
            <WhiteButtonText text={text} size={size} />
          ) : isTertiary && isHovered ? (
            <GreyLightButtonText text={text} size={size} />
          ) : (
            <GreyButtonText text={text} size={size} />
          )
        ) : null}
        {endIcon ? (
          <span style={noMargin} css={iconWrapperLeft}>
            {endIcon}
          </span>
        ) : null}
      </ButtonBase>
    );

    return block ? <Wrapper css={buttonBlock}>{btn}</Wrapper> : btn;
  },
);

export default Button;
