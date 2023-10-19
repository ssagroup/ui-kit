type UnknownFn = (...args: any[]) => unknown;

export const debounceThrottle = (func: UnknownFn, wait = 200) => {
  let timeoutId: NodeJS.Timeout | null = null;
  const executedFunction = (...args: any[]) => {
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
  return [executedFunction, cancel];
};
