import { MutableRefObject, useEffect, useMemo, useState } from 'react';

// TODO: unit test
export const useOnScreen = (ref: MutableRefObject<HTMLElement>) => {
  console.log('>>>useOnScreen', ref);
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting),
      ),
    [ref],
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
};
