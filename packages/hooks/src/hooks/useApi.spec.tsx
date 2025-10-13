import { act, renderHook } from '@testing-library/react';

import { useApi } from './useApi';

describe('Hook: useApi', () => {
  it('Data fetched successfully', async () => {
    const mockRequestData = [
      {
        userId: 1,
        userName: 'Andrew',
        balance: 0,
      },
      {
        userId: 2,
        userName: 'Petro',
        balance: 100,
      },
    ];
    const { result } = renderHook(() =>
      useApi(
        jest.fn(() => Promise.resolve(mockRequestData)),
        [],
      ),
    );

    await act(async () => {
      await result.current.query();
    });

    expect(result.current.data).toBe(mockRequestData);
    expect(result.current.error).toBe(null);
  });

  it('Data fetched with error', async () => {
    const mockError = new Error('Fetch Error');
    const mockRequest = () => {
      throw mockError;
    };
    const { result } = renderHook(() => useApi(mockRequest, []));

    await act(() => {
      result.current.query();
    });

    expect(result.current.error).toEqual(mockError);
  });
});
