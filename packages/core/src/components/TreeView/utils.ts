import { AnyTreeItem, TreeItem, TreeLevel } from './types';

export interface TreeIndexEntry<TMeta> {
  item: AnyTreeItem<TMeta>;
  level: TreeLevel;
  parentId: string | null;
  childIds: string[];
}

export interface TreeIndex<TMeta> {
  byId: Map<string, TreeIndexEntry<TMeta>>;
  /** Top-level ids, in order. */
  rootIds: string[];
}

/** Left offsets per level, taken from the design (Level 1 / 2 / 3). */
export const LEVEL_INDENT: Record<TreeLevel, number> = {
  1: 0,
  2: 24,
  3: 40,
};

export const getIndent = (level: TreeLevel, indent?: number) =>
  indent === undefined ? LEVEL_INDENT[level] : (level - 1) * indent;

/**
 * Flattens the tree into an id-keyed map once per `items` change, so that
 * ancestor lookups, sibling collapsing and keyboard navigation are all O(1)
 * rather than repeated walks.
 */
export const buildTreeIndex = <TMeta>(
  items: TreeItem<TMeta>[],
): TreeIndex<TMeta> => {
  const byId = new Map<string, TreeIndexEntry<TMeta>>();

  const walk = (
    nodes: AnyTreeItem<TMeta>[],
    level: TreeLevel,
    parentId: string | null,
  ): string[] =>
    nodes.map((item) => {
      const children = (item.items ?? []) as AnyTreeItem<TMeta>[];
      // Registered before the recursion so that a child looking up its parent
      // during the walk always finds an entry.
      byId.set(item.id, { item, level, parentId, childIds: [] });
      const childIds = children.length
        ? walk(children, (level + 1) as TreeLevel, item.id)
        : [];
      byId.get(item.id)!.childIds = childIds;
      return item.id;
    });

  return { byId, rootIds: walk(items, 1, null) };
};

/** Ids of every ancestor of `id`, nearest first. Unknown ids yield `[]`. */
export const getAncestorIds = <TMeta>(
  index: TreeIndex<TMeta>,
  id: string,
): string[] => {
  const ancestors: string[] = [];
  let parentId = index.byId.get(id)?.parentId ?? null;
  while (parentId) {
    ancestors.push(parentId);
    parentId = index.byId.get(parentId)?.parentId ?? null;
  }
  return ancestors;
};

/**
 * Ids that should be emphasised as "on the way to" the selection — every
 * ancestor of every selected node.
 */
export const getSelectedPathIds = <TMeta>(
  index: TreeIndex<TMeta>,
  selectedIds: string[],
): Set<string> => {
  const path = new Set<string>();
  selectedIds.forEach((id) => {
    getAncestorIds(index, id).forEach((ancestorId) => path.add(ancestorId));
  });
  return path;
};

/**
 * The ids a user can currently move focus to: every node whose ancestors are
 * all expanded, in render order, skipping disabled rows.
 */
export const getVisibleIds = <TMeta>(
  index: TreeIndex<TMeta>,
  expandedIds: string[],
): string[] => {
  const expanded = new Set(expandedIds);
  const visible: string[] = [];

  const walk = (ids: string[]) => {
    ids.forEach((id) => {
      const entry = index.byId.get(id);
      if (!entry) return;
      if (!entry.item.disabled) {
        visible.push(id);
      }
      if (expanded.has(id)) {
        walk(entry.childIds);
      }
    });
  };

  walk(index.rootIds);
  return visible;
};

/**
 * Union of two id lists, order-preserving and duplicate-free.
 *
 * Returns `current` untouched when it already covers `added`, so a caller can
 * use the identity of the result to decide whether anything changed. The check
 * is membership, not size: `current` may itself carry duplicates, and
 * comparing a deduped Set against its raw length would then hide the merge.
 */
export const mergeIds = (current: string[], added: string[]): string[] => {
  const next = new Set(current);
  if (added.every((id) => next.has(id))) {
    return current;
  }
  added.forEach((id) => next.add(id));
  return Array.from(next);
};
