import { HTMLAttributes, ReactNode } from 'react';

/** Value type a {@link ContextMenu} option can carry. */
export type ContextMenuValue = string | number;

/**
 * One selectable row of a {@link ContextMenu}.
 *
 * The row is laid out as `[indicator] [status | avatar] [startContent] label
 * [description] [endContent] [indicator]`; every part but the label is
 * optional.
 */
export interface ContextMenuItem<
  V extends ContextMenuValue = ContextMenuValue,
> {
  /** Identifies the option in `value`, `onChange` and `onAction`. Unique per menu. */
  value: V;
  /** Row content. Strings and numbers ellipsise and get a hover tooltip. */
  label: ReactNode;
  /**
   * Plain-text form of `label`, used for type-to-find and the tooltip when
   * `label` is a node. Defaults to `label` when that is a string or number.
   */
  textValue?: string;
  /** Secondary text at the right of the row, e.g. a date. */
  description?: ReactNode;
  /** Image URL (rendered as a 24px `Avatar`) or any node placed before the label. */
  avatar?: string | ReactNode;
  /** CSS color or gradient of a 12px status dot placed before the label. */
  status?: string;
  /** Extra content placed before the label, after the status dot / avatar. */
  startContent?: ReactNode;
  /** Extra content placed after the label and description. */
  endContent?: ReactNode;
  /** Skipped by keyboard navigation and ignores clicks. */
  disabled?: boolean;
  /**
   * `includeExclude` mode only: the row is selected as a whole (one blue
   * check-circle) instead of being included or excluded — e.g. a saved
   * filter group.
   */
  selectOnly?: boolean;
}

/** A titled group of options. The title is not selectable. */
export interface ContextMenuGroup<
  V extends ContextMenuValue = ContextMenuValue,
> {
  /** Unique per menu. */
  id: string;
  /** Group title. */
  label: ReactNode;
  items: ContextMenuItem<V>[];
}

/** A top-level entry of `items`: an option or a group of options. */
export type ContextMenuEntry<V extends ContextMenuValue = ContextMenuValue> =
  | ContextMenuItem<V>
  | ContextMenuGroup<V>;

/**
 * How a selected option is marked. Selected rows also get the selected
 * background, except in `includeExclude` mode.
 * - `check`: a check mark at the end of selected rows
 * - `checkbox`: a checkbox at the start of every row
 * - `checkCircle`: a blue check-circle at the end of every row, filled when selected
 * - `none`: background only
 */
export type ContextMenuIndicator =
  | 'check'
  | 'checkbox'
  | 'checkCircle'
  | 'none';

/** State of a row in `includeExclude` mode. `selected` is used by `selectOnly` rows. */
export type ContextMenuIncludeExcludeType = 'include' | 'exclude' | 'selected';

/** One chosen row in `includeExclude` mode. */
export interface ContextMenuIncludeExcludeEntry<
  V extends ContextMenuValue = ContextMenuValue,
> {
  value: V;
  type: ContextMenuIncludeExcludeType;
}

/** State passed to `renderItem`. */
export interface ContextMenuItemState {
  /** The option is selected (in `includeExclude` mode: included, excluded or selected). */
  selected: boolean;
  /** The option is highlighted by the pointer or the keyboard. */
  active: boolean;
  disabled: boolean;
  /** `includeExclude` mode only. */
  includeExcludeType?: ContextMenuIncludeExcludeType;
}

/** Selection props for an action menu: rows only fire `onAction`. */
export interface ContextMenuNoSelectionProps {
  selectionMode?: 'none';
  value?: never;
  defaultValue?: never;
  onChange?: never;
}

/** Selection props for picking one option. */
export interface ContextMenuSingleSelectionProps<V extends ContextMenuValue> {
  selectionMode: 'single';
  /** Controlled selected value. `null` for none. */
  value?: V | null;
  /** Initially selected value when uncontrolled. */
  defaultValue?: V | null;
  /** Fires with the newly selected value. Choosing the selected option again keeps it selected. */
  onChange?: (value: V) => void;
}

/** Selection props for picking any number of options. */
export interface ContextMenuMultipleSelectionProps<V extends ContextMenuValue> {
  selectionMode: 'multiple';
  /** Controlled selected values. */
  value?: V[];
  /** Initially selected values when uncontrolled. */
  defaultValue?: V[];
  /** Fires with the new selection and the option that was toggled. */
  onChange?: (value: V[], toggled: V) => void;
}

/**
 * Selection props for include / exclude filters. Each row is included,
 * excluded or neither (`selectOnly` rows: selected or not).
 */
export interface ContextMenuIncludeExcludeSelectionProps<
  V extends ContextMenuValue,
> {
  selectionMode: 'includeExclude';
  /** Controlled chosen rows. */
  value?: ContextMenuIncludeExcludeEntry<V>[];
  /** Initially chosen rows when uncontrolled. */
  defaultValue?: ContextMenuIncludeExcludeEntry<V>[];
  /** Fires with the new list and the option that changed. */
  onChange?: (value: ContextMenuIncludeExcludeEntry<V>[], changed: V) => void;
}

/** Selection behaviour of a {@link ContextMenu}, keyed by `selectionMode`. */
export type ContextMenuSelectionProps<V extends ContextMenuValue> =
  | ContextMenuNoSelectionProps
  | ContextMenuSingleSelectionProps<V>
  | ContextMenuMultipleSelectionProps<V>
  | ContextMenuIncludeExcludeSelectionProps<V>;

/** Props shared by every `selectionMode` of a {@link ContextMenu}. */
export interface ContextMenuBaseProps<V extends ContextMenuValue> extends Omit<
  HTMLAttributes<HTMLUListElement>,
  'onChange' | 'defaultValue' | 'children'
> {
  /** Options and groups, in display order. */
  items: ContextMenuEntry<V>[];
  /**
   * How selected rows are marked. Defaults to `check` for `single`,
   * `checkbox` for `multiple` and `none` otherwise. Ignored by
   * `includeExclude`, which always shows include / exclude controls.
   */
  indicator?: ContextMenuIndicator;
  /**
   * Fires when an option is chosen by click, Enter or Space, in every mode —
   * the hook for closing a popup.
   */
  onAction?: (value: V) => void;
  /** Controlled highlighted option (pointer or keyboard). */
  activeValue?: V | null;
  /** Initially highlighted option when uncontrolled. */
  defaultActiveValue?: V | null;
  /** Fires when the highlighted option changes. */
  onActiveValueChange?: (value: V | null) => void;
  /** Replaces the row content between the start and end indicators. */
  renderItem?: (
    item: ContextMenuItem<V>,
    state: ContextMenuItemState,
  ) => ReactNode;
  /** Replaces the content of group titles. */
  renderGroupLabel?: (group: ContextMenuGroup<V>) => ReactNode;
  /** Shown when `items` has no options. @default 'No items' */
  emptyState?: ReactNode;
  /** Scrolls the list beyond this height (px or any CSS length). */
  maxHeight?: number | string;
}

/** Props of {@link ContextMenu}. */
export type ContextMenuProps<V extends ContextMenuValue = ContextMenuValue> =
  ContextMenuBaseProps<V> & ContextMenuSelectionProps<V>;
