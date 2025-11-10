import { createContext, useEffect, useState } from 'react';

import { USDT } from '@fintech/constants';
import { BalanceCoin } from '@fintech/types';

import { LS_CURRENCY_KEY } from './constants';
import { CurrencyContextValue, CurrencyProviderProps } from './types';

export const CurrencyContext = createContext<CurrencyContextValue>({
  currency: USDT,
  setCurrency() {
    /* no-op */
  },
});

export const CurrencyProvider = ({
  children,
  currency: defaultCurrency,
}: CurrencyProviderProps) => {
  const currencyFromLS = localStorage.getItem(LS_CURRENCY_KEY) as
    | BalanceCoin
    | undefined;
  const [currency, setCurrency] = useState<BalanceCoin>(
    currencyFromLS || defaultCurrency,
  );

  useEffect(() => {
    localStorage.setItem(LS_CURRENCY_KEY, currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
