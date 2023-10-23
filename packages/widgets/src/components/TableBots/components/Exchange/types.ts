export type ExchangeType = 'binance' | 'kraken' | 'bittrex';

export interface ExchangeProps {
  exchangeType: ExchangeType;
}
