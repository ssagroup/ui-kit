import { PaginationContextProvider } from '.';

export const WithPagination = <T extends object>(
  Component: React.ComponentType<T>,
) => {
  const decoratedComp = (props: T) => (
    <PaginationContextProvider selectedPage={1}>
      {/* TODO: HoC prop types not working with new emotion https://github.com/emotion-js/emotion/issues/3261 */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Component {...(props as any)} />
    </PaginationContextProvider>
  );

  decoratedComp.displayName = `WithPagination(${Component.displayName})`;
  return decoratedComp;
};
