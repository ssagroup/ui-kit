import { forwardRef } from 'react';

import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';

import { TooltipArrow } from '@components/Tooltip/TooltipArrow';
import { TooltipContentBase } from '@components/Tooltip/TooltipContentBase';
import { TooltipContentProps, TooltipSize } from '@components/Tooltip/types';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';
import { mapSizes } from '@components/Tooltip/utils';

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent({ children, className, style }, refProp) {
    const tooltipCtx = useTooltipContext();
    const ref = useMergeRefs([tooltipCtx?.refs.setFloating, refProp]);

    return (
      <FloatingPortal>
        {tooltipCtx?.isOpen && (
          <FloatingFocusManager context={tooltipCtx.context} modal={false}>
            <TooltipContentBase
              {...tooltipCtx.getFloatingProps({
                ref,
                css:
                  tooltipCtx.size && mapSizes[tooltipCtx.size as TooltipSize],
                className,
                style: {
                  position: tooltipCtx.strategy,
                  top: tooltipCtx.y ?? 0,
                  left: tooltipCtx.x ?? 0,
                  width: 'max-content',
                  ...style,
                },
              })}>
              {tooltipCtx.hasArrow && (
                <TooltipArrow {...tooltipCtx.arrowProps} />
              )}
              {children}
            </TooltipContentBase>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    );
  },
);

export default TooltipContent;
