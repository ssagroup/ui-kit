/**
 * Creates a lightweight pub/sub observer.
 *
 * Subscribers are stored in a Map keyed by a caller-provided string identifier,
 * so a single mount point can subscribe once and cleanly unsubscribe by key
 * without affecting other subscribers.
 *
 * @example
 * ```ts
 * const myObserver = createObserver<{ message: string }>();
 *
 * myObserver.subscribe('my-component', (data) => console.log(data.message));
 * myObserver.dispatch({ message: 'Hello' });
 * myObserver.unsubscribe('my-component');
 * ```
 */
export function createObserver<T>() {
  const subscribers = new Map<string, (data: T) => void>();

  const subscribe = (key: string, fn: (data: T) => void): void => {
    subscribers.set(key, fn);
  };

  const unsubscribe = (key: string): void => {
    subscribers.delete(key);
  };

  const dispatch = (data: T): void => {
    subscribers.forEach((fn) => fn(data));
  };

  return { subscribe, unsubscribe, dispatch };
}
