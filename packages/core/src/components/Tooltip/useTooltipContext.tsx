import { createContext, useContext } from 'react';
import { isNill } from '@ssa-ui-kit/utils';
import { TooltipContextType, UseTooltipContext } from './types';

export const TooltipContext = createContext<TooltipContextType>(null);

export const useTooltipContext: UseTooltipContext = () => {
  const tooltipContext = useContext(TooltipContext);

  if (isNill(tooltipContext)) {
    throw new Error(
      'The component should be wrapped with <Tooltip> to have access to the context',
    );
  }

  return tooltipContext;
};
