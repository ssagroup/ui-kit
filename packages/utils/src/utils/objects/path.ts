/**
 * Reads a nested value by key path.
 *
 * **Curried, and only curried**: `path(keys)(obj)`. The path is an **array** of
 * keys, not a dotted string — `path(['user', 'name'])`, never
 * `path('user.name')`. Numeric keys index into arrays.
 *
 * Every step is optional-chained, so a missing key anywhere along the way
 * yields `undefined` instead of throwing. The return type defaults to `unknown`,
 * so annotate it when you need a narrower type.
 *
 * @example
 * path(['user', 'name'])({ user: { name: 'Ada' } }); // 'Ada'
 * path(['user', 'name'])({}); // undefined
 *
 * @example
 * // Numeric keys walk into arrays
 * path<Response, string>(['items', 0, 'label'])(response);
 */
export const path =
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  <T extends Record<string | number, any>, R = unknown>(
      path: Array<string | number>,
    ) =>
    (obj: T): R =>
      path.reduce(
        (prev, curr: string | number) => prev?.[curr],
        obj,
      ) as unknown as R;
