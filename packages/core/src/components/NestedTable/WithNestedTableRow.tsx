import { Children, isValidElement, useState } from 'react';
import { NestedTableRowProvider } from './NestedTableRowContext';
import { useNestedTableContext } from './hooks/useNestedTableContext';
import { WithNestedTableRowProps } from './types';

/**
 * WithNestedTableRow - Groups rows into one collapsible unit.
 *
 * Wrap a run of `NestedTableRow` children in it. **Position decides role**: the
 * first child becomes the sub-header that carries the toggle, and the rest are
 * the rows it shows and hides. Renders no markup of its own — it only supplies
 * each child with the group's context — so it is safe between `TableBody` and
 * the rows.
 *
 * A group containing a single row has nothing to toggle, so it renders no icon
 * and ignores `defaultCollapsed` — otherwise it could start collapsed with no
 * way to reopen it.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * // One group per team; each starts expanded
 * {teams.map((team) => (
 *   <WithNestedTableRow key={team.id}>
 *     <NestedTableRow>
 *       <NestedTableCell>{team.name}</NestedTableCell>
 *     </NestedTableRow>
 *     {team.members.map((member) => (
 *       <NestedTableRow key={member.id}>
 *         <NestedTableCell>{member.name}</NestedTableCell>
 *       </NestedTableRow>
 *     ))}
 *   </WithNestedTableRow>
 * ))}
 * ```
 *
 * @example
 * ```tsx
 * // Collapse just this group, whatever the table default is
 * <WithNestedTableRow defaultCollapsed>{rows}</WithNestedTableRow>
 * ```
 */
export const WithNestedTableRow = ({
  children,
  defaultCollapsed,
}: WithNestedTableRowProps) => {
  const { defaultCollapsed: tableDefaultCollapsed = false } =
    useNestedTableContext();
  const childRowsCount =
    Children.map(children, (child) => {
      return isValidElement(child) ? true : null;
    })?.filter(Boolean).length || 0;
  // A group with a single row has no toggle and cannot be expanded again,
  // so it must never start collapsed.
  const [isCollapsed, setIsCollapsed] = useState(
    childRowsCount > 1 ? (defaultCollapsed ?? tableDefaultCollapsed) : false,
  );

  return Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      const isSubHeader = index === 0;
      return (
        <NestedTableRowProvider
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isSubHeader={isSubHeader}
          childRowsCount={childRowsCount}>
          {child}
        </NestedTableRowProvider>
      );
    }
  });
};
