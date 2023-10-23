import { debounce } from '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callNTimes = (fn: any, n: number) => {
  for (let i = 0; i < n; i++) {
    fn();
  }
};

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should cancel immediately without executing', () => {
    const fn = jest.fn();
    const [throttledFn, cancel] = debounce(fn, 100);

    throttledFn();
    // Cancel should not execute any pending call
    cancel();
    jest.advanceTimersByTime(150);
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it('should execute deferred function on the second time, after cancelling for the first time', () => {
    const fn = jest.fn();
    const [throttledFn, cancel] = debounce(fn, 100);

    throttledFn();
    // Cancel should not execute any pending call
    cancel();
    jest.advanceTimersByTime(150);
    expect(fn).toHaveBeenCalledTimes(0);

    throttledFn();
    jest.advanceTimersByTime(150);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('throttles and delayed a function call', () => {
    const fn = jest.fn();
    const [throttledFn, cancel] = debounce(fn, 100);

    // Subsequent calls within the throttle window should be throttled
    callNTimes(throttledFn, 3);
    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledTimes(1);

    // After the throttle window, the next call should execute
    throttledFn();

    // Wait for the throttle window to pass
    jest.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledTimes(2);

    // Calling the throttled function after cancel should execute
    throttledFn();
    // ...but cancelled by triggering the cancel function
    cancel();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should debounce and execute the last call within debounce window', () => {
    const fn = jest.fn();
    const [throttledFn] = debounce(fn, 100);

    callNTimes(throttledFn, 3);
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    throttledFn();
    jest.advanceTimersByTime(150);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
