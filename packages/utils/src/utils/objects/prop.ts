/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Reads one own property from an object.
 *
 * **Curried, and only curried** — unlike Ramda's `prop`, this takes the key
 * first and returns a reader. `prop('name', user)` is a type error; write
 * `prop('name')(user)`. That shape is what makes it usable point-free, e.g. as
 * `items.map(prop('id'))`.
 *
 * Reads a single key, not a dotted path: `prop('a.b')` looks for a literal
 * `"a.b"` key. Use `path` for nested access. A nullish object yields
 * `undefined` rather than throwing.
 *
 * @example
 * prop('name')({ name: 'Ada' }); // 'Ada'
 * prop('name')(undefined); // undefined
 *
 * @example
 * // Point-free over a collection
 * users.map(prop<User, string>('id'));
 */
export const prop =
  <T extends Record<string | number, any>, R = any>(propName: string) =>
  (obj: T): R =>
    obj?.[propName] as R;
