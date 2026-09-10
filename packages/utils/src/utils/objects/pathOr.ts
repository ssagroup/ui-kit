import { isNill } from '../isNill';
import { path as originalPath } from './path';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Reads a nested value by key path, falling back to a default when missing.
 *
 * **Curried, and only curried**: `pathOr(fallback, keys)(obj)`. Default first,
 * then an **array** of keys — not a dotted string, and not lodash's
 * `get(obj, path, fallback)` order.
 *
 * ### Only `null` and `undefined` trigger the default
 * As with `propOr`, the fallback applies to nullish values only. A nested `0`
 * or `''` is returned unchanged. Because every step is optional-chained, a
 * break anywhere along the path resolves to the default rather than throwing.
 *
 * @example
 * pathOr('—', ['user', 'name'])({ user: { name: 'Ada' } }); // 'Ada'
 * pathOr('—', ['user', 'name'])({}); // '—'
 * pathOr('—', ['stats', 'total'])({ stats: { total: 0 } }); // 0, not '—'
 */
export const pathOr =
  <T extends Record<string | number, any>, R>(
    defaultValue: any,
    path: Array<string | number>,
  ) =>
  (obj: T): R => {
    const result = originalPath(path)(obj);
    return isNill(result) ? defaultValue : (result as R);
  };
/* eslint-enable @typescript-eslint/no-explicit-any */
