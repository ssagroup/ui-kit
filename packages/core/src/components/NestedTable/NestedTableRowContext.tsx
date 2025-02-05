import { createContext, useEffect, useState } from 'react';
import { NestedTableRowContextType } from './types';

export const NestedTableRowContext = createContext<NestedTableRowContextType>({
  childRowsCount: 0,
  isCollapsed: false,
  isSubHeader: false,
});

export const NestedTableRowProvider = ({
  children,
  isCollapsed: isCollapsedInput,
  isSubHeader: isSubHeaderInput,
  childRowsCount: childRowsCountInput,
}: React.PropsWithChildren<NestedTableRowContextType>) => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedInput);
  const [isSubHeader, setIsSubHeader] = useState(isSubHeaderInput);
  const [childRowsCount, setChildRowsCount] = useState(childRowsCountInput);

  useEffect(() => {
    setIsCollapsed(isCollapsedInput);
  }, [isCollapsedInput]);

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
        isSubHeader,
        childRowsCount,
      }}>
      {children}
    </NestedTableRowContext.Provider>
  );
};
