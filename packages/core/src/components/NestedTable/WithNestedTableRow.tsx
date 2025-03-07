import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useState,
} from 'react';
import { NestedTableRowProvider } from './NestedTableRowContext';
import { NestedTableRowChildren } from './types';

export const WithNestedTableRow = ({
  children,
}: {
  children: NestedTableRowChildren | NestedTableRowChildren[];
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const childRowsCount =
    Children.map(children, (child) => {
      return isValidElement(child) ? true : null;
    })?.filter(Boolean).length || 0;

  return Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      const isSubHeader = index === 0;
      const classNames: string[] = [];
      if (isSubHeader) {
        classNames.push('first-row');
      }
      if (isCollapsed) {
        classNames.push('collapsed');
      }
      return (
        <NestedTableRowProvider
          isCollapsed={isCollapsed}
          isSubHeader={isSubHeader}
          childRowsCount={childRowsCount}>
          {cloneElement(child as ReactElement, {
            className: classNames.length > 0 ? classNames.join(' ') : undefined,
            isCollapsed,
            childRowsCount,
            onClick:
              childRowsCount > 1
                ? () => {
                    setIsCollapsed((currentState) => !currentState);
                  }
                : undefined,
          })}
        </NestedTableRowProvider>
      );
    }
  });
};
