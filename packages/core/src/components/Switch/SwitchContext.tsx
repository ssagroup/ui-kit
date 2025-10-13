import { createContext, useCallback, useContext, useState } from 'react';

export interface SwitchContext {
  isOn: boolean;
  toggle: () => void;
}

export const SwitchContext = createContext<SwitchContext>({
  isOn: true,
  toggle: () => {
    /* default no-op */
  },
});

export const useSwitchContext = () => useContext(SwitchContext);

const useSwitch = (initialState = false): [boolean, () => void] => {
  const [isOn, setIsOn] = useState(initialState);
  const toggle = useCallback(() => setIsOn((state) => !state), []);

  return [isOn, toggle];
};

export const SwitchContextProvider = ({
  initialState,
  children,
}: {
  initialState?: boolean;
  children: React.ReactNode;
}) => {
  const [isOn, toggle] = useSwitch(initialState);

  return (
    <SwitchContext.Provider value={{ isOn, toggle }}>
      {children}
    </SwitchContext.Provider>
  );
};
