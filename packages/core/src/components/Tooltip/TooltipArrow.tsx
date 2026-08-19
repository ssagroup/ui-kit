import { useTheme } from '@emotion/react';
import { FloatingArrow } from '@floating-ui/react';
import { useTooltipContext } from './useTooltipContext';
import { TooltipArrowProps } from './types';
import { resolveSurfaceArrowProps } from './styles';

export const TooltipArrow = ({
  width = 10,
  height = 10,
  fill,
  stroke,
  strokeWidth,
  ...props
}: TooltipArrowProps) => {
  const { context, arrowRef, color, hasBorder } = useTooltipContext();
  const theme = useTheme();

  return (
    <FloatingArrow
      data-testid="floating-arrow"
      ref={arrowRef}
      context={context}
      width={width}
      height={height}
      {...resolveSurfaceArrowProps({
        theme,
        color,
        hasBorder,
        overrides: { fill, stroke, strokeWidth },
      })}
      {...props}
    />
  );
};
