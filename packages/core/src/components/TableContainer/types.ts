import { CSSProperties, HTMLAttributes } from 'react';
import { CommonProps } from '@global-types/emotion';

/**
 * Props for the {@link TableContainer} component.
 *
 * @example
 * ```tsx
 * <TableContainer maxHeight={480}>
 *   <Table stickyHeader>{children}</Table>
 * </TableContainer>
 * ```
 */
export interface TableContainerProps
  extends CommonProps, HTMLAttributes<HTMLDivElement> {
  /**
   * Tallest the container gets before the table scrolls vertically. Any CSS
   * value: a number of pixels, `'60vh'`, or `'100%'` to fill a parent that
   * has a height of its own. Unbounded when omitted, so only horizontal
   * overflow scrolls.
   */
  maxHeight?: CSSProperties['maxHeight'];
}
