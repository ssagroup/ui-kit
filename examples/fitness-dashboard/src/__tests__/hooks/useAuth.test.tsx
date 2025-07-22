import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AuthProvider, useAuth } from '../../hooks/useAuth';

// Mock the API module
jest.mock('@apis/index', () => ({
  user: {
    get: jest.fn(),
  },
}));

// Mock the useApi hook
const mockUseApi = jest.fn();
jest.mock('@ssa-ui-kit/hooks', () => ({
  useApi: mockUseApi,
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides null user initially', () => {
    mockUseApi.mockReturnValue({
      data: null,
      query: jest.fn(),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
  });

  it('provides user data when loaded', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    mockUseApi.mockReturnValue({
      data: mockUser,
      query: jest.fn(),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it('calls loadUser on mount', () => {
    const mockLoadUser = jest.fn();
    mockUseApi.mockReturnValue({
      data: null,
      query: mockLoadUser,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    renderHook(() => useAuth(), { wrapper });

    expect(mockLoadUser).toHaveBeenCalledTimes(1);
  });

  it('throws error when used outside AuthProvider', () => {
    // Temporarily suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow();

    console.error = originalError;
  });

  it('updates user data when API data changes', async () => {
    const initialUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    const updatedUser = {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
    };

    mockUseApi.mockReturnValueOnce({
      data: initialUser,
      query: jest.fn(),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result, rerender } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual(initialUser);

    // Simulate API data change
    mockUseApi.mockReturnValueOnce({
      data: updatedUser,
      query: jest.fn(),
    });

    rerender();

    await waitFor(() => {
      expect(result.current.user).toEqual(updatedUser);
    });
  });
});
