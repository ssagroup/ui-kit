import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

interface UseControllableStateProps<T> {
  /**
   * Controlled value. When provided (not `undefined`), the hook always
   * reflects this value and never writes to its own internal state.
   */
  value?: T;

  /**
   * Initial value used for internal state when `value` is `undefined`
   * (uncontrolled mode).
   */
  defaultValue: T;

  /**
   * Called with the next value whenever the setter is invoked, whether
   * controlled or uncontrolled.
   */
  onChange?: (value: T) => void;

  /**
   * Name used in the dev-mode warning when a component switches between
   * controlled and uncontrolled across renders.
   */
  name?: string;
}

/**
 * useControllableState - Backs a value that can be either controlled by a
 * parent (via `value`/`onChange`) or managed internally (via `defaultValue`).
 *
 * Mirrors the standard React controlled/uncontrolled input pattern: passing
 * `value` opts into controlled mode, where the returned value always matches
 * the prop and the setter only calls `onChange` (no internal state is
 * written). Omitting `value` falls back to internal state seeded from
 * `defaultValue`.
 *
 * @internal
 */
export const useControllableState = <T>({
  value: controlledValue,
  defaultValue,
  onChange,
  name = 'value',
}: UseControllableStateProps<T>): [T, Dispatch<SetStateAction<T>>] => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const isControlledRef = useRef(isControlled);
  if (
    process.env.NODE_ENV !== 'production' &&
    isControlledRef.current !== isControlled
  ) {
    console.error(
      `A component is changing an ${
        isControlledRef.current ? 'controlled' : 'uncontrolled'
      } "${name}" to be ${
        isControlledRef.current ? 'uncontrolled' : 'controlled'
      }. This is likely caused by the value changing from a defined to ` +
        'undefined, or vice versa, across renders. Decide between using a ' +
        'controlled or uncontrolled value for the lifetime of the component.',
    );
  }
  isControlledRef.current = isControlled;

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      const resolved =
        typeof next === 'function' ? (next as (prev: T) => T)(value) : next;

      if (!isControlled) {
        setUncontrolledValue(resolved);
      }
      onChange?.(resolved);
    },
    [isControlled, onChange, value],
  );

  return [value, setValue];
};
