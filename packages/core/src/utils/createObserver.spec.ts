import { createObserver } from './createObserver';

describe('createObserver', () => {
  it('calls the subscriber with dispatched data', () => {
    const observer = createObserver<{ value: number }>();
    const fn = jest.fn();

    observer.subscribe('key-a', fn);
    observer.dispatch({ value: 42 });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({ value: 42 });
  });

  it('calls every subscriber when dispatching', () => {
    const observer = createObserver<string>();
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    observer.subscribe('key-1', fn1);
    observer.subscribe('key-2', fn2);
    observer.dispatch('hello');

    expect(fn1).toHaveBeenCalledWith('hello');
    expect(fn2).toHaveBeenCalledWith('hello');
  });

  it('does not call a callback after it has been unsubscribed', () => {
    const observer = createObserver<number>();
    const fn = jest.fn();

    observer.subscribe('key', fn);
    observer.unsubscribe('key');
    observer.dispatch(99);

    expect(fn).not.toHaveBeenCalled();
  });

  it('overwrites a previous subscriber registered under the same key', () => {
    const observer = createObserver<string>();
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    observer.subscribe('same-key', fn1);
    observer.subscribe('same-key', fn2);
    observer.dispatch('test');

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith('test');
  });

  it('only removes the subscriber matching the given key', () => {
    const observer = createObserver<string>();
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    observer.subscribe('key-a', fn1);
    observer.subscribe('key-b', fn2);
    observer.unsubscribe('key-a');
    observer.dispatch('ping');

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith('ping');
  });

  it('does not throw when dispatching with no subscribers', () => {
    const observer = createObserver<void>();
    expect(() => observer.dispatch()).not.toThrow();
  });

  it('does not throw when unsubscribing a key that was never registered', () => {
    const observer = createObserver<void>();
    expect(() => observer.unsubscribe('nonexistent')).not.toThrow();
  });

  it('can be re-subscribed after unsubscribing', () => {
    const observer = createObserver<number>();
    const fn = jest.fn();

    observer.subscribe('key', fn);
    observer.unsubscribe('key');
    observer.subscribe('key', fn);
    observer.dispatch(7);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(7);
  });
});
