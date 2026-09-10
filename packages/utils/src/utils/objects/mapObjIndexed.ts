type MapObjIndexedFn<T, U> = (
  value: T,
  key: string,
  obj: Record<string, T>,
) => U;

/**
 * Maps over an object's values, keeping its keys.
 *
 * ### Not curried, unlike the accessors in this package
 * `prop`, `path`, `propOr` and `assocPath` all take their arguments one group
 * at a time; this one takes both at once — `mapObjIndexed(fn, obj)`. Ramda's
 * version is curried, so a habit carried over from there will not compile here.
 *
 * The callback receives `(value, key, obj)`, mirroring `Array.prototype.map`.
 * Only own enumerable keys are visited, and a new object is returned.
 *
 * @example
 * mapObjIndexed((value) => value * 2, { a: 1, b: 2 }); // { a: 2, b: 4 }
 *
 * @example
 * // The key is available as the second argument
 * mapObjIndexed((value, key) => `${key}=${value}`, { page: 2, size: 20 });
 * // { page: 'page=2', size: 'size=20' }
 */
export const mapObjIndexed = <T, U>(
  fn: MapObjIndexedFn<T, U>,
  obj: Record<string, T>,
): Record<string, U> => {
  return Object.keys(obj).reduce((result: Record<string, U>, key: string) => {
    result[key] = fn(obj[key], key, obj);
    return result;
  }, {});
};
