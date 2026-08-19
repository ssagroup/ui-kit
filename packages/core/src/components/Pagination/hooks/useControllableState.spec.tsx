import { useState } from 'react';
import { act, renderHook } from '@testing-library/react';

import { useControllableState } from './useControllableState';

/**
 * The setter's *identity* is part of this hook's contract, not an
 * implementation detail.
 *
 * Consumers hand the setter straight to an effect's dependency array —
 * `useEffect(() => setPage(1), [personId, setPage])`, which is exactly the
 * shape `react-hooks/exhaustive-deps` asks for. When the setter's identity
 * changed on every value change, that effect re-fired after each page change
 * and reset the page, so paginated views could never leave page 1.
 */
describe('useControllableState => setter identity', () => {
  it('Keeps the same setter across value changes in uncontrolled mode', () => {
    const { result } = renderHook(() =>
      useControllableState<number>({ defaultValue: 1 }),
    );

    const initialSetter = result.current[1];

    act(() => result.current[1](2));
    expect(result.current[0]).toBe(2);
    expect(result.current[1]).toBe(initialSetter);

    act(() => result.current[1]((page) => page + 1));
    expect(result.current[0]).toBe(3);
    expect(result.current[1]).toBe(initialSetter);
  });

  it('Keeps the same setter across value changes in controlled mode', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) =>
        useControllableState<number>({ value, defaultValue: 1 }),
      { initialProps: { value: 1 } },
    );

    const initialSetter = result.current[1];

    rerender({ value: 2 });
    expect(result.current[0]).toBe(2);
    expect(result.current[1]).toBe(initialSetter);
  });

  it('Keeps the same setter when `onChange` is a new function each render', () => {
    const { result, rerender } = renderHook(() =>
      useControllableState<number>({
        defaultValue: 1,
        onChange: () => {
          /* fresh identity on every render */
        },
      }),
    );

    const initialSetter = result.current[1];

    rerender();
    act(() => result.current[1](2));

    expect(result.current[1]).toBe(initialSetter);
  });
});

describe('useControllableState => value resolution', () => {
  it('Calls the latest `onChange` exactly once per set', () => {
    const onChange = jest.fn();
    const { result } = renderHook(
      ({ handler }: { handler: (value: number) => void }) =>
        useControllableState<number>({ defaultValue: 1, onChange: handler }),
      { initialProps: { handler: onChange } },
    );

    act(() => result.current[1](2));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('Leaves internal state untouched in controlled mode', () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) =>
        useControllableState<number>({ value, defaultValue: 1, onChange }),
      { initialProps: { value: 1 } },
    );

    act(() => result.current[1](2));

    // The parent has not moved its value yet, so neither does the hook.
    expect(result.current[0]).toBe(1);
    expect(onChange).toHaveBeenCalledWith(2);

    rerender({ value: 2 });
    expect(result.current[0]).toBe(2);
  });

  it('Resolves a functional update against the controlled value', () => {
    const onChange = jest.fn();
    renderHook(() => {
      const [, setValue] = useControllableState<number>({
        value: 5,
        defaultValue: 1,
        onChange,
      });
      const [fired, setFired] = useState(false);
      if (!fired) {
        setFired(true);
        setValue((current) => current + 1);
      }
      return null;
    });

    expect(onChange).toHaveBeenLastCalledWith(6);
  });

  it('Resolves consecutive functional updates batched into one event', () => {
    const { result } = renderHook(() =>
      useControllableState<number>({ defaultValue: 1 }),
    );

    act(() => {
      result.current[1]((page) => page + 1);
      result.current[1]((page) => page + 1);
    });

    expect(result.current[0]).toBe(3);
  });
});
