import { ReactNode } from 'react';

export interface MarginInfoProps {
  multiplier?: number;
  base: ReactNode;
  quote: ReactNode;
  baseBorrowed: ReactNode;
  baseInterestRate: ReactNode;
  baseTotalInterest: ReactNode;
  quoteBorrowed: ReactNode;
  quoteInterestRate: ReactNode;
  quoteTotalInterest: ReactNode;
  hideInterestRate?: boolean;
  disableBorrow?: boolean;
  disableRepay?: boolean;
  onBorrow?: () => void;
  onRepay?: () => void;
}
