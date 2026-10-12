import TableBody from '@components/TableBody';
import TableHead from '@components/TableHead';
import TableContainer from '@components/TableContainer';
import {
  NestedTable,
  NestedTableCell,
  NestedTableCellHeader,
  NestedTableRow,
} from '../components';
import { WithNestedTableRow } from '../WithNestedTableRow';

const columns = [
  'Employee',
  'Position',
  'Location',
  'Start date',
  'Manager',
  'Email',
  'Phone',
  'Status',
  'Actions',
];

const departments = ['Engineering', 'Sales', 'Marketing', 'Finance'].map(
  (department, groupIndex) => ({
    department,
    members: Array.from({ length: 4 }).map((_, index) => {
      const n = groupIndex * 4 + index + 1;
      return [
        `Employee ${n}`,
        ['Senior engineer', 'Account manager', 'Designer', 'Analyst'][index],
        ['Kyiv', 'Lviv', 'Warsaw', 'Remote'][index],
        `2024-0${(n % 9) + 1}-1${n % 10}`,
        `Manager ${(n % 5) + 1}`,
        `employee${n}@example.com`,
        `+380 44 000 00 ${String(n).padStart(2, '0')}`,
        n % 3 === 0 ? 'On leave' : 'Active',
        'Edit · Remove',
      ];
    }),
  }),
);

const Header = ({ width }: { width?: number }) => (
  <TableHead>
    <NestedTableRow isHeader>
      {columns.map((column) => (
        <NestedTableCellHeader
          key={column}
          columnId={column}
          style={width ? { width, minWidth: width } : undefined}>
          {column}
        </NestedTableCellHeader>
      ))}
    </NestedTableRow>
  </TableHead>
);

const Body = () => (
  <TableBody>
    {departments.map(({ department, members }) => (
      <WithNestedTableRow key={department}>
        <NestedTableRow>
          <NestedTableCell>{department}</NestedTableCell>
          {columns.slice(1).map((column) => (
            <NestedTableCell key={column} />
          ))}
        </NestedTableRow>
        {members.map((member) => (
          <NestedTableRow key={member[0]}>
            {member.map((value, index) => (
              <NestedTableCell key={index}>{value}</NestedTableCell>
            ))}
          </NestedTableRow>
        ))}
      </WithNestedTableRow>
    ))}
  </TableBody>
);

/** Drag the column edges; the toggle column keeps its width. */
export const NestedTableResizableStory = () => (
  <NestedTable resizableColumns>
    <Header />
    <Body />
  </NestedTable>
);

/**
 * Freeze columns from the header menus; the header stays put while the body
 * scrolls. The toggle column freezes along with the first column.
 */
export const NestedTableFrozenStory = () => (
  <TableContainer maxHeight={400}>
    <NestedTable
      freezeControls
      stickyHeader
      defaultFrozenColumns={{ start: ['Employee'], end: ['Actions'] }}>
      <Header width={200} />
      <Body />
    </NestedTable>
  </TableContainer>
);

/** Freezing and resizing together; frozen offsets follow every drag. */
export const NestedTableFrozenResizableStory = () => (
  <TableContainer maxHeight={400}>
    <NestedTable
      resizableColumns
      columnResizeMode="expand"
      freezeControls
      stickyHeader
      defaultFrozenColumns={{ start: ['Employee', 'Location'] }}>
      <Header width={200} />
      <Body />
    </NestedTable>
  </TableContainer>
);
