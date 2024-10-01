import { SegmentedDataSet } from '../types';

const RATE = {
  BTC: 63972.97,
  ETH: 2649.84,
  FDUSD: 0.9991,
  USDT: 1,
};

export const balanceData: SegmentedDataSet = [
  {
    id: 1,
    value: 5843.37,
    legendValue: 5843.37 / RATE.BTC,
    legendLabel: 'B.T.C',
    label: 'BTC',
    legendValueRoundingDigits: 6,
    parts: [
      {
        label: 'Option 1',
        value: 2300,
        legendValue: 2300 / RATE.BTC,
      },
      {
        label: 'Option 2',
        value: 1800,
        legendValue: 1800 / RATE.BTC,
      },
      {
        label: 'Option 3',
        value: 1743.37,
        legendValue: 1743.37 / RATE.BTC,
      },
    ],
  },
  {
    id: 2,
    value: 5249.25,
    legendValue: 5249.25 / RATE.ETH,
    legendLabel: 'E.T.H',
    label: 'ETH',
    legendValueRoundingDigits: 2,
    parts: [
      {
        label: 'Option 1',
        value: 2800,
        legendValue: 2800 / RATE.ETH,
      },
      {
        label: 'Option 2',
        value: 2449.25,
        legendValue: 2449.25 / RATE.ETH,
      },
    ],
  },
  {
    id: 3,
    value: 3825.55,
    legendValue: 3825.55 / RATE.FDUSD,
    legendLabel: 'F.D.U.S.D',
    label: 'FDUSD',
    legendValueRoundingDigits: 2,
    parts: [
      {
        label: 'Option 1',
        value: 1000,
        legendValue: 1000 / RATE.FDUSD,
      },
      {
        label: 'Option 2',
        value: 1840,
        legendValue: 1840 / RATE.FDUSD,
      },
      {
        label: 'Option 3',
        value: 985.55,
        legendValue: 985.55 / RATE.FDUSD,
      },
    ],
  },
  {
    id: 4,
    value: 2818.83,
    legendValue: 2818.83 / RATE.USDT,
    label: 'Other',
    legendLabel: 'U.S.D.T',
    legendValueRoundingDigits: 0,
    parts: [
      {
        label: 'Option 1',
        value: 1400,
        legendValue: 1400 / RATE.USDT,
      },
      {
        label: 'Option 2',
        value: 1418.83,
        legendValue: 1418.83 / RATE.USDT,
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
    legendValue: 5843.37 / RATE.BTC,
    label: 'BTC',
    legendValueRoundingDigits: 6,
    parts: [
      {
        label: 'Option 1',
        value: 2300,
        legendValue: 2300 / RATE.BTC,
      },
      {
        label: 'Option 2',
        value: 1800,
        legendValue: 1800 / RATE.BTC,
      },
      {
        label: 'Option 3',
        value: 1743.37,
        legendValue: 1743.37 / RATE.BTC,
      },
    ],
  },
  {
    id: 2,
    value: 5249.25,
    legendValue: 5249.25 / RATE.ETH,
    label: 'ETH',
    legendValueRoundingDigits: 2,
  },
  {
    id: 3,
    value: 3825.55,
    legendValue: 3825.55 / RATE.FDUSD,
    label: 'FDUSD',
    legendValueRoundingDigits: 2,
    parts: [
      {
        label: 'Option 1',
        value: 1000,
        legendValue: 1000 / RATE.FDUSD,
      },
      {
        label: 'Option 2',
        value: 1840,
        legendValue: 1840 / RATE.FDUSD,
      },
      {
        label: 'Option 3',
        value: 985.55,
        legendValue: 985.55 / RATE.FDUSD,
      },
    ],
  },
  {
    id: 4,
    value: 2818.83,
    legendValue: 2818.83 / RATE.USDT,
    label: 'Other',
    legendValueRoundingDigits: 0,
  },
];

export const balanceMissedPartsDataTotalAmount = balanceMissedPartsData
  .map((item) => Number(item.value))
  .reduce((acc, currentValue) => acc + currentValue, 0);
