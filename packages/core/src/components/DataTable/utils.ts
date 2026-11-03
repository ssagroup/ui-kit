import { DataTableColumn, DataTableColumnState, DataTableSort } from './types';

export const EMPTY_COLUMN_STATE: DataTableColumnState = {
  order: [],
  widths: {},
  frozen: { start: [], end: [] },
  hidden: [],
};

/** Fills a partial column state in with defaults. */
export const toColumnState = (
  value?: Partial<DataTableColumnState>,
): DataTableColumnState => ({
  order: value?.order ?? EMPTY_COLUMN_STATE.order,
  widths: value?.widths ?? EMPTY_COLUMN_STATE.widths,
  frozen: {
    start: value?.frozen?.start ?? EMPTY_COLUMN_STATE.frozen.start,
    end: value?.frozen?.end ?? EMPTY_COLUMN_STATE.frozen.end,
  },
  hidden: value?.hidden ?? EMPTY_COLUMN_STATE.hidden,
});

/**
 * What the TanStack model depends on. Header and cell renderers are left out
 * on purpose: they are read from the latest `columns` at render time, so an
 * inline `columns` array does not rebuild the model on every render.
 */
export const getColumnsSignature = <Row>(columns: DataTableColumn<Row>[]) =>
  columns
    .map(
      ({ id, sortable, sortFn }) =>
        `${id}:${sortable ? 1 : 0}${sortFn ? 1 : 0}`,
    )
    .join('|');

/**
 * The sort after a click on a sortable header: the same column flips
 * direction, another column starts ascending.
 */
export const getNextSort = (
  current: DataTableSort | null,
  columnId: string,
): DataTableSort => ({
  columnId,
  direction:
    current?.columnId === columnId && current.direction === 'asc'
      ? 'desc'
      : 'asc',
});

/** Whether a click landed on something inside a row with its own behaviour. */
export const isInteractiveTarget = (
  target: EventTarget | null,
  row: HTMLElement,
) => {
  if (!(target instanceof Element)) return false;
  const interactive = target.closest(
    'a, button, input, select, textarea, label, [role="button"], [role="menuitem"], [role="checkbox"], [contenteditable="true"]',
  );
  return interactive !== null && row.contains(interactive);
};
