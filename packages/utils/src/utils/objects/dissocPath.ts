/**
 * Returns a copy of an object with the key at a nested path removed.
 *
 * **Curried, and only curried**: `dissocPath(keys)(obj)`. The path is an array
 * of keys. The input is never mutated.
 *
 * ### Missing intermediate keys throw
 * Only the final key is optional. If a key *along the way* is absent the walk
 * dereferences `undefined` and raises a `TypeError`, so guard paths that may
 * not exist. Removing an already-absent leaf is a harmless no-op.
 *
 * ### It deep-clones through JSON, which is lossy
 * Same caveat as `assocPath`: `Date` becomes a string, `Map`/`Set`/class
 * instances become `{}`, `undefined` values are dropped, and `NaN`/`Infinity`
 * become `null`. Use it on plain JSON-shaped state.
 *
 * @example
 * dissocPath(['user', 'token'])({ user: { id: 1, token: 'x' } });
 * // { user: { id: 1 } }
 *
 * @example
 * dissocPath(['missing'])({ x: 1 }); // { x: 1 } — no-op
 * dissocPath(['a', 'b'])({ x: 1 }); // TypeError: `a` does not exist
 */
export const dissocPath =
  <T>(path: string[]) =>
  (sourceObject: T): T => {
    const resultObject = JSON.parse(JSON.stringify(sourceObject));
    path.reduce((acc, key, index) => {
      if (index === path.length - 1) {
        delete acc[key];
      }
      return acc[key];
    }, resultObject);

    return resultObject;
  };
