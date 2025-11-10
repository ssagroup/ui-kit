import { Children, isValidElement, useState } from 'react';

import { NestedTableRowProvider } from './NestedTableRowContext';

export const WithNestedTableRow = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const childRowsCount =
    Children.map(children, (child) => {
      return isValidElement(child) ? true : null;
    })?.filter(Boolean).length || 0;

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
