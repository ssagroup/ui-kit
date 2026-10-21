import { waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import TableCellHeader from '@components/TableCellHeader';
import TableContainer from '@components/TableContainer';
import { TableProps } from './types';
import { screen } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';

const columns = ['A', 'B', 'C', 'D', 'E'];

type HeaderOptions = {
  onClick?: () => void;
  freezable?: boolean[];
  ids?: boolean;
  order?: string[];
};

const renderTable = (
  props: Partial<TableProps> = {},
  header: HeaderOptions = {},
) => {
  const ui = (tableProps: Partial<TableProps>, options: HeaderOptions) => {
    const order = options.order ?? columns;
    return (
      <TableContainer data-testid="container">
        <Table {...tableProps}>
          <TableHead>
            <TableRow>
              {order.map((column, index) => (
                <TableCellHeader
                  key={column}
                  columnId={options.ids ? column.toLowerCase() : undefined}
                  onClick={options.onClick}
                  freezable={options.freezable?.[index]}>
                  {column}
                </TableCellHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {order.map((column) => (
                <TableCell key={column}>{column.toLowerCase()}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const result = render(ui(props, header));
  return {
    ...result,
    rerenderWith: (nextHeader: HeaderOptions) =>
      result.rerender(ui(props, nextHeader)),
  };
};

const triggers = () =>
  screen.getAllByRole('button', { name: 'Freeze column options' });

const openMenu = async (column: number) => {
  await userEvent.click(triggers()[column]);
};

const choose = (name: string) =>
  userEvent.click(screen.getByRole('menuitem', { name }));

const isSticky = (cell: HTMLElement) =>
  getComputedStyle(cell).position === 'sticky';

/** Gives each column, and the cells in it, a fixed rendered width. */
const mockColumnWidths = (widths: number[]) =>
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(function (this: HTMLElement) {
      const index = this instanceof HTMLTableCellElement ? this.cellIndex : -1;
      return { width: index >= 0 ? widths[index] : 0 } as DOMRect;
    });

describe('Table column freezing', () => {
  afterEach(() => jest.restoreAllMocks());

  it('renders no freeze menus without freezeControls', () => {
    renderTable({ frozenColumns: { start: [0] } });
    expect(
      screen.queryByRole('button', { name: 'Freeze column options' }),
    ).not.toBeInTheDocument();
  });

  it('freezes a column in place, leaving the ones before it to scroll', () => {
    renderTable({ frozenColumns: { start: [3] } });
    const cells = screen.getAllByRole('cell');

    expect(cells.map(isSticky)).toEqual([false, false, false, true, false]);
  });

  it('offsets each frozen column by the frozen columns between it and its edge', () => {
    mockColumnWidths([100, 120, 140, 160, 180]);
    renderTable({ frozenColumns: { start: [0, 2], end: [3, 4] } });
    const style = screen.getByRole('table').style;

    expect(style.getPropertyValue('--ssa-table-frozen-0')).toBe('0px');
    // Column 1 is not frozen, so only column 0 sits between column 2 and the edge.
    expect(style.getPropertyValue('--ssa-table-frozen-2')).toBe('100px');
    expect(style.getPropertyValue('--ssa-table-frozen-4')).toBe('0px');
    expect(style.getPropertyValue('--ssa-table-frozen-3')).toBe('180px');
  });

  it('follows a column by its columnId when the columns are reordered', () => {
    const { rerenderWith } = renderTable(
      { frozenColumns: { start: ['d'] } },
      { ids: true },
    );
    expect(isSticky(screen.getByText('d'))).toBe(true);

    rerenderWith({ ids: true, order: ['D', 'A', 'B', 'C', 'E'] });

    expect(isSticky(screen.getByText('d'))).toBe(true);
    expect(isSticky(screen.getByText('c'))).toBe(false);
  });

  it('freezes a column to the left from its menu, by position', async () => {
    const onFrozenColumnsChange = jest.fn();
    renderTable({ freezeControls: true, onFrozenColumnsChange });

    await openMenu(3);
    await choose('Freeze to the left');

    expect(onFrozenColumnsChange).toHaveBeenCalledWith({ start: [3], end: [] });
    expect(
      triggers().map((trigger) => trigger.dataset.frozen === 'true'),
    ).toEqual([false, false, false, true, false]);
  });

  it('freezes a column to the right from its menu, by columnId', async () => {
    const onFrozenColumnsChange = jest.fn();
    renderTable({ freezeControls: true, onFrozenColumnsChange }, { ids: true });

    await openMenu(1);
    await choose('Freeze to the right');

    expect(onFrozenColumnsChange).toHaveBeenCalledWith({
      start: [],
      end: ['b'],
    });
  });

  it('unfreezes one column, or all of them', async () => {
    const onFrozenColumnsChange = jest.fn();
    renderTable({
      freezeControls: true,
      defaultFrozenColumns: { start: [0, 2], end: [4] },
      onFrozenColumnsChange,
    });

    await openMenu(2);
    await choose('Unfreeze column');
    expect(onFrozenColumnsChange).toHaveBeenLastCalledWith({
      start: [0],
      end: [4],
    });

    await openMenu(1);
    await choose('Unfreeze all');
    expect(onFrozenColumnsChange).toHaveBeenLastCalledWith({
      start: [],
      end: [],
    });
  });

  it('keeps a column listed on both edges on the left one', async () => {
    const onFrozenColumnsChange = jest.fn();
    renderTable({
      freezeControls: true,
      frozenColumns: { start: [1], end: [1] },
      onFrozenColumnsChange,
    });

    // Normalised to start; the menu offers to unfreeze, not to freeze again.
    await openMenu(1);
    expect(
      screen.getByRole('menuitem', { name: 'Unfreeze column' }),
    ).toBeInTheDocument();
  });

  it('only reports changes in controlled mode', async () => {
    const onFrozenColumnsChange = jest.fn();
    renderTable({
      freezeControls: true,
      frozenColumns: { start: [] },
      onFrozenColumnsChange,
    });

    await openMenu(0);
    await choose('Freeze to the left');

    expect(onFrozenColumnsChange).toHaveBeenCalledWith({ start: [0], end: [] });
    expect(triggers()[0]).not.toHaveAttribute('data-frozen');
  });

  it('is keyboard operable: focus moves into the menu, Enter picks', async () => {
    const onFrozenColumnsChange = jest.fn();
    renderTable({ freezeControls: true, onFrozenColumnsChange });

    triggers()[2].focus();
    await userEvent.keyboard('{Enter}');

    const menu = screen.getByRole('menu');
    await waitFor(() => expect(menu).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(onFrozenColumnsChange).toHaveBeenCalledWith({ start: [], end: [2] });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('keeps menu clicks away from the header cell', async () => {
    const onClick = jest.fn();
    renderTable({ freezeControls: true }, { onClick });

    await openMenu(0);
    await choose('Freeze to the left');

    expect(onClick).not.toHaveBeenCalled();
  });

  it('leaves the menu out of a header cell with freezable={false}', () => {
    renderTable(
      { freezeControls: true },
      { freezable: [false, true, true, true, false] },
    );
    expect(triggers()).toHaveLength(3);
  });

  it('puts the divider on a frozen column only once content scrolls under it', () => {
    mockColumnWidths([100, 100, 100, 100, 100]);
    renderTable({ frozenColumns: { start: [2], end: [4] } });
    const container = screen.getByTestId('container');
    const table = screen.getByRole('table');
    Object.defineProperty(container, 'scrollWidth', { value: 1000 });
    Object.defineProperty(container, 'clientWidth', { value: 400 });

    const scrollTo = (left: number) => {
      container.scrollLeft = left;
      fireEvent.scroll(container);
    };

    // Column 2 starts 200px in, so it only sticks after 200px of scroll.
    scrollTo(150);
    expect(table).not.toHaveAttribute('data-frozen-shadow-start');
    expect(table).toHaveAttribute('data-frozen-shadow-end', '4');

    scrollTo(250);
    expect(table).toHaveAttribute('data-frozen-shadow-start', '2');

    scrollTo(600);
    expect(table).not.toHaveAttribute('data-frozen-shadow-end');
  });

  it('never measures a table with nothing frozen', () => {
    const measure = mockColumnWidths([100, 100, 100, 100, 100]);
    const { rerenderWith } = renderTable({ stickyHeader: true });
    rerenderWith({ order: ['B', 'A', 'C', 'D', 'E'] });

    expect(measure).not.toHaveBeenCalled();
    expect(screen.getByRole('table')).not.toHaveAttribute(
      'data-frozen-shadow-start',
    );
  });

  it('clears the divider once the last column is unfrozen', () => {
    mockColumnWidths([100, 100, 100, 100, 100]);
    const ui = (frozen: number[]) => (
      <TableContainer data-testid="container">
        <Table frozenColumns={{ start: frozen }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCellHeader key={column}>{column}</TableCellHeader>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
    const { rerender } = render(ui([0]));
    const container = screen.getByTestId('container');
    Object.defineProperty(container, 'scrollWidth', { value: 1000 });
    Object.defineProperty(container, 'clientWidth', { value: 400 });
    container.scrollLeft = 100;
    fireEvent.scroll(container);
    expect(screen.getByRole('table')).toHaveAttribute(
      'data-frozen-shadow-start',
      '0',
    );

    rerender(ui([]));

    expect(screen.getByRole('table')).not.toHaveAttribute(
      'data-frozen-shadow-start',
    );
  });

  it('watches header cells added while columns stay frozen', () => {
    const observed: Element[] = [];
    const original = global.ResizeObserver;
    global.ResizeObserver = class {
      observe = (element: Element) => observed.push(element);
      unobserve = () => {};
      disconnect = () => observed.splice(0);
    } as unknown as typeof ResizeObserver;

    try {
      const { rerenderWith } = renderTable({ frozenColumns: { start: [0] } });
      rerenderWith({ order: [...columns, 'F'] });

      expect(observed).toContain(screen.getByText('F').closest('th'));
    } finally {
      global.ResizeObserver = original;
    }
  });

  it('makes header cells sticky with stickyHeader', () => {
    renderTable({ stickyHeader: true });
    const header = screen.getByText('A').closest('th')!;
    expect(isSticky(header)).toBe(true);
    expect(isSticky(screen.getAllByRole('cell')[0])).toBe(false);
  });

  it('has no axe violations with a freeze menu open', async () => {
    const { container } = renderTable({
      freezeControls: true,
      defaultFrozenColumns: { start: [0] },
    });
    await openMenu(2);
    await checkA11y(container);
  });
});

describe('TableContainer', () => {
  it('draws a rounded white card that the css prop can override', () => {
    render(
      <>
        <TableContainer data-testid="default">
          <Table />
        </TableContainer>
        <TableContainer
          data-testid="custom"
          css={{ borderRadius: 8, background: 'transparent' }}>
          <Table />
        </TableContainer>
      </>,
    );
    expect(screen.getByTestId('default')).toHaveStyle({
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 1)',
    });
    expect(screen.getByTestId('custom')).toHaveStyle({
      borderRadius: '8px',
      background: 'transparent',
    });
  });

  it('applies maxHeight and keeps its own styles', () => {
    render(
      <TableContainer
        data-testid="container"
        maxHeight="50vh"
        style={{ color: 'red' }}>
        <Table />
      </TableContainer>,
    );
    const container = screen.getByTestId('container');
    expect(container.style.maxHeight).toBe('50vh');
    expect(container.style.color).toBe('red');
    expect(getComputedStyle(container).overflow).toBe('auto');
  });
});
