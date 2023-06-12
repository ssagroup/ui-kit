import { throttle } from './throttle';

const callNTimes = (fn, n) => {
  for (let i = 0; i < n; i++) {
    fn();
  }
};

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('throttles a function call', () => {
    const mockFn = jest.fn();
    const [throttledFn] = throttle(mockFn, 500);

    callNTimes(throttledFn, 5);

    expect(mockFn).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(clearTimeout).toHaveBeenCalledTimes(0);
  });

  it('cancels the timer', () => {
    const mockFn = jest.fn();
    const [throttledFn, cancelTimer] = throttle(mockFn, 500);

    callNTimes(throttledFn, 5);

    expect(mockFn).toHaveBeenCalledTimes(1);

    cancelTimer();

    expect(clearTimeout).toHaveBeenCalledTimes(1);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
