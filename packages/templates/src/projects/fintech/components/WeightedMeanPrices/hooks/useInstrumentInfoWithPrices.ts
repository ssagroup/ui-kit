import { useEffect, useRef, useState } from 'react';
import { InstrumentSingle, WeightedMeanPrices } from '@fintech/types';
import { MOCK_INSTRUMENTS } from './mock';

export const useInstrumentInfoWithPrices = (props: WeightedMeanPrices) => {
  const [instrumentInfo, setInstrumentInfo] = useState<InstrumentSingle>({
    platform: props.platform,
    instrument: props.instrument,
    price: '',
    isIncreasing: null,
  });
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const mockIndex = useRef<number>();

  useEffect(() => {
    const interval = setInterval(() => {
      if (mockIndex.current === undefined) {
        mockIndex.current = 1;
      } else {
        setInstrumentInfo({
          ...MOCK_INSTRUMENTS[props.instrument][mockIndex.current],
          platform: props.platform,
          instrument: props.instrument,
        });
        if (mockIndex.current < MOCK_INSTRUMENTS[props.instrument].length - 1) {
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
