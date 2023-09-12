import { useTheme } from '@emotion/react';
import { Button, Icon } from '@ssa-ui-kit/core';

import { IArrowButtonProps } from './types';
import { arrowBtnStyles } from './styles';

export const ArrowButton = ({
  direction,
  onClick,
  isDisabled,
  className,
}: IArrowButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      startIcon={
        <Icon name={`carrot-${direction}`} size={12} color="#55575A" />
      }
      variant="custom"
      onClick={onClick}
      isDisabled={isDisabled}
      size="small"
      className={className}
      css={arrowBtnStyles(theme)}
      aria-label={`Goto ${direction === 'left' ? 'previous' : 'next'} page`}
    />
  );
};
