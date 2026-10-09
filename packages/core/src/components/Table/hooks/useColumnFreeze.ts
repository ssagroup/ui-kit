import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useControllableState } from '@ssa-ui-kit/hooks';
import {
  ColumnFreezeApi,
  ColumnId,
  FrozenColumnIndices,
  FrozenColumns,
} from '../types';
import { getHeaderCells } from '../utils';

/** Custom property holding the sticky offset of the column at `index`. */
export const frozenOffsetVar = (index: number) => `--ssa-table-frozen-${index}`;

/** Attributes naming the frozen column that currently casts each shadow. */
export const SHADOW_START_ATTR = 'data-frozen-shadow-start';
export const SHADOW_END_ATTR = 'data-frozen-shadow-end';

const NO_INDICES: FrozenColumnIndices = { start: [], end: [] };

const unique = (ids?: ColumnId[]) => {
  // Guards plain-JS callers still passing the old shape (a count).
  if (!Array.isArray(ids)) return [];
  const seen = new Set<string>();
  return ids.filter((id) => {
    const key = String(id);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/** Drops duplicates; a column on both lists stays on `start`. */
const normalize = (value?: FrozenColumns): Required<FrozenColumns> => {
  const start = unique(value?.start);
  const startKeys = new Set(start.map(String));
  return {
    start,
    end: unique(value?.end).filter((id) => !startKeys.has(String(id))),
  };
};

/** The id a header cell answers to: its `columnId`, else its position. */
export const getColumnKey = (cell: HTMLTableCellElement, index: number) =>
  cell.dataset.columnId ?? String(index);

const resolveIndices = (
  cells: HTMLTableCellElement[],
  frozen: Required<FrozenColumns>,
): FrozenColumnIndices => {
  const start = new Set(frozen.start.map(String));
  const end = new Set(frozen.end.map(String));
  const keys = cells.map(getColumnKey);
  const indicesOf = (set: Set<string>) =>
    keys.flatMap((key, index) => (set.has(key) ? [index] : []));
  return { start: indicesOf(start), end: indicesOf(end) };
};

const sameIndices = (a: FrozenColumnIndices, b: FrozenColumnIndices) =>
  a.start.join() === b.start.join() && a.end.join() === b.end.join();

const isEmpty = (value: { start: unknown[]; end: unknown[] }) =>
  value.start.length + value.end.length === 0;

const sameElements = (a: Element[], b: Element[]) =>
  a.length === b.length && a.every((element, index) => element === b[index]);

/** What the hook is currently listening to. */
interface Subscriptions {
  scroller: HTMLElement | null;
  cells: HTMLTableCellElement[];
  observer?: ResizeObserver;
}

/** The nearest ancestor that scrolls, which is what sticky cells stick to. */
const getScrollParent = (element: HTMLElement) => {
  let node = element.parentElement;
  while (node) {
    const { overflow, overflowX, overflowY } = getComputedStyle(node);
    if (/auto|scroll|overlay|hidden/.test(overflow + overflowX + overflowY)) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const setAttribute = (element: HTMLElement, name: string, value?: number) => {
  if (value === undefined) element.removeAttribute(name);
  else element.setAttribute(name, String(value));
};

/**
 * Writes every frozen column's sticky offset to the table, and marks which
 * frozen column on each side has content scrolled underneath it.
 */
const applyLayout = (
  table: HTMLTableElement,
  indices: FrozenColumnIndices,
  scroller: HTMLElement | null,
) => {
  const widths = getHeaderCells(table).map(
    (cell) => cell.getBoundingClientRect().width,
  );
  const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

  // Rounded down: columns sit at fractional positions, and a frozen cell that
  // overlaps its neighbour by a fraction of a pixel beats a hairline gap that
  // scrolled content shows through.
  const offsets = new Map<number, number>();
  let offset = 0;
  for (const index of indices.start) {
    offsets.set(index, Math.floor(offset));
    offset += widths[index] ?? 0;
  }
  offset = 0;
  for (const index of [...indices.end].reverse()) {
    offsets.set(index, Math.floor(offset));
    offset += widths[index] ?? 0;
  }
  offsets.forEach((value, index) =>
    table.style.setProperty(frozenOffsetVar(index), `${value}px`),
  );

  // A frozen column is stuck — and has content under it — once the scroll
  // position has carried its natural place past the spot it sticks to. The
  // innermost stuck column on each side carries the divider.
  const scrolled = scroller?.scrollLeft ?? 0;
  const remaining = scroller
    ? scroller.scrollWidth - scroller.clientWidth - scrolled
    : 0;
  const stuckStart = indices.start.filter(
    (index) =>
      scrolled + offsets.get(index)! > sum(widths.slice(0, index)) + 0.5,
  );
  const stuckEnd = indices.end.filter(
    (index) =>
      remaining + offsets.get(index)! > sum(widths.slice(index + 1)) + 0.5,
  );
  setAttribute(table, SHADOW_START_ATTR, stuckStart[stuckStart.length - 1]);
  setAttribute(table, SHADOW_END_ATTR, stuckEnd[0]);
};

interface UseColumnFreezeOptions {
  tableRef: RefObject<HTMLTableElement | null>;
  frozenColumns?: FrozenColumns;
  defaultFrozenColumns?: FrozenColumns;
  onFrozenColumnsChange?: (frozenColumns: Required<FrozenColumns>) => void;
  freezeControls: boolean;
  controlled: boolean;
}

/**
 * Frozen-column state for `Table`, plus the DOM work that keeps frozen cells
 * in place.
 *
 * ## Ids are resolved against the header
 *
 * The caller speaks in column ids; the stylesheet needs positions. After every
 * render the header cells are read back, ids matched to positions, and the
 * positions handed to `TableBase`. Only the set of frozen positions ever
 * reaches emotion, so a column changing width mints no new rules.
 *
 * ## Offsets live in custom properties
 *
 * Each frozen cell is `position: sticky` with a `left`/`right` equal to the
 * width of the frozen columns between it and its edge. Those widths change
 * with every frame of a column resize, so they are written to custom
 * properties on the table element directly.
 *
 * ## Shadows follow the scroll position
 *
 * `data-frozen-shadow-start` / `-end` on the table name the frozen column on
 * each side that has content scrolled underneath it, so the divider only
 * shows when there is something to divide.
 */
export const useColumnFreeze = ({
  tableRef,
  frozenColumns,
  defaultFrozenColumns,
  onFrozenColumnsChange,
  freezeControls,
  controlled,
}: UseColumnFreezeOptions) => {
  const [value, setValue] = useControllableState<FrozenColumns>({
    controlled,
    value: frozenColumns,
    defaultValue: defaultFrozenColumns,
    finalValue: {},
    onChange: onFrozenColumnsChange as (value: FrozenColumns) => void,
  });
  const frozen = normalize(value);
  const frozenRef = useRef(frozen);
  frozenRef.current = frozen;

  const [indices, setIndices] = useState<FrozenColumnIndices>(NO_INDICES);
  const indicesRef = useRef(indices);
  const subscriptions = useRef<Subscriptions>({ scroller: null, cells: [] });

  // Scrolling moves nothing but the shadows, so it skips id resolution and
  // the subscription check.
  const onScroll = useCallback(() => {
    const table = tableRef.current;
    if (table) {
      applyLayout(table, indicesRef.current, subscriptions.current.scroller);
    }
  }, [tableRef]);

  const unsubscribe = useCallback(() => {
    const current = subscriptions.current;
    current.scroller?.removeEventListener('scroll', onScroll);
    current.observer?.disconnect();
    subscriptions.current = { scroller: null, cells: [] };
  }, [onScroll]);

  const update = useCallback(() => {
    const table = tableRef.current;
    if (!table) return;
    // An ordinary table pays nothing: no measuring, no forced layout. The
    // one pass after the last column is unfrozen still runs, to clear the
    // shadow attributes and the subscriptions.
    if (isEmpty(frozenRef.current) && isEmpty(indicesRef.current)) return;

    const cells = getHeaderCells(table);
    const next = resolveIndices(cells, frozenRef.current);
    if (!sameIndices(next, indicesRef.current)) {
      indicesRef.current = next;
      setIndices(next);
    }

    if (isEmpty(next)) {
      unsubscribe();
    } else {
      // Re-checked on every pass, not once: columns can be added, removed or
      // reordered, and the table can move to another scroll container, all
      // while something stays frozen.
      const current = subscriptions.current;
      const scroller = getScrollParent(table);
      if (
        scroller !== current.scroller ||
        !sameElements(cells, current.cells)
      ) {
        unsubscribe();
        scroller?.addEventListener('scroll', onScroll, { passive: true });
        let observer: ResizeObserver | undefined;
        if (typeof ResizeObserver !== 'undefined') {
          // Header cells too: in auto layout a column can change width from
          // its content alone, with the table's own size unchanged.
          observer = new ResizeObserver(() => update());
          observer.observe(table);
          if (scroller) observer.observe(scroller);
          cells.forEach((cell) => observer!.observe(cell));
        }
        subscriptions.current = { scroller, cells, observer };
      }
    }
    applyLayout(table, next, subscriptions.current.scroller);
  }, [onScroll, tableRef, unsubscribe]);

  // Every render: new ids, new columns, a resize drag or new rows can each
  // move a frozen column or its offset.
  useLayoutEffect(update);
  useEffect(() => unsubscribe, [unsubscribe]);

  const setFrozenColumns = useCallback(
    (next: Required<FrozenColumns>) => setValue(normalize(next)),
    [setValue],
  );

  const api: ColumnFreezeApi = {
    frozenColumns: frozen,
    setFrozenColumns,
    freezeControls,
  };
  return { api, indices };
};
