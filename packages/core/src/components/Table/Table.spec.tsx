import { screen } from '../../../customTest';

import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';

describe('Table', () => {
  it('Render table', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Col</TableCell>
            <TableCell>Col</TableCell>
            <TableCell align="center">Col 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Row</TableCell>
            <TableCell>Row</TableCell>
            <TableCell align="center">Row</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2</TableCell>
            <TableCell>Row</TableCell>
            <TableCell align="center">Row 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = screen.getByRole('table');
    const cells = screen.queryAllByRole('cell');

    expect(table).toBeInTheDocument();
    expect(cells.length).toEqual(9);
  });
});
