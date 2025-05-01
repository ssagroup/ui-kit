import { createContext, useContext } from 'react';
import { AccountBalanceProps } from './types';

type ContextType = Pick<
  AccountBalanceProps,
  | 'variant'
  | 'fullscreenModeFeature'
  | 'activeHighlight'
  | 'tooltip'
  | 'total'
  | 'title'
  | 'currency'
>;

export const AccountBalanceContext = createContext<ContextType>({
  activeHighlight: false,
  fullscreenModeFeature: false,
  total: 0,
  currency: '',
});

export const AccountBalanceProvider = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
} & ContextType) => (
  <AccountBalanceContext.Provider
    value={{
      ...rest,
    }}>
    {children}
  </AccountBalanceContext.Provider>
);

export const useAccountBalanceContext = () => {
  return useContext(AccountBalanceContext);
};
