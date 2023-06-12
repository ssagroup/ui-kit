/* eslint-disable @typescript-eslint/no-explicit-any */
type UnknownFn = (...args: any[]) => unknown;
type ThrottleFn = (
  fn: UnknownFn,
  delayMs: number,
) => [(...args: any[]) => void, () => void];
/* eslint-enable @typescript-eslint/no-explicit-any */

export const throttle: ThrottleFn = (fn, delayMs) => {
  let isThrottled = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let savedArgs: any = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function throttledFn(...args) {
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
  ];
};
