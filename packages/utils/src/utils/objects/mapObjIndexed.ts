type MapObjIndexedFn<T, U> = (
  value: T,
  key: string,
  obj: Record<string, T>,
) => U;

export const mapObjIndexed = <T, U>(
  fn: MapObjIndexedFn<T, U>,
  obj: Record<string, T>,
): Record<string, U> => {
  return Object.keys(obj).reduce((result: Record<string, U>, key: string) => {
    result[key] = fn(obj[key], key, obj);
    return result;
  }, {});
};
