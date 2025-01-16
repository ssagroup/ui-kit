import { BalanceCoin } from '@fintech/types';

export interface CurrencyContextValue {
  currency: BalanceCoin;
  setCurrency: (currency: BalanceCoin) => void;
}

export interface CurrencyProviderProps {
  children: React.ReactNode;
  currency: BalanceCoin;
}
