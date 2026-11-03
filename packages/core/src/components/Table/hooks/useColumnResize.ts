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
import { getHeaderCells, isExpanderCell } from '../utils';

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

/** A header cell's own resize limit, set by `TableCellHeader`'s `minWidth`/`maxWidth`. */
const cellLimit = (
  cell: HTMLTableCellElement | undefined,
  key: 'columnMinWidth' | 'columnMaxWidth',
) => {
  const value = Number(cell?.dataset[key]);
  return cell?.dataset[key] !== undefined && Number.isFinite(value)
    ? value
    : undefined;
};

/** Below this, width left to hand out is rounding noise. */
const EPSILON = 0.01;

const sum = (values: number[]) => values.reduce((total, v) => total + v, 0);

/**
 * Rendered pixels per unit of stored width, for the columns that scale.
 *
 * One when the two spaces agree, which is the case whenever the widths were
 * measured from the DOM or the table is sized to their sum. Fixed columns
 * render at their stored width whatever the scale, so they are left out.
 */
const renderScaleOf = (
  table: HTMLTableElement | null,
  widths: number[],
  fixedColumns: number[],
) => {
  const isFlexible = (_: unknown, index: number) =>
    !fixedColumns.includes(index);
  const storedTotal = sum(widths.filter(isFlexible));
  if (!storedTotal) return 1;
  const renderedTotal = getHeaderCells(table)
    .filter(isFlexible)
    .reduce((total, cell) => total + cell.getBoundingClientRect().width, 0);
  // No layout engine (jsdom) or a table that is not displayed: the only honest
  // answer is to assume the spaces agree.
  if (!renderedTotal) return 1;
  return renderedTotal / storedTotal;
};

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

  /**
   * The columns to the right of `index` that pay for its resize in fit mode:
   * every one the user may resize. Pinned columns and the table's own fixed
   * columns keep their width.
   */
  const payersOf = useCallback((index: number, count: number) => {
    const payers: number[] = [];
    for (let i = index + 1; i < count; i++) {
      if (
        !isColumnPinned(tableRef.current, i) &&
        !fixedColumnsRef.current.includes(i)
      ) {
        payers.push(i);
      }
    }
    return payers;
  }, []);

  /**
   * The widths after resizing column `index` of `base` to `width`, or `null`
   * when nothing changes. Pure in `base`, so a drag can recompute every frame
   * from the widths it started with, and dragging back restores them exactly.
   */
  const resizedWidths = useCallback(
    (base: number[], index: number, width: number): number[] | null => {
      const from = base[index];
      if (from === undefined) return null;

      const cells = getHeaderCells(tableRef.current);
      // A column measured outside its limits may move back towards them but
      // never jumps: its current width stands in for the limit it breaks.
      const minOf = (i: number) =>
        Math.min(
          cellLimit(cells[i], 'columnMinWidth') ?? minColumnWidth,
          base[i],
        );
      const maxOf = (i: number) =>
        Math.max(
          cellLimit(cells[i], 'columnMaxWidth') ?? maxColumnWidth ?? Infinity,
          base[i],
        );

      if (columnResizeMode === 'expand') {
        const to = clamp(width, minOf(index), maxOf(index));
        return to === from ? null : replaceAt(base, index, to);
      }

      // fit mode: the columns to the right pay for the change between them,
      // each in proportion to its width, so the table's total width is
      // unchanged and nothing around it reflows.
      const payers = payersOf(index, base.length);
      if (payers.length === 0) return null;

      const next = base.slice();
      /** How far column `i` can still move in `direction` (1 grows, -1 shrinks). */
      const roomOf = (i: number, direction: 1 | -1) =>
        direction === 1 ? maxOf(i) - next[i] : next[i] - minOf(i);
      const payersRoom = (direction: 1 | -1) =>
        sum(payers.map((i) => Math.max(0, roomOf(i, direction))));

      // Every column involved constrains the move, and whichever runs out
      // first wins — clamping only the dragged column would let the payers
      // slide past their limits, and the widths would stop adding up.
      const delta = clamp(
        width - from,
        -Math.min(from - minOf(index), payersRoom(1)),
        Math.min(maxOf(index) - from, payersRoom(-1)),
      );
      if (Math.abs(delta) < EPSILON) return null;
      next[index] = from + delta;

      // Hand the change out by width; a payer that hits its limit drops out
      // and the rest share what it could not take.
      const direction = delta > 0 ? -1 : 1;
      let remaining = Math.abs(delta);
      let active = payers.filter((i) => roomOf(i, direction) > EPSILON);
      while (remaining > EPSILON && active.length > 0) {
        const total = sum(active.map((i) => next[i]));
        let spent = 0;
        for (const i of active) {
          const share = Math.min(
            (remaining * next[i]) / total,
            roomOf(i, direction),
          );
          next[i] += direction * share;
          spent += share;
        }
        remaining -= spent;
        active = active.filter((i) => roomOf(i, direction) > EPSILON);
      }
      return next;
    },
    [columnResizeMode, maxColumnWidth, minColumnWidth, payersOf],
  );

  const setColumnWidth = useCallback(
    (index: number, width: number) => {
      const next = resizedWidths(widthsRef.current, index, width);
      if (next) setWidths(next);
    },
    [resizedWidths, setWidths],
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

  // Columns the table adds on its own, such as NestedTable's toggle column.
  // In fit mode they keep their width while the rest share out the table's.
  const [fixedColumns, setFixedColumns] = useState<number[]>([]);
  const fixedColumnsRef = useRef(fixedColumns);
  fixedColumnsRef.current = fixedColumns;

  useLayoutEffect(() => {
    if (!enabled) return;
    const next = getHeaderCells(tableRef.current).flatMap((cell, index) =>
      isExpanderCell(cell) ? [index] : [],
    );
    // Returning the same array bails out, so a drag frame never re-renders
    // for this.
    setFixedColumns((current) =>
      current.join() === next.join() ? current : next,
    );
  });

  const dragRef = useRef({
    startX: 0,
    startWidths: [] as number[],
    index: -1,
    scale: 1,
  });

  /** Converts a distance the pointer moved into stored width units. */
  const toWidthUnits = useCallback(
    (pixels: number) =>
      pixels /
      renderScaleOf(
        tableRef.current,
        widthsRef.current,
        fixedColumnsRef.current,
      ),
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
        payersOf(index, widthsRef.current.length).length === 0
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
        startWidths: widthsRef.current,
        index,
        // Captured once for the gesture. In fit mode the stored total does not
        // change while dragging, so the scale cannot drift; recomputing it per
        // move would let the widths feed back into their own conversion.
        scale: renderScaleOf(
          tableRef.current,
          widthsRef.current,
          fixedColumnsRef.current,
        ),
      };
      setResizingColumnIndex(index);
      setDragCursor(true);
    },
    [columnResizeMode, payersOf],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const { index, startX, startWidths, scale } = dragRef.current;
      if (index === -1) return;
      // Back where it started, the drag hands back the starting widths.
      const next =
        resizedWidths(
          startWidths,
          index,
          startWidths[index] + (event.clientX - startX) / scale,
        ) ?? startWidths;
      if (next !== widthsRef.current) setWidths(next);
    },
    [resizedWidths, setWidths],
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
    (index: number): ResizeHandleProps => {
      // Called while rendering a handle, whose header cell is already in the
      // DOM: the handle only asks once it has found its own column index.
      const cell = getHeaderCells(tableRef.current)[index];
      const max = cellLimit(cell, 'columnMaxWidth') ?? maxColumnWidth;
      return {
        role: 'separator',
        'aria-orientation': 'vertical',
        'aria-valuenow': Math.round(widthsRef.current[index] ?? 0),
        'aria-valuemin': cellLimit(cell, 'columnMinWidth') ?? minColumnWidth,
        ...(max === undefined ? {} : { 'aria-valuemax': max }),
        tabIndex: 0,
        'data-resizing': resizingColumnIndex === index ? 'true' : undefined,
        onPointerDown: handlePointerDown(index),
        onPointerMove: handlePointerMove,
        onPointerUp: endDrag,
        onPointerCancel: endDrag,
        onDoubleClick: () => resetColumn(index),
        onKeyDown: handleKeyDown(index),
      };
    },
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
    fixedColumns,
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
