import { useEffect, useState } from 'react';
import {
  Wrapper,
  Icon,
  TableRow,
  TableHead,
  TableCellHeader,
} from '@ssa-ui-kit/core';
import { useTranslation } from '@contexts';
import { useTable } from '@fintech/contexts';
import { HeaderProps, SortInfo } from '../types';

export const Header = ({
  columns,
  columnsApiNames,
  handleSortingChange,
}: HeaderProps) => {
  const { t } = useTranslation();
  const columnsTranslated = columns.map((name) => t(name));
  const { sortColumn, sortOrder, defaultSort } = useTable();
  const [sortInfo, setSortInfo] = useState(defaultSort);
  useEffect(() => {
    setSortInfo({
      column: sortColumn ? sortColumn : defaultSort.column,
      order: sortOrder ? sortOrder : defaultSort.order,
    });
  }, [sortColumn, sortOrder]);
  const handleSorting = (name: string) => () => {
    if (name) {
      const newSortInfo: SortInfo<string> = {
        column: name,
        order:
          sortInfo.column === name
            ? sortInfo.order === 'asc'
              ? 'desc'
              : 'asc'
            : 'asc',
      };

      setSortInfo(newSortInfo);
      handleSortingChange?.(newSortInfo);
    }
  };
  return (
    <TableHead data-testid="table-header">
      <TableRow>
        {columnsTranslated.map((columnName, index) => (
          <TableCellHeader
            key={`column-${columnName.toLowerCase()}`}
            onClick={
              columnName === ''
                ? undefined
                : handleSorting(columnsApiNames[index])
            }
            css={{
              cursor: columnsApiNames[index] ? 'pointer' : 'default',
              textWrap: 'nowrap',
              '&:nth-of-type(2)': {
                width: 140,
              },
              '&:last-child': {
                cursor: 'default',
                width: 134,
              },
            }}>
            <Wrapper
              css={{
                gap: 6,
              }}>
              {columnName}
              {sortInfo.column === columnsApiNames[index] && (
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
  );
};
