import { ReactNode, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@components/Button';
import { ButtonGroup } from '@components/ButtonGroup';
import Wrapper from '@components/Wrapper';
import { Pagination, PaginationContextProvider } from '@components/Pagination';
import DataTable from './DataTable';
import { DataTableColumnPicker } from './DataTableColumnPicker';
import { ColumnResizeMode } from '@components/Table/types';
import { DataTableColumnState, DataTableSort } from './types';
import {
  departmentTree,
  Employee,
  employeeColumns,
  employees,
  fetchEmployees,
  orgColumns,
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

/** A titled block in a story that shows more than one table. */
const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <Wrapper direction="column" alignItems="stretch" css={{ gap: 8 }}>
    <h4 css={{ margin: 0 }}>{title}</h4>
    {children}
  </Wrapper>
);

/**
 * Server-side sorting, the default: sorting is reported, not applied. The
 * first table re-fetches from a fake server that sorts, and the rows dim
 * while the request is in flight. In the second, columns with a `sortFn`
 * sort the rows in the browser.
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
      <Wrapper direction="column" alignItems="stretch" css={{ gap: 32 }}>
        <Section title="Server-side sorting">
          <DataTable
            data={rows}
            columns={employeeColumns}
            sort={sort}
            onSortChange={setSort}
            isLoading={isLoading}
          />
        </Section>
        <Section title="Client-side sorting">
          <DataTable
            data={employees.slice(0, 8)}
            columns={employeeColumns.map((column) => {
              if (column.id === 'name') {
                return {
                  ...column,
                  sortFn: (a: Employee, b: Employee) =>
                    a.name.localeCompare(b.name),
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
            defaultSort={{ columnId: 'name', direction: 'asc' }}
          />
        </Section>
      </Wrapper>
    );
  },
};

/** Columns for the column features story; see its description. */
const featureColumns = employeeColumns.map((column) => {
  switch (column.id) {
    case 'name':
      return { ...column, minWidth: 200, hideable: false };
    case 'salary':
      return { ...column, maxWidth: 220 };
    case 'status':
      return { ...column, reorderable: false };
    default:
      return column;
  }
});

const initialLayout: Partial<DataTableColumnState> = {
  frozen: { start: ['name'], end: [] },
  hidden: ['email'],
};

/**
 * Every column feature on one table, sharing one column state, summarised
 * below it, which an app would store and pass back through
 * `defaultColumnState`.
 *
 * - Resize by dragging a header's right edge. In `fit` mode the table keeps
 *   its width and the columns to the right share the change; in `expand` it
 *   grows and scrolls. Name stops shrinking at 200px and Salary stops growing
 *   at 220px, their own `minWidth` and `maxWidth`.
 * - Freeze, move and hide from the header menu. Drag a header's grip to
 *   move it. Name is frozen, so it only moves among frozen columns; Status
 *   cannot move, and the others move past it.
 * - Bring hidden columns back with the Columns picker. Name cannot be hidden.
 */
export const ColumnFeatures: StoryObj = {
  render: () => {
    const [mode, setMode] = useState<ColumnResizeMode>('fit');
    const [columnState, setColumnState] =
      useState<Partial<DataTableColumnState>>(initialLayout);

    return (
      <Wrapper direction="column" alignItems="stretch" css={{ gap: 16 }}>
        <Wrapper css={{ justifyContent: 'space-between', gap: 8 }}>
          <Wrapper css={{ gap: 8, width: 'auto', fontSize: 12 }}>
            <span>Resize mode</span>
            <div>
              <ButtonGroup
                items={[
                  { id: 'fit', text: 'Fit' },
                  { id: 'expand', text: 'Expand' },
                ]}
                value={mode}
                onClick={({ id }) => {
                  setMode(id as ColumnResizeMode);
                  // Widths from one mode make no sense in the other.
                  setColumnState((current) => ({ ...current, widths: {} }));
                }}
              />
            </div>
          </Wrapper>
          <Wrapper css={{ gap: 8, width: 'auto' }}>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setColumnState(initialLayout)}>
              Reset layout
            </Button>
            <DataTableColumnPicker
              columns={featureColumns}
              columnState={columnState}
              onColumnStateChange={setColumnState}
            />
          </Wrapper>
        </Wrapper>
        <DataTable
          // Remount on a mode change, so the table re-measures its columns.
          key={mode}
          data={employees.slice(0, 8)}
          columns={featureColumns}
          resizableColumns
          columnResizeMode={mode}
          freezeControls
          reorderableColumns
          hideableColumns
          columnState={columnState}
          onColumnStateChange={setColumnState}
        />
        <ColumnStateSummary
          columnState={columnState}
          columns={featureColumns}
        />
      </Wrapper>
    );
  },
};

/**
 * Multiple selection: tick rows across pages. The selection is a list of row
 * ids, so it survives a page change. The header checkbox selects or clears
 * the rows shown, and employees on leave cannot be selected. Single
 * selection puts a radio in each row instead.
 */
export const Selection: StoryObj = {
  render: () => {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<string[]>([]);
    const [single, setSingle] = useState<string[]>([]);
    const perPage = 5;
    const rows = employees.slice((page - 1) * perPage, page * perPage);

    return (
      <Wrapper direction="column" alignItems="stretch" css={{ gap: 32 }}>
        <Section title="Multiple">
          <DataTable
            data={rows}
            columns={employeeColumns}
            selectionMode="multiple"
            selectedRowIds={selected}
            onSelectionChange={setSelected}
            isRowSelectable={(row) => row.status !== 'On leave'}
            getRowLabel={(row) => `Select ${row.name}`}
            footer={
              <PaginationContextProvider
                page={page}
                onPageChange={setPage}
                perPage={perPage}>
                <Pagination
                  pagesCount={Math.ceil(employees.length / perPage)}
                />
              </PaginationContextProvider>
            }
          />
          <Wrapper css={{ gap: 8, fontSize: 12 }}>
            <span>{selected.length} selected</span>
            {selected.length > 0 && (
              <Button
                size="small"
                variant="tertiary"
                onClick={() => setSelected([])}>
                Clear
              </Button>
            )}
          </Wrapper>
        </Section>
        <Section title="Single">
          <DataTable
            data={employees.slice(0, 5)}
            columns={employeeColumns.slice(0, 4)}
            selectionMode="single"
            selectedRowIds={single}
            onSelectionChange={setSingle}
            getRowLabel={(row) => `Select ${row.name}`}
          />
          <span css={{ fontSize: 12 }}>
            Selected:{' '}
            {employees.find(({ id }) => id === single[0])?.name ?? 'none'}
          </span>
        </Section>
      </Wrapper>
    );
  },
};

/**
 * Departments with their people under them, from `getSubRows`. Selecting a
 * department selects its people; a department with some of them selected
 * shows a partial check. Sorting sorts people within their department.
 *
 * The second table adds the column features: resize, freeze, reorder and
 * hide. Name is frozen, and the expand column stays frozen with it.
 */
export const NestedRows: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>([departmentTree[0].id]);
    const people = selected.filter((id) => !id.startsWith('dept-'));
    const [columnState, setColumnState] = useState<
      Partial<DataTableColumnState>
    >({ frozen: { start: ['name'], end: [] } });
    const layoutColumns = orgColumns.map((column) =>
      column.id === 'name' ? { ...column, hideable: false } : column,
    );

    return (
      <Wrapper direction="column" alignItems="stretch" css={{ gap: 8 }}>
        <h4 css={{ margin: 0 }}>Selection and expanding</h4>
        <DataTable
          data={departmentTree}
          columns={orgColumns}
          getSubRows={(row) => row.members}
          expandedRowIds={expanded}
          onExpandedChange={setExpanded}
          selectionMode="multiple"
          selectedRowIds={selected}
          onSelectionChange={setSelected}
          getRowLabel={(row) => `Select ${row.name}`}
          defaultSort={{ columnId: 'name', direction: 'asc' }}
        />
        <Wrapper css={{ gap: 8, fontSize: 12 }}>
          <span>{people.length} people selected</span>
          <Button
            size="small"
            variant="tertiary"
            onClick={() => setExpanded(departmentTree.map(({ id }) => id))}>
            Expand all
          </Button>
          <Button
            size="small"
            variant="tertiary"
            onClick={() => setExpanded([])}>
            Collapse all
          </Button>
        </Wrapper>
        <Wrapper
          css={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 24,
          }}>
          <h4 css={{ margin: 0 }}>Column layout</h4>
          <DataTableColumnPicker
            columns={layoutColumns}
            columnState={columnState}
            onColumnStateChange={setColumnState}
          />
        </Wrapper>
        <DataTable
          data={departmentTree}
          columns={layoutColumns}
          getSubRows={(row) => row.members}
          defaultExpanded
          resizableColumns
          freezeControls
          reorderableColumns
          hideableColumns
          columnState={columnState}
          onColumnStateChange={setColumnState}
        />
        <ColumnStateSummary columnState={columnState} columns={layoutColumns} />
      </Wrapper>
    );
  },
};

/**
 * The header stays in view while the rows scroll inside `maxHeight`. Rows
 * open on click, except clicks on controls inside them, such as Edit. The
 * pagination sits in the `footer`.
 */
export const StickyHeaderRowClickAndFooter: StoryObj = {
  name: 'Sticky header, row click and footer',
  render: () => {
    const [page, setPage] = useState(1);
    const [opened, setOpened] = useState<string>('none');
    const perPage = 10;
    const rows = employees.slice((page - 1) * perPage, page * perPage);

    return (
      <Wrapper direction="column" alignItems="stretch" css={{ gap: 8 }}>
        <DataTable
          data={rows}
          columns={[
            ...employeeColumns,
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
          stickyHeader
          maxHeight={320}
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
