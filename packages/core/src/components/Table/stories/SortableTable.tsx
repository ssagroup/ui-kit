import { useState } from 'react';

import Icon from '@components/Icon';
import Table from '@components/Table';
import TableBody from '@components/TableBody';
import TableCell from '@components/TableCell';
import TableCellHeader from '@components/TableCellHeader';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import Wrapper from '@components/Wrapper';

import { DEFAULT_SORT } from './consts';
import { dataForTableSorting, headers, RowKeys } from './mock';
import { SortInfo } from './types';
import { capitalizeFirstLetter } from './utils';

export const SortableTable = ({
  onSortingChange,
}: {
  onSortingChange?: (sortInfo: SortInfo) => void;
}) => {
  const [sortInfo, setSortInfo] = useState<SortInfo>(DEFAULT_SORT);

  const handleSorting = (name: RowKeys) => () => {
    const newOrder =
      sortInfo.column === name
        ? sortInfo.order === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';

    const newSortInfo: SortInfo = {
      column: name,
      order: newOrder,
    };

    setSortInfo(newSortInfo);
    onSortingChange?.(newSortInfo);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((name) => (
            <TableCellHeader
              key={name}
              css={{
                gap: 6,
                cursor: 'pointer',
              }}
              onClick={handleSorting(name)}>
              <Wrapper
                css={{
                  gap: 6,
                }}>
                {capitalizeFirstLetter(name)}
                {sortInfo.column === name && (
                  <Icon
                    name={sortInfo.order === 'asc' ? 'arrow-up' : 'arrow-down'}
                    size={10}
                    data-testid="sort-icon"
                  />
                )}
              </Wrapper>
            </TableCellHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataForTableSorting.map((info) => (
          <TableRow key={`row-${info.value}`}>
            <TableCell>{info.title}</TableCell>
            <TableCell>{info.value}</TableCell>
            <TableCell>{info.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
