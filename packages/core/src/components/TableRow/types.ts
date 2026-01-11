import { HTMLAttributes } from 'react';
import { CommonProps } from '@global-types/emotion';

/**
 * Props for the TableRow component
 *
 * A styled table row component that represents a single row in a table.
 * Supports disabled state for non-interactive rows.
 *
 * @example
 * ```tsx
 * // Basic table row
 * <TableRow>
 *   <TableCell>Data 1</TableCell>
 *   <TableCell>Data 2</TableCell>
 * </TableRow>
 * ```
 *
 * @example
 * ```tsx
 * // Disabled table row (aria-disabled is automatically set)
 * <TableRow isDisabled>
 *   <TableCell>Disabled Row</TableCell>
 * </TableRow>
 * ```
 */
export interface TableRowProps
  extends CommonProps, HTMLAttributes<HTMLTableRowElement> {
  /**
   * Whether the row is disabled
   * Disabled rows have reduced opacity and no pointer cursor.
   * Automatically sets aria-disabled attribute when true.
   * @default false
   */
  isDisabled?: boolean;
}
