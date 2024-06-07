import { createContext, useState, useContext } from 'react';
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
  children,
}: PaginationContextProviderProps) => {
  const [page, setPage] = useState(selectedPage);
  return (
    <PaginationContext.Provider value={{ page, setPage }}>
      {children}
    </PaginationContext.Provider>
  );
};
