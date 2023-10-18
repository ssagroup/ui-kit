import { path as originalPath } from './path';

export const pathOr =
  <T extends Record<string | number, any>, R>(
    defaultValue: any,
    path: string[],
  ) =>
  (obj: T): R => {
    const result = originalPath(path)(obj);
    return result === null || result === undefined ? defaultValue : result;
  };
