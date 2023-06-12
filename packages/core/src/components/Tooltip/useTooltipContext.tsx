import { createContext, useContext } from 'react';
import { TooltipContextType } from './types';

export const TooltipContext = createContext<TooltipContextType>(null);

export const useTooltipContext = () => {
  const tooltipContext = useContext(TooltipContext);

  if (tooltipContext == null) {
    throw new Error(
      'The component should be wrapped with <Tooltip> to have access to the context',
    );
  }

  return tooltipContext;
};
