/**
 * Returns a copy of an object with a nested value replaced.
 *
 * **Curried, and only curried**: `assocPath(keys, value)(obj)`. The path is an
 * array of keys; intermediate objects are created as needed. The input is never
 * mutated.
 *
 * ### It deep-clones through JSON, which is lossy
 * The copy is produced with `JSON.parse(JSON.stringify(...))`, so any value the
 * JSON round-trip cannot represent is altered — silently, and with no type
 * error, because the signature still claims `T`:
 *
 * - `Date` becomes an ISO **string**
 * - `Map`, `Set` and class instances become `{}` (prototypes are lost)
 * - keys whose value is `undefined` are **dropped**
 * - `NaN` and `Infinity` become `null`
 * - functions are dropped
 *
 * Safe for plain JSON-shaped state; for anything richer, spread the update by
 * hand or use a structural-sharing helper.
 *
 * @example
 * assocPath(['user', 'name'], 'Ada')({ user: { name: 'Grace', id: 1 } });
 * // { user: { name: 'Ada', id: 1 } }
 *
 * @example
 * // Lossy: `when` comes back as a string, not a Date
 * assocPath(['id'], 2)({ id: 1, when: new Date() });
 * // { id: 2, when: '2020-01-01T00:00:00.000Z' }
 */
export const assocPath =
  <T>([first, ...rest]: string[], value: unknown) =>
  (sourceObject: T): T =>
    JSON.parse(
      JSON.stringify({
        ...sourceObject,
        [first]: rest.length
          ? assocPath(rest, value)(sourceObject[first as keyof T])
          : value,
      }),
    ) as T;
