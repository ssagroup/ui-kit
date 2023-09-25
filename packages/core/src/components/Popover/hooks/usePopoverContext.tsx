import * as React from 'react';
import { ContextType } from '../types';

export const PopoverContext = React.createContext<ContextType>(
  {} as ContextType,
);

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context as ContextType;
};
