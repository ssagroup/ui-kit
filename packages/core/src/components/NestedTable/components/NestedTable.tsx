import { PropsWithChildren, TableHTMLAttributes } from 'react';

import Table from '@components/Table';
import { CommonProps } from '@global-types/emotion';

import { NestedTableProvider } from '../NestedTableContext';
import { NestedTableContextType } from '../types';

export const NestedTable = ({
  children,
  collapsedIconName,
  expandedIconName,
  ...rest
}: PropsWithChildren &
  NestedTableContextType &
  CommonProps &
  TableHTMLAttributes<HTMLTableElement>) => {
  return (
    <NestedTableProvider
      collapsedIconName={collapsedIconName}
      expandedIconName={expandedIconName}>
      <Table {...rest}>{children}</Table>
    </NestedTableProvider>
  );
};
