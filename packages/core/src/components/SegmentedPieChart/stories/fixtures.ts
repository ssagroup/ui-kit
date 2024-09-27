import { BalanceData } from '../types';

// TODO: add legendValue
export const balanceData: BalanceData = [
  {
    id: 1,
    value: 5843.37,
    label: 'BTC',
    parts: [
      {
        label: 'BTC. Option 1',
        value: 2300,
      },
      {
        label: 'BTC. Option 2',
        value: 1800,
      },
      {
        label: 'BTC. Option 3',
        value: 1743.37,
      },
    ],
  },
  {
    id: 2,
    value: 5249.25,
    label: 'ETH',
    parts: [
      {
        label: 'ETH. Option 1',
        value: 2800,
      },
      {
        label: 'ETH. Option 2',
        value: 2449.25,
      },
    ],
  },
  {
    id: 3,
    value: 3825.55,
    label: 'USDT',
    parts: [
      {
        label: 'USDT. Option 1',
        value: 1000,
      },
      {
        label: 'USDT. Option 2',
        value: 1840,
      },
      {
        label: 'USDT. Option 3',
        value: 985.55,
      },
    ],
  },
  {
    id: 4,
    value: 2818.83,
    label: 'Other',
    parts: [
      {
        label: 'Other. Option 1',
        value: 1400,
      },
      {
        label: 'Other. Option 2',
        value: 1418.83,
      },
    ],
  },
];

export const balanceMissedPartsData: BalanceData = [
  {
    id: 1,
    value: 5843.37,
    label: 'BTC',
    parts: [
      {
        label: 'BTC. Option 1',
        value: 2300,
      },
      {
        label: 'BTC. Option 2',
        value: 1800,
      },
      {
        label: 'BTC. Option 3',
        value: 1743.37,
      },
    ],
  },
  {
    id: 2,
    value: 5249.25,
    label: 'ETH',
  },
  {
    id: 3,
    value: 3825.55,
    label: 'USDT',
    parts: [
      {
        label: 'USDT. Option 1',
        value: 1000,
      },
      {
        label: 'USDT. Option 2',
        value: 1840,
      },
      {
        label: 'USDT. Option 3',
        value: 985.55,
      },
    ],
  },
  {
    id: 4,
    value: 2818.83,
    label: 'Other',
  },
];
