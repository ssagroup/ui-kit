import { CSSObject, Interpolation, Theme } from '@emotion/react';

import { MapIconsType } from '@components/Icon/types';

/**
 * Fields shared by every node, at any level.
 *
 * `TMeta` is the consumer's own payload — a route path for navigation, a file
 * size and mime type for a file tree. It travels untouched to `renderItem`,
 * which is what keeps `TreeView` free of any domain knowledge.
 */
export interface TreeItemBase<TMeta = unknown> {
  /**
   * Stable identity. Expansion and selection are both expressed as arrays of
   * these, so an id that changes between renders will drop the node's state.
   */
  id: string;
  label: React.ReactNode;
  /** Kit icon rendered before the label. Ignored when `icon` is set. */
  iconName?: keyof MapIconsType;
  /** Arbitrary icon element, for glyphs the kit doesn't ship. Wins over `iconName`. */
  icon?: React.ReactNode;
  /** Blocks selection, expansion and keyboard focus, and dims the row. */
  disabled?: boolean;
  /** Styles for this row only, merged after the theme defaults. */
  css?: CSSObject;
  meta?: TMeta;
}

/**
 * A third-level node. `items?: never` is what caps the tree at three levels:
 * a fourth is a type error at the call site rather than a runtime surprise.
 */
export interface TreeItemLevel3<TMeta = unknown> extends TreeItemBase<TMeta> {
  items?: never;
}

/** A second-level node. Its children are the deepest the tree allows. */
export interface TreeItemLevel2<TMeta = unknown> extends TreeItemBase<TMeta> {
  items?: TreeItemLevel3<TMeta>[];
}

/** A top-level node. `items` is optional, so a flat one-level list is valid. */
export interface TreeItem<TMeta = unknown> extends TreeItemBase<TMeta> {
  items?: TreeItemLevel2<TMeta>[];
}

/** Any node, whatever its depth — what `renderItem` and the callbacks receive. */
export type AnyTreeItem<TMeta = unknown> =
  | TreeItem<TMeta>
  | TreeItemLevel2<TMeta>
  | TreeItemLevel3<TMeta>;

/** A node's depth, 1-based. Three is the maximum the tree accepts. */
export type TreeLevel = 1 | 2 | 3;

/**
 * Everything a custom row needs to render itself and stay in sync.
 *
 * Spread `itemProps` on whatever element you make interactive (a `NavLink`, a
 * `button`, a `div`) and `toggleProps` on the expand/collapse control. The
 * surrounding `li`, its ARIA and its keyboard handling belong to `TreeView` —
 * a custom row never has to reproduce them.
 */
export interface TreeItemRenderProps<TMeta = unknown> {
  item: AnyTreeItem<TMeta>;
  level: TreeLevel;
  /** Position among siblings, zero-based. */
  index: number;
  isSelected: boolean;
  isExpanded: boolean;
  /**
   * True when the node is an ancestor of a selected node. The design keeps
   * levels 1 and 2 emphasised while the selected level 3 row is blue, and this
   * is the flag that drives it.
   */
  isInSelectedPath: boolean;
  hasItems: boolean;
  isDisabled: boolean;
  /** Selects the node, honouring `selectionMode`. No-op when disabled. */
  select: () => void;
  /** Expands or collapses the node, honouring `expandMode`. No-op without children. */
  toggle: () => void;
  /** Spread on the interactive row element. */
  itemProps: React.HTMLAttributes<HTMLElement>;
  /** Spread on the expand/collapse control. Empty object when `hasItems` is false. */
  toggleProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** The node's icon, already built and themed — `null` when it has none. */
  icon: React.ReactNode;
}

/**
 * Props for {@link TreeView}. `TMeta` is the payload carried on each node and
 * handed back to `renderItem` and the selection callback.
 */
export interface TreeViewProps<TMeta = unknown> {
  /**
   * The tree. Three levels deep at most — the fourth is rejected by the type,
   * and `items` is optional at every level, so a one-level list is valid.
   */
  items: TreeItem<TMeta>[];

  /** Ids of expanded nodes. Pass to control expansion yourself. */
  expandedIds?: string[];
  /** Ids expanded on mount, when expansion is uncontrolled. */
  defaultExpandedIds?: string[];
  onExpandedIdsChange?: (ids: string[]) => void;
  /**
   * `single` collapses siblings when a node expands, accordion-style.
   * @default 'multiple'
   */
  expandMode?: 'multiple' | 'single';

  /**
   * Ids of selected nodes. Always an array, even in `single` mode — which is
   * what lets a consumer move to multi-select later without an API change.
   */
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  /** Receives the full next selection, plus the node that was acted on. */
  onSelectedIdsChange?: (ids: string[], item: AnyTreeItem<TMeta>) => void;
  /**
   * `single` replaces the selection on click, `multiple` toggles membership.
   * @default 'single'
   */
  selectionMode?: 'single' | 'multiple';

  /** Replaces the row's interior. The `li`, ARIA and keyboard stay with `TreeView`. */
  renderItem?: (props: TreeItemRenderProps<TMeta>) => React.ReactNode;

  /**
   * Colour set. `dark` is for sidebars such as `CollapsibleNavBar`'s default theme.
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  /**
   * Overrides the selected row's colour (and the chevron and icon on it), for
   * a consumer whose accent isn't the theme's own. Everything else — rest,
   * hover, the engaged path — still comes from `theme`.
   */
  activeColor?: string;
  /**
   * `tree` gives a real `role="tree"` with roving focus and arrow-key
   * navigation — right for a file tree. `list` gives nested `ul`/`li` with
   * disclosure buttons, which is the correct pattern for a navigation menu of
   * links and leaves focus order to the browser.
   * @default 'tree'
   */
  semantics?: 'tree' | 'list';
  /**
   * Whether clicking anywhere on a parent row toggles it, rather than only the
   * chevron.
   * @default true
   */
  toggleOnItemClick?: boolean;
  /**
   * Expand the ancestors of selected nodes, on mount and whenever the
   * selection moves. Ignored while expansion is controlled.
   * @default true
   */
  autoExpandSelected?: boolean;
  /**
   * Keep the icon column even on rows without an icon, so labels stay aligned
   * with their icon-bearing siblings. Off by default: a tree whose rows have
   * no icons at all would otherwise carry an empty column.
   * @default false
   */
  reserveIconSpace?: boolean;
  /**
   * Left offset per level, in px. Defaults to the design's 0 / 24 / 40; a
   * number here makes the steps linear instead (`(level - 1) * indent`).
   */
  indent?: number;
  /** Accessible name for the tree. */
  'aria-label'?: string;
  className?: string;
  css?: Interpolation<Theme>;
}
