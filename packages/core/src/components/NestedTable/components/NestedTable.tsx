import { forwardRef } from 'react';
import Table from '@components/Table';
import { TableProps } from '@components/Table/types';
import { NestedTableProvider } from '../NestedTableContext';
import { NestedTableProps } from '../types';
import { NESTED_EXPANDER_WIDTH } from '../consts';

const withExpander = (widths?: number[]) =>
  widths?.length ? [NESTED_EXPANDER_WIDTH, ...widths] : widths;

/**
 * NestedTable - Table whose rows collapse into expandable groups.
 *
 * Renders a `Table` and provides the context the nested row components read, so
 * every piece below must live inside it.
 *
 * ### Structure
 * ```
 * NestedTable                     — provides icons + default collapsed state
 * └── TableBody
 *     └── WithNestedTableRow      — one collapsible group
 *         ├── NestedTableRow      — first child: the sub-header that toggles
 *         │   └── NestedTableCell
 *         └── NestedTableRow      — remaining children: the collapsible rows
 *             └── NestedTableCell
 * ```
 *
 * Each `WithNestedTableRow` is one group. Use as many as you need, and give the
 * header row its own `WithNestedTableRow` with `isHeader` on the row.
 *
 * ### Collapsing is CSS, not unmounting
 * Collapsed rows stay in the DOM at zero height with `visibility: hidden`, which
 * is what makes the transition animate. They remain findable by queries and by
 * `Ctrl+F`, so do not rely on collapse to hide sensitive content.
 *
 * ### Resizing and freezing columns
 * Takes every `Table` option — `resizableColumns`, `frozenColumns`,
 * `freezeControls`, `stickyHeader` — and works inside `TableContainer`. Build
 * the header from `NestedTableCellHeader` so the columns get their drag handles
 * and freeze menus.
 *
 * Column positions skip the toggle column: `0` is your first column in
 * `frozenColumns`, and width arrays hold one entry per column of yours. The
 * toggle column freezes by itself only when your first column is frozen to the
 * left; otherwise it scrolls like any other column.
 *
 * Frozen cells and a sticky header paint the row's background, so give rows an
 * opaque one — a translucent row would let scrolled content show through.
 * With resizing on, the table renders its own `colgroup`; drop any you had.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <NestedTable>
 *   <TableBody>
 *     <WithNestedTableRow>
 *       <NestedTableRow>
 *         <NestedTableCell>Engineering</NestedTableCell>
 *         <NestedTableCell>24</NestedTableCell>
 *       </NestedTableRow>
 *       <NestedTableRow>
 *         <NestedTableCell>Platform</NestedTableCell>
 *         <NestedTableCell>9</NestedTableCell>
 *       </NestedTableRow>
 *     </WithNestedTableRow>
 *   </TableBody>
 * </NestedTable>
 * ```
 *
 * @example
 * ```tsx
 * // Start collapsed, with custom toggle icons
 * <NestedTable
 *   defaultCollapsed
 *   collapsedIconName="carrot-right"
 *   expandedIconName="carrot-down">
 *   {groups}
 * </NestedTable>
 * ```
 *
 * @example
 * ```tsx
 * // Resizable, with the first column frozen and a sticky header
 * <TableContainer maxHeight={400}>
 *   <NestedTable
 *     resizableColumns
 *     freezeControls
 *     stickyHeader
 *     defaultFrozenColumns={{ start: ['team'] }}>
 *     <TableHead>
 *       <NestedTableRow isHeader>
 *         <NestedTableCellHeader columnId="team">Team</NestedTableCellHeader>
 *         <NestedTableCellHeader columnId="size">Headcount</NestedTableCellHeader>
 *       </NestedTableRow>
 *     </TableHead>
 *     <TableBody>{groups}</TableBody>
 *   </NestedTable>
 * </TableContainer>
 * ```
 */
export const NestedTable = forwardRef<HTMLTableElement, NestedTableProps>(
  (props, ref) => {
    const {
      children,
      collapsedIconName,
      expandedIconName,
      defaultCollapsed,
      columnWidths,
      defaultColumnWidths,
      onColumnWidthsChange,
      ...rest
    } = props;

    // Table counts the toggle column NestedTableRow adds in front of every
    // row; callers never see it, so widths cross this boundary without it.
    const widthProps: Partial<TableProps> = {
      defaultColumnWidths: withExpander(defaultColumnWidths),
      onColumnWidthsChange:
        onColumnWidthsChange &&
        ((widths) => onColumnWidthsChange(widths.slice(1))),
    };
    // Presence, not value, decides controlled mode — see Table.
    if ('columnWidths' in props) {
      widthProps.columnWidths = withExpander(columnWidths) ?? [];
    }

    const opaqueCells =
      !!rest.stickyHeader ||
      !!rest.freezeControls ||
      rest.frozenColumns !== undefined ||
      rest.defaultFrozenColumns !== undefined;

    return (
      <NestedTableProvider
        collapsedIconName={collapsedIconName}
        expandedIconName={expandedIconName}
        defaultCollapsed={defaultCollapsed}
        opaqueCells={opaqueCells}
        isResizable={!!rest.resizableColumns}>
        <Table ref={ref} {...rest} {...widthProps}>
          {children}
        </Table>
      </NestedTableProvider>
    );
  },
);

NestedTable.displayName = 'NestedTable';
