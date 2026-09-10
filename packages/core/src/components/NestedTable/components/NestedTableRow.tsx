import { HTMLAttributes } from 'react';
import { Interpolation, Theme, useTheme } from '@emotion/react';
import TableRow from '@components/TableRow';
import { NestedTableCellSubHeader } from './NestedTableCellSubHeader';
import { useNestedTableRowContext } from '../hooks/useNestedTableRowContext';

/**
 * NestedTableRow - One row inside a `WithNestedTableRow` group.
 *
 * Must be rendered inside `WithNestedTableRow`; it reads that group's context to
 * know whether it is the sub-header and whether the group is collapsed.
 *
 * ### It prepends a cell for you
 * The row renders a narrow toggle cell **before** your children, so a row with
 * two `NestedTableCell` children occupies **three** columns. Size the header and
 * `colSpan` values accordingly — this is the usual cause of a nested table
 * whose columns look off by one.
 *
 * ### First child in the group is the toggle
 * The first `NestedTableRow` in a `WithNestedTableRow` is the sub-header: it is
 * shaded, its cells are bold, it shows the toggle icon, and clicking anywhere on
 * it collapses or expands the rest of the group. Later rows are the collapsible
 * body. A group holding only one row shows no toggle and never collapses.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <WithNestedTableRow>
 *   <NestedTableRow>
 *     <NestedTableCell>Engineering</NestedTableCell>
 *   </NestedTableRow>
 *   <NestedTableRow>
 *     <NestedTableCell>Platform</NestedTableCell>
 *   </NestedTableRow>
 * </WithNestedTableRow>
 * ```
 *
 * @example
 * ```tsx
 * // Header row: renders the leading cell as an empty `th`
 * <WithNestedTableRow>
 *   <NestedTableRow isHeader>
 *     <NestedTableCell as="th">Team</NestedTableCell>
 *     <NestedTableCell as="th">Headcount</NestedTableCell>
 *   </NestedTableRow>
 * </WithNestedTableRow>
 * ```
 */
export const NestedTableRow = ({
  children,
  isHeader,
  ...props
}: React.PropsWithChildren<
  {
    isHeader?: boolean;
  } & HTMLAttributes<HTMLTableRowElement>
>) => {
  const theme = useTheme();
  const { isCollapsed, isSubHeader, childRowsCount, setIsCollapsed } =
    useNestedTableRowContext();
  const headerCSS: Interpolation<Theme> = isSubHeader
    ? {
        background: theme.colors.greyLighter60,
        '& td': {
          fontWeight: 700,
        },
      }
    : {
        background: theme.colors.white,
      };

  const classNames: string[] = [];
  if (isSubHeader) {
    classNames.push('first-row');
  }
  if (isCollapsed) {
    classNames.push('collapsed');
  }
  const notSubHeaderCSS: Interpolation<Theme> =
    !isSubHeader && isCollapsed
      ? {
          height: 0,
          maxHeight: 0,
          padding: 0,
          '& td': {
            height: 0,
            maxHeight: 0,
            padding: 0,
          },
        }
      : {};

  const handleClick = () => {
    if (childRowsCount > 1 && isSubHeader) {
      setIsCollapsed((currentState) => !currentState);
    }
  };

  return (
    <TableRow
      css={{
        ...headerCSS,
        ...notSubHeaderCSS,
      }}
      onClick={handleClick}
      className={classNames.join(' ')}
      {...props}>
      <NestedTableCellSubHeader
        isHeader={isHeader}
        css={{
          maxWidth: 36,
          paddingLeft: 16,
          paddingRight: 0,
        }}
      />
      {children}
    </TableRow>
  );
};
