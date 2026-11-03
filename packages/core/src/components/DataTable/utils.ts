import { DataTableColumn, DataTableColumnState, DataTableSort } from './types';

/** Width of the checkbox or radio column, in pixels. */
export const SELECTION_COLUMN_WIDTH = 48;

/** Width of the expand/collapse column, in pixels. */
export const EXPANDER_COLUMN_WIDTH = 36;

/** Extra left padding of a nested row's first cell, per level. */
export const NESTED_INDENT = 24;

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

/**
 * Every column id in display order: `order` first, skipping unknown ids, then
 * the rest in the order of `columns`. The same rule TanStack applies.
 */
export const getFullOrder = <Row>(
  columns: DataTableColumn<Row>[],
  order: string[],
) => {
  const known = new Set(columns.map(({ id }) => id));
  const listed = [...new Set(order)].filter((id) => known.has(id));
  const placed = new Set(listed);
  return [
    ...listed,
    ...columns.flatMap(({ id }) => (placed.has(id) ? [] : id)),
  ];
};

/** Where a column sits while scrolling: frozen to an edge, or not. */
export const getFreezeZone = (
  frozen: DataTableColumnState['frozen'],
  id: string,
) =>
  frozen.start.includes(id)
    ? 'start'
    : frozen.end.includes(id)
      ? 'end'
      : 'scroll';

/**
 * Moves column `id` to where `targetId` is, shifting the columns between.
 * Only the slots `canMoveTo` accepts take part, so every other column keeps
 * its position. Returns `null` when the target is not one of those slots.
 */
export const moveColumn = (
  order: string[],
  id: string,
  targetId: string,
  canMoveTo: (id: string) => boolean,
) => {
  if (id === targetId) return null;
  const slots = order.filter((other) => other === id || canMoveTo(other));
  const from = slots.indexOf(id);
  const to = slots.indexOf(targetId);
  if (from === -1 || to === -1) return null;
  const moved = [...slots];
  moved.splice(from, 1);
  moved.splice(to, 0, id);
  let slot = 0;
  return order.map((other) =>
    other === id || canMoveTo(other) ? moved[slot++] : other,
  );
};

/** The nearest slot `canMoveTo` accepts on one side of column `id`. */
export const getAdjacentColumn = (
  order: string[],
  id: string,
  side: 'left' | 'right',
  canMoveTo: (id: string) => boolean,
) => {
  const index = order.indexOf(id);
  const candidates =
    side === 'left' ? order.slice(0, index).reverse() : order.slice(index + 1);
  return candidates.find(canMoveTo) ?? null;
};

/** How a row's checkbox shows. */
export type CheckState = 'checked' | 'partial' | 'unchecked';

/**
 * Cascading selection over a tree of rows. A row with selectable
 * descendants is not selected for itself: it follows the leaves below it,
 * checked when all are, partly when some are. Its id is in the selection
 * exactly when it is checked, so the ids still name every selected row —
 * unless `canSelect` rejects it: its checkbox still selects the rows below,
 * but its own id is never in the selection.
 *
 * Ids not in the tree, such as rows on another page, are left alone.
 */
export const createSelectionTree = (
  tree: Map<string, { parentId?: string; childIds: string[] }>,
  canSelect: (id: string) => boolean,
) => {
  const leavesCache = new Map<string, string[]>();
  /** The selectable rows at the bottom of the branch, or the row itself. */
  const leavesOf = (id: string): string[] => {
    const cached = leavesCache.get(id);
    if (cached) return cached;
    const below = (tree.get(id)?.childIds ?? []).flatMap(leavesOf);
    const leaves = below.length ? below : canSelect(id) ? [id] : [];
    leavesCache.set(id, leaves);
    return leaves;
  };
  const roots = [...tree.keys()].filter((id) => !tree.get(id)?.parentId);
  const allLeaves = roots.flatMap(leavesOf);

  const stateOf = (leaves: string[], selected: Set<string>): CheckState => {
    const count = leaves.filter((leaf) => selected.has(leaf)).length;
    if (count === 0) return 'unchecked';
    return count === leaves.length ? 'checked' : 'partial';
  };

  /** Adds or drops ancestors to match their leaves. */
  const normalize = (ids: string[]) => {
    const set = new Set(ids);
    const kept = ids.filter((id) => {
      const leaves = leavesOf(id);
      return (
        !tree.has(id) ||
        leaves.includes(id) ||
        (canSelect(id) &&
          leaves.length > 0 &&
          leaves.every((leaf) => set.has(leaf)))
      );
    });
    const keptSet = new Set(kept);
    const added = [...tree.keys()].filter(
      (id) =>
        !keptSet.has(id) &&
        canSelect(id) &&
        !leavesOf(id).includes(id) &&
        leavesOf(id).length > 0 &&
        leavesOf(id).every((leaf) => set.has(leaf)),
    );
    return [...kept, ...added];
  };

  const withLeaves = (ids: string[], leaves: string[], on: boolean) => {
    const drop = new Set(leaves);
    const rest = ids.filter((id) => !drop.has(id));
    return normalize(on ? [...rest, ...leaves] : rest);
  };

  return {
    rowState: (id: string, selected: Set<string>) =>
      stateOf(leavesOf(id), selected),
    /** Whether the row has anything to select, itself or below. */
    isSelectable: (id: string) => leavesOf(id).length > 0,
    allState: (selected: Set<string>) => stateOf(allLeaves, selected),
    toggleRow: (ids: string[], id: string, on: boolean) =>
      withLeaves(ids, leavesOf(id), on),
    toggleAll: (ids: string[], on: boolean) => withLeaves(ids, allLeaves, on),
  };
};

/**
 * A row's own `id` field as a row id, when it has a string or number one.
 * What a table without `getRowId` keys its rows by.
 */
export const getOwnRowId = (row: unknown): string | undefined => {
  const id = (row as { id?: unknown } | null)?.id;
  return typeof id === 'string' ||
    (typeof id === 'number' && Number.isFinite(id))
    ? String(id)
    : undefined;
};
