import { fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { TableBotsStory } from './stories/TableBots/StoryComponent';
// import { NoControlOrdersStory } from './stories/NoControlOrders/StoryComponent';

describe('TableBots', () => {
  it('Should be correctly rendered', () => {
    const { getByText, getAllByText } = render(<TableBotsStory />);

    getByText('Bot name 1');
    getAllByText('27.07.23');
    getByText('Bittrex');
    getByText('Pending');
    getAllByText('ETH/USD');
    getByText('-70 USD');
    getByText('-10%');
  });

  it('Should be alert showed after clicking a table row', () => {
    const { container } = render(<TableBotsStory />);

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

  it('Should be modal "Run Reason" showed after clicking the icon for "pending" or "liquidation" status', () => {
    const { container, getByText } = render(<TableBotsStory />);

    const button = container.querySelector(
      'tbody > tr:nth-child(6) > td:last-child button',
    );

    fireEvent.click(button as Node);

    getByText('Run Reason');
  });

  it('Should be submitted "Run Reason" modal', async () => {
    const consoleMock = jest.spyOn(console, 'log');
    const { container, getByText, getByPlaceholderText } = render(
      <TableBotsStory />,
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

  it('Should be clicked by the more dropdown item', async () => {
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert');
    const { container } = render(<TableBotsStory />);
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
// describe('TableBots: NoControlOrdersStory', () => {
// });
