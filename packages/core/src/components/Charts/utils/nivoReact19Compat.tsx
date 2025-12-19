import React from 'react';

/**
 * React 19 compatibility wrapper for Nivo responsive components.
 *
 * @nivo v0.99.0 works correctly with React 19 without additional wrapping.
 * This function simply returns the component as-is to avoid type issues.
 *
 * Previously, this function attempted to wrap components with forwardRef,
 * but this caused issues in production builds where the wrapped component
 * would be passed as an object instead of a function, resulting in:
 * "React.jsx: type is invalid -- expected a string or a class/function but got: object"
 *
 * By returning the component unchanged, we let the consuming application's
 * bundler resolve the module correctly and avoid CommonJS/ESM interop issues.
 *
 * @param Component - The Nivo responsive component (e.g., ResponsiveLine, ResponsivePie)
 * @param displayName - Optional display name for debugging in React DevTools
 * @returns The original component unchanged (with displayName set if provided)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wrapNivoResponsiveComponent<T extends React.ComponentType<any>>(
  Component: T,
  displayName?: string,
): T {
  // Set displayName for better debugging if provided
  if (displayName && Component) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Component as any).displayName = displayName;
  }
  
  return Component;
}
