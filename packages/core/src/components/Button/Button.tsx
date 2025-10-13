import { forwardRef, useState } from 'react';

import { useTheme } from '@emotion/react';

import Wrapper from '@components/Wrapper/Wrapper';

import { ButtonBase } from './ButtonBase';
import {
  DisabledButtonText,
  GreyButtonText,
  GreyLightButtonText,
  WhiteButtonText,
} from './ButtonText';
import {
  attention,
  buttonBlock,
  iconWrapperLeft,
  iconWrapperRight,
  info,
  large,
  medium,
  primary,
  secondary,
  small,
  tertiary,
} from './styles';
import { ButtonProps, ButtonVariants } from './types';

const mapSizes: MainSizes = {
  small,
  medium,
  large,
};

const mapVariants: ButtonVariants = {
  primary,
  secondary,
  tertiary,
  info,
  attention,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      block = false,
      size = 'small',
      text,
      startIcon,
      endIcon,
      startIconClassName,
      endIconClassName,
      variant = 'primary',
      type = 'button',
      className,
      isDisabled,
      onClick,
      children,
      ...ariaProps
    },
    ref,
  ) {
    if (!text && !startIcon && !endIcon && !children) {
      throw new Error('Button must have either text or icon or children');
    }

    const theme = useTheme();

    const [isHovered, setIsHovered] = useState(false);

    const isPrimary = variant === 'primary';
    const isInfo = variant === 'info';
    const isSecondary = variant === 'secondary';
    const isTertiary = variant === 'tertiary';
    const isAttention = variant === 'attention';
    const noMargin = !text ? { margin: 0 } : {};

    const variantStyles =
      isPrimary || isInfo || isTertiary || isSecondary || isAttention
        ? mapVariants[variant] && mapVariants[variant](theme)
        : undefined;

    const btn = (
      <ButtonBase
        ref={ref}
        css={[mapSizes[size], variantStyles]}
        type={type}
        disabled={isDisabled}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        {...ariaProps}>
        {startIcon ? (
          <span
            style={noMargin}
            css={[iconWrapperRight]}
            className={startIconClassName}>
            {startIcon}
          </span>
        ) : null}
        {children ? (
          children
        ) : text ? (
          isDisabled ? (
            <DisabledButtonText text={text} size={size} />
          ) : isPrimary || isInfo || isAttention ? (
            <WhiteButtonText text={text} size={size} />
          ) : isTertiary && isHovered ? (
            <GreyLightButtonText text={text} size={size} />
          ) : (
            <GreyButtonText text={text} size={size} />
          )
        ) : null}
        {endIcon ? (
          <span
            style={noMargin}
            css={[iconWrapperLeft]}
            className={endIconClassName}>
            {endIcon}
          </span>
        ) : null}
      </ButtonBase>
    );

    return block ? <Wrapper css={buttonBlock}>{btn}</Wrapper> : btn;
  },
);

export default Button;
