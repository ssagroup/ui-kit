/** A JSON-representable leaf value. Note `undefined` is not one — see `PathObject`. */
export type PathValue = string | number | boolean | null;

/**
 * An arbitrarily nested, JSON-shaped object.
 *
 * Deliberately excludes `Date`, `Map`, `Set` and `undefined`, because the
 * helpers typed with it round-trip through JSON and would corrupt those.
 */
export interface PathObject {
  [key: string | number]: PathValue | PathObject;
}

/**
 * `true` when the string union `T` covers every member of `U`.
 *
 * A type-level check, not a runtime one — used to make the compiler prove a
 * list is exhaustive. See `MustInclude`.
 */
export type Has<T extends string, U extends string> =
  Exclude<U, T> extends never ? true : false;

/**
 * Resolves to `T` when the array type `T` contains every member of `I`, and to
 * `never` when it does not — so an incomplete list has no assignable value.
 *
 * ### It only bites on a concrete tuple type
 * The check reads `T[number]`, which means `T` has to be a literal tuple for
 * there to be anything to check. Applied to a **generic parameter that must be
 * inferred from the value**, TypeScript cannot infer through the conditional,
 * so the parameter falls back to its constraint — usually `string[]` — and
 * `MustInclude` then accepts any array at all.
 *
 * In other words `features: MustInclude<T, 'x'>` on a `<T extends string[]>`
 * component prop does **not** enforce anything at the call site. Pass the tuple
 * type explicitly, or add `as const`, if you want the guarantee.
 *
 * @example
 * // Enforced — the tuple type is given explicitly
 * type Ok = MustInclude<['fullscreenMode', 'legend'], 'fullscreenMode'>;
 * type No = MustInclude<['legend'], 'fullscreenMode'>; // never
 *
 * @example
 * // NOT enforced — `F` is inferred, so it widens to string[] and this compiles
 * declare const Header: <F extends string[]>(
 *   props: { features: MustInclude<F, 'fullscreenMode'> },
 * ) => null;
 * Header({ features: ['legend'] });
 */
export type MustInclude<T extends readonly string[], I extends string> =
  Has<T[number], I> extends true ? T : never;
