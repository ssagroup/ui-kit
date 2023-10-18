import { prop } from './prop';

export const propOr =
  <T extends Record<string | number, any>, R = any>(
    defaultValue: any,
    propName: string,
  ) =>
  (obj: T): R => {
    const result = prop(propName)(obj);
    return result === null || result === undefined ? defaultValue : result;
  };
