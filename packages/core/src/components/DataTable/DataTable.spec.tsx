import { useState } from 'react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { screen, within } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';
import DataTable from './DataTable';
import { DataTableColumnPicker } from './DataTableColumnPicker';
import { DataTableColumn, DataTableColumnState, DataTableProps } from './types';

/**
 * jsdom has no PointerEvent, so `fireEvent.pointerDown` would drop `button`
 * and `clientX`. MouseEvent carries both. See Table's ColumnResize spec.
 */
const setUpPointerEvents = () => {
  class PointerEventPolyfill extends MouseEvent {
    pointerId: number;

    constructor(type: string, init: MouseEventInit & { pointerId?: number }) {
      super(type, init);
      this.pointerId = init.pointerId ?? 1;
    }
  }
  window.PointerEvent =
    PointerEventPolyfill as unknown as typeof window.PointerEvent;
  Element.prototype.setPointerCapture = () => {};
};

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

    it('stops a column at its own maxWidth', () => {
      const onColumnStateChange = jest.fn();
      renderTable({
        resizableColumns: true,
        columnResizeMode: 'expand',
        maxColumnWidth: 400,
        columns: columns.map((column) =>
          column.id === 'age' ? { ...column, maxWidth: 110 } : column,
        ),
        defaultColumnState: { widths: { name: 200, age: 100, actions: 120 } },
        onColumnStateChange,
      });
      const ageHandle = screen.getAllByRole('separator')[1];

      fireEvent.keyDown(ageHandle, { key: 'ArrowRight', shiftKey: true });

      expect(ageHandle).toHaveAttribute('aria-valuemax', '110');
      expect(onColumnStateChange.mock.lastCall[0].widths.age).toBe(110);
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
          { name: 'Column options' },
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

  describe('reordering', () => {
    beforeAll(setUpPointerEvents);

    const openMenu = (header: RegExp) =>
      userEvent.click(
        within(screen.getByRole('columnheader', { name: header })).getByRole(
          'button',
          { name: 'Column options' },
        ),
      );

    // Each header 100px wide, side by side, in display order.
    const layOutHeaders = () =>
      jest
        .spyOn(HTMLTableCellElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function (this: HTMLTableCellElement) {
          const left = this.cellIndex * 100;
          return { left, right: left + 100, width: 100 } as DOMRect;
        });

    const grabAndDrop = (header: RegExp, clientX: number) => {
      const grip = within(
        screen.getByRole('columnheader', { name: header }),
      ).getByTestId('data-table-column-grip');
      fireEvent.pointerDown(grip, { button: 0, pointerId: 1, clientX: 50 });
      fireEvent.pointerMove(grip, { pointerId: 1, clientX });
      return grip;
    };

    afterEach(() => jest.restoreAllMocks());

    it('offers no grip or menu without reorderableColumns', () => {
      renderTable();

      expect(
        screen.queryByTestId('data-table-column-grip'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Column options' }),
      ).not.toBeInTheDocument();
    });

    it('moves a column right from its header menu', async () => {
      const onColumnStateChange = jest.fn();
      renderTable({ reorderableColumns: true, onColumnStateChange });

      await openMenu(/Name/);
      await userEvent.click(
        screen.getByRole('menuitem', { name: 'Move right' }),
      );

      expect(headerTexts()).toEqual(['Age', 'Name', 'Actions']);
      expect(columnTexts(1)).toEqual(['Cleo', 'Ada', 'Bo']);
      expect(onColumnStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ order: ['age', 'name', 'actions'] }),
      );
    });

    it('disables the move with nowhere to go', async () => {
      renderTable({ reorderableColumns: true });

      await openMenu(/Name/);

      expect(
        screen.getByRole('menuitem', { name: 'Move left' }),
      ).toHaveAttribute('aria-disabled', 'true');
    });

    it('moves only within the freeze zone', async () => {
      const onColumnStateChange = jest.fn();
      renderTable({
        reorderableColumns: true,
        defaultColumnState: { frozen: { start: ['name'], end: [] } },
        onColumnStateChange,
      });

      await openMenu(/Age/);
      expect(
        screen.getByRole('menuitem', { name: 'Move left' }),
      ).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(
        screen.getByRole('menuitem', { name: 'Move right' }),
      );

      expect(headerTexts()).toEqual(['Name', 'Actions', 'Age']);
    });

    it('keeps a column that cannot move in place, moving others past it', async () => {
      renderTable({
        reorderableColumns: true,
        columns: [
          { ...columns[0], reorderable: false },
          columns[1],
          columns[2],
        ],
        defaultColumnState: { order: ['age', 'name', 'actions'] },
      });

      expect(
        within(
          screen.getByRole('columnheader', { name: /Name/ }),
        ).queryByTestId('data-table-column-grip'),
      ).not.toBeInTheDocument();

      await openMenu(/Age/);
      await userEvent.click(
        screen.getByRole('menuitem', { name: 'Move right' }),
      );

      expect(headerTexts()).toEqual(['Actions', 'Name', 'Age']);
    });

    it('offers the freeze actions in the same menu', async () => {
      renderTable({ reorderableColumns: true, freezeControls: true });

      await openMenu(/Age/);

      expect(
        screen.getAllByRole('menuitem').map((item) => item.textContent),
      ).toEqual([
        'Move left',
        'Move right',
        'Freeze to the left',
        'Freeze to the right',
      ]);
    });

    it('drops a dragged column where the pointer is', () => {
      layOutHeaders();
      const onColumnStateChange = jest.fn();
      renderTable({ reorderableColumns: true, onColumnStateChange });

      const grip = grabAndDrop(/Name/, 250);
      expect(
        screen.getByRole('columnheader', { name: /Actions/ }),
      ).toHaveAttribute('data-drop', 'after');
      expect(
        screen.getByRole('columnheader', { name: /Name/ }),
      ).toHaveAttribute('data-dragging', 'true');
      fireEvent.pointerUp(grip, { pointerId: 1, clientX: 250 });

      expect(headerTexts()).toEqual(['Age', 'Actions', 'Name']);
      expect(onColumnStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ order: ['age', 'actions', 'name'] }),
      );
      expect(
        screen.getByRole('columnheader', { name: /Actions/ }),
      ).not.toHaveAttribute('data-drop');
    });

    it('refuses a drop in another freeze zone', () => {
      layOutHeaders();
      renderTable({
        reorderableColumns: true,
        defaultColumnState: { frozen: { start: ['name'], end: [] } },
      });

      const grip = grabAndDrop(/Age/, 50);
      expect(
        screen.getByRole('columnheader', { name: /Name/ }),
      ).not.toHaveAttribute('data-drop');
      fireEvent.pointerUp(grip, { pointerId: 1, clientX: 50 });

      expect(headerTexts()).toEqual(['Name', 'Age', 'Actions']);
    });

    it('disables the grip of a column with nowhere to move', () => {
      layOutHeaders();
      const onColumnStateChange = jest.fn();
      renderTable({
        reorderableColumns: true,
        defaultColumnState: { frozen: { start: ['name'], end: [] } },
        onColumnStateChange,
      });

      const grip = grabAndDrop(/Name/, 150);
      expect(grip).toHaveAttribute('data-disabled', 'true');
      fireEvent.pointerUp(grip, { pointerId: 1, clientX: 150 });

      expect(headerTexts()).toEqual(['Name', 'Age', 'Actions']);
      expect(onColumnStateChange).not.toHaveBeenCalled();
    });

    it('cancels a drag with Escape', () => {
      layOutHeaders();
      const onColumnStateChange = jest.fn();
      renderTable({ reorderableColumns: true, onColumnStateChange });

      const grip = grabAndDrop(/Name/, 150);
      fireEvent.keyDown(window, { key: 'Escape' });
      fireEvent.pointerUp(grip, { pointerId: 1, clientX: 150 });

      expect(headerTexts()).toEqual(['Name', 'Age', 'Actions']);
      expect(onColumnStateChange).not.toHaveBeenCalled();
    });

    it('has no axe violations', async () => {
      const { container } = renderTable({
        reorderableColumns: true,
        freezeControls: true,
      });

      await checkA11y(container);
    });
  });

  describe('selection', () => {
    const rowBox = (name: string) =>
      screen.getByRole('checkbox', { name: `Select ${name}` });
    const selectAll = () =>
      screen.getByRole('checkbox', { name: 'Select all rows' });

    it('adds no selection column by default', () => {
      renderTable();

      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
      expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    });

    it('selects rows by id', async () => {
      const onSelectionChange = jest.fn();
      renderTable({
        selectionMode: 'multiple',
        getRowLabel: (row) => `Select ${row.name}`,
        onSelectionChange,
      });

      await userEvent.click(rowBox('Ada'));
      expect(onSelectionChange).toHaveBeenLastCalledWith(['p2']);
      await userEvent.click(rowBox('Bo'));
      expect(onSelectionChange).toHaveBeenLastCalledWith(['p2', 'p3']);
      await userEvent.click(rowBox('Ada'));
      expect(onSelectionChange).toHaveBeenLastCalledWith(['p3']);
    });

    it('names rows by position without getRowLabel', () => {
      renderTable({ selectionMode: 'multiple' });

      expect(
        screen.getByRole('checkbox', { name: 'Select row 2' }),
      ).toBeInTheDocument();
    });

    it('selects and clears the rows shown, keeping others', async () => {
      const onSelectionChange = jest.fn();
      renderTable({
        selectionMode: 'multiple',
        defaultSelectedRowIds: ['elsewhere', 'p1'],
        onSelectionChange,
      });

      expect(selectAll()).toHaveProperty('indeterminate', true);
      await userEvent.click(selectAll());
      expect(onSelectionChange).toHaveBeenLastCalledWith([
        'elsewhere',
        'p1',
        'p2',
        'p3',
      ]);
      expect(selectAll()).toBeChecked();
      await userEvent.click(selectAll());
      expect(onSelectionChange).toHaveBeenLastCalledWith(['elsewhere']);
    });

    it('skips rows that cannot be selected', async () => {
      const onSelectionChange = jest.fn();
      renderTable({
        selectionMode: 'multiple',
        getRowLabel: (row) => `Select ${row.name}`,
        isRowSelectable: (row) => row.age < 40,
        onSelectionChange,
      });

      expect(rowBox('Ada')).toBeDisabled();
      await userEvent.click(selectAll());
      expect(onSelectionChange).toHaveBeenLastCalledWith(['p1', 'p3']);
      expect(selectAll()).toBeChecked();
    });

    it('selects one row at a time in single mode', async () => {
      const onSelectionChange = jest.fn();
      renderTable({
        selectionMode: 'single',
        getRowLabel: (row) => `Select ${row.name}`,
        onSelectionChange,
      });

      await userEvent.click(screen.getByRole('radio', { name: 'Select Ada' }));
      await userEvent.click(screen.getByRole('radio', { name: 'Select Bo' }));

      expect(onSelectionChange).toHaveBeenLastCalledWith(['p3']);
      expect(
        screen.getByRole('radio', { name: 'Select Ada' }),
      ).not.toBeChecked();
    });

    it('shows a controlled selection without changing it', async () => {
      const onSelectionChange = jest.fn();
      renderTable({
        selectionMode: 'multiple',
        getRowLabel: (row) => `Select ${row.name}`,
        selectedRowIds: ['p1'],
        onSelectionChange,
      });

      await userEvent.click(rowBox('Ada'));

      expect(onSelectionChange).toHaveBeenCalledWith(['p1', 'p2']);
      expect(rowBox('Ada')).not.toBeChecked();
      expect(rowBox('Cleo')).toBeChecked();
    });

    it('does not open the row when its checkbox is clicked', async () => {
      const onRowClick = jest.fn();
      renderTable({
        selectionMode: 'multiple',
        getRowLabel: (row) => `Select ${row.name}`,
        onRowClick,
      });

      await userEvent.click(rowBox('Ada'));

      expect(onRowClick).not.toHaveBeenCalled();
    });

    it('spans the state row over the selection column too', () => {
      renderTable({ selectionMode: 'multiple', data: [] });

      expect(screen.getByRole('cell')).toHaveAttribute('colspan', '4');
    });

    it('has no axe violations', async () => {
      const { container } = renderTable({
        selectionMode: 'multiple',
        defaultSelectedRowIds: ['p1'],
      });

      await checkA11y(container);
    });
  });

  describe('hiding columns', () => {
    it('hides a column from its header menu', async () => {
      const onColumnStateChange = jest.fn();
      renderTable({ hideableColumns: true, onColumnStateChange });

      await userEvent.click(
        within(screen.getByRole('columnheader', { name: /Age/ })).getByRole(
          'button',
          { name: 'Column options' },
        ),
      );
      await userEvent.click(
        screen.getByRole('menuitem', { name: 'Hide column' }),
      );

      expect(headerTexts()).toEqual(['Name', 'Actions']);
      expect(onColumnStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ hidden: ['age'] }),
      );
    });

    it('keeps the last column on screen', async () => {
      renderTable({
        hideableColumns: true,
        defaultColumnState: { hidden: ['age', 'actions'] },
      });

      await userEvent.click(
        screen.getByRole('button', { name: 'Column options' }),
      );

      expect(
        screen.getByRole('menuitem', { name: 'Hide column' }),
      ).toHaveAttribute('aria-disabled', 'true');
    });

    it('brings hidden columns back from the picker', async () => {
      const Harness = () => {
        const [columnState, setColumnState] = useState<
          Partial<DataTableColumnState>
        >({ hidden: ['age'] });
        return (
          <>
            <DataTableColumnPicker
              columns={columns}
              columnState={columnState}
              onColumnStateChange={setColumnState}
            />
            <DataTable
              data={people}
              columns={[
                columns[0],
                columns[1],
                { ...columns[2], hideable: false },
              ]}
              columnState={columnState}
              onColumnStateChange={setColumnState}
            />
          </>
        );
      };
      render(<Harness />);
      expect(headerTexts()).toEqual(['Name', 'Actions']);

      await userEvent.click(screen.getByRole('button', { name: /Columns/ }));
      const options = screen.getAllByRole('option');
      expect(options.map((option) => option.textContent)).toEqual([
        'Name',
        'Age',
        'Actions',
      ]);
      await userEvent.click(options[1]);
      expect(headerTexts()).toEqual(['Name', 'Age', 'Actions']);
      await userEvent.click(options[0]);
      expect(headerTexts()).toEqual(['Age', 'Actions']);
    });

    it('lets the picker show an unhideable column that state hid', async () => {
      const onColumnStateChange = jest.fn();
      render(
        <DataTableColumnPicker
          columns={columns.map((column) =>
            column.id === 'age' ? { ...column, hideable: false } : column,
          )}
          columnState={{ hidden: ['age'] }}
          onColumnStateChange={onColumnStateChange}
        />,
      );

      await userEvent.click(screen.getByRole('button', { name: /Columns/ }));
      const age = screen.getByRole('option', { name: 'Age' });
      expect(age).not.toHaveAttribute('aria-disabled', 'true');

      await userEvent.click(age);
      expect(onColumnStateChange.mock.lastCall[0].hidden).toEqual([]);
    });
  });

  describe('nested rows', () => {
    type Node = { id: string; name: string; children?: Node[] };
    const teams: Node[] = [
      {
        id: 'eng',
        name: 'Engineering',
        children: [
          {
            id: 'web',
            name: 'Web',
            children: [
              { id: 'ana', name: 'Ana' },
              { id: 'ben', name: 'Ben' },
            ],
          },
          { id: 'cy', name: 'Cy' },
        ],
      },
      { id: 'ops', name: 'Ops' },
    ];
    const nodeColumns: DataTableColumn<Node>[] = [
      { id: 'name', header: 'Name', cell: (row) => row.name },
    ];
    const renderTree = (props: Partial<DataTableProps<Node>> = {}) =>
      render(
        <DataTable
          data={teams}
          columns={nodeColumns}
          getRowId={(row) => row.id}
          getSubRows={(row) => row.children}
          getRowLabel={(row) => `Select ${row.name}`}
          {...props}
        />,
      );
    const names = () =>
      screen
        .getAllByRole('row')
        .slice(1)
        .map((row) => within(row).getAllByRole('cell').at(-1)!.textContent);
    const toggle = (name: string, label = 'Expand row') =>
      within(screen.getByRole('cell', { name }).closest('tr')!).getByRole(
        'button',
        { name: label },
      );
    const box = (name: string) =>
      screen.getByRole('checkbox', { name: `Select ${name}` });

    it('starts collapsed, with a button only on rows with children', () => {
      renderTree();

      expect(names()).toEqual(['Engineering', 'Ops']);
      expect(toggle('Engineering')).toHaveAttribute('aria-expanded', 'false');
      expect(
        within(
          screen.getByRole('cell', { name: 'Ops' }).closest('tr')!,
        ).queryByRole('button'),
      ).not.toBeInTheDocument();
    });

    it('expands and collapses a row, reporting the ids', async () => {
      const onExpandedChange = jest.fn();
      renderTree({ onExpandedChange });

      await userEvent.click(toggle('Engineering'));
      expect(names()).toEqual(['Engineering', 'Web', 'Cy', 'Ops']);
      expect(onExpandedChange).toHaveBeenLastCalledWith(['eng']);

      await userEvent.click(toggle('Engineering', 'Collapse row'));
      expect(names()).toEqual(['Engineering', 'Ops']);
      expect(onExpandedChange).toHaveBeenLastCalledWith([]);
    });

    it('opens every level with defaultExpanded, and indents children', () => {
      renderTree({ defaultExpanded: true });

      expect(names()).toEqual([
        'Engineering',
        'Web',
        'Ana',
        'Ben',
        'Cy',
        'Ops',
      ]);
      expect(screen.getByRole('cell', { name: 'Ana' })).toHaveStyle({
        paddingLeft: '64px',
      });
      expect(screen.getByRole('cell', { name: 'Engineering' })).not.toHaveStyle(
        { paddingLeft: '64px' },
      );
    });

    it('collapses one row out of all-expanded, keeping the rest open', async () => {
      const onExpandedChange = jest.fn();
      renderTree({ defaultExpanded: true, onExpandedChange });

      await userEvent.click(toggle('Web', 'Collapse row'));

      expect(onExpandedChange).toHaveBeenLastCalledWith(['eng']);
      expect(names()).toEqual(['Engineering', 'Web', 'Cy', 'Ops']);
    });

    it('follows controlled expandedRowIds', () => {
      renderTree({ expandedRowIds: ['eng', 'web'] });

      expect(names()).toEqual([
        'Engineering',
        'Web',
        'Ana',
        'Ben',
        'Cy',
        'Ops',
      ]);
    });

    it('keys rows by their own id without getRowId', async () => {
      const onSelectionChange = jest.fn();
      renderTree({
        getRowId: undefined,
        defaultExpanded: true,
        selectionMode: 'multiple',
        onSelectionChange,
      });

      await userEvent.click(box('Ana'));

      expect(onSelectionChange).toHaveBeenLastCalledWith(['ana']);
    });

    it('keys children under their parent when rows have no id', async () => {
      const withoutIds = (nodes: Node[]): Node[] =>
        nodes.map(({ name, children }) => ({
          name,
          children: children && withoutIds(children),
        })) as Node[];
      const onSelectionChange = jest.fn();
      renderTree({
        data: withoutIds(teams),
        getRowId: undefined,
        defaultExpanded: true,
        selectionMode: 'multiple',
        onSelectionChange,
      });

      await userEvent.click(box('Ana'));

      expect(onSelectionChange).toHaveBeenLastCalledWith(['0.0.0']);
    });

    it('prefers getRowId over the row own id', async () => {
      const onSelectionChange = jest.fn();
      renderTree({
        getRowId: (row) => `node-${row.name}`,
        defaultExpanded: true,
        selectionMode: 'multiple',
        onSelectionChange,
      });

      await userEvent.click(box('Ana'));

      expect(onSelectionChange).toHaveBeenLastCalledWith(['node-Ana']);
    });

    it('lets a parent that cannot be selected select its children', async () => {
      const onSelectionChange = jest.fn();
      renderTree({
        selectionMode: 'multiple',
        isRowSelectable: (row) => row.id !== 'eng',
        onSelectionChange,
      });

      await userEvent.click(box('Engineering'));

      // Web is selectable and fully checked, so it is in; Engineering is not.
      expect(onSelectionChange).toHaveBeenLastCalledWith([
        'ana',
        'ben',
        'cy',
        'web',
      ]);
      expect(box('Engineering')).toBeChecked();
    });

    it('selects a row with everything under it', async () => {
      const onSelectionChange = jest.fn();
      renderTree({ selectionMode: 'multiple', onSelectionChange });

      await userEvent.click(box('Engineering'));

      expect(onSelectionChange).toHaveBeenLastCalledWith([
        'ana',
        'ben',
        'cy',
        'eng',
        'web',
      ]);
      expect(box('Engineering')).toBeChecked();
    });

    it('shows a partial check up the tree', async () => {
      const onSelectionChange = jest.fn();
      renderTree({
        selectionMode: 'multiple',
        defaultExpanded: true,
        onSelectionChange,
      });

      await userEvent.click(box('Ana'));
      expect(box('Web')).toHaveProperty('indeterminate', true);
      expect(box('Engineering')).toHaveProperty('indeterminate', true);

      await userEvent.click(box('Ben'));
      expect(onSelectionChange).toHaveBeenLastCalledWith(['ana', 'ben', 'web']);
      expect(box('Web')).toBeChecked();
      expect(box('Engineering')).toHaveProperty('indeterminate', true);
    });

    it('completes a partly selected row on click', async () => {
      const onSelectionChange = jest.fn();
      renderTree({
        selectionMode: 'multiple',
        defaultExpanded: true,
        defaultSelectedRowIds: ['ana'],
        onSelectionChange,
      });

      await userEvent.click(box('Web'));

      expect(onSelectionChange).toHaveBeenLastCalledWith(['ana', 'ben', 'web']);
    });

    it('drops the parent when a child is cleared', async () => {
      const onSelectionChange = jest.fn();
      renderTree({
        selectionMode: 'multiple',
        defaultExpanded: true,
        defaultSelectedRowIds: ['ana', 'ben', 'web'],
        onSelectionChange,
      });

      await userEvent.click(box('Ben'));

      expect(onSelectionChange).toHaveBeenLastCalledWith(['ana']);
    });

    it('selects collapsed rows too from the header', async () => {
      const onSelectionChange = jest.fn();
      renderTree({ selectionMode: 'multiple', onSelectionChange });

      await userEvent.click(
        screen.getByRole('checkbox', { name: 'Select all rows' }),
      );

      expect(onSelectionChange).toHaveBeenLastCalledWith(
        expect.arrayContaining(['eng', 'web', 'ana', 'ben', 'cy', 'ops']),
      );
    });

    it('sorts children among themselves', () => {
      renderTree({
        defaultExpanded: true,
        columns: [
          {
            ...nodeColumns[0],
            sortable: true,
            sortFn: (a, b) => a.name.localeCompare(b.name),
          },
        ],
        defaultSort: { columnId: 'name', direction: 'desc' },
      });

      expect(names()).toEqual([
        'Ops',
        'Engineering',
        'Web',
        'Ben',
        'Ana',
        'Cy',
      ]);
    });

    it('has no axe violations', async () => {
      const { container } = renderTree({
        selectionMode: 'multiple',
        defaultExpanded: true,
      });

      await checkA11y(container);
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

  describe('row and cell props', () => {
    const bodyRows = () => screen.getAllByRole('row').slice(1);

    it('gives every row its id', () => {
      renderTable();

      expect(bodyRows().map((row) => row.getAttribute('data-row-id'))).toEqual([
        'p1',
        'p2',
        'p3',
      ]);
    });

    it('adds class names and data attributes to rows, by shown position', () => {
      const getRowProps = jest.fn((row: Person) =>
        row.age > 40 ? { className: 'senior', 'data-tone': 'muted' } : {},
      );
      renderTable({ getRowProps });

      const [cleo, ada] = bodyRows();
      expect(ada).toHaveClass('senior');
      expect(ada).toHaveAttribute('data-tone', 'muted');
      expect(cleo).not.toHaveClass('senior');
      expect(getRowProps).toHaveBeenCalledWith(people[1], 1);
    });

    it('hands a row background to its cells through a custom property', () => {
      renderTable({
        getRowProps: (row) =>
          row.id === 'p2' ? { background: 'rgb(255, 0, 0)' } : {},
      });

      const [cleo, ada] = bodyRows();
      expect(ada.style.getPropertyValue('--data-table-row-tint')).toBe(
        'rgb(255, 0, 0)',
      );
      expect(cleo.style.getPropertyValue('--data-table-row-tint')).toBe('');
    });

    it('styles one column cells from their row', () => {
      renderTable({
        columns: columns.map((column) =>
          column.id === 'age'
            ? {
                ...column,
                getCellProps: (row: Person) => ({
                  className: 'age-cell',
                  'data-old': row.age > 40,
                  style: row.age > 40 ? { fontWeight: 700 } : undefined,
                }),
              }
            : column,
        ),
      });

      const ada = within(bodyRows()[1]).getByRole('cell', { name: '45' });
      expect(ada).toHaveClass('age-cell');
      expect(ada).toHaveAttribute('data-old', 'true');
      expect(ada.style.fontWeight).toBe('700');
      expect(
        within(bodyRows()[0]).getByRole('cell', { name: '31' }).style
          .fontWeight,
      ).toBe('');
      expect(screen.getByRole('columnheader', { name: /Age/ })).not.toHaveClass(
        'age-cell',
      );
    });

    it('keeps the nested indent under a cell style', () => {
      type Node = { id: string; name: string; children?: Node[] };
      render(
        <DataTable<Node>
          data={[{ id: 'a', name: 'A', children: [{ id: 'b', name: 'B' }] }]}
          columns={[
            {
              id: 'name',
              header: 'Name',
              cell: (row) => row.name,
              getCellProps: () => ({ style: { color: 'red' } }),
            },
          ]}
          getSubRows={(row) => row.children}
          defaultExpanded
        />,
      );

      const { style } = screen.getByRole('cell', { name: 'B' });
      expect(style.paddingLeft).toBe('40px');
      expect(style.color).toBe('red');
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
