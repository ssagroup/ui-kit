import { useEffect, useState } from 'react';

const BASE_VALUE = 61689.64;
const STEP = 13.85;

export const useStatisticsInstrumentsWithPrices = () => {
  const [isIncreasing, setIncreasing] = useState(true);
  const interval = setInterval(() => {
    setIncreasing(!isIncreasing);
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  return [
    {
      instrument: 'BTC/FDUSD',
      isIncreasing: isIncreasing,
      platform: 'Binance',
      price: `${isIncreasing ? BASE_VALUE + STEP : BASE_VALUE - STEP}`,
    },
  ];
};
