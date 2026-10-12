import { createContext, useMemo } from 'react';
import { NestedTableContextValue } from './types';

export const NestedTableContext = createContext<NestedTableContextValue>({
  collapsedIconName: 'carrot-up',
  expandedIconName: 'carrot-down',
  defaultCollapsed: false,
  opaqueCells: false,
  isResizable: false,
});

export const NestedTableProvider = ({
  children,
  collapsedIconName = 'carrot-up',
  expandedIconName = 'carrot-down',
  defaultCollapsed = false,
  opaqueCells = false,
  isResizable = false,
}: React.PropsWithChildren<NestedTableContextValue>) => {
  // Every cell reads this context, so a new object on each render of the
  // table would re-render all of them.
  const value = useMemo<NestedTableContextValue>(
    () => ({
      collapsedIconName,
      expandedIconName,
      defaultCollapsed,
      opaqueCells,
      isResizable,
    }),
    [
      collapsedIconName,
      expandedIconName,
      defaultCollapsed,
      opaqueCells,
      isResizable,
    ],
  );
  return (
    <NestedTableContext.Provider value={value}>
      {children}
    </NestedTableContext.Provider>
  );
};
