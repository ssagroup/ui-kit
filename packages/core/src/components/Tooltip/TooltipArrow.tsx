import { useTheme } from '@emotion/react';
import { FloatingArrow } from '@floating-ui/react';
import { useTooltipContext } from './useTooltipContext';
import { TooltipArrowProps } from './types';
import { backgroundColors } from './styles';

export const TooltipArrow = ({
  width = 10,
  height = 10,
  fill,
  stroke,
  strokeWidth,
  ...props
}: TooltipArrowProps) => {
  const { context, arrowRef, color = 'grey', hasBorder } = useTooltipContext();
  const theme = useTheme();

  return (
    <FloatingArrow
      data-testid="floating-arrow"
      ref={arrowRef}
      context={context}
      width={width}
      height={height}
      fill={fill || backgroundColors[color](theme)}
      stroke={hasBorder ? (stroke ?? theme.colors.grey) : stroke}
      strokeWidth={hasBorder ? (strokeWidth ?? 1) : strokeWidth}
      {...props}
    />
  );
};
