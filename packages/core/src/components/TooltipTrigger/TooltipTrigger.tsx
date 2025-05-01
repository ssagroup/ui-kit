import { cloneElement, isValidElement } from 'react';

import { TooltipTriggerProps } from '@components/Tooltip/types';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';

const TooltipTrigger = ({ children, className }: TooltipTriggerProps) => {
  const tooltipCtx = useTooltipContext();

  if (isValidElement(children)) {
    return cloneElement(
      children,
      tooltipCtx?.getReferenceProps({
        ref: tooltipCtx.refs.setReference,
        className: [children.props?.className, className]
          .filter(Boolean)
          .join(' '),
      }),
    );
  }

  return null;
};

export default TooltipTrigger;
