import { TableBotItem } from '../../types';

const commonStructure: TableBotItem = {
  id: 1,
  name: 'Bot name 1',
  creationDate: '27.07.23',
  exchange: 'binance',
  status: 'trade',
  pair: 'ETH/USD',
  pnl: {
    amount: 300,
    currency: 'USD',
    isIncreasing: true,
  },
  roi: {
    amount: 25,
    isIncreasing: true,
  },
  isDisabled: false,
};

const binanceData = new Array(5).fill(null).map((value, index) => ({
  ...commonStructure,
  id: index + 1,
  name: `Bot name ${index + 1}`,
}));

export const tableBotsData: TableBotItem[] = [
  ...binanceData,
  {
    ...commonStructure,
    id: 6,
    name: 'Bot name 6',
    exchange: 'kraken',
    status: 'pending',
    pnl: {
      amount: 100,
      currency: 'USD',
      isIncreasing: false,
    },
    roi: {
      amount: 15,
      isIncreasing: false,
    },
  },
  {
    ...commonStructure,
    id: 7,
    name: 'Bot name 7',
    exchange: 'kraken',
    status: 'liquidation',
  },
  {
    ...commonStructure,
    id: 8,
    name: 'Bot name 8',
    exchange: 'bittrex',
    status: 'liquidation',
    pnl: {
      amount: 70,
      currency: 'USD',
      isIncreasing: false,
    },
    roi: {
      amount: 10,
      isIncreasing: false,
    },
  },
  {
    ...commonStructure,
    id: 9,
    name: 'Bot name 9',
    exchange: 'kraken',
    status: 'liquidation',
  },
  {
    ...commonStructure,
    id: 10,
    name: 'Bot name 9',
    exchange: 'kraken',
    status: 'liquidation',
    isDisabled: true,
  },
];
