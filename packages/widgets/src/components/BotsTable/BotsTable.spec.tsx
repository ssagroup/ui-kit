import { fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { BotsTableStory } from './stories/BotsTable/StoryComponent';
import { NoControlOrdersStory } from './stories/NoControlOrders/StoryComponent';

describe('BotsTable', () => {
  it('Should be correctly rendered', () => {
    const { getByText, getAllByText } = render(<BotsTableStory />);

    getByText('Bot name 1');
    getAllByText('27.07.23');
    getByText('Bittrex');
    getByText('Pending');
    getAllByText('ETH/USD');
    getByText('-70 USD');
    getByText('-10%');
  });

  it('Should be alert shown after clicking a table row', () => {
    const { container } = render(<BotsTableStory />);

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
    const { container, getByText } = render(<BotsTableStory />);

    const button = container.querySelector(
      'tbody > tr:nth-child(6) > td:last-child button',
    );

    fireEvent.click(button as Node);

    getByText('Run Reason');
  });

  it('Should be submitted "Run Reason" modal', async () => {
    const consoleMock = jest.spyOn(console, 'log').mockImplementation();
    const { container, getByText, getByPlaceholderText } = render(
      <BotsTableStory />,
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
    const { container } = render(<BotsTableStory />);
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

describe('BotsTable: NoControlOrdersStory', () => {
  it('Should be correctly rendered', () => {
    const { getAllByText } = render(<NoControlOrdersStory />);

    getAllByText('Yevgen 2');
    getAllByText('bot1');
    getAllByText('New Run - 12/8/2023');
    getAllByText('1A2B3C');
    getAllByText('Active');
    getAllByText('Less than minute ago');
    getAllByText('BTC/TUSD');
    getAllByText('0.003 BTC');
  });

  it('Should have the three dots button clicked', async () => {
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert');
    const { container } = render(<NoControlOrdersStory />);
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
    expect(alertMock).toHaveBeenCalledWith('action liquidate');
  });
});
