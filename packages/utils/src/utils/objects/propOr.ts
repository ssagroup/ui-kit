import { isNill } from '../isNill';
import { prop } from './prop';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Reads one own property, falling back to a default when it is missing.
 *
 * **Curried, and only curried**: `propOr(fallback, key)(obj)`. The default
 * comes first, matching Ramda's argument order — not lodash's
 * `get(obj, key, fallback)`.
 *
 * ### Only `null` and `undefined` trigger the default
 * The fallback applies when the value is nullish, **not** when it is merely
 * falsy. `0`, `''` and `false` are returned as-is, so `propOr('—', 'count')`
 * on `{ count: 0 }` gives `0`, not `'—'`. That is usually what you want for
 * numbers; if you need empty strings to fall back too, check explicitly.
 *
 * Reads a single key, not a dotted path — use `pathOr` for nested access.
 *
 * @example
 * propOr('—', 'name')({ name: 'Ada' }); // 'Ada'
 * propOr('—', 'name')({}); // '—'
 * propOr('—', 'count')({ count: 0 }); // 0, not '—'
 */
export const propOr =
  <T extends Record<string | number, any>, R = any>(
    defaultValue: any,
    propName: string,
  ) =>
  (obj: T): R => {
    const result = prop(propName)(obj);
    return isNill(result) ? defaultValue : result;
  };
/* eslint-enable @typescript-eslint/no-explicit-any */
