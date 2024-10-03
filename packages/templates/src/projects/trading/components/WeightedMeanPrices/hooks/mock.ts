export const MOCK_INSTRUMENTS: Record<
  string,
  Array<{
    platform: string;
    instrument: string;
    price: string;
    isIncreasing: boolean;
  }>
> = {
  'ETH/FDUSD': [
    {
      platform: 'Binance',
      instrument: 'ETH/FDUSD',
      price: '2454.58',
      isIncreasing: true,
    },
    {
      platform: 'Binance',
      instrument: 'ETH/FDUSD',
      price: '2394.19',
      isIncreasing: false,
    },
  ],
  'BTC/FDUSD': [
    {
      platform: 'Binance',
      instrument: 'BTC/FDUSD',
      price: '60194.28',
      isIncreasing: false,
    },
    {
      platform: 'Binance',
      instrument: 'BTC/FDUSD',
      price: '61263.83',
      isIncreasing: true,
    },
  ],
};
