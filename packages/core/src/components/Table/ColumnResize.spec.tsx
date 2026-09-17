import { useState } from 'react';
import { fireEvent } from '@testing-library/dom';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableBody from '@components/TableBody';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableCellHeader from '@components/TableCellHeader';
import { checkA11y } from '../../test-utils/axe';
import { TableProps } from './types';
import { screen } from '../../../customTest';

/**
 * jsdom implements neither PointerEvent nor pointer capture.
 *
 * Without the constructor, `fireEvent.pointerDown` falls back to a plain
 * `Event` and silently drops `button` and `clientX`, so a handler that checks
 * either sees `undefined` and every drag test passes for the wrong reason.
 * MouseEvent carries both, which makes it the right base to borrow.
 *
 * Stubbing capture is enough on its own: React dispatches the later move and up
 * events to the handle regardless, which is exactly what capture buys us in a
 * real browser.
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

  const captured = new Set<number>();
  Element.prototype.setPointerCapture = function setPointerCapture(id: number) {
    captured.add(id);
  };
  Element.prototype.releasePointerCapture = function releasePointerCapture(
    id: number,
  ) {
    captured.delete(id);
  };
  Element.prototype.hasPointerCapture = function hasPointerCapture(id: number) {
    return captured.has(id);
  };
};

const COLUMNS = ['Name', 'Email', 'Role'];

const ResizableTable = (props: Partial<TableProps>) => (
  <Table resizableColumns defaultColumnWidths={[200, 200, 200]} {...props}>
    <TableHead>
      <TableRow>
        {COLUMNS.map((column) => (
          <TableCellHeader key={column}>{column}</TableCellHeader>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Ada</TableCell>
        <TableCell>ada@example.com</TableCell>
        <TableCell>Admin</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const getHandles = () => screen.getAllByRole('separator');

/** Drags a handle by `delta` pixels and leaves the pointer released. */
const drag = (handle: HTMLElement, delta: number) => {
  fireEvent.pointerDown(handle, { button: 0, pointerId: 1, clientX: 200 });
  fireEvent.pointerMove(handle, { pointerId: 1, clientX: 200 + delta });
  fireEvent.pointerUp(handle, { pointerId: 1, clientX: 200 + delta });
};

describe('Table column resizing', () => {
  beforeAll(setUpPointerEvents);

  describe('Opting in', () => {
    it('Renders no handles in a plain table', () => {
      render(<ResizableTable resizableColumns={false} />);

      expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    });

    it('Renders one handle per header cell, labelled by its column', () => {
      render(<ResizableTable />);

      const handles = getHandles();

      expect(handles).toHaveLength(COLUMNS.length);
      expect(handles[0]).toHaveAccessibleName('Resize column Name');
      expect(handles[2]).toHaveAccessibleName('Resize column Role');
    });

    it('Marks a pinned column for the hook and the stylesheet', () => {
      const { container } = render(
        <Table resizableColumns defaultColumnWidths={[200, 200, 200]}>
          <TableHead>
            <TableRow>
              <TableCellHeader>Name</TableCellHeader>
              <TableCellHeader>Email</TableCellHeader>
              <TableCellHeader resizable={false}>Actions</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Ada</TableCell>
              <TableCell>ada@example.com</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const headers = container.querySelectorAll('th');
      expect(headers[1]).not.toHaveAttribute('data-column-pinned');
      expect(headers[2]).toHaveAttribute('data-column-pinned', 'true');
    });

    it('Skips columns marked as not resizable', () => {
      render(
        <Table resizableColumns defaultColumnWidths={[100, 100]}>
          <TableHead>
            <TableRow>
              <TableCellHeader>Name</TableCellHeader>
              <TableCellHeader resizable={false}>Actions</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Ada</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const handles = getHandles();

      expect(handles).toHaveLength(1);
      expect(handles[0]).toHaveAccessibleName('Resize column Name');
    });

    it('Renders a colgroup carrying the widths', () => {
      const { container } = render(<ResizableTable />);

      const cols = Array.from(container.querySelectorAll('col'));

      expect(cols).toHaveLength(3);
      expect(cols[0]).toHaveStyle({ width: '200px' });
    });
  });

  describe('Dragging in the default fit mode', () => {
    it('Takes what it gives from the column to the right', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      drag(getHandles()[0], 50);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([250, 150, 200]);
    });

    it('Gives width back to the column to the right', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      drag(getHandles()[1], -20);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([200, 180, 220]);
    });

    it('Keeps the total width unchanged', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      drag(getHandles()[0], 37);

      const [widths] = onColumnWidthsChange.mock.lastCall as [number[]];
      expect(widths.reduce((total, width) => total + width, 0)).toBe(600);
    });

    it('Renders a handle for the last column, for CSS to hide', () => {
      // Which cell is last is only knowable from the DOM, so the handle is
      // always rendered and hidden by a stylesheet rule instead — rendering it
      // conditionally would show it for a frame on every mount.
      render(<ResizableTable />);

      expect(getHandles()).toHaveLength(3);
    });

    it('Does not resize the last column', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      drag(getHandles()[2], 50);
      fireEvent.keyDown(getHandles()[2], { key: 'ArrowRight' });

      expect(onColumnWidthsChange).not.toHaveBeenCalled();
    });

    it('Stops at the minimum of whichever column runs out first', () => {
      const onColumnWidthsChange = jest.fn();
      render(
        <ResizableTable
          minColumnWidth={70}
          onColumnWidthsChange={onColumnWidthsChange}
        />,
      );

      // The column to the right hits 70 long before the drag runs out.
      drag(getHandles()[0], 500);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([330, 70, 200]);
    });

    it('Stops at the dragged column own minimum', () => {
      const onColumnWidthsChange = jest.fn();
      render(
        <ResizableTable
          minColumnWidth={70}
          onColumnWidthsChange={onColumnWidthsChange}
        />,
      );

      drag(getHandles()[0], -500);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([70, 330, 200]);
    });

    it('Respects maxColumnWidth on both columns', () => {
      const onColumnWidthsChange = jest.fn();
      render(
        <ResizableTable
          maxColumnWidth={250}
          onColumnWidthsChange={onColumnWidthsChange}
        />,
      );

      // Growing column one is capped by its own maximum, not by the floor of
      // the column paying for it.
      drag(getHandles()[0], 500);
      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([250, 150, 200]);
    });
  });

  describe('Pinned columns', () => {
    /** The third column is pinned, so the second column's handle has no payer. */
    const withPinnedLastColumn = (props: Partial<TableProps> = {}) => (
      <Table resizableColumns defaultColumnWidths={[200, 200, 200]} {...props}>
        <TableHead>
          <TableRow>
            <TableCellHeader>Name</TableCellHeader>
            <TableCellHeader>Email</TableCellHeader>
            <TableCellHeader resizable={false}>Actions</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
            <TableCell>ada@example.com</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    it('Will not make a pinned column pay for the column before it', () => {
      const onColumnWidthsChange = jest.fn();
      render(withPinnedLastColumn({ onColumnWidthsChange }));

      // The second column's handle would have to shrink the pinned third one.
      drag(getHandles()[1], 40);

      expect(onColumnWidthsChange).not.toHaveBeenCalled();
    });

    it('Will not let a pinned column grow either', () => {
      const onColumnWidthsChange = jest.fn();
      render(withPinnedLastColumn({ onColumnWidthsChange }));

      // The direction that caught this: dragging left hands width *to* the
      // pinned column, which is just as much a resize of it.
      drag(getHandles()[1], -40);
      fireEvent.keyDown(getHandles()[1], { key: 'ArrowLeft' });

      expect(onColumnWidthsChange).not.toHaveBeenCalled();
    });

    it('Leaves handles further from the pinned column alone', () => {
      const onColumnWidthsChange = jest.fn();
      render(withPinnedLastColumn({ onColumnWidthsChange }));

      drag(getHandles()[0], 40);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([240, 160, 200]);
    });

    it('Pins only its own column in expand mode', () => {
      // Nothing pays for a resize there, so a the next column's handle is harmless.
      const onColumnWidthsChange = jest.fn();
      render(
        withPinnedLastColumn({
          columnResizeMode: 'expand',
          onColumnWidthsChange,
        }),
      );

      drag(getHandles()[1], 40);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([200, 240, 200]);
    });
  });

  describe('Dragging in expand mode', () => {
    const expanding = (props: Partial<TableProps> = {}) => (
      <ResizableTable columnResizeMode="expand" {...props} />
    );

    it('Widens only the dragged column', () => {
      const onColumnWidthsChange = jest.fn();
      render(expanding({ onColumnWidthsChange }));

      drag(getHandles()[0], 50);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([250, 200, 200]);
    });

    it('Resizes the last column too', () => {
      const onColumnWidthsChange = jest.fn();
      render(expanding({ onColumnWidthsChange }));

      drag(getHandles()[2], 40);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([200, 200, 240]);
    });

    it('Sizes the table to the sum of its columns', () => {
      const { container } = render(expanding());

      const table = container.querySelector('table');
      expect(table).toHaveStyle({ width: '600px' });

      drag(getHandles()[0], 50);

      expect(table).toHaveStyle({ width: '650px' });
    });

    it('Clamps to minColumnWidth', () => {
      const onColumnWidthsChange = jest.fn();
      render(expanding({ minColumnWidth: 70, onColumnWidthsChange }));

      drag(getHandles()[0], -500);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([70, 200, 200]);
    });

    it('Clamps to maxColumnWidth', () => {
      const onColumnWidthsChange = jest.fn();
      render(expanding({ maxColumnWidth: 260, onColumnWidthsChange }));

      drag(getHandles()[0], 500);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([260, 200, 200]);
    });
  });

  describe('Pointer bookkeeping', () => {
    it('Ignores a non-primary button', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      const handle = getHandles()[0];
      fireEvent.pointerDown(handle, {
        button: 2,
        pointerId: 1,
        clientX: 200,
      });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 260 });

      expect(onColumnWidthsChange).not.toHaveBeenCalled();
    });

    it('Stops tracking after the pointer is released', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      const handle = getHandles()[0];
      drag(handle, 50);
      onColumnWidthsChange.mockClear();
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 400 });

      expect(onColumnWidthsChange).not.toHaveBeenCalled();
    });

    it('Leaves the document selectable once the drag ends', () => {
      render(<ResizableTable />);

      const handle = getHandles()[0];
      fireEvent.pointerDown(handle, { button: 0, pointerId: 1, clientX: 200 });
      expect(document.body).toHaveStyle({ userSelect: 'none' });

      fireEvent.pointerUp(handle, { pointerId: 1, clientX: 250 });
      expect(document.body).not.toHaveStyle({ userSelect: 'none' });
    });
  });

  describe('Keyboard', () => {
    it('Resizes in steps with the arrow keys', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      fireEvent.keyDown(getHandles()[0], { key: 'ArrowRight' });
      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([208, 192, 200]);

      fireEvent.keyDown(getHandles()[0], { key: 'ArrowLeft' });
      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([200, 200, 200]);
    });

    it('Resizes in larger steps with Shift held', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      fireEvent.keyDown(getHandles()[0], { key: 'ArrowRight', shiftKey: true });

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([240, 160, 200]);
    });

    it('Restores the starting width on Enter', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      drag(getHandles()[0], 60);
      fireEvent.keyDown(getHandles()[0], { key: 'Enter' });

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([200, 200, 200]);
    });

    it('Restores the starting width on a double click', () => {
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      drag(getHandles()[0], 60);
      fireEvent.doubleClick(getHandles()[0]);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([200, 200, 200]);
    });

    it('Reports the live width through aria-valuenow', () => {
      render(<ResizableTable minColumnWidth={70} />);

      expect(getHandles()[0]).toHaveAttribute('aria-valuenow', '200');
      expect(getHandles()[0]).toHaveAttribute('aria-valuemin', '70');

      drag(getHandles()[0], 25);

      expect(getHandles()[0]).toHaveAttribute('aria-valuenow', '225');
    });
  });

  describe('Controlled widths', () => {
    it('Does not move until the caller feeds the change back', () => {
      const onColumnWidthsChange = jest.fn();
      const { container } = render(
        <ResizableTable
          columnWidths={[200, 200, 200]}
          onColumnWidthsChange={onColumnWidthsChange}
        />,
      );

      drag(getHandles()[0], 40);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([240, 160, 200]);
      expect(container.querySelector('col')).toHaveStyle({ width: '200px' });
    });

    it('Moves once the caller stores the change', () => {
      const Controlled = () => {
        const [widths, setWidths] = useState([200, 200, 200]);
        return (
          <ResizableTable
            columnWidths={widths}
            onColumnWidthsChange={setWidths}
          />
        );
      };
      const { container } = render(<Controlled />);

      drag(getHandles()[0], 40);

      expect(container.querySelector('col')).toHaveStyle({ width: '240px' });
    });
  });

  describe('Rendered pixels versus stored units', () => {
    /**
     * A fit-mode table is still `width: 100%`, so fixed layout spreads the
     * difference between the widths it was given and the width it has across
     * the columns. Widths of [200, 200, 200] in a 1200px table render at 2x,
     * and a drag measured in rendered pixels has to be divided back down or
     * the column outruns the pointer — issue seen in the controlled story.
     *
     * jsdom reports every measurement as 0, so the scale has to be faked by
     * stubbing the header cells' geometry.
     */
    const renderAtScale = (scale: number) =>
      jest
        .spyOn(HTMLTableCellElement.prototype, 'getBoundingClientRect')
        .mockReturnValue({ width: 200 * scale, height: 44 } as DOMRect);

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('Divides a pointer delta by the scale', () => {
      renderAtScale(2);
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      // 60 rendered pixels is 30 stored units when every unit renders at 2.
      drag(getHandles()[0], 60);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([230, 170, 200]);
    });

    it('Converts keyboard steps too', () => {
      renderAtScale(2);
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      fireEvent.keyDown(getHandles()[0], { key: 'ArrowRight' });

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([204, 196, 200]);
    });

    it('Leaves the delta alone when the two spaces agree', () => {
      renderAtScale(1);
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      drag(getHandles()[0], 60);

      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([260, 140, 200]);
    });

    it('Holds the scale steady for the whole gesture', () => {
      renderAtScale(2);
      const onColumnWidthsChange = jest.fn();
      render(<ResizableTable onColumnWidthsChange={onColumnWidthsChange} />);

      const handle = getHandles()[0];
      fireEvent.pointerDown(handle, { button: 0, pointerId: 1, clientX: 200 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 240 });
      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([220, 180, 200]);

      // Same gesture, twice the distance from where it started — so twice the
      // change, measured from the start and not accumulated frame by frame.
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 280 });
      expect(onColumnWidthsChange).toHaveBeenLastCalledWith([240, 160, 200]);
      fireEvent.pointerUp(handle, { pointerId: 1, clientX: 280 });
    });
  });

  it('Has no axe violations', async () => {
    const { container } = render(<ResizableTable />);

    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
