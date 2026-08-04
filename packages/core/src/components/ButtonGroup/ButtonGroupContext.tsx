import { createContext, useContext } from 'react';
import { ButtonGroupContextValue } from './types';

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(
  null,
);

/**
 * Access the enclosing `ButtonGroup`'s selection state.
 *
 * @throws if used outside a `ButtonGroup` — a `ButtonGroupButton` on its own has
 * no group to report to, which is a wiring mistake rather than a fallback case.
 */
export const useButtonGroupContext = () => {
  const context = useContext(ButtonGroupContext);

  if (context === null) {
    throw new Error('ButtonGroupButton must be rendered inside a ButtonGroup');
  }

  return context;
};
