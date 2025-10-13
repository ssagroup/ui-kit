import { useTheme } from '@emotion/react';
import { FloatingArrow } from '@floating-ui/react';

import { TooltipArrowProps } from './types';
import { useTooltipContext } from './useTooltipContext';

export const TooltipArrow = ({
  width = 10,
  height = 10,
  fill,
  ...props
}: TooltipArrowProps) => {
  const { context, arrowRef } = useTooltipContext();
  const theme = useTheme();

  return (
    <FloatingArrow
      data-testid="floating-arrow"
      ref={arrowRef}
      context={context}
      width={width}
      height={height}
      fill={fill || theme.colors.greyLighter}
      {...props}
    />
  );
};
