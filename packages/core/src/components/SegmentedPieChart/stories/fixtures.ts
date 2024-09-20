import { BalanceData } from '../types';

export const balanceData: BalanceData = [
  {
    id: 1,
    value: 5843.37,
    label: 'BTC',
    percentage: 33,
    parts: [
      {
        label: 'BTC. Option 1',
        percentage: 13,
        value: 2300,
      },
      {
        label: 'BTC. Option 2',
        percentage: 10,
        value: 1800,
      },
      {
        label: 'BTC. Option 3',
        percentage: 10,
        value: 1743.37,
      },
    ],
  },
  {
    id: 2,
    value: 5249.25,
    label: 'ETH',
    percentage: 30,
    parts: [
      {
        label: 'ETH. Option 1',
        percentage: 17,
        value: 2800,
      },
      {
        label: 'ETH. Option 2',
        percentage: 13,
        value: 2449.25,
      },
    ],
  },
  {
    id: 3,
    value: 3825.55,
    label: 'USDT',
    percentage: 22,
    parts: [
      {
        label: 'USDT. Option 1',
        percentage: 5,
        value: 1000,
      },
      {
        label: 'USDT. Option 2',
        percentage: 12,
        value: 1840,
      },
      {
        label: 'USDT. Option 3',
        percentage: 5,
        value: 985.55,
      },
    ],
  },
  {
    id: 4,
    value: 2818.83,
    label: 'Other',
    percentage: 15,
    parts: [
      {
        label: 'Other. Option 1',
        percentage: 7,
        value: 1400,
      },
      {
        label: 'Other. Option 2',
        percentage: 8,
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
    percentage: 33,
    parts: [
      {
        label: 'BTC. Option 1',
        percentage: 13,
        value: 2300,
      },
      {
        label: 'BTC. Option 2',
        percentage: 10,
        value: 1800,
      },
      {
        label: 'BTC. Option 3',
        percentage: 10,
        value: 1743.37,
      },
    ],
  },
  {
    id: 2,
    value: 5249.25,
    label: 'ETH',
    percentage: 30,
  },
  {
    id: 3,
    value: 3825.55,
    label: 'USDT',
    percentage: 22,
    parts: [
      {
        label: 'USDT. Option 1',
        percentage: 5,
        value: 1000,
      },
      {
        label: 'USDT. Option 2',
        percentage: 12,
        value: 1840,
      },
      {
        label: 'USDT. Option 3',
        percentage: 5,
        value: 985.55,
      },
    ],
  },
  {
    id: 4,
    value: 2818.83,
    label: 'Other',
    percentage: 15,
  },
];
