import { ExchangeType } from './stories/BotsTable/components/Exchange/types';
import { TradeType } from './stories/BotsTable/components/Trade/types';

export interface PNL {
  amount: number;
  currency: string;
  isIncreasing: boolean;
}

export interface ROI {
  amount: number;
  isIncreasing: boolean;
}

export interface BotsTableItem {
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

export interface BotsTableProps {
  children: React.ReactElement<React.PropsWithChildren<BotsTableItem>>[];
  columns: string[];
  className?: string;
}
