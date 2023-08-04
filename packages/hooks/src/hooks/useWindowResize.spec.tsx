import { renderHook, act, fireEvent } from '@testing-library/react';
import { useWindowSize } from './useWindowResize';

describe('Hook: useWindowResize', () => {
  it('useWindowResize Hook works correctly', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerHeight = 550;
      window.innerWidth = 350;
    });

    fireEvent(window, new Event('resize'));

    expect(result.current).toEqual({
      width: 350,
      height: 550,
    });
  });
});
