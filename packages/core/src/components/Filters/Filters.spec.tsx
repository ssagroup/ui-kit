import { within, fireEvent } from '@testing-library/dom';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import { StoryComponent } from './stories/StoryComponent';

describe('Filters', () => {
  mockIntersectionObserver();

  it('Should be correctly rendered', () => {
    const { queryByText, queryByTestId } = render(<StoryComponent />);

    queryByText('strategy #3');
    expect(queryByTestId('trigger-notification')).not.toBeInTheDocument();
  });

  it('Should be correctly changed the item', async () => {
    const { queryByRole, getByRole, queryAllByTestId } = render(
      <StoryComponent />,
    );

    const dropdownElements = queryAllByTestId('dropdown');
    const dropdownElement = dropdownElements[0];
    let dropdownToggleEl = within(dropdownElement).getByRole('combobox');

    let listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();

    await fireEvent.click(dropdownToggleEl);

    listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('listitem');
    expect(listItemEls.length).toBe(5);

    const logSpy = jest.spyOn(console, 'log');
    await fireEvent.click(listItemEls[0]);

    dropdownToggleEl = within(dropdownElement).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent('Strategy: checkbox4Carrot up');
    expect(logSpy).toHaveBeenCalledWith('>>>Filters onSubmit', {
      exchange: ['binance'],
      pairs: ['btcfdusd'],
      status: ['running'],
      strategy: ['checkbox4'],
      strategy2: ['strategy2Checkbox1'],
      strategy3: [],
    });
  });
});
