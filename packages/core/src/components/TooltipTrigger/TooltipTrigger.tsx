import { cloneElement, isValidElement } from 'react';

import { ITooltipTriggerProps } from '@components/Tooltip/types';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';

const TooltipTrigger = ({ children }: ITooltipTriggerProps) => {
  const tooltipCtx = useTooltipContext();

  if (isValidElement(children)) {
    return cloneElement(
      children,
      tooltipCtx?.getReferenceProps({
        ref: tooltipCtx.refs.setReference,
      }),
    );
  }

  return null;
};

export default TooltipTrigger;
