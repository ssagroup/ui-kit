import {
  KeyboardEvent,
  PointerEvent,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useControllableState } from '@ssa-ui-kit/hooks';
import {
  DEFAULT_MIN_COLUMN_WIDTH,
  KEYBOARD_RESIZE_STEP,
  KEYBOARD_RESIZE_STEP_LARGE,
} from '../consts';
import {
  ColumnResizeApi,
  ResizeHandleProps,
  UseColumnResizeOptions,
} from '../types';

/** The cells that define the column grid — the first header row, or row one. */
const getHeaderCells = (table: HTMLTableElement | null) => {
  const row = table?.tHead?.rows[0] ?? table?.rows[0];
  return row ? Array.from(row.cells) : [];
};

/**
 * Whether a column has been pinned by its header cell.
 *
 * Read from the DOM rather than passed in, because the header cell that knows
 * it is pinned renders no handle and so has nothing to register with. The
 * attribute is the contract: `TableCellHeader` sets it from `resizable={false}`,
 * and a hand-built header should set it too.
 */
const isColumnPinned = (table: HTMLTableElement | null, index: number) =>
  getHeaderCells(table)[index]?.dataset.columnPinned === 'true';

const clamp = (value: number, min: number, max?: number) => {
  const lower = Math.max(value, min);
  return max === undefined ? lower : Math.min(lower, max);
};

/**
 * Rendered pixels per unit of stored width.
 *
 * One when the two spaces agree, which is the case whenever the widths were
 * measured from the DOM or the table is sized to their sum.
 */
const renderScaleOf = (table: HTMLTableElement | null, storedTotal: number) => {
  if (!storedTotal) return 1;
  const renderedTotal = getHeaderCells(table).reduce(
    (total, cell) => total + cell.getBoundingClientRect().width,
    0,
  );
  // No layout engine (jsdom) or a table that is not displayed: the only honest
  // answer is to assume the spaces agree.
  if (!renderedTotal) return 1;
  return renderedTotal / storedTotal;
};

const sum = (values: number[]) => values.reduce((total, v) => total + v, 0);

const replaceAt = (widths: number[], index: number, width: number) => {
  const next = widths.slice();
  next[index] = width;
  return next;
};

/**
 * Column resizing for a `Table`, without any of the rendering.
 *
 * Owns the width of every column and the pointer/keyboard maths that moves it.
 * `Table`'s `resizableColumns` prop is a thin wrapper over this hook — reach for
 * the hook directly when the header is built from something other than
 * `TableCellHeader`, or when the handles need to live somewhere unusual.
 *
 * ## Widths are measured, not invented
 *
 * With no `defaultColumnWidths`, the first layout pass reads the columns' real
 * rendered widths off the DOM while the table is still in `table-layout: auto`,
 * and seeds state from those. The table only switches to `fixed` once it has
 * numbers to switch to, so an uncontrolled table starts out looking exactly as
 * it did before resizing was turned on. Under jsdom every measurement comes back
 * `0`; the hook then stays unseeded, so tests that care about widths should pass
 * `defaultColumnWidths` explicitly.
 *
 * ## Two ways to spend the width
 *
 * In the default `fit` mode a resize is a trade: the column to the right gives
 * up exactly what the dragged column gains, so the table's own width never
 * changes and no surrounding layout moves. The last column has nothing to its
 * right and so cannot be dragged.
 *
 * In `expand` mode the table grows instead, and the columns beside the dragged
 * one keep their widths. That needs a horizontally scrollable container, or the
 * table will overflow whatever is holding it.
 *
 * A column marked `data-column-pinned="true"` on its header cell never pays for
 * the column before it in `fit` mode, so that handle is inert — pinning a
 * column pins it against every route to changing its width, not just its own
 * handle.
 *
 * ## Stored widths are not always rendered widths
 *
 * A table in `fit` mode is still `width: 100%`, and fixed layout spreads any
 * difference between the widths it was given and the width it actually has
 * across the columns in proportion. Widths of `[220, 140, 140, 96]` in a
 * 1248px table therefore render at a little over twice their stated size.
 *
 * That makes two coordinate spaces: the caller's units, which the widths and
 * the min/max bounds are in, and rendered pixels, which is what a pointer
 * moves through. Every gesture is converted between them, so a column tracks
 * the pointer exactly no matter how far apart the two spaces are — without
 * quietly rewriting the numbers the caller chose.
 *
 * @example
 * ```tsx
 * const { columnWidths, tableRef, getResizeHandleProps } = useColumnResize({
 *   defaultColumnWidths: [240, 160, 160],
 *   onColumnWidthsChange: (widths) => localStorage.setItem('cols', JSON.stringify(widths)),
 * });
 *
 * <table ref={tableRef} style={{ tableLayout: 'fixed' }}>
 *   <colgroup>
 *     {columnWidths.map((width, index) => <col key={index} style={{ width }} />)}
 *   </colgroup>
 *   <thead>
 *     <tr>
 *       {headers.map((header, index) => (
 *         <th key={header}>
 *           {header}
 *           <span {...getResizeHandleProps(index)} />
 *         </th>
 *       ))}
 *     </tr>
 *   </thead>
 * </table>
 * ```
 *
 * @see {@link Table} - pass `resizableColumns` to get all of this wired up
 * @see {@link ColumnResizeHandle} - the handle `TableCellHeader` renders for you
 */
export const useColumnResize = (
  options: UseColumnResizeOptions = {},
): ColumnResizeApi => {
  const {
    columnWidths,
    defaultColumnWidths,
    onColumnWidthsChange,
    minColumnWidth = DEFAULT_MIN_COLUMN_WIDTH,
    maxColumnWidth,
    columnResizeMode = 'fit',
    enabled = true,
    controlled = 'columnWidths' in options,
  } = options;

  const tableRef = useRef<HTMLTableElement | null>(null);
  const [resizingColumnIndex, setResizingColumnIndex] = useState<number | null>(
    null,
  );

  const [widths = [], setWidths] = useControllableState<number[]>({
    controlled,
    value: columnWidths,
    defaultValue: defaultColumnWidths,
    finalValue: [],
    onChange: onColumnWidthsChange,
  });

  // Read through refs by the pointer handlers, which outlive the render that
  // created them: a drag reads the widths as they are mid-gesture, not as they
  // were when the handle's props were built.
  const widthsRef = useRef(widths);
  widthsRef.current = widths;

  // What `resetColumn` goes back to. Captured from the first widths the hook
  // ever holds, so "reset" means "how this column started", which is stable and
  // explainable — the natural content width cannot be re-measured once the
  // table is in fixed layout without a visible reflow.
  const initialWidthsRef = useRef<number[] | null>(null);
  if (initialWidthsRef.current === null && widths.length > 0) {
    initialWidthsRef.current = widths;
  }

  /** How much room a column has left before it would exceed the maximum. */
  const headroom = (width: number) =>
    maxColumnWidth === undefined ? Infinity : maxColumnWidth - width;

  const setColumnWidth = useCallback(
    (index: number, width: number) => {
      const current = widthsRef.current;
      const from = current[index];
      if (from === undefined) return;

      if (columnResizeMode === 'expand') {
        const to = clamp(width, minColumnWidth, maxColumnWidth);
        if (to === from) return;
        setWidths(replaceAt(current, index, to));
        return;
      }

      // fit mode: the column to the right pays for the change, so the table's
      // total width is unchanged and nothing around it reflows.
      const neighbor = current[index + 1];
      if (neighbor === undefined) return;
      // A pinned column is one the user may not resize, and paying for a
      // the next column's growth would resize it just the same.
      if (isColumnPinned(tableRef.current, index + 1)) return;

      // Both columns constrain the move, and whichever runs out first wins —
      // clamping only the dragged column would let its partner slide past the
      // minimum, and then the widths would stop adding up.
      const delta = clamp(
        width - from,
        -Math.min(from - minColumnWidth, headroom(neighbor)),
        Math.min(headroom(from), neighbor - minColumnWidth),
      );
      if (delta === 0) return;

      const next = current.slice();
      next[index] = from + delta;
      next[index + 1] = neighbor - delta;
      setWidths(next);
    },
    [columnResizeMode, maxColumnWidth, minColumnWidth, setWidths],
  );

  const resizeColumnBy = useCallback(
    (index: number, delta: number) => {
      const current = widthsRef.current[index];
      if (current === undefined) return;
      setColumnWidth(index, current + delta);
    },
    [setColumnWidth],
  );

  const resetColumn = useCallback(
    (index: number) => {
      const initial = initialWidthsRef.current?.[index];
      if (initial === undefined) return;
      setColumnWidth(index, initial);
    },
    [setColumnWidth],
  );

  // Seed from the live layout, and re-seed whenever the column count changes —
  // a table that gains or loses a column has a different grid to measure.
  useLayoutEffect(() => {
    if (!enabled || controlled) return;
    const cells = getHeaderCells(tableRef.current);
    if (cells.length === 0 || cells.length === widthsRef.current.length) return;

    const measured = cells.map((cell) => cell.getBoundingClientRect().width);
    // Every width zero means no layout engine (jsdom) or a table that is not
    // displayed yet. Staying unseeded leaves the table in auto layout, which is
    // the correct thing to render when we do not know any better.
    if (measured.some((width) => !width)) return;

    initialWidthsRef.current = measured;
    setWidths(measured);
  });

  const dragRef = useRef({ startX: 0, startWidth: 0, index: -1, scale: 1 });

  /** Converts a distance the pointer moved into stored width units. */
  const toWidthUnits = useCallback(
    (pixels: number) =>
      pixels / renderScaleOf(tableRef.current, sum(widthsRef.current)),
    [],
  );

  // Suppressing selection on `body` rather than on the table: a drag that
  // leaves the table still selects text in whatever it passes over.
  const setDragCursor = (active: boolean) => {
    const { style } = document.body;
    style.cursor = active ? 'col-resize' : '';
    style.userSelect = active ? 'none' : '';
  };

  useEffect(() => () => setDragCursor(false), []);

  const handlePointerDown = useCallback(
    (index: number) => (event: PointerEvent<HTMLElement>) => {
      // Primary button only; a right-click drag is not a resize.
      if (event.button !== 0) return;
      const width = widthsRef.current[index];
      if (width === undefined) return;
      // Nothing to trade with, so there is nothing to start.
      if (
        columnResizeMode === 'fit' &&
        (index >= widthsRef.current.length - 1 ||
          isColumnPinned(tableRef.current, index + 1))
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      // Capture re-routes every later move and up event to this handle, so the
      // gesture survives the pointer outrunning the 8px hit area, which it will.
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = {
        startX: event.clientX,
        startWidth: width,
        index,
        // Captured once for the gesture. In fit mode the stored total does not
        // change while dragging, so the scale cannot drift; recomputing it per
        // move would let the widths feed back into their own conversion.
        scale: renderScaleOf(tableRef.current, sum(widthsRef.current)),
      };
      setResizingColumnIndex(index);
      setDragCursor(true);
    },
    [columnResizeMode],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const { index, startX, startWidth, scale } = dragRef.current;
      if (index === -1) return;
      setColumnWidth(index, startWidth + (event.clientX - startX) / scale);
    },
    [setColumnWidth],
  );

  const endDrag = useCallback((event: PointerEvent<HTMLElement>) => {
    if (dragRef.current.index === -1) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current.index = -1;
    setResizingColumnIndex(null);
    setDragCursor(false);
  }, []);

  const handleKeyDown = useCallback(
    (index: number) => (event: KeyboardEvent<HTMLElement>) => {
      // The steps are documented in pixels, which is what the user sees move.
      const step = toWidthUnits(
        event.shiftKey ? KEYBOARD_RESIZE_STEP_LARGE : KEYBOARD_RESIZE_STEP,
      );

      switch (event.key) {
        case 'ArrowLeft':
          resizeColumnBy(index, -step);
          break;
        case 'ArrowRight':
          resizeColumnBy(index, step);
          break;
        case 'Enter':
          resetColumn(index);
          break;
        default:
          return;
      }
      event.preventDefault();
    },
    [resetColumn, resizeColumnBy, toWidthUnits],
  );

  const getResizeHandleProps = useCallback(
    (index: number): ResizeHandleProps => ({
      role: 'separator',
      'aria-orientation': 'vertical',
      'aria-valuenow': Math.round(widthsRef.current[index] ?? 0),
      'aria-valuemin': minColumnWidth,
      ...(maxColumnWidth === undefined
        ? {}
        : { 'aria-valuemax': maxColumnWidth }),
      tabIndex: 0,
      'data-resizing': resizingColumnIndex === index ? 'true' : undefined,
      onPointerDown: handlePointerDown(index),
      onPointerMove: handlePointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onDoubleClick: () => resetColumn(index),
      onKeyDown: handleKeyDown(index),
    }),
    [
      endDrag,
      handleKeyDown,
      handlePointerDown,
      handlePointerMove,
      maxColumnWidth,
      minColumnWidth,
      resetColumn,
      resizingColumnIndex,
    ],
  );

  return {
    columnWidths: widths,
    tableRef: tableRef as RefObject<HTMLTableElement | null>,
    isResizing: resizingColumnIndex !== null,
    resizingColumnIndex,
    minColumnWidth,
    maxColumnWidth,
    columnResizeMode,
    setColumnWidth,
    resizeColumnBy,
    resetColumn,
    getResizeHandleProps,
  };
};
