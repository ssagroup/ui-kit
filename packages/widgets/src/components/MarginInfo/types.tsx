import { ReactNode } from 'react';

export interface MarginInfoProps {
  title?: string;
  base: ReactNode;
  quote: ReactNode;
  baseBorrowed: ReactNode;
  quoteBorrowed: ReactNode;
  baseTotalInterest: ReactNode;
  quoteTotalInterest: ReactNode;
  borrowedLabel?: string;
  interestRateLabel?: string;
  totalInterestLabel?: string;
  showInterestRate?: boolean;
  baseInterestRate?: ReactNode;
  quoteInterestRate?: ReactNode;
  disableBorrow?: boolean;
  disableRepay?: boolean;
  onBorrow?: () => void;
  onRepay?: () => void;
  className?: string;
  wrapperClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export interface MarginInfoTableRowProps {
  label: string;
  baseValue: ReactNode;
  quoteValue: ReactNode;
}
