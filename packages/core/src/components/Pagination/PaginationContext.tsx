import { createContext, useCallback, useContext } from 'react';
import {
  PaginationContextProps,
  PaginationContextProviderProps,
} from './types';
import { DEFAULT_PER_PAGE_VALUE } from './constants';
import { useControllableState } from './hooks';

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
 * // Uncontrolled
 * <PaginationContextProvider selectedPage={1} defaultPerPage={25}>
 *   <Pagination pagesCount={10} />
 * </PaginationContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled - parent owns page/perPage state
 * const [page, setPage] = useState(1);
 * <PaginationContextProvider page={page} onPageChange={setPage}>
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
  page: controlledPage,
  perPage: controlledPerPage,
  onPageChange,
  onPerPageChange,
  children,
}: PaginationContextProviderProps) => {
  // `page` can be `undefined` (no page selected yet), but the public
  // `onPageChange` callback only ever needs to handle real page numbers -
  // Pagination never navigates to an undefined page.
  const handlePageChange = useCallback(
    (value?: number) => {
      if (value !== undefined) {
        onPageChange?.(value);
      }
    },
    [onPageChange],
  );

  const [page, setPage] = useControllableState<number | undefined>({
    value: controlledPage,
    defaultValue: selectedPage,
    onChange: handlePageChange,
    name: 'page',
  });
  const [perPage, setPerPage] = useControllableState<number>({
    value: controlledPerPage,
    defaultValue: defaultPerPage,
    onChange: onPerPageChange,
    name: 'perPage',
  });

  return (
    <PaginationContext.Provider value={{ page, perPage, setPage, setPerPage }}>
      {children}
    </PaginationContext.Provider>
  );
};
