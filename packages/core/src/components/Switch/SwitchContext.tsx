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

/**
 * Default context value for SwitchContext
 * Used as fallback when context is accessed outside SwitchContextProvider
 * @default isOn: false - Switch defaults to off state
 */
export const SwitchContext = createContext<SwitchContext>({
  isOn: false,
  toggle: () => {
    /* default no-op */
  },
});

/**
 * Hook to access Switch context
 *
 * @returns Switch context with isOn state and toggle function
 * @throws Error if used outside SwitchContextProvider
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
 * Provides switch state management and toggle functionality to child Switch
 * components. Manages the on/off state internally and exposes it via context.
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
 * @example
 * ```tsx
 * // Multiple switches sharing state (if needed)
 * <SwitchContextProvider initialState={true}>
 *   <Switch label="Switch 1" />
 *   <Switch label="Switch 2" />
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
