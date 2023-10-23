import { ExchangeType } from './components/Exchange/types';

interface PNL {
  amount: number;
  currency: string;
  isIncreasing: boolean;
}

interface ROI {
  amount: number;
  isIncreasing: boolean;
}

export interface TableBotItem {
  id: number;
  name: string;
  creationDate: string;
  exchange: ExchangeType;
  status: string;
  pair: string;
  pnl: PNL;
  roi: ROI;
  isDisabled: boolean;
}
