/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Combines several handlers into one that calls each with the same arguments.
 *
 * Nullish entries are skipped, so an optional prop can be passed straight
 * through without a guard — the usual case is merging a component's own handler
 * with one a consumer supplied.
 *
 * Handlers run in order and their return values are discarded. Because they all
 * receive the same event object, one calling `stopPropagation` affects the
 * others' view of it, but it does not stop later handlers from running.
 *
 * @example
 * // `props.onClick` may be undefined — callAll skips it
 * <button onClick={callAll(closeMenu, props.onClick)}>Close</button>
 */
export const callAll =
  (...fns: any[]) =>
  (...args: any) =>
    fns.forEach((fn) => fn?.(...args));
/* eslint-enable @typescript-eslint/no-explicit-any */
