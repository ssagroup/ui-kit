import * as React from 'react';
import { ContextType } from '../types';

/**
 * Context for popover components
 *
 * Provides popover state and functionality to child components. Created by
 * Popover component and consumed by PopoverTrigger, PopoverContent, and other
 * popover sub-components.
 */
export const PopoverContext = React.createContext<ContextType>(
  {} as ContextType,
);

/**
 * usePopoverContext - Hook to access popover context
 *
 * Returns the popover context value. Throws an error if used outside of a
 * Popover component.
 *
 * @returns Popover context value with state, positioning, and interaction handlers
 * @throws Error if used outside of Popover component
 *
 * @example
 * ```tsx
 * const { open, setOpen, refs } = usePopoverContext();
 * ```
 *
 * @see {@link Popover} - Component that provides this context
 */
export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context as ContextType;
};
