import { Interpolation, Theme } from '@emotion/react';
import { ExchangeType } from './stories/TableBots/components/Exchange/types';
import { TradeType } from './stories/TableBots/components/Trade/types';

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
  columns: string[];
  className?: string;
  css?: Interpolation<Theme>;
}

export interface NoControlOrdersItem {
  id: number;
  exchange: ExchangeType;
  account: string;
  botName: string;
  botRun: string;
  orderId: string;
  status: boolean;
  reason: string;
  pair: string;
  orderSize: string;
  orderType: 'SELL';
  isDisabled: boolean;
}
