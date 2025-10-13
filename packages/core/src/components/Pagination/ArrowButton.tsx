import { useTheme } from '@emotion/react';

import Button from '@components/Button';
import Icon from '@components/Icon';

import { arrowBtnStyles } from './styles';
import { ArrowButtonProps } from './types';

export const ArrowButton = ({
  direction,
  onClick,
  isDisabled,
  className,
}: ArrowButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      startIcon={
        <Icon
          name={`carrot-${direction}`}
          size={12}
          color={theme.colors.greyDisabled}
        />
      }
      variant="custom"
      onClick={onClick}
      isDisabled={isDisabled}
      size="small"
      className={className}
      css={arrowBtnStyles(theme)}
      aria-label={`Go to ${direction === 'left' ? 'previous' : 'next'} page`}
    />
  );
};
