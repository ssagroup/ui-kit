import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import { StoryComponent } from './stories/StoryComponent';
import { within, fireEvent } from '@testing-library/dom';

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

    await fireEvent.click(listItemEls[0]);

    dropdownToggleEl = within(dropdownElement).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent('Strategy: checkbox4Carrot up');
  });
});
