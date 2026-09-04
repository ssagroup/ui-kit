import { createContext } from 'react';
import { NestedTableContextType } from './types';

export const NestedTableContext = createContext<NestedTableContextType>({
  collapsedIconName: 'carrot-up',
  expandedIconName: 'carrot-down',
  defaultCollapsed: false,
});

export const NestedTableProvider = ({
  children,
  collapsedIconName = 'carrot-up',
  expandedIconName = 'carrot-down',
  defaultCollapsed = false,
}: React.PropsWithChildren<NestedTableContextType>) => (
  <NestedTableContext.Provider
    value={{
      collapsedIconName,
      expandedIconName,
      defaultCollapsed,
    }}>
    {children}
  </NestedTableContext.Provider>
);
