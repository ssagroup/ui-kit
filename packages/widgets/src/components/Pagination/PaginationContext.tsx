import { createContext, useState, useContext } from 'react';
import { IPaginationContext, IPaginationContextProviderProps } from './types';

export const PaginationContext = createContext<IPaginationContext>({
  setPage: () => {
    /* no-op */
  },
});

export const usePaginationContext = () => useContext(PaginationContext);

export const PaginationContextProvider = ({
  selectedPage,
  children,
}: IPaginationContextProviderProps) => {
  const [page, setPage] = useState(selectedPage);
  return (
    <PaginationContext.Provider value={{ page, setPage }}>
      {children}
    </PaginationContext.Provider>
  );
};
