import { RowLabel, RowCells, Cell, TableRow } from './styles';
import { MarginInfoTableRowProps } from '@components/MarginInfo/types';

export const MarginInfoTableRow = ({
  label,
  baseValue,
  quoteValue,
}: MarginInfoTableRowProps) => (
  <TableRow>
    <RowLabel>{label}</RowLabel>
    <RowCells>
      <Cell>{baseValue}</Cell>
      <Cell>{quoteValue}</Cell>
    </RowCells>
  </TableRow>
);
