import { createContext, useState, useContext } from 'react';
import {
  PaginationContextProps,
  PaginationContextProviderProps,
} from './types';
import { DEFAULT_PER_PAGE_VALUE } from './constants';

/**
 * Pagination context
 * Provides page state and navigation functions to child components
 */
export const PaginationContext = createContext<PaginationContextProps>(
  {} as PaginationContextProps,
);

/**
 * Hook to access pagination context
 * Must be used within PaginationContextProvider
 *
 * @returns Pagination context value with page state and navigation functions
 * @throws Error if used outside PaginationContextProvider
 */
export const usePaginationContext = () => useContext(PaginationContext);

/**
 * PaginationContextProvider - Context provider for pagination state
 *
 * Provides pagination state (current page, items per page) and navigation
 * functions to child components. Required wrapper for Pagination component.
 *
 * @category Components
 * @subcategory Navigation
 *
 * @example
 * ```tsx
 * <PaginationContextProvider selectedPage={1} defaultPerPage={25}>
 *   <Pagination pagesCount={10} />
 * </PaginationContextProvider>
 * ```
 *
 * @see {@link Pagination} - Child component that uses this context
 * @see {@link usePaginationContext} - Hook to access context values
 */
export const PaginationContextProvider = ({
  selectedPage,
  defaultPerPage = DEFAULT_PER_PAGE_VALUE,
  children,
}: PaginationContextProviderProps) => {
  const [perPage, setPerPage] = useState<number>(defaultPerPage);
  const [page, setPage] = useState(selectedPage);
  return (
    <PaginationContext.Provider value={{ page, perPage, setPage, setPerPage }}>
      {children}
    </PaginationContext.Provider>
  );
};
