/**
 * A deterministic stand-in for `Math.random`, for generating fixture data.
 *
 * Returns a generator function; calling it yields the next value in `[0, 1)`.
 * The same seed always produces the same sequence, which is the point — chart
 * and table stories keep identical data between renders, so visual diffs show
 * real changes rather than new noise.
 *
 * Linear congruential, so it is fine for demo data and unfit for anything
 * needing statistical quality or unpredictability.
 *
 * @example
 * const random = seededRandom(42);
 * const series = Array.from({ length: 30 }, () => Math.round(random() * 100));
 * // identical on every run
 */
export const seededRandom = (seed: number) => {
  return () => {
    // Linear congruential generator
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
};
