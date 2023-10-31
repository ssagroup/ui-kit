import { ExchangeType } from '../BotsTable/components/Exchange/types';

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
