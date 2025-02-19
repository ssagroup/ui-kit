import { useState } from 'react';
import Icon from '@components/Icon';
import Wrapper from '@components/Wrapper';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import { RowKeys, headers, dataForTableSorting } from './mock';
import { capitalizeFirstLetter } from './utils';
import { SortInfo } from './types';
import { DEFAULT_SORT } from './consts';

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
            <TableCell
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
            </TableCell>
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
