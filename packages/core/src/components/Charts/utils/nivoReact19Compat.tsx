import React from 'react';

/**
 * React 19 compatibility wrapper for Nivo responsive components.
 *
 * @nivo/core's ResponsiveWrapper returns an object in React 19, which causes
 * type checking issues. This utility wraps any Nivo responsive component
 * with forwardRef to ensure it's recognized as a proper React component.
 *
 * @param Component - The Nivo responsive component to wrap (e.g., ResponsiveLine, ResponsivePie)
 * @param displayName - The display name for the wrapped component
 * @returns A React 19 compatible version of the component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wrapNivoResponsiveComponent<T extends React.ComponentType<any>>(
  Component: T,
  displayName: string,
): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WrappedComponent = React.forwardRef<any, React.ComponentProps<T>>(
    (props, ref) => {
      // Force React.createElement to handle the component, even if it's an object
      // This works around React 19's stricter type checking
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return React.createElement(Component as any, { ...props, ref } as any);
    },
  );

  WrappedComponent.displayName = displayName;

  // Type assertion needed for React 19 compatibility
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return WrappedComponent as any as T;
}
