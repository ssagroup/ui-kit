type UnknownFn = (...args: any[]) => unknown;
type DebounceFn = (fn: UnknownFn, delayMs: number) => () => void;

export const debounce: DebounceFn = (fn, delayMs) => {
  let timeoutId: number | null = null;

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(fn, delayMs);
  };
};
