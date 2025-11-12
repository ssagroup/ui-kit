export interface MarginInfoProps {
  multiplier?: number;
  stableCoin: React.ReactNode;
  cryptoCoin: React.ReactNode;
  stableCoinBorrowed: React.ReactNode;
  stableCoinInterestRate: React.ReactNode;
  stableCoinTotalInterest: React.ReactNode;
  cryptoCoinBorrowed: React.ReactNode;
  cryptoCoinInterestRate: React.ReactNode;
  cryptoCoinTotalInterest: React.ReactNode;
  hideInterestRate?: boolean;
  disableBorrow?: boolean;
  disableRepay?: boolean;
  onBorrow?: () => void;
  onRepay?: () => void;
}
