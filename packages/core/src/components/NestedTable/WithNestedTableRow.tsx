import { Children, isValidElement, useState } from 'react';
import { NestedTableRowProvider } from './NestedTableRowContext';
import { useNestedTableContext } from './hooks/useNestedTableContext';
import { WithNestedTableRowProps } from './types';

export const WithNestedTableRow = ({
  children,
  defaultCollapsed,
}: WithNestedTableRowProps) => {
  const { defaultCollapsed: tableDefaultCollapsed = false } =
    useNestedTableContext();
  const childRowsCount =
    Children.map(children, (child) => {
      return isValidElement(child) ? true : null;
    })?.filter(Boolean).length || 0;
  // A group with a single row has no toggle and cannot be expanded again,
  // so it must never start collapsed.
  const [isCollapsed, setIsCollapsed] = useState(
    childRowsCount > 1 ? (defaultCollapsed ?? tableDefaultCollapsed) : false,
  );

  return Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      const isSubHeader = index === 0;
      return (
        <NestedTableRowProvider
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isSubHeader={isSubHeader}
          childRowsCount={childRowsCount}>
          {child}
        </NestedTableRowProvider>
      );
    }
  });
};
