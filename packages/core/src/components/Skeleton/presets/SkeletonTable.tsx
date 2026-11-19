import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableBody from '@components/TableBody';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableCellHeader from '@components/TableCellHeader';

import { SkeletonGroup } from '../SkeletonGroup';
import { Skeleton } from '../Skeleton';
import { SkeletonTableProps } from '../types';

/** Cell bar widths, staggered so the rows do not read as a solid grid. */
const CELL_WIDTHS = ['70%', '50%', '85%', '40%', '60%'];

/**
 * SkeletonTable - A placeholder table: a kit `Table` with a grey bar in every
 * cell.
 *
 * Because it is built from the real `Table`, `TableRow` and `TableCell`, its
 * rows have the same height and padding as the loaded table, so nothing
 * shifts when the data arrives. Match `columns` to the real table and `rows`
 * to a typical page size.
 *
 * @category Components
 * @subcategory Feedback
 * @example
 * ```tsx
 * {isLoading ? <SkeletonTable rows={10} columns={5} /> : <UsersTable />}
 * ```
 */
export const SkeletonTable = ({
  rows = 5,
  columns = 4,
  header = true,
  animation,
  corners,
  label,
  className,
  style,
}: SkeletonTableProps) => {
  const columnKeys = Array.from({ length: columns }, (_, index) => index);
  return (
    <SkeletonGroup
      animation={animation}
      corners={corners}
      label={label}
      className={className}
      style={style}>
      <Table css={{ width: '100%' }}>
        {header && (
          <TableHead>
            <TableRow>
              {columnKeys.map((column) => (
                <TableCellHeader key={column}>
                  <Skeleton height={12} width="50%" />
                </TableCellHeader>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {Array.from({ length: rows }, (_, row) => (
            <TableRow key={row}>
              {columnKeys.map((column) => (
                <TableCell key={column}>
                  <Skeleton
                    height={12}
                    width={CELL_WIDTHS[(row + column) % CELL_WIDTHS.length]}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SkeletonGroup>
  );
};
