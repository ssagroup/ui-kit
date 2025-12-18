import React from 'react';
import { PaginationContextProvider } from '.';
import { setHocDisplayName } from '../../utils/react19HocCompat';

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
