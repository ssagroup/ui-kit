import { ReactNode } from 'react';

export interface MarginInfoProps {
  title?: string;
  base: ReactNode;
  quote: ReactNode;
  baseBorrowed: ReactNode;
  quoteBorrowed: ReactNode;
  baseTotalInterest: ReactNode;
  quoteTotalInterest: ReactNode;
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
