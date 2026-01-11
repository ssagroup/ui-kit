import React from 'react';
import { PaginationContextProvider } from '.';
import { setHocDisplayName } from '../../utils/react19HocCompat';

/**
 * WithPagination - Higher-order component that wraps a component with PaginationContextProvider
 *
 * A higher-order component (HOC) that automatically wraps a component with
 * PaginationContextProvider, providing pagination context to all child components.
 * Useful for simplifying pagination setup when you want to provide context
 * at a component level.
 *
 * @category Components
 * @subcategory Navigation
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   return <div>Content with pagination</div>;
 * };
 *
 * export const MyPaginationComponent = WithPagination(MyComponent);
 * ```
 *
 * @example
 * ```tsx
 * // Used in page components
 * const BotsPageComponent = () => {
 *   return (
 *     <div>
 *       <BotsTable />
 *       <Pagination pagesCount={10} />
 *     </div>
 *   );
 * };
 *
 * export const BotsPage = WithPagination(BotsPageComponent);
 * ```
 *
 * @see {@link PaginationContextProvider} - Context provider used internally
 * @see {@link Pagination} - Component that uses the pagination context
 *
 * @note The HOC always initializes with selectedPage={1}
 * @note Prop types may not work correctly with emotion due to known issue
 *
 * @template T - Props type of the wrapped component
 * @param Component - Component to wrap with PaginationContextProvider
 * @returns Wrapped component with pagination context
 */
export const WithPagination = <T extends object>(
  Component: React.ComponentType<T>,
): React.ComponentType<T> => {
  function WrappedComponent(props: T) {
    return (
      <PaginationContextProvider selectedPage={1}>
        {/* TODO: HoC prop types not working with new emotion https://github.com/emotion-js/emotion/issues/3261 */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Component {...(props as any)} />
      </PaginationContextProvider>
    );
  }

  return setHocDisplayName(
    'WithPagination',
    Component,
    WrappedComponent,
  ) as React.ComponentType<T>;
};
