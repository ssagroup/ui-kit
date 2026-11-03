import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import { Pagination, PaginationContextProvider } from '@components/Pagination';
import DataTable from './DataTable';
import { DataTableColumnState, DataTableSort } from './types';
import {
  Employee,
  employeeColumns,
  employees,
  fetchEmployees,
} from './stories/mock';
import { ColumnStateSummary } from './stories/ColumnStateSummary';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  globals: {
    backgrounds: { value: 'main' },
  },
  parameters: {
    backgrounds: {
      options: {
        main: { name: 'Main', value: '#D0D1D6' },
      },
    },
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta<typeof DataTable>;

/**
 * Sorting is reported, not applied: the story re-fetches from a fake server
 * that sorts, and the rows dim while the request is in flight.
 */
export const Default: StoryObj = {
  render: () => {
    const [sort, setSort] = useState<DataTableSort | null>(null);
    const [rows, setRows] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      let current = true;
      setIsLoading(true);
      fetchEmployees(sort).then((result) => {
        if (!current) return;
        setRows(result);
        setIsLoading(false);
      });
      return () => {
        current = false;
      };
    }, [sort]);

    return (
      <DataTable
        data={rows}
        columns={employeeColumns}
        getRowId={(row) => row.id}
        sort={sort}
        onSortChange={setSort}
        isLoading={isLoading}
      />
    );
  },
};

/** A column with a `sortFn` sorts the rows in the browser. */
export const ClientSideSorting: StoryObj = {
  render: () => (
    <DataTable
      data={employees.slice(0, 8)}
      columns={employeeColumns.map((column) => {
        if (column.id === 'name') {
          return {
            ...column,
            sortFn: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
          };
        }
        if (column.id === 'salary') {
          return {
            ...column,
            sortFn: (a: Employee, b: Employee) => a.salary - b.salary,
          };
        }
        return { ...column, sortable: false };
      })}
      getRowId={(row) => row.id}
      defaultSort={{ columnId: 'name', direction: 'asc' }}
    />
  ),
};

/**
 * Resize by dragging a header's right edge; freeze from the header menu. The
 * whole layout is one object keyed by column id, summarised below the table,
 * which an app would store and pass back through `defaultColumnState`.
 */
export const ColumnLayout: StoryObj = {
  render: () => {
    const [columnState, setColumnState] = useState<
      Partial<DataTableColumnState>
    >({ frozen: { start: ['name'], end: [] } });

    return (
      <Wrapper
        direction="column"
        alignItems="stretch"
        css={{ gap: 16, width: 720 }}>
        <DataTable
          data={employees.slice(0, 8)}
          columns={employeeColumns.map((column) =>
            column.id === 'status'
              ? { ...column, resizable: false, width: 110 }
              : column,
          )}
          getRowId={(row) => row.id}
          resizableColumns
          columnResizeMode="expand"
          freezeControls
          columnState={columnState}
          onColumnStateChange={setColumnState}
        />
        <Wrapper css={{ gap: 8 }}>
          <Button
            size="small"
            variant="secondary"
            onClick={() => setColumnState({})}>
            Reset layout
          </Button>
        </Wrapper>
        <ColumnStateSummary
          columnState={columnState}
          columns={employeeColumns}
        />
      </Wrapper>
    );
  },
};

/** The header stays in view while the rows scroll inside `maxHeight`. */
export const StickyHeader: StoryObj = {
  render: () => (
    <DataTable
      data={employees}
      columns={employeeColumns}
      getRowId={(row) => row.id}
      stickyHeader
      maxHeight={320}
    />
  ),
};

/** Rows open on click, except clicks on controls inside them. */
export const RowClickAndFooter: StoryObj = {
  render: () => {
    const [page, setPage] = useState(1);
    const [opened, setOpened] = useState<string>('none');
    const perPage = 5;
    const rows = employees.slice((page - 1) * perPage, page * perPage);

    return (
      <Wrapper direction="column" alignItems="stretch" css={{ gap: 8 }}>
        <DataTable
          data={rows}
          columns={[
            ...employeeColumns.slice(0, 3),
            {
              id: 'actions',
              header: '',
              align: 'right',
              cell: (row) => (
                <Button
                  size="small"
                  variant="tertiary"
                  onClick={() => setOpened(`edit ${row.name}`)}>
                  Edit
                </Button>
              ),
            },
          ]}
          getRowId={(row) => row.id}
          onRowClick={(row) => setOpened(row.name)}
          footer={
            <PaginationContextProvider
              page={page}
              onPageChange={setPage}
              perPage={perPage}>
              <Pagination pagesCount={Math.ceil(employees.length / perPage)} />
            </PaginationContextProvider>
          }
        />
        <span css={{ fontSize: 12 }}>Last opened: {opened}</span>
      </Wrapper>
    );
  },
};

/** No rows: the loading state while fetching, the empty state after. */
export const LoadingAndEmpty: StoryObj = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <Wrapper direction="column" alignItems="stretch" css={{ gap: 16 }}>
        <Button
          size="small"
          variant="secondary"
          css={{ alignSelf: 'flex-start' }}
          onClick={() => setIsLoading((value) => !value)}>
          {isLoading ? 'Finish loading' : 'Start loading'}
        </Button>
        <DataTable
          data={[]}
          columns={employeeColumns}
          isLoading={isLoading}
          emptyState="No employees match these filters"
        />
      </Wrapper>
    );
  },
};
