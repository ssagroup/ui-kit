import { BalanceCoin } from '@trading/types';

export interface CurrencyContextValue {
  currency: BalanceCoin;
  setCurrency: (currency: BalanceCoin) => void;
}

export interface CurrencyProviderProps {
  children: React.ReactNode;
  currency: BalanceCoin;
}
