import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import TableBody from '@components/TableBody';
import TableHead from '@components/TableHead';
import TableContainer from '@components/TableContainer';
import {
  NestedTable,
  NestedTableCell,
  NestedTableCellHeader,
  NestedTableRow,
} from './components';
import { WithNestedTableRow } from './WithNestedTableRow';
import { NestedTableProps } from './types';
import { screen } from '../../../customTest';

const COLUMNS = ['Team', 'Size', 'Lead'];

const renderTable = (
  props: Partial<NestedTableProps> = {},
  { ids = false } = {},
) =>
  render(
    <TableContainer>
      <NestedTable {...props}>
        <TableHead>
          <NestedTableRow isHeader>
            {COLUMNS.map((column) => (
              <NestedTableCellHeader
                key={column}
                columnId={ids ? column.toLowerCase() : undefined}>
                {column}
              </NestedTableCellHeader>
            ))}
          </NestedTableRow>
        </TableHead>
        <TableBody>
          <WithNestedTableRow>
            <NestedTableRow>
              <NestedTableCell>Engineering</NestedTableCell>
              <NestedTableCell>24</NestedTableCell>
              <NestedTableCell>Ada</NestedTableCell>
            </NestedTableRow>
            <NestedTableRow>
              <NestedTableCell>Platform</NestedTableCell>
              <NestedTableCell>9</NestedTableCell>
              <NestedTableCell>Grace</NestedTableCell>
            </NestedTableRow>
          </WithNestedTableRow>
        </TableBody>
      </NestedTable>
    </TableContainer>,
  );

const isSticky = (cell: Element) =>
  getComputedStyle(cell).position === 'sticky';

/** Stickiness of every cell in the header row, toggle column first. */
const headerStickiness = () =>
  Array.from(screen.getAllByRole('row')[0].children).map(isSticky);

const triggers = () =>
  screen.getAllByRole('button', { name: 'Freeze column options' });

describe('NestedTable columns', () => {
  describe('Header cells', () => {
    it('renders a plain th outside resizing and freezing', () => {
      renderTable();
      expect(screen.getAllByRole('columnheader')).toHaveLength(4);
      expect(screen.queryByRole('separator')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Freeze column options' }),
      ).not.toBeInTheDocument();
    });

    it('gives each of your columns a resize handle, and the toggle column none', () => {
      renderTable({ resizableColumns: true });
      const headers = screen.getAllByRole('columnheader');

      expect(screen.getAllByRole('separator')).toHaveLength(3);
      expect(headers[0].querySelector('[role="separator"]')).toBeNull();
    });

    it('gives each of your columns a freeze menu, and the toggle column none', () => {
      renderTable({ freezeControls: true });
      const headers = screen.getAllByRole('columnheader');

      expect(triggers()).toHaveLength(3);
      expect(headers[0].querySelector('button')).toBeNull();
    });

    it('truncates plain text with an ellipsis when resizable', () => {
      renderTable({ resizableColumns: true });
      const text = screen.getByText('Engineering');

      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveStyle({ textOverflow: 'ellipsis' });
    });

    it('leaves the content as it is when not resizable', () => {
      renderTable();
      expect(screen.getByText('Engineering').tagName).toBe('DIV');
    });
  });

  describe('Freezing', () => {
    it('counts columns from your first one, not the toggle column', () => {
      renderTable({ frozenColumns: { start: [1] } });
      // Not the first column, so the toggle column scrolls away.
      expect(headerStickiness()).toEqual([false, false, true, false]);
    });

    it('freezes the toggle column with the first column', () => {
      renderTable({ frozenColumns: { start: ['team'] } }, { ids: true });
      expect(headerStickiness()).toEqual([true, true, false, false]);
    });

    it('freezes the toggle column with the first column among others', () => {
      renderTable({ frozenColumns: { start: [2, 0] } });
      expect(headerStickiness()).toEqual([true, true, false, true]);
    });

    it('leaves the toggle column alone when only the right edge is frozen', () => {
      renderTable({ frozenColumns: { end: ['lead'] } }, { ids: true });
      expect(headerStickiness()).toEqual([false, false, false, true]);
    });

    it('freezes body cells in the same columns', () => {
      renderTable({ frozenColumns: { start: [0] } });
      const row = screen.getByText('Platform').closest('tr')!;

      expect(Array.from(row.children).map(isSticky)).toEqual([
        true,
        true,
        false,
        false,
      ]);
    });

    it('reports positions without the toggle column from the menu', async () => {
      const onFrozenColumnsChange = jest.fn();
      renderTable({ freezeControls: true, onFrozenColumnsChange });

      await userEvent.click(triggers()[0]);
      await userEvent.click(
        screen.getByRole('menuitem', { name: 'Freeze to the left' }),
      );

      expect(onFrozenColumnsChange).toHaveBeenLastCalledWith({
        start: [0],
        end: [],
      });
      expect(headerStickiness()).toEqual([true, true, false, false]);
    });

    it('keeps the header in view with stickyHeader', () => {
      renderTable({ stickyHeader: true });
      expect(headerStickiness()).toEqual([true, true, true, true]);
    });
  });

  describe('Backgrounds', () => {
    it('keeps cells transparent in an ordinary nested table', () => {
      renderTable();
      const cell = screen.getByText('Platform').closest('td')!;
      expect(cell).toHaveStyle({ background: 'transparent' });
    });

    it.each<[string, Partial<NestedTableProps>]>([
      ['stickyHeader', { stickyHeader: true }],
      ['freezeControls', { freezeControls: true }],
      ['frozenColumns', { frozenColumns: { start: [0] } }],
    ])('paints cells with the row background under %s', (_, props) => {
      renderTable(props);
      const cell = screen.getByText('Platform').closest('td')!;
      expect(cell).toHaveStyle({ background: 'inherit' });
    });
  });

  describe('Resizing', () => {
    it('takes widths without the toggle column and adds its own', () => {
      renderTable({
        resizableColumns: true,
        columnResizeMode: 'expand',
        columnWidths: [100, 120, 140],
      });
      const cols = Array.from(document.querySelectorAll('col'));

      expect(cols.map((col) => col.style.width)).toEqual([
        '36px',
        '100px',
        '120px',
        '140px',
      ]);
    });

    it('keeps the toggle column at its width while the rest share spare space', () => {
      renderTable({ resizableColumns: true, columnWidths: [100, 100, 200] });
      const cols = Array.from(document.querySelectorAll('col'));

      // Fit mode fills the parent; only your columns grow, in proportion.
      expect(cols.map((col) => col.style.width)).toEqual([
        '36px',
        '25%',
        '25%',
        '50%',
      ]);
      // And it overflows, rather than squeezing, in a narrower parent.
      expect(screen.getByRole('table').style.minWidth).toBe('436px');
    });

    it('reports widths without the toggle column', () => {
      const onColumnWidthsChange = jest.fn();
      renderTable({
        resizableColumns: true,
        defaultColumnWidths: [200, 200, 200],
        onColumnWidthsChange,
      });

      fireEvent.keyDown(screen.getAllByRole('separator')[0], {
        key: 'ArrowRight',
      });
      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([208, 192, 200]);
    });
  });
});
