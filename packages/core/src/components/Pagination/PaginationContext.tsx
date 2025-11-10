import { createContext, useContext, useState } from 'react';

import { DEFAULT_PER_PAGE_VALUE } from './constants';
import {
  PaginationContextProps,
  PaginationContextProviderProps,
} from './types';

export const PaginationContext = createContext<PaginationContextProps>(
  {} as PaginationContextProps,
);

export const usePaginationContext = () => useContext(PaginationContext);

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
