/**
 * Signature of `generateRange`.
 *
 * The returned array mixes page numbers with `-1` sentinels marking collapsed
 * stretches, so it is not a plain list of pages.
 */
export type GenerateRangeFn = (
  pagesCount: number,
  selectedPage?: number,
) => Array<number>;
