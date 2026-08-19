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

  /**
   * Latest render's value / onChange, mirrored into refs so the setter below
   * can read them without listing them as dependencies.
   *
   * The setter's identity MUST stay constant for the lifetime of the
   * component. Consumers routinely put it in an effect's dependency array -
   * `useEffect(() => setPage(1), [personId, setPage])` is the canonical
   * "reset to page 1 when the entity changes" pattern, and it is exactly what
   * `react-hooks/exhaustive-deps` asks for. A setter that changed identity on
   * every value change turned that effect into an infinite reset loop: the
   * page moved to 2, the setter identity changed, the effect re-fired and put
   * it straight back to 1.
   */
  const valueRef = useRef(value);
  valueRef.current = value;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback<Dispatch<SetStateAction<T>>>((next) => {
    const resolved =
      typeof next === 'function'
        ? (next as (prev: T) => T)(valueRef.current)
        : next;

    if (!isControlledRef.current) {
      // Keep the ref ahead of the re-render so several setter calls batched
      // into one event each see the value the previous call produced.
      valueRef.current = resolved;
      setUncontrolledValue(resolved);
    }

    // Deliberately outside the state updater: React 18 StrictMode
    // double-invokes updaters, which would fire `onChange` twice.
    onChangeRef.current?.(resolved);
  }, []);

  return [value, setValue];
};
