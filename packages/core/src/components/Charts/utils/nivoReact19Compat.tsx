import React, { type ComponentType } from 'react';

/**
 * React 19 compatibility wrapper for Nivo responsive components.
 *
 * @nivo components can be received as module objects instead of functions due to
 * CommonJS/ESM interop issues. This wrapper detects and unwraps such objects,
 * then creates a functional component wrapper.
 *
 * The unwrapping process checks for:
 * - .default export (CommonJS/ESM default export)
 * - .ResponsiveWrapper property (Nivo's internal wrapper)
 * - Direct function component
 *
 * @param Component - The Nivo responsive component (e.g., ResponsiveLine, ResponsivePie)
 * @param displayName - Display name for debugging in React DevTools
 * @returns A React 19 compatible functional component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wrapNivoResponsiveComponent<T extends ComponentType<any>>(
  Component: T,
  displayName?: string,
): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ActualComponent: any = Component;

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[wrapNivoResponsiveComponent] ${displayName}:`, {
      type: typeof Component,
      isFunction: typeof Component === 'function',
      hasDefault:
        Component && typeof Component === 'object' && 'default' in Component,
      hasResponsiveWrapper:
        Component &&
        typeof Component === 'object' &&
        'ResponsiveWrapper' in Component,
      keys:
        Component && typeof Component === 'object'
          ? Object.keys(Component)
          : [],
    });
  }

  // Unwrap if it's a module object (CommonJS/ESM interop issue)
  if (typeof Component === 'object' && Component !== null) {
    // Try .default first (standard ES module default export)
    if (
      'default' in Component &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (Component as any).default === 'function'
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ActualComponent = (Component as any).default;
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[wrapNivoResponsiveComponent] ${displayName}: Unwrapped .default`,
        );
      }
    }
    // Try .ResponsiveWrapper (Nivo's internal structure)
    else if (
      'ResponsiveWrapper' in Component &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (Component as any).ResponsiveWrapper === 'function'
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ActualComponent = (Component as any).ResponsiveWrapper;
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[wrapNivoResponsiveComponent] ${displayName}: Unwrapped .ResponsiveWrapper`,
        );
      }
    }
    // Check if the object itself has a render property
    else if (
      'render' in Component &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (Component as any).render === 'function'
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ActualComponent = (Component as any).render;
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[wrapNivoResponsiveComponent] ${displayName}: Unwrapped .render`,
        );
      }
    }
  }

  // Validate that we have a function component
  if (typeof ActualComponent !== 'function') {
    const isTestEnv = process.env.NODE_ENV === 'test' || typeof jest !== 'undefined';
    const errorMsg = `[wrapNivoResponsiveComponent] ${displayName}: Failed to unwrap component. Received: ${typeof Component}`;

    // In test environments, silently return a mock component to avoid console noise
    // This handles cases where @nivo mocks return undefined or invalid components
    if (isTestEnv) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const MockComponent: any = () => null;
      MockComponent.displayName = `Mock_${displayName || 'NivoComponent'}`;
      return MockComponent as T;
    }

    // In development/production, log error and return error component
    console.error(errorMsg, Component);

    // Return a fallback error component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ErrorComponent: any = () => {
      return React.createElement(
        'div',
        { style: { color: 'red', padding: '20px', border: '1px solid red' } },
        `Error: Invalid ${displayName} component. Check console for details.`,
      );
    };
    ErrorComponent.displayName = `Error_${displayName}`;
    return ErrorComponent as T;
  }

  // Create a functional component wrapper
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function WrappedComponent(props: any) {
    // Now ActualComponent is guaranteed to be a function
    return <ActualComponent {...props} />;
  }

  WrappedComponent.displayName = displayName || 'WrappedNivoComponent';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return WrappedComponent as any as T;
}
