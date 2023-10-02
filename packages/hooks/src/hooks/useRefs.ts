import { useRef } from 'react';

// TODO: unit test
export const useRefs = () => {
  const refsByKey = useRef<Record<string, HTMLElement | null>>({});

  const setRef = (element: HTMLElement | null, key: string) => {
    refsByKey.current[key] = element;
  };

  return { refsByKey: refsByKey.current, setRef };
};
