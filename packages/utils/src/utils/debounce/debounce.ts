export const debounce = <T extends unknown[]>(
  func: (...args: T) => unknown,
  wait = 200,
) => {
  let timeoutId: NodeJS.Timeout | null = null;
  const executedFunction = (...args: T) => {
    const postponedFn = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      func(...args);
    };
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(postponedFn, wait);
  };

  const cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
  return [executedFunction, cancel] as const;
};
