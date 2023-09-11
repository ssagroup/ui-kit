import { Button, Icon } from '@ssa-ui-kit/core';

import { IArrowButtonProps } from './types';
import { arrowBtnStyles } from './styles';

export const ArrowButton = ({
  direction,
  onClick,
  isDisabled,
  className,
}: IArrowButtonProps) => {
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
      css={arrowBtnStyles}
    />
  );
};
