/**
 * Checks whether a value is `null` or `undefined`.
 *
 * Unlike a plain falsy check, this returns `false` for other falsy
 * values such as `0`, `''`, `false` and `NaN`.
 *
 * @example
 * isNill(null); // true
 * isNill(undefined); // true
 * isNill(0); // false
 * isNill(''); // false
 */
export const isNill = (value: unknown): value is null | undefined =>
  value === null || value === undefined;
