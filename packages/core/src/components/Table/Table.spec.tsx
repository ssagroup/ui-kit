import { act } from 'react';
import { fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import { SortableTable } from './stories/SortableTable';
import { StyledTableStory } from './stories/StyledTable/StoryComponent';
import { screen } from '../../../customTest';

describe('Table', () => {
  it('Render table', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Col</TableCell>
            <TableCell>Col</TableCell>
            <TableCell align="center">Col</TableCell>
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
    const headerCells = screen.queryAllByText('Col');
    const dataCells = screen.getAllByRole('cell');

    expect(table).toBeInTheDocument();
    expect(headerCells.length).toEqual(3);
    expect(dataCells.length).toEqual(9);
  });

  describe('Sorting Table', () => {
    it('Render table', () => {
      render(<SortableTable />);

      const cells = screen.queryAllByRole('cell');

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByTitle('Arrow Down')).toBeInTheDocument();
      expect(cells.length).toEqual(30);
    });

    it('Should change sorting correctly', () => {
      const callback = jest.fn();
      const rendered = render(<SortableTable onSortingChange={callback} />);

      const cells = rendered.container.querySelectorAll('th');

      console.log(cells);

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
});

describe('StyledTable', () => {
  it('Should be correctly rendered', () => {
    const { getByText, getAllByText } = render(<StyledTableStory />);

    getByText('Bot name 1');
    getAllByText('27.07.23');
    getByText('Bittrex');
    getByText('Pending');
    getAllByText('ETH/USD');
    getByText('-70 USD');
    getByText('-10%');
  });

  it('Should be alert shown after clicking a table row', () => {
    const { container } = render(<StyledTableStory />);

    const firstBodyRow = container.querySelector('tbody > tr');

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    fireEvent.click(firstBodyRow as Node);
    expect(alertMock).toHaveBeenCalledWith(
      JSON.stringify({
        id: 1,
        name: 'Bot name 1',
        creationDate: '27.07.23',
        exchange: 'binance',
        status: 'trade',
        pair: 'ETH/USD',
        pnl: { amount: 300, currency: 'USD', isIncreasing: true },
        roi: { amount: 25, isIncreasing: true },
        isDisabled: false,
      }),
    );
  });

  it('Should be modal "Run Reason" shown after clicking the icon for "pending" or "liquidation" status', () => {
    const { container, getByText } = render(<StyledTableStory />);

    const button = container.querySelector(
      'tbody > tr:nth-child(6) > td:last-child button',
    );

    fireEvent.click(button as Node);

    getByText('Run Reason');
  });

  it('Should be submitted "Run Reason" modal', async () => {
    const consoleMock = jest.spyOn(console, 'log').mockImplementation();
    const { container, getByText, getByPlaceholderText } = render(
      <StyledTableStory />,
    );
    const button = container.querySelector(
      'tbody > tr:nth-child(6) > td:last-child button',
    );
    fireEvent.click(button as Node);
    const input = getByPlaceholderText('Enter');
    fireEvent.change(input, { target: { value: 'reason' } });
    const runButton = getByText('Run');
    fireEvent.click(runButton);

    await waitFor(() => {
      expect(consoleMock).toHaveBeenCalledWith(
        'Submitting... ' +
          JSON.stringify({
            reason: 'reason',
          }),
      );
    });
  });

  it('Should have the three dots button clicked', async () => {
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert');
    const { container } = render(<StyledTableStory />);
    const threeDotsButton = container.querySelector(
      'tbody > tr:nth-child(6) > td:last-child button:last-child',
    );
    fireEvent.click(threeDotsButton as Node);
    fireEvent.keyDown(threeDotsButton as Node, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(alertMock).toHaveBeenCalledWith('action copy');
  });
});
