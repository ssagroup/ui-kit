import { useTheme } from '@emotion/react';
import { Button, Icon } from '@components';

import { ArrowButtonProps } from './types';
import { arrowBtnStyles } from './styles';

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
