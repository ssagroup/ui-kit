import { createContext, useState, useCallback, useContext } from 'react';

/**
 * Switch context value
 * Provides switch state and toggle function to Switch component
 */
export interface SwitchContext {
  /**
   * Current state of the switch
   * - `true`: Switch is on/enabled
   * - `false`: Switch is off/disabled (default)
   */
  isOn: boolean;
  /** Function to toggle switch state */
  toggle: () => void;
}

// Kept as a named object so Switch can tell "no provider above me" apart from
// a real provider by identity.
export const defaultSwitchContext: SwitchContext = {
  isOn: false,
  toggle: () => {
    /* default no-op */
  },
};

/**
 * Default context value for SwitchContext
 * Used as fallback when context is accessed outside SwitchContextProvider
 * @default isOn: false - Switch defaults to off state
 */
export const SwitchContext = createContext<SwitchContext>(defaultSwitchContext);

/**
 * Hook to access Switch context
 *
 * Outside a SwitchContextProvider it does not throw: it returns an off state
 * whose `toggle` does nothing.
 *
 * @returns Switch context with isOn state and toggle function
 */
export const useSwitchContext = () => useContext(SwitchContext);

const useSwitch = (initialState = false): [boolean, () => void] => {
  const [isOn, setIsOn] = useState(initialState);
  const toggle = useCallback(() => setIsOn((state) => !state), []);

  return [isOn, toggle];
};

/**
 * SwitchContextProvider - Context provider for Switch component
 *
 * Holds the on/off state for the Switch inside it and exposes it via context,
 * so other children can read it with `useSwitchContext`. Every Switch inside
 * shares the one state. For a single switch, prefer Switch's own
 * `defaultChecked` / `checked` props.
 *
 * @category Form Controls
 * @subcategory Context
 *
 * @example
 * ```tsx
 * <SwitchContextProvider initialState={false}>
 *   <Switch label="Enable feature" />
 * </SwitchContextProvider>
 * ```

 *
 * @see {@link Switch} - Component that consumes this context
 */
export const SwitchContextProvider = ({
  initialState,
  children,
}: {
  /** Initial on/off state of the switch */
  initialState?: boolean;
  /** Child components (typically Switch component) */
  children: React.ReactNode;
}) => {
  const [isOn, toggle] = useSwitch(initialState);

  return (
    <SwitchContext.Provider value={{ isOn, toggle }}>
      {children}
    </SwitchContext.Provider>
  );
};
