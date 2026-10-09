import { useState } from 'react';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import TableCellHeader from '@components/TableCellHeader';
import TableContainer from '@components/TableContainer';
import Typography from '@components/Typography';
import { ColumnId, FrozenColumns } from '../types';

const columns = [
  'Employee',
  'Department',
  'Position',
  'Location',
  'Start date',
  'Manager',
  'Email',
  'Phone',
  'Status',
  'Actions',
];

const rows = Array.from({ length: 30 }).map((_, index) => [
  `Employee ${index + 1}`,
  ['Engineering', 'Sales', 'Marketing', 'Finance'][index % 4],
  ['Senior engineer', 'Account manager', 'Designer', 'Analyst'][index % 4],
  ['Kyiv', 'Lviv', 'Warsaw', 'Remote'][index % 4],
  `2024-0${(index % 9) + 1}-1${index % 10}`,
  `Manager ${(index % 5) + 1}`,
  `employee${index + 1}@example.com`,
  `+380 44 000 00 ${String(index).padStart(2, '0')}`,
  index % 3 === 0 ? 'On leave' : 'Active',
  'Edit · Remove',
]);

const header = (
  <TableHead>
    <TableRow>
      {columns.map((column) => (
        // Wider than the content needs, so the table overflows any normal
        // viewport and there is always something to scroll sideways.
        <TableCellHeader
          key={column}
          columnId={column}
          style={{ width: 200, minWidth: 200 }}>
          {column}
        </TableCellHeader>
      ))}
    </TableRow>
  </TableHead>
);

const body = (
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row[0]}>
        {row.map((value, index) => (
          <TableCell key={index}>{value}</TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

/**
 * Everything on: the user freezes and unfreezes columns from the header
 * menus, and the header row stays put while the body scrolls.
 */
export const FreezableTable = () => (
  <TableContainer maxHeight={400}>
    <Table
      freezeControls
      stickyHeader
      defaultFrozenColumns={{ start: ['Employee'], end: ['Actions'] }}>
      {header}
      {body}
    </Table>
  </TableContainer>
);

/**
 * Frozen by the developer only: no header menus, the app decides which
 * columns are frozen through `frozenColumns`.
 */
export const DeveloperFrozenTable = () => {
  const [frozen, setFrozen] = useState<Required<FrozenColumns>>({
    start: ['Position'],
    end: [],
  });
  const toggle = (id: ColumnId) =>
    setFrozen(({ start, end }) => ({
      start: start.includes(id)
        ? start.filter((other) => other !== id)
        : [...start, id],
      end,
    }));
  return (
    <div>
      <Typography variant="body2" css={{ marginBottom: 8 }}>
        Frozen on the left:{' '}
        {columns.slice(0, 5).map((column) => (
          <label key={column} css={{ marginRight: 12 }}>
            <input
              type="checkbox"
              checked={frozen.start.includes(column)}
              onChange={() => toggle(column)}
            />{' '}
            {column}
          </label>
        ))}
      </Typography>
      <TableContainer maxHeight={320}>
        <Table frozenColumns={frozen} onFrozenColumnsChange={setFrozen}>
          {header}
          {body}
        </Table>
      </TableContainer>
    </div>
  );
};

/** Freezing and resizing together; frozen offsets follow every drag. */
export const FreezableResizableTable = () => (
  <TableContainer maxHeight={400}>
    <Table
      resizableColumns
      columnResizeMode="expand"
      freezeControls
      stickyHeader
      defaultFrozenColumns={{ start: ['Employee', 'Location'] }}>
      {header}
      {body}
    </Table>
  </TableContainer>
);
