export type TradeType = 'trade' | 'liquidation' | 'pending';

export interface TradeProps {
  tradeType: TradeType;
}
