import { Dispatch, SetStateAction } from 'react';
import { IconProps } from '@components/Icon/types';
import { TableProps } from '@components/Table/types';
import { TableCellHeaderProps } from '@components/TableCellHeader/types';

export type NestedTableContextType = {
  /** Toggle icon shown while a group is collapsed. @default 'carrot-up' */
  collapsedIconName?: IconProps['name'];
  /** Toggle icon shown while a group is expanded. @default 'carrot-down' */
  expandedIconName?: IconProps['name'];
  /**
   * Whether groups start collapsed. Applies to every group in the table; a
   * single `WithNestedTableRow` can override it. Groups holding one row ignore
   * it, since they have no toggle to reopen with.
   *
   * @default false
   */
  defaultCollapsed?: boolean;
};

/** What `NestedTable` hands its rows and cells, beyond its own props. */
export type NestedTableContextValue = NestedTableContextType & {
  /**
   * Set while columns can freeze or the header sticks. Cells then paint the
   * row's background themselves, and the row paints it opaque, so content
   * scrolled under a stuck cell does not show through.
   */
  opaqueCells?: boolean;
  /**
   * Mirrors the table's `resizableColumns`. Cells read it here rather than
   * from the resize context, whose value changes on every frame of a drag and
   * would re-render every cell in the table with it.
   */
  isResizable?: boolean;
};

/**
 * Props for {@link NestedTable}: everything `Table` accepts, plus the group
 * toggle options.
 *
 * Column positions in `columnWidths`, `defaultColumnWidths`,
 * `onColumnWidthsChange` and `frozenColumns` count only your own columns — the
 * toggle column `NestedTableRow` adds in front is left out of all of them.
 */
export type NestedTableProps = TableProps & NestedTableContextType;

/**
 * Props for {@link NestedTableCellHeader}: the same column options as
 * `TableCellHeader` — `columnId`, `resizable`, `freezable`.
 */
export type NestedTableCellHeaderProps = TableCellHeaderProps;

export type NestedTableRowContextType = {
  isCollapsed: boolean;
  isSubHeader: boolean;
  childRowsCount: number;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

export type WithNestedTableRowProps = {
  /**
   * The group's rows. The first element becomes the sub-header that toggles the
   * group; the rest collapse under it.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Overrides the table-level `defaultCollapsed` for this group only. Ignored
   * when the group holds a single row.
   */
  defaultCollapsed?: boolean;
};
