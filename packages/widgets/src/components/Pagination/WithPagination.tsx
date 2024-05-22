import { PaginationContextProvider } from '.';

export const WithPagination = <T extends object>(
  Component: React.ComponentType<T>,
) => {
  const decoratedComp = (props: T) => (
    <PaginationContextProvider selectedPage={1}>
      <Component {...props} />
    </PaginationContextProvider>
  );

  decoratedComp.displayName = `WithPagination(${Component.displayName})`;
  return decoratedComp;
};
