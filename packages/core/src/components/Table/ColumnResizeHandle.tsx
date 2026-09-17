import styled from '@emotion/styled';
import { useLayoutEffect, useRef, useState } from 'react';
import { RESIZE_HANDLE_WIDTH } from './consts';
import { useColumnResizeContext } from './ColumnResizeContext';
import { ColumnResizeHandleProps } from './ColumnResizeHandle.types';

const HandleBase = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  width: ${RESIZE_HANDLE_WIDTH}px;

  cursor: col-resize;
  user-select: none;

  /* Without this, a touch drag scrolls the page instead of resizing. */
  touch-action: none;

  &::after {
    content: '';
    position: absolute;
    top: 25%;
    bottom: 25%;
    right: 3px;

    width: 2px;
    border-radius: 1px;

    /* Visible at rest, so the column boundary reads as something you can grab
       rather than something you have to discover by hovering. Soft enough to
       sit behind the header text in the visual hierarchy. */
    background-color: ${({ theme }) => theme.colors.greyOutline};
    transition: background-color 0.15s ease-in-out;
  }

  &:hover::after {
    background-color: ${({ theme }) => theme.colors.greyFilterIcon};
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::after,
  &[data-resizing='true']::after {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

/**
 * ColumnResizeHandle - the grab area on a column's right edge
 *
 * Rendered automatically by `TableCellHeader` inside a `Table` with
 * `resizableColumns`, so most tables never name it. Render it by hand when the
 * header cells are something other than `TableCellHeader` but still sit inside
 * a resizable `Table`.
 *
 * Outside a resizable table it renders nothing, which keeps it safe to drop
 * into a shared header cell that is used in both kinds of table.
 *
 * ### Which column it resizes
 *
 * With no `columnIndex` it takes the `cellIndex` of the cell it is rendered in.
 * That is the right answer for every table whose header is one cell per column,
 * and the wrong one as soon as a header cell spans several columns — pass
 * `columnIndex` explicitly there.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <Table resizableColumns>
 *   <TableHead>
 *     <TableRow>
 *       <th>
 *         Name
 *         <ColumnResizeHandle />
 *       </th>
 *     </TableRow>
 *   </TableHead>
 * </Table>
 * ```
 *
 * @see {@link Table} - the resizableColumns prop that turns this on
 * @see {@link useColumnResize} - the state and maths behind the handle
 *
 * @accessibility
 * - Focusable `role="separator"` with `aria-orientation="vertical"`
 * - Left/Right arrows resize in 8px steps, Shift + arrow in 40px steps
 * - Enter, or a double click, restores the column's starting width
 * - Reports the live width through `aria-valuenow`
 */
export const ColumnResizeHandle = ({
  columnIndex,
  label,
  ...rest
}: ColumnResizeHandleProps) => {
  const api = useColumnResizeContext();
  const ref = useRef<HTMLSpanElement>(null);
  const [resolved, setResolved] = useState({
    index: columnIndex ?? -1,
    label: label ?? '',
  });

  // Runs on every render rather than on mount only: a column inserted before
  // this one shifts its cellIndex without remounting anything.
  useLayoutEffect(() => {
    const cell = ref.current?.closest('th, td') as HTMLTableCellElement | null;
    if (!cell) return;

    const index = columnIndex ?? cell.cellIndex;
    // textContent of the cell, not of a child, so it works whatever the header
    // is built from. The handle itself contributes no text.
    const next = label ?? cell.textContent?.trim() ?? '';
    if (index === resolved.index && next === resolved.label) return;
    setResolved({ index, label: next });
  });

  if (!api) return null;

  const handleProps =
    resolved.index === -1
      ? undefined
      : api.getResizeHandleProps(resolved.index);

  return (
    <HandleBase
      ref={ref}
      aria-label={
        resolved.label ? `Resize column ${resolved.label}` : 'Resize column'
      }
      {...handleProps}
      {...rest}
    />
  );
};

export default ColumnResizeHandle;
