import { useEffect, useMemo, useRef } from 'react';

export const useCallbackRef = <A extends unknown[], R>(
  callback: ((...args: A) => R) | undefined,
): ((...args: A) => R) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(
    () => ((...args: A) => callbackRef.current?.(...args)) as (...args: A) => R,
    [],
  );
};
