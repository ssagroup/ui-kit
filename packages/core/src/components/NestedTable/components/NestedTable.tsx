import { PropsWithChildren } from 'react';
import Table from '@components/Table';
import { NestedTableProvider } from '../NestedTableContext';
import { NestedTableContextType } from '../types';

export const NestedTable = ({
  children,
  ...rest
}: PropsWithChildren & NestedTableContextType) => {
  return (
    <NestedTableProvider {...rest}>
      <Table>{children}</Table>
    </NestedTableProvider>
  );
};
