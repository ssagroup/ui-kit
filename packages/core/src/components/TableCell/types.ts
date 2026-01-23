import { HTMLAttributes } from 'react';
import { CommonProps } from '@global-types/emotion';

/**
 * Props for the TableCell component
 *
 * A styled table cell component that represents a single data cell in a table row.
 * Supports text alignment customization.
 *
 * @example
 * ```tsx
 * // Basic table cell
 * <TableCell>Data content</TableCell>
 * ```
 *
 * @example
 * ```tsx
 * // Table cell with center alignment
 * <TableCell align="center">Centered</TableCell>
 * ```
 *
 * @example
 * ```tsx
 * // Table cell with right alignment
 * <TableCell align="right">Right aligned</TableCell>
 * ```
 */
export interface TableCellProps
  extends CommonProps, Omit<HTMLAttributes<HTMLTableCellElement>, 'align'> {
  /**
   * Text alignment for the cell content
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right' | 'justify';
}
