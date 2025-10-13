import { createContext, useEffect, useState } from 'react';

import { NestedTableRowContextType } from './types';

export const NestedTableRowContext = createContext<NestedTableRowContextType>({
  childRowsCount: 0,
  isCollapsed: false,
  isSubHeader: false,
  setIsCollapsed: () => {
    // no-op
  },
});

export const NestedTableRowProvider = ({
  children,
  isCollapsed,
  isSubHeader: isSubHeaderInput,
  childRowsCount: childRowsCountInput,
  setIsCollapsed,
}: React.PropsWithChildren<NestedTableRowContextType>) => {
  const [isSubHeader, setIsSubHeader] = useState(isSubHeaderInput);
  const [childRowsCount, setChildRowsCount] = useState(childRowsCountInput);

  useEffect(() => {
    setIsSubHeader(isSubHeaderInput);
  }, [isSubHeaderInput]);

  useEffect(() => {
    setChildRowsCount(childRowsCountInput);
  }, [childRowsCountInput]);

  return (
    <NestedTableRowContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        isSubHeader,
        childRowsCount,
      }}>
      {children}
    </NestedTableRowContext.Provider>
  );
};
