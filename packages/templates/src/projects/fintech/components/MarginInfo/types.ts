export interface MarginInfoProps {
  multiplier?: number;
  base: React.ReactNode;
  quote: React.ReactNode;
  baseBorrowed: React.ReactNode;
  baseInterestRate: React.ReactNode;
  baseTotalInterest: React.ReactNode;
  quoteBorrowed: React.ReactNode;
  quoteInterestRate: React.ReactNode;
  quoteTotalInterest: React.ReactNode;
  hideInterestRate?: boolean;
  disableBorrow?: boolean;
  disableRepay?: boolean;
  onBorrow?: () => void;
  onRepay?: () => void;
}
