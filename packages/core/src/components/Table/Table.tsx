import { forwardRef, Ref } from 'react';
import { ColumnResizeContext } from './ColumnResizeContext';
import { ColumnFreezeContext } from './ColumnFreezeContext';
import { useColumnResize } from './hooks/useColumnResize';
import { useColumnFreeze } from './hooks/useColumnFreeze';
import TableBase from './TableBase';
import { TableProps } from './types';

const assignRef = <T,>(ref: Ref<T> | undefined, value: T | null) => {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
};

/**
 * Table - Base table component for displaying tabular data
 *
 * A styled table element that serves as the foundation for displaying
 * structured tabular data. Works in conjunction with TableHead, TableBody,
 * TableRow, TableCell, and TableCellHeader components to create complete
 * data tables with proper semantics and styling.
 *
 * Component structure:
 * - Table (root container)
 *   - TableHead (header section with column headers)
 *     - TableRow
 *       - TableCellHeader (header cells)
 *   - TableBody (body section with data rows)
 *     - TableRow (data rows)
 *       - TableCell (data cells)
 *
 * ### Resizable columns
 *
 * `resizableColumns` gives every header cell a drag handle on its right edge.
 * The table measures its own columns on first layout, so it opens at the widths
 * it would have had anyway, then switches to `table-layout: fixed` and
 * truncates overflowing cell content with an ellipsis.
 *
 * By default a resize is a trade between two columns: the one to the right
 * gives up exactly what the dragged column gains, so the table stays the width
 * it was and nothing around it reflows. The last column has nothing to its
 * right to trade with, so it has no handle.
 *
 * `columnResizeMode="expand"` opts into the other model — the table grows
 * with the dragged column and the others keep their widths — for tables that
 * have a horizontally scrollable parent to grow into.
 *
 * Widths are not persisted: read them from `onColumnWidthsChange`, store them
 * wherever the app keeps user preferences, and feed them back through
 * `defaultColumnWidths`.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * // Basic table
 * <Table>
 *   <TableHead>
 *     <TableRow>
 *       <TableCellHeader>Name</TableCellHeader>
 *       <TableCellHeader>Email</TableCellHeader>
 *       <TableCellHeader>Role</TableCellHeader>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     {users.map(user => (
 *       <TableRow key={user.id}>
 *         <TableCell>{user.name}</TableCell>
 *         <TableCell>{user.email}</TableCell>
 *         <TableCell>{user.role}</TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * ```
 *
 * @example
 * ```tsx
 * // Resizable columns, widths measured from the content
 * <Table resizableColumns>
 *   <TableHead>
 *     <TableRow>
 *       <TableCellHeader>Name</TableCellHeader>
 *       <TableCellHeader>Email</TableCellHeader>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>{rows}</TableBody>
 * </Table>
 * ```
 *
 * @example
 * ```tsx
 * // Columns keep their widths and the table grows, so it needs to be able to
 * // scroll sideways
 * <Wrapper css={{ display: 'block', overflowX: 'auto' }}>
 *   <Table resizableColumns columnResizeMode="expand">
 *     {children}
 *   </Table>
 * </Wrapper>
 * ```
 *
 * @example
 * ```tsx
 * // Resizable columns, widths owned and persisted by the caller
 * const [widths, setWidths] = useState(loadWidths);
 *
 * <Table
 *   resizableColumns
 *   columnWidths={widths}
 *   minColumnWidth={96}
 *   onColumnWidthsChange={(next) => {
 *     setWidths(next);
 *     saveWidths(next);
 *   }}>
 *   {children}
 * </Table>
 * ```
 *
 * @example
 * ```tsx
 * // Table with custom styling
 * <Table css={{ border: '1px solid #ccc' }}>
 *   <TableHead>
 *     <TableRow>
 *       <TableCellHeader>Column 1</TableCellHeader>
 *       <TableCellHeader align="center">Column 2</TableCellHeader>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Data 1</TableCell>
 *       <TableCell align="center">Data 2</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 *
 * @see {@link TableHead} - Header section component
 * @see {@link TableBody} - Body section component
 * @see {@link TableRow} - Row component
 * @see {@link TableCell} - Data cell component
 * @see {@link TableCellHeader} - Header cell component
 * @see {@link useColumnResize} - the resizing state, for custom header layouts
 * @see {@link ColumnResizeHandle} - the drag handle header cells render
 *
 * @accessibility
 * - Semantic HTML table element
 * - Proper table structure for screen readers
 * - Keyboard navigation support
 * - ARIA attributes when needed
 * - Resize handles are keyboard operable; see {@link ColumnResizeHandle}
 */
const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const {
    resizableColumns = false,
    columnWidths,
    defaultColumnWidths,
    onColumnWidthsChange,
    minColumnWidth,
    maxColumnWidth,
    columnResizeMode = 'fit',
    frozenColumns,
    defaultFrozenColumns,
    onFrozenColumnsChange,
    freezeControls = false,
    stickyHeader = false,
    children,
    style,
    ...rest
  } = props;

  const api = useColumnResize({
    columnWidths,
    defaultColumnWidths,
    onColumnWidthsChange,
    minColumnWidth,
    maxColumnWidth,
    columnResizeMode,
    enabled: resizableColumns,
    // Taken from the prop's presence rather than its value, so a caller that
    // controls widths and momentarily has none does not silently hand control
    // back to the table. See useControllableState.
    controlled: 'columnWidths' in props,
  });

  // Shares the resize hook's ref: both measure the same header cells.
  const { api: freeze, indices: frozenIndices } = useColumnFreeze({
    tableRef: api.tableRef,
    frozenColumns,
    defaultFrozenColumns,
    onFrozenColumnsChange,
    freezeControls,
    controlled: 'frozenColumns' in props,
  });
  const hasFreezing =
    freezeControls ||
    freeze.frozenColumns.start.length + freeze.frozenColumns.end.length > 0;

  const setRef = (node: HTMLTableElement | null) => {
    api.tableRef.current = node;
    assignRef(ref, node);
  };

  const { columnWidths: widths } = api;

  // An inline style, not a styled-component prop: the width changes with every
  // frame of a drag, and anything interpolated into an emotion template leaves
  // a stylesheet rule behind per distinct value. See TableBase.
  const widthStyle =
    resizableColumns && columnResizeMode === 'expand' && widths.length
      ? { width: widths.reduce((total, width) => total + width, 0) }
      : undefined;

  // Both providers are always rendered, with `null` when off, so turning a
  // feature on or off never remounts the table underneath.
  return (
    <ColumnResizeContext.Provider value={resizableColumns ? api : null}>
      <ColumnFreezeContext.Provider value={hasFreezing ? freeze : null}>
        <TableBase
          ref={setRef}
          isResizable={resizableColumns}
          hasColumnWidths={resizableColumns && widths.length > 0}
          columnResizeMode={resizableColumns ? columnResizeMode : undefined}
          frozenIndices={frozenIndices}
          stickyHeader={stickyHeader}
          style={widthStyle ? { ...widthStyle, ...style } : style}
          {...rest}>
          {resizableColumns && widths.length > 0 && (
            <colgroup>
              {widths.map((width, index) => (
                <col key={index} style={{ width }} />
              ))}
            </colgroup>
          )}
          {children}
        </TableBase>
      </ColumnFreezeContext.Provider>
    </ColumnResizeContext.Provider>
  );
});

Table.displayName = 'Table';

export default Table;
