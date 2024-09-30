import { SegmentedDataSet } from '../types';

// TODO: add legendValue
// coins ~ legendValue
export const balanceData: SegmentedDataSet = [
  {
    id: 1,
    value: 5843.37,
    legendValue: 1870.15,
    label: 'BTC',
    parts: [
      {
        label: 'BTC. Option 1',
        value: 2300,
        legendValue: 200,
      },
      {
        label: 'BTC. Option 2',
        value: 1800,
        legendValue: 170,
      },
      {
        label: 'BTC. Option 3',
        value: 1743.37,
        legendValue: 1500.15,
      },
    ],
  },
  {
    id: 2,
    value: 5249.25,
    legendValue: 4250.12,
    label: 'ETH',
    parts: [
      {
        label: 'ETH. Option 1',
        value: 2800,
        legendValue: 2300,
      },
      {
        label: 'ETH. Option 2',
        value: 2449.25,
        legendValue: 1950.12,
      },
    ],
  },
  {
    id: 3,
    value: 3825.55,
    legendValue: 2675.22,
    label: 'USDT',
    parts: [
      {
        label: 'USDT. Option 1',
        value: 1000,
        legendValue: 800,
      },
      {
        label: 'USDT. Option 2',
        value: 1840,
        legendValue: 1135,
      },
      {
        label: 'USDT. Option 3',
        value: 985.55,
        legendValue: 740.22,
      },
    ],
  },
  {
    id: 4,
    value: 2818.83,
    legendValue: 2405.31,
    label: 'Other',
    parts: [
      {
        label: 'Other. Option 1',
        value: 1400,
        legendValue: 1200,
      },
      {
        label: 'Other. Option 2',
        value: 1418.83,
        legendValue: 1205.31,
      },
    ],
  },
];

export const balanceTotalAmount = balanceData
  .map((item) => Number(item.value))
  .reduce((acc, currentValue) => acc + currentValue, 0);

export const balanceMissedPartsData: SegmentedDataSet = [
  {
    id: 1,
    value: 5843.37,
    legendValue: 1870.15,
    label: 'BTC',
    parts: [
      {
        label: 'BTC. Option 1',
        value: 2300,
        legendValue: 200,
      },
      {
        label: 'BTC. Option 2',
        value: 1800,
        legendValue: 170,
      },
      {
        label: 'BTC. Option 3',
        value: 1743.37,
        legendValue: 1500.15,
      },
    ],
  },
  {
    id: 2,
    value: 5249.25,
    legendValue: 4250.12,
    label: 'ETH',
  },
  {
    id: 3,
    value: 3825.55,
    legendValue: 2675.22,
    label: 'USDT',
    parts: [
      {
        label: 'USDT. Option 1',
        value: 1000,
        legendValue: 800,
      },
      {
        label: 'USDT. Option 2',
        value: 1840,
        legendValue: 1135,
      },
      {
        label: 'USDT. Option 3',
        value: 985.55,
        legendValue: 740.22,
      },
    ],
  },
  {
    id: 4,
    value: 2818.83,
    legendValue: 2405.31,
    label: 'Other',
  },
];

export const balanceMissedPartsDataTotalAmount = balanceMissedPartsData
  .map((item) => Number(item.value))
  .reduce((acc, currentValue) => acc + currentValue, 0);
