import { useState } from 'react';
import { css } from '@emotion/react';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import TableCellHeader from '@components/TableCellHeader';
import Wrapper from '@components/Wrapper';
import Typography from '@components/Typography';

const columns = ['Bot name', 'Exchange', 'Trading pair', 'Notes'] as const;

const rows = Array.from({ length: 6 }).map((_, index) => ({
  name: `Bot name ${index + 1}`,
  exchange: index % 2 === 0 ? 'Binance' : 'Bittrex',
  pair: 'ETH/USD',
  notes:
    'A deliberately long note, so that narrowing the column shows the ellipsis',
}));

/** Only needed by the expand mode, where the table outgrows its container. */
const scrollable = css`
  display: block;
  overflow-x: auto;
  max-width: 100%;
`;

const bodyRows = rows.map((row) => (
  <TableRow key={row.name}>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.exchange}</TableCell>
    <TableCell>{row.pair}</TableCell>
    <TableCell>{row.notes}</TableCell>
  </TableRow>
));

const headerRow = (
  <TableRow>
    {columns.map((column) => (
      <TableCellHeader key={column}>{column}</TableCellHeader>
    ))}
  </TableRow>
);

/**
 * The default: a resize trades width with the next column, so the table stays
 * exactly as wide as its container and nothing around it moves. The last column
 * has nothing to trade with and so has no handle.
 */
export const ResizableTable = ({
  onColumnWidthsChange,
}: {
  onColumnWidthsChange?: (columnWidths: number[]) => void;
}) => (
  <Table resizableColumns onColumnWidthsChange={onColumnWidthsChange}>
    <TableHead>{headerRow}</TableHead>
    <TableBody>{bodyRows}</TableBody>
  </Table>
);

/**
 * The opt-in: every column keeps the width the user gave it and the table grows
 * instead, which only works inside something that can scroll sideways.
 */
export const ExpandingResizableTable = () => (
  <Wrapper css={scrollable}>
    <Table resizableColumns columnResizeMode="expand">
      <TableHead>{headerRow}</TableHead>
      <TableBody>{bodyRows}</TableBody>
    </Table>
  </Wrapper>
);

/**
 * Widths owned by the caller, which is what persisting them looks like: store
 * whatever `onColumnWidthsChange` reports and hand it back as `columnWidths`.
 * The last column is pinned, so it has no handle.
 */
export const ControlledResizableTable = () => {
  const [columnWidths, setColumnWidths] = useState([220, 140, 140, 96]);

  return (
    <Wrapper
      css={css`
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      `}>
      <Typography variant="body2">
        Widths: {columnWidths.map(Math.round).join(' · ')}
      </Typography>
      <Table
        resizableColumns
        columnWidths={columnWidths}
        minColumnWidth={96}
        maxColumnWidth={400}
        onColumnWidthsChange={setColumnWidths}>
        <TableHead>
          <TableRow>
            <TableCellHeader>Bot name</TableCellHeader>
            <TableCellHeader>Exchange</TableCellHeader>
            <TableCellHeader>Trading pair</TableCellHeader>
            <TableCellHeader resizable={false}>Actions</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.exchange}</TableCell>
              <TableCell>{row.pair}</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
};
