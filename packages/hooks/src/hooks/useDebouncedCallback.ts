import { useRef } from 'react';
import { useCallbackRef } from './useCallbackRef';

export const useDebouncedCallback = <T extends unknown[]>(
  func: (...args: T) => unknown,
  wait = 200,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleCallback = useCallbackRef(func);

  const executedFunction = (...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      handleCallback(...args);
    }, wait);
  };

  const cancel = function () {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  return [executedFunction, cancel, timeoutRef.current] as const;
};
