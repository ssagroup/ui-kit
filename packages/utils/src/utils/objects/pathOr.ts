import { path as originalPath } from './path';

export const pathOr =
  <T extends Record<string | number, unknown>, R>(
    defaultValue: R,
    path: Array<string | number>,
  ) =>
  (obj: T): R => {
    const result = originalPath<T, R>(path)(obj);
    return result === null || result === undefined
      ? defaultValue
      : (result as R);
  };
