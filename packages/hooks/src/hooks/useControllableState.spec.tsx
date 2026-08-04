import { act, renderHook } from '@testing-library/react';

import { useControllableState } from './useControllableState';

describe('useControllableState', () => {
  it('owns its value when uncontrolled, seeded from defaultValue', () => {
    const { result } = renderHook(() =>
      useControllableState<string>({
        controlled: false,
        value: undefined,
        defaultValue: 'apple',
      }),
    );

    expect(result.current[0]).toBe('apple');

    act(() => result.current[1]('orange'));
    expect(result.current[0]).toBe('orange');
  });

  it('falls back to finalValue when there is no defaultValue', () => {
    const { result } = renderHook(() =>
      useControllableState<boolean>({
        controlled: false,
        value: undefined,
        defaultValue: undefined,
        finalValue: false,
      }),
    );

    expect(result.current[0]).toBe(false);
  });

  it('never writes state when controlled — it only reports', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useControllableState<string>({
        controlled: true,
        value: 'apple',
        defaultValue: undefined,
        onChange,
      }),
    );

    act(() => result.current[1]('orange'));

    expect(onChange).toHaveBeenCalledWith('orange');
    expect(result.current[0]).toBe('apple');
  });

  it('does not report a move to the value it already has', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useControllableState<string>({
        controlled: true,
        value: 'apple',
        defaultValue: undefined,
        onChange,
      }),
    );

    act(() => result.current[1]('apple'));

    expect(onChange).not.toHaveBeenCalled();
  });

  /**
   * The reason this hook exists. `controlled` is the *presence* of the prop,
   * so a controlled component whose value is reset to `undefined` renders
   * nothing selected rather than falling back to stale internal state.
   */
  it('renders undefined when a controlled value is reset', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string | undefined }) =>
        useControllableState<string | undefined>({
          controlled: true,
          value,
          defaultValue: undefined,
        }),
      { initialProps: { value: 'apple' as string | undefined } },
    );

    expect(result.current[0]).toBe('apple');

    rerender({ value: undefined });
    expect(result.current[0]).toBeUndefined();
  });

  it('latches the mode on the first render', () => {
    const { result, rerender } = renderHook(
      ({ controlled }: { controlled: boolean }) =>
        useControllableState<string>({
          controlled,
          value: 'apple',
          defaultValue: 'banana',
        }),
      { initialProps: { controlled: false } },
    );

    expect(result.current[0]).toBe('banana');
    expect(result.current[2]).toBe(false);

    // A call site's shape does not change between renders; if it somehow does,
    // the first answer still wins rather than swapping which value is rendered.
    rerender({ controlled: true });
    expect(result.current[0]).toBe('banana');
    expect(result.current[2]).toBe(false);
  });

  describe('the semi-controlled legacy path', () => {
    const renderSemi = (initial: string | undefined) =>
      renderHook(
        ({ legacy }: { legacy: string | undefined }) =>
          useControllableState<string | undefined>({
            controlled: false,
            value: undefined,
            defaultValue: undefined,
            semiControlled: { active: true, value: legacy },
          }),
        { initialProps: { legacy: initial } },
      );

    it('seeds from the legacy value on mount', () => {
      const { result } = renderSemi('apple');
      expect(result.current[0]).toBe('apple');
    });

    it('copies later legacy values into state', () => {
      const { result, rerender } = renderSemi('apple');

      rerender({ legacy: 'orange' });
      expect(result.current[0]).toBe('orange');
    });

    it('tracks a reset to undefined, rather than ignoring it', () => {
      const { result, rerender } = renderSemi('apple');

      // The guard that used to live here (`if (next !== undefined)`) is exactly
      // what stopped RadioGroup clearing on a form reset.
      rerender({ legacy: undefined });
      expect(result.current[0]).toBeUndefined();
    });

    it('still lets the component move on its own between syncs', () => {
      const { result } = renderSemi('apple');

      act(() => result.current[1]('orange'));
      expect(result.current[0]).toBe('orange');
    });
  });
});
