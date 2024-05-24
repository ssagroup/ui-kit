import { useEffect, useState, useMemo, useRef } from 'react';
import { dateFormatters, throttle } from '@ssa-ui-kit/utils';
import { UseChartConfig } from './types';

const { formatTime, formatDayOfWeek, formatDate } = dateFormatters;

const MAX_ITEMS_ON_SMALL_SCREENS = 7;
const MIN_WIDTH = 600;
const THROTTLE_DELAY_MS = 50;

const useChartConfig: UseChartConfig = (elRef, data, precision = 'day') => {
  const [width, setWidth] = useState(0);
  const throttledRef = useRef(
    throttle((entries) => {
      setWidth(entries[0].contentRect.width);
    }, THROTTLE_DELAY_MS),
  );

  const observerRef = useRef(new ResizeObserver(throttledRef?.current?.[0]));

  useEffect(() => {
    const currentRef = elRef.current;

    if (observerRef.current && currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [elRef, observerRef]);

  useEffect(() => {
    return () => {
      if (throttledRef.current) {
        const [, cancel] = throttledRef.current;
        cancel();
      }
    };
  }, [throttledRef]);

  return useMemo(
    () => ({
      xScale: {
        type: 'time',
        format: '%L',
        precision: precision === 'week' ? 'day' : precision,
      },
      axisBottom: {
        tickSize: 0,
        tickPadding: 30,
        legend: '',
        tickValues: width < MIN_WIDTH ? MAX_ITEMS_ON_SMALL_SCREENS : undefined,
        tickRotation: width < MIN_WIDTH ? 30 : 0,
        format:
          precision === 'hour'
            ? formatTime
            : precision === 'week'
              ? formatDayOfWeek
              : formatDate,
      },
    }),
    [data, width, precision],
  );
};

export default useChartConfig;
