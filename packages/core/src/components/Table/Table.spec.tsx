import { screen } from '../../../customTest';

import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import { TableSortingComponent } from './components/TableSortingComponent';
import { fireEvent } from '@storybook/testing-library';
import { act } from 'react-dom/test-utils';

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

  it('Render Sorting table', () => {
    render(<TableSortingComponent />);

    const cells = screen.queryAllByRole('cell');

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByTitle('Arrow Down')).toBeInTheDocument();
    expect(cells.length).toEqual(33);
  });

  it('Should sort changing worked', () => {
    const callback = jest.fn();
    render(<TableSortingComponent onSortingChange={callback} />);

    const cells = screen.queryAllByRole('cell');

    act(() => {
      fireEvent.click(cells[0]);
    });
    expect(callback).toHaveBeenLastCalledWith({
      column: 'title',
      order: 'asc',
    });

    act(() => {
      fireEvent.click(cells[0]);
    });
    expect(callback).toHaveBeenLastCalledWith({
      column: 'title',
      order: 'desc',
    });

    act(() => {
      fireEvent.click(cells[0]);
    });
    expect(callback).toHaveBeenLastCalledWith({
      column: 'title',
      order: 'asc',
    });
  });
});
