import { ExchangeType } from './components/Exchange/types';
import { TradeType } from './components/Trade/types';

export interface PNL {
  amount: number;
  currency: string;
  isIncreasing: boolean;
}

export interface ROI {
  amount: number;
  isIncreasing: boolean;
}

export interface StyledTableItem {
  id: number;
  name: string;
  creationDate: string;
  exchange: ExchangeType;
  status: TradeType;
  pair: string;
  pnl: PNL;
  roi: ROI;
  isDisabled: boolean;
}

export interface StyledTableProps {
  children: React.ReactElement<React.PropsWithChildren<StyledTableItem>>[];
  className?: string;
}
