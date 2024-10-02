import { useEffect, useRef, useState } from 'react';
import { InstrumentSingle } from '@trading/types';

const MOCK_RESULT = [
  {
    platform: 'Binance',
    instrument: 'ETH/FDUSD',
    price: '2454.58',
    isIncreasing: false,
  },
  {
    platform: 'Binance',
    instrument: 'BTC/FDUSD',
    price: '61263.83',
    isIncreasing: false,
  },
  {
    platform: 'Binance',
    instrument: 'ETH/FDUSD',
    price: '2394.19',
    isIncreasing: true,
  },
  {
    platform: 'Binance',
    instrument: 'BTC/FDUSD',
    price: '60194.28',
    isIncreasing: true,
  },
];
export const useInstrumentInfoWithPrices = () => {
  const [instrumentInfo, setInstrumentInfo] = useState<InstrumentSingle>(
    MOCK_RESULT[0],
  );
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const mockIndex = useRef<number>();

  useEffect(() => {
    const interval = setInterval(() => {
      if (mockIndex.current === undefined) {
        mockIndex.current = 1;
      } else {
        setInstrumentInfo(MOCK_RESULT[mockIndex.current]);
        if (mockIndex.current < MOCK_RESULT.length - 1) {
          mockIndex.current += 1;
        } else {
          mockIndex.current = 0;
        }
      }
    }, 1000);
    setIntervalId(interval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return instrumentInfo;
};
