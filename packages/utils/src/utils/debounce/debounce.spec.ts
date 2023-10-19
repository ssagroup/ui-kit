import { debounce } from './debounce';

describe('debounce function', () => {
  jest.useFakeTimers();

  it('should execute the function after the delay', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalled();
  });

  it('should cancel the debounce and execute immediately', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn(); // This should cancel the first debounced call

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1); // Only one call should be executed
  });
});
