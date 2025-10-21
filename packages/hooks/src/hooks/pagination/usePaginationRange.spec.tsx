import { renderHook } from '@testing-library/react';

import { usePaginationRange } from './usePaginationRange';

describe('usePaginationRange', () => {
  it('Returns the range', () => {
    const { result, rerender } = renderHook(usePaginationRange, {
      initialProps: {
        pagesCount: 10,
        selectedPage: 5,
      },
    });

    expect(result.current).toEqual([1, -1, 4, 5, 6, -1, 10]);

    rerender({ pagesCount: 10, selectedPage: 6 });
    expect(result.current).toEqual([1, -1, 5, 6, 7, -1, 10]);
  });

  it('Returns the range when a page is not selected', () => {
    const { result } = renderHook(usePaginationRange, {
      initialProps: {
        pagesCount: 10,
      },
    });

    expect(result.current).toEqual([1, 2, 3, -1, 10]);
  });
});
