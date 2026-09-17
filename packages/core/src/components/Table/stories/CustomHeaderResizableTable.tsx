import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Table, { useColumnResize } from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import Icon from '@components/Icon';

const columns = ['Bot name', 'Exchange', 'Trading pair', 'Notes'] as const;

const rows = Array.from({ length: 6 }).map((_, index) => ({
  name: `Bot name ${index + 1}`,
  exchange: index % 2 === 0 ? 'Binance' : 'Bittrex',
  pair: 'ETH/USD',
  notes: 'A deliberately long note, so that narrowing the column truncates it',
}));

/**
 * Taking over means taking on the layout rules too — `Table` only applies these
 * itself when `resizableColumns` is set.
 */
const tableStyles = css`
  table-layout: fixed;

  & td {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/** A header cell of the consumer's own, rather than TableCellHeader. */
const SortableHeaderCell = styled.th`
  position: relative;
  overflow: hidden;

  padding: 0 16px;
  height: 44px;

  background: #fff;
  text-align: left;
  white-space: nowrap;
`;

const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  border: none;
  padding: 0;

  background: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
`;

/** Deliberately unlike the kit's handle, to show that the look is yours. */
const GripHandle = styled.span`
  position: absolute;
  top: 8px;
  right: 0;
  bottom: 8px;

  width: 10px;

  border-left: 2px dotted ${({ theme }) => theme.colors.greyFocused};
  cursor: col-resize;
  touch-action: none;

  &:hover,
  &[data-resizing='true'] {
    border-left-color: ${({ theme }) => theme.colors.blue};
  }
`;

/**
 * The headless path: the consumer owns the header markup, the handles and the
 * colgroup, and `useColumnResize` only supplies the widths and the gesture.
 *
 * Worth noting what gets easier here — the hook is told which column each
 * handle belongs to, so nothing has to be inferred from the DOM. That is why
 * the last column simply has no handle rather than a hidden one.
 */
export const CustomHeaderResizableTable = () => {
  const [sortedBy, setSortedBy] = useState<string | null>(null);
  const { columnWidths, tableRef, getResizeHandleProps } = useColumnResize({
    defaultColumnWidths: [240, 160, 160, 320],
    minColumnWidth: 88,
  });

  return (
    <Table ref={tableRef} css={tableStyles}>
      <colgroup>
        {columnWidths.map((width, index) => (
          <col key={columns[index]} style={{ width }} />
        ))}
      </colgroup>
      <TableHead>
        <TableRow>
          {columns.map((column, index) => (
            <SortableHeaderCell key={column}>
              <SortButton onClick={() => setSortedBy(column)}>
                {column}
                {sortedBy === column && <Icon name="arrow-up" size={10} />}
              </SortButton>
              {index < columns.length - 1 && (
                <GripHandle
                  {...getResizeHandleProps(index)}
                  aria-label={`Resize column ${column}`}
                />
              )}
            </SortableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.exchange}</TableCell>
            <TableCell>{row.pair}</TableCell>
            <TableCell>{row.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
