/**
 * Delays a call until the input stops arriving.
 *
 * ### Returns a `[debounced, cancel]` tuple
 * Not a callable function with a `.cancel()` method as in lodash — destructure
 * it: `const [search, cancelSearch] = debounce(fn, 300)`. Calling the returned
 * value directly is a type error, because it is an array.
 *
 * Trailing edge only: nothing runs until `wait` ms have passed with no further
 * calls, and only the most recent arguments are used. For a call that fires
 * immediately and then rate-limits, use `throttle`.
 *
 * Call `cancel` on unmount so a pending invocation cannot fire against a
 * component that is gone.
 *
 * @param wait - Quiet period in ms before the call goes through. @default 200
 *
 * @example
 * const [search, cancel] = debounce((term: string) => void fetchResults(term), 300);
 *
 * useEffect(() => cancel, [cancel]);
 * <Input onChange={(e) => search(e.target.value)} />
 */
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
