import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { TableContainerProps } from './types';

const Base = styled.div`
  display: block;
  width: 100%;
  max-width: 100%;
  overflow: auto;

  /* The same card as the table's own rounded corner cells. The scrollbars
     belong to the container, so without a matching shape they would run
     past the table's corners with the page showing through in between. */
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
`;

/**
 * TableContainer - The scroll area around a table
 *
 * Caps the table at the width of its parent and, with `maxHeight`, at a
 * height, scrolling whatever does not fit. It is what frozen columns and a
 * sticky header stick to, but it is just as useful around a plain wide
 * table.
 *
 * It draws the white, 20px-rounded card the table sits on, so the scrollbars
 * stay inside the card. Override the look with `css` or `className`.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * // A wide table that scrolls sideways
 * <TableContainer>
 *   <Table>{children}</Table>
 * </TableContainer>
 * ```
 *
 * @example
 * ```tsx
 * // Frozen first column and header in a 480px-tall scroll area
 * <TableContainer maxHeight={480}>
 *   <Table stickyHeader defaultFrozenColumns={{ start: [0] }} freezeControls>
 *     {children}
 *   </Table>
 * </TableContainer>
 * ```
 *
 * @example
 * ```tsx
 * // A different card
 * <TableContainer css={{ borderRadius: 8, background: 'transparent' }}>
 *   <Table>{children}</Table>
 * </TableContainer>
 * ```
 *
 * @see {@link Table} - `frozenColumns`, `freezeControls` and `stickyHeader`
 *
 * @accessibility
 * - A plain `div`; give it `tabIndex={0}`, a `role="region"` and an
 *   `aria-label` when the table has no focusable content, so keyboard users
 *   can still scroll it
 */
const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ maxHeight, style, children, ...rest }, ref) => (
    <Base
      ref={ref}
      // Inline rather than interpolated: any CSS value is accepted, and each
      // distinct one would otherwise mint its own emotion class.
      style={maxHeight === undefined ? style : { maxHeight, ...style }}
      {...rest}>
      {children}
    </Base>
  ),
);

TableContainer.displayName = 'TableContainer';

export default TableContainer;
