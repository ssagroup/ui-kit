import React from 'react';

/**
 * React 19 compatibility helper for Higher-Order Components (HOCs).
 *
 * React 19 has stricter requirements for component identification.
 * This utility ensures HOCs properly set displayName for better debugging
 * and React DevTools integration.
 *
 * @param hocName - The name of the HOC (e.g., 'WithPagination', 'WithLayout')
 * @param Component - The component being wrapped
 * @param WrappedComponent - The wrapper component function
 * @returns The wrapper component with proper displayName set
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setHocDisplayName<T extends React.ComponentType<any>>(
  hocName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>,
  WrappedComponent: T,
): T {
  const componentName =
    typeof Component === 'function'
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Component as any).displayName ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Component as any).name ||
        'Component'
      : 'Component';

  WrappedComponent.displayName = `${hocName}(${componentName})`;

  return WrappedComponent;
}
