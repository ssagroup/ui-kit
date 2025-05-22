import { createContext } from 'react';
import { NestedTableContextType } from './types';

export const NestedTableContext = createContext<NestedTableContextType>({
  collapsedIconName: 'carrot-up',
  expandedIconName: 'carrot-down',
});

export const NestedTableProvider = ({
  children,
  collapsedIconName = 'carrot-up',
  expandedIconName = 'carrot-down',
}: React.PropsWithChildren<NestedTableContextType>) => (
  <NestedTableContext.Provider
    value={{
      collapsedIconName,
      expandedIconName,
    }}>
    {children}
  </NestedTableContext.Provider>
);
