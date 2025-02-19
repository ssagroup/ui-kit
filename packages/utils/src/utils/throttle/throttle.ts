export const throttle = <T extends unknown[]>(
  fn: (...args: T) => unknown,
  delayMs: number,
) => {
  let isThrottled = false;
  let savedArgs: T | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function throttledFn(...args: T) {
    if (isThrottled) {
      savedArgs = args;
      return;
    }

    isThrottled = true;

    fn(...args);

    timeoutId = setTimeout(() => {
      isThrottled = false;

      // istanbul ignore else
      if (savedArgs) {
        throttledFn(...savedArgs);
        savedArgs = null;
      }
    }, delayMs);
  }

  return [
    throttledFn,
    function cancel() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    },
  ] as const;
};
