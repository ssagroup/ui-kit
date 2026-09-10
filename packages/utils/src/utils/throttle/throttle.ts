/**
 * Rate-limits a function to at most one call per interval.
 *
 * ### Returns a `[throttled, cancel]` tuple
 * Not a callable function with a `.cancel()` method as in lodash — destructure
 * it: `const [onScroll, cancelScroll] = throttle(fn, 100)`.
 *
 * Leading **and** trailing: the first call runs immediately, calls during the
 * cooling-off window are dropped except the last, and that one runs when the
 * window closes. So a burst produces a call at the start and a call at the end,
 * never a silent gap — unlike `debounce`, which only fires at the end.
 *
 * Call `cancel` on unmount to clear a pending trailing invocation.
 *
 * @param delayMs - Minimum gap between invocations, in ms.
 *
 * @example
 * const [onScroll, cancel] = throttle(() => setOffset(window.scrollY), 100);
 *
 * useEffect(() => {
 *   window.addEventListener('scroll', onScroll);
 *   return () => {
 *     window.removeEventListener('scroll', onScroll);
 *     cancel();
 *   };
 * }, [onScroll, cancel]);
 */
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
