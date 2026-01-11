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
 * // Disabled table row
 * <TableRow isDisabled aria-disabled="true">
 *   <TableCell>Disabled Row</TableCell>
 * </TableRow>
 * ```
 */
export interface TableRowProps extends CommonProps {
  /**
   * Whether the row is disabled
   * Disabled rows have reduced opacity and no pointer cursor
   * @default false
   */
  isDisabled?: boolean;
}
