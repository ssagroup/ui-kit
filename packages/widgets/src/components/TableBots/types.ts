import { ExchangeType } from './stories/components/Exchange/types';
import { TradeType } from './stories/components/Trade/types';

export interface PNL {
  amount: number;
  currency: string;
  isIncreasing: boolean;
}

export interface ROI {
  amount: number;
  isIncreasing: boolean;
}

export interface TableBotItem {
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

export interface TableBotsProps {
  children: React.ReactElement<React.PropsWithChildren<TableBotItem>>[];
}
