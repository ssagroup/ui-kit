import { PropsWithChildren, TableHTMLAttributes } from 'react';
import { CommonProps } from '@global-types/emotion';
import Table from '@components/Table';
import { NestedTableProvider } from '../NestedTableContext';
import { NestedTableContextType } from '../types';

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
 */
export const NestedTable = ({
  children,
  collapsedIconName,
  expandedIconName,
  defaultCollapsed,
  ...rest
}: PropsWithChildren &
  NestedTableContextType &
  CommonProps &
  TableHTMLAttributes<HTMLTableElement>) => {
  return (
    <NestedTableProvider
      collapsedIconName={collapsedIconName}
      expandedIconName={expandedIconName}
      defaultCollapsed={defaultCollapsed}>
      <Table {...rest}>{children}</Table>
    </NestedTableProvider>
  );
};
