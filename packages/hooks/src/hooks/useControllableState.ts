import { useCallback, useEffect, useRef, useState } from 'react';

import { useCallbackRef } from './useCallbackRef';

export interface UseControllableStateOptions<T> {
  /**
   * Whether the caller owns the value.
   *
   * Derive this from the *presence* of the supported prop, not from its value:
   * `'value' in props`, not `value !== undefined`. See the note on
   * {@link useControllableState} for why.
   */
  controlled: boolean;
  /** The controlled value. Only read when `controlled` is true. */
  value: T | undefined;
  /** Seeds the internal state on mount. Only read when `controlled` is false. */
  defaultValue: T | undefined;
  /** Used when neither `value` nor `defaultValue` gives one. */
  finalValue?: T;
  /** Notified whenever the value moves, in either mode. */
  onChange?: (value: T) => void;
  /**
   * The *semi-controlled* legacy path — see {@link useControllableState}.
   *
   * `active` should again be the presence of the deprecated prop, so that
   * syncing to `undefined` is a real instruction to clear rather than a signal
   * to stop listening.
   */
  semiControlled?: {
    active: boolean;
    value: T | undefined;
  };
}

/**
 * The controlled/uncontrolled dance, in one place.
 *
 * Every stateful component in the kit needs the same three things: render the
 * caller's value when it owns one, keep its own otherwise, and report every
 * move through a callback. Six components used to hand-roll that, and they
 * drifted — which is how `RadioGroup` ended up unable to clear its selection
 * when the parent reset the value (issue #656).
 *
 * ## Why `controlled` is a flag rather than `value !== undefined`
 *
 * The usual shortcut is to call a component controlled whenever its value prop
 * is not `undefined`. That makes `undefined` ambiguous: it means both "I am not
 * controlling this" and "I am controlling this, and right now nothing is
 * selected". A parent that legitimately resets to the second — a form clear, an
 * RJSF field going back to empty — silently drops the component into
 * uncontrolled mode, where it keeps rendering the stale internal value it
 * happened to be holding.
 *
 * Keying on whether the prop was *passed at all* removes the ambiguity. A call
 * site's shape does not change between renders, so neither does the mode: a
 * component is controlled for its whole lifetime or not at all, and there is no
 * transition to get wrong.
 *
 * ## The third mode
 *
 * Several of the kit's pre-#656 props (`externalState`, `selectedItem`,
 * `Modal.isOpen`) are *semi-controlled*: the parent's value is copied **into**
 * internal state whenever it changes, but the component is still free to move
 * on its own between those copies. That is not a mode worth designing for, but
 * it is the behaviour those props shipped with, so `semiControlled` preserves it
 * for the deprecation window rather than quietly tightening it.
 *
 * @example
 * ```tsx
 * const RadioGroup = (props: RadioGroupProps) => {
 *   const { value, defaultValue, externalState, onChange } = props;
 *   const [selected, setSelected] = useControllableState({
 *     controlled: 'value' in props,
 *     value,
 *     defaultValue,
 *     onChange,
 *     semiControlled: {
 *       active: 'externalState' in props,
 *       value: externalState,
 *     },
 *   });
 *   // …
 * };
 * ```
 */
export const useControllableState = <T>({
  controlled,
  value,
  defaultValue,
  finalValue,
  onChange,
  semiControlled,
}: UseControllableStateOptions<T>): [
  T | undefined,
  (next: T) => void,
  boolean,
] => {
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(
    () => {
      if (semiControlled?.active) return semiControlled.value;
      return defaultValue !== undefined ? defaultValue : finalValue;
    },
  );

  // Latched on the first render. A component that changes shape mid-life would
  // otherwise swap which value it renders, which is the bug this hook exists to
  // prevent — so the first answer is the only answer.
  const isControlled = useRef(controlled).current;
  const isSemiControlled = useRef(!!semiControlled?.active).current;

  const semiControlledValue = semiControlled?.value;

  // Unconditional, deliberately: a guard here (`if (next !== undefined)`) is
  // what stopped `RadioGroup` clearing on reset, because it made "the parent
  // set this back to empty" indistinguishable from "the parent stopped caring".
  useEffect(() => {
    if (!isSemiControlled || isControlled) return;
    setUncontrolledValue(semiControlledValue);
  }, [isSemiControlled, isControlled, semiControlledValue]);

  const current = isControlled ? value : uncontrolledValue;

  // `current` is read through the ref, so the identity below stays stable
  // without the setter ever seeing a stale value.
  const notify = useCallbackRef((next: T) => {
    if (next !== current) {
      onChange?.(next);
    }
  });

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      notify(next);
    },
    [isControlled, notify],
  );

  return [current, setValue, isControlled];
};
