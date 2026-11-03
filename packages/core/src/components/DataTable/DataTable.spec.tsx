import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { screen, within } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';
import DataTable from './DataTable';
import { DataTableColumn, DataTableProps } from './types';

type Person = { id: string; name: string; age: number };

const people: Person[] = [
  { id: 'p1', name: 'Cleo', age: 31 },
  { id: 'p2', name: 'Ada', age: 45 },
  { id: 'p3', name: 'Bo', age: 28 },
];

const columns: DataTableColumn<Person>[] = [
  { id: 'name', header: 'Name', cell: (row) => row.name, sortable: true },
  {
    id: 'age',
    header: 'Age',
    cell: (row) => row.age,
    sortable: true,
    sortKey: 'Age',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: (row) => <button type="button">Edit {row.name}</button>,
  },
];

const renderTable = (props: Partial<DataTableProps<Person>> = {}) =>
  render(
    <DataTable
      data={people}
      columns={columns}
      getRowId={(row) => row.id}
      {...props}
    />,
  );

const headerTexts = () =>
  screen.getAllByRole('columnheader').map((cell) => cell.textContent);

const columnTexts = (index: number) =>
  screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[index].textContent);

describe('DataTable', () => {
  it('renders a header per column and a row per item', () => {
    renderTable();

    expect(headerTexts()).toEqual(['Name', 'Age', 'Actions']);
    expect(columnTexts(0)).toEqual(['Cleo', 'Ada', 'Bo']);
  });

  it('renders with the latest cell renderers when columns are recreated', () => {
    const { rerender } = renderTable();

    rerender(
      <DataTable
        data={people}
        columns={columns.map((column) =>
          column.id === 'name'
            ? { ...column, cell: (row: Person) => row.name.toUpperCase() }
            : column,
        )}
      />,
    );

    expect(columnTexts(0)).toEqual(['CLEO', 'ADA', 'BO']);
  });

  describe('sorting', () => {
    it('reports the sort and keeps the given order without a sortFn', async () => {
      const onSortChange = jest.fn();
      renderTable({ onSortChange });

      await userEvent.click(screen.getByRole('button', { name: 'Age' }));

      expect(onSortChange).toHaveBeenLastCalledWith(
        { columnId: 'age', direction: 'asc' },
        'Age',
      );
      expect(columnTexts(0)).toEqual(['Cleo', 'Ada', 'Bo']);
      expect(screen.getByRole('columnheader', { name: 'Age' })).toHaveAttribute(
        'aria-sort',
        'ascending',
      );
    });

    it('toggles direction on the same column and restarts on another', async () => {
      const onSortChange = jest.fn();
      renderTable({ onSortChange });

      await userEvent.click(screen.getByRole('button', { name: 'Age' }));
      await userEvent.click(screen.getByRole('button', { name: 'Age' }));
      expect(onSortChange).toHaveBeenLastCalledWith(
        { columnId: 'age', direction: 'desc' },
        'Age',
      );

      await userEvent.click(screen.getByRole('button', { name: 'Name' }));
      expect(onSortChange).toHaveBeenLastCalledWith(
        { columnId: 'name', direction: 'asc' },
        'name',
      );
    });

    it('sorts in the browser with a sortFn', async () => {
      renderTable({
        columns: columns.map((column) =>
          column.id === 'name'
            ? { ...column, sortFn: (a, b) => a.name.localeCompare(b.name) }
            : column,
        ),
      });

      await userEvent.click(screen.getByRole('button', { name: 'Name' }));
      expect(columnTexts(0)).toEqual(['Ada', 'Bo', 'Cleo']);

      await userEvent.click(screen.getByRole('button', { name: 'Name' }));
      expect(columnTexts(0)).toEqual(['Cleo', 'Bo', 'Ada']);
    });

    it('passes cells their display position, not their index in data', async () => {
      renderTable({
        columns: [
          {
            id: 'position',
            header: '#',
            cell: (_row: Person, rowIndex: number) => rowIndex + 1,
          },
          {
            ...columns[0],
            sortFn: (a: Person, b: Person) => a.name.localeCompare(b.name),
          },
        ],
      });

      await userEvent.click(screen.getByRole('button', { name: 'Name' }));

      expect(columnTexts(1)).toEqual(['Ada', 'Bo', 'Cleo']);
      expect(columnTexts(0)).toEqual(['1', '2', '3']);
    });

    it('shows a controlled sort without changing it on click', async () => {
      const onSortChange = jest.fn();
      renderTable({
        sort: { columnId: 'name', direction: 'desc' },
        onSortChange,
      });

      expect(
        screen.getByRole('columnheader', { name: 'Name' }),
      ).toHaveAttribute('aria-sort', 'descending');
      expect(screen.getByRole('columnheader', { name: 'Age' })).toHaveAttribute(
        'aria-sort',
        'none',
      );

      await userEvent.click(screen.getByRole('button', { name: 'Name' }));

      expect(onSortChange).toHaveBeenCalledWith(
        { columnId: 'name', direction: 'asc' },
        'name',
      );
      expect(
        screen.getByRole('columnheader', { name: 'Name' }),
      ).toHaveAttribute('aria-sort', 'descending');
    });

    it('leaves aria-sort off columns that do not sort', () => {
      renderTable();

      expect(
        screen.getByRole('columnheader', { name: 'Actions' }),
      ).not.toHaveAttribute('aria-sort');
    });
  });

  describe('column state', () => {
    it('orders columns by id, with unlisted ones after', () => {
      renderTable({ defaultColumnState: { order: ['age'] } });

      expect(headerTexts()).toEqual(['Age', 'Name', 'Actions']);
      expect(columnTexts(0)).toEqual(['31', '45', '28']);
    });

    it('hides columns by id', () => {
      renderTable({ columnState: { hidden: ['age'] } });

      expect(headerTexts()).toEqual(['Name', 'Actions']);
    });

    it('lays columns out at their widths by id, in display order', () => {
      const { container } = renderTable({
        resizableColumns: true,
        columnState: {
          order: ['age'],
          widths: { name: 200, age: 100, actions: 120 },
        },
      });

      const widths = Array.from(container.querySelectorAll('col')).map(
        (col) => col.style.width,
      );
      expect(widths).toEqual(['100px', '200px', '120px']);
    });

    it('reports resized widths keyed by column id', () => {
      const onColumnStateChange = jest.fn();
      renderTable({
        resizableColumns: true,
        columnResizeMode: 'expand',
        defaultColumnState: { widths: { name: 200, age: 100, actions: 120 } },
        onColumnStateChange,
      });

      fireEvent.keyDown(screen.getAllByRole('separator')[1], {
        key: 'ArrowRight',
      });

      const { widths } = onColumnStateChange.mock.lastCall[0];
      expect(widths.name).toBe(200);
      expect(widths.actions).toBe(120);
      expect(widths.age).toBeGreaterThan(100);
    });

    it('falls back to column widths when the state has none', () => {
      const { container } = renderTable({
        resizableColumns: true,
        columns: columns.map((column) => ({ ...column, width: 150 })),
      });

      const widths = Array.from(container.querySelectorAll('col')).map(
        (col) => col.style.width,
      );
      expect(widths).toEqual(['150px', '150px', '150px']);
    });

    it('freezes a column by id from its header menu', async () => {
      const onColumnStateChange = jest.fn();
      renderTable({ freezeControls: true, onColumnStateChange });

      await userEvent.click(
        within(screen.getByRole('columnheader', { name: /Age/ })).getByRole(
          'button',
          { name: 'Freeze column options' },
        ),
      );
      await userEvent.click(
        screen.getByRole('menuitem', { name: 'Freeze to the left' }),
      );

      expect(onColumnStateChange).toHaveBeenCalledWith(
        expect.objectContaining({ frozen: { start: ['age'], end: [] } }),
      );
    });
  });

  describe('states', () => {
    it('shows the empty state when there are no rows', () => {
      renderTable({ data: [], emptyState: 'Nothing here' });

      expect(screen.getByRole('status')).toHaveTextContent('Nothing here');
      expect(screen.getByRole('cell')).toHaveAttribute('colspan', '3');
    });

    it('shows the loading state while loading with no rows', () => {
      renderTable({ data: [], isLoading: true });

      expect(screen.getByRole('status')).toHaveTextContent('Loading…');
      expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
    });

    it('keeps the rows while re-loading', () => {
      renderTable({ isLoading: true });

      expect(columnTexts(0)).toEqual(['Cleo', 'Ada', 'Bo']);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  describe('row click', () => {
    it('reports the clicked row', async () => {
      const onRowClick = jest.fn();
      renderTable({ onRowClick });

      await userEvent.click(screen.getByText('Ada'));

      expect(onRowClick).toHaveBeenCalledWith(people[1], expect.anything());
    });

    it('opens a focused row with Enter', async () => {
      const onRowClick = jest.fn();
      renderTable({ onRowClick });

      const row = screen.getAllByRole('row')[1];
      expect(row).toHaveAttribute('tabindex', '0');
      row.focus();
      await userEvent.keyboard('{Enter}');

      expect(onRowClick).toHaveBeenCalledWith(people[0], expect.anything());
    });

    it('leaves Enter on a control inside the row to that control', async () => {
      const onRowClick = jest.fn();
      renderTable({ onRowClick });

      screen.getByRole('button', { name: 'Edit Ada' }).focus();
      await userEvent.keyboard('{Enter}');

      expect(onRowClick).not.toHaveBeenCalled();
    });

    it('keeps rows out of the tab order without onRowClick', () => {
      renderTable();

      expect(screen.getAllByRole('row')[1]).not.toHaveAttribute('tabindex');
    });

    it('leaves clicks on controls inside the row alone', async () => {
      const onRowClick = jest.fn();
      renderTable({ onRowClick });

      await userEvent.click(screen.getByRole('button', { name: 'Edit Ada' }));

      expect(onRowClick).not.toHaveBeenCalled();
    });
  });

  it('has no axe violations, sorted and with freeze controls', async () => {
    const { container } = renderTable({
      freezeControls: true,
      defaultSort: { columnId: 'age', direction: 'asc' },
    });

    await checkA11y(container);
  });

  it('forwards its ref to the table element', () => {
    const ref = { current: null as HTMLTableElement | null };
    renderTable({ ref });

    expect(ref.current).toBe(screen.getByRole('table'));
  });

  it('renders the footer below the table', () => {
    renderTable({ footer: <nav aria-label="Pages" /> });

    expect(
      screen.getByRole('navigation', { name: 'Pages' }),
    ).toBeInTheDocument();
  });
});
