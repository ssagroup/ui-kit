import { render, within } from '@utils/customTest';
import userEvent from '@testing-library/user-event';

import DropdownOption from '@components/DropdownOption';

import Dropdown from './index';

const items = [
  { id: 1, value: 'First Item' },
  { id: 2, value: 'Second Item' },
  { id: 3, value: 'Third Item' },
  { id: 4, value: 'Fourth Item' },
  { id: 5, value: 'Fifth Item' },
  { id: 6, value: 'Sixth Item' },
  { id: 7, value: 'Seventh Item' },
];

const getListItemValue = (item) => item.value;

describe('Dropdown', () => {
  function setup(props = {}) {
    const mockOnChange = jest.fn();

    return {
      user: userEvent.setup(),
      mockOnChange,
      ...render(
        <Dropdown onChange={mockOnChange} {...props}>
          {items.map((item, index) => (
            <DropdownOption key={index} value={item.value} />
          ))}
        </Dropdown>,
      ),
    };
  }

  it('Renders without a selected item', async () => {
    const {
      user,
      mockOnChange,
      getByRole,
      queryByRole,
      getByTestId,
      findByTitle,
    } = setup();

    expect(mockOnChange).not.toBeCalled();

    const dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent('Select something');
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'false');
    expect(dropdownToggleEl).toHaveAttribute('aria-haspopup', 'listbox');
    expect(dropdownToggleEl).toHaveAttribute('aria-controls');
    expect(dropdownToggleEl).toHaveAttribute('aria-labelledby');
    findByTitle('Carrot down');

    let listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();

    await user.click(dropdownToggleEl);

    listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('listitem');
    expect(listItemEls.length).toBe(items.length);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveFocus();
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'true');
    findByTitle('Carrot up');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];

      expect(listItemEl).toHaveAttribute('aria-selected', 'false');
      const itemListValue = getListItemValue(listItem);
      expect(within(listItemEl).getByRole('button')).toHaveTextContent(
        itemListValue,
      );
      await within(listItemEl).findByText(itemListValue);
    }
  });

  it('Renders with a selected item', async () => {
    const selectedItem = items[2];
    const { user, mockOnChange, getByRole, queryByRole, getByTestId } = setup({
      selectedItem,
    });

    expect(mockOnChange).not.toBeCalled();

    const dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent(getListItemValue(selectedItem));
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'false');
    expect(dropdownToggleEl).toHaveAttribute('aria-haspopup', 'listbox');
    expect(dropdownToggleEl).toHaveAttribute('aria-controls');
    expect(dropdownToggleEl).toHaveAttribute('aria-labelledby');
    await within(dropdownToggleEl).findByTitle('Carrot down');

    let listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();

    await user.click(dropdownToggleEl);

    listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('listitem');
    expect(listItemEls.length).toBe(items.length);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveFocus();
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'true');
    await within(dropdownToggleEl).findByTitle('Carrot up');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];

      const itemListValue = getListItemValue(listItem);

      await within(listItemEl).findByText(itemListValue);
      expect(within(listItemEl).getByRole('button')).toHaveTextContent(
        itemListValue,
      );

      if (listItem.id === selectedItem.id) {
        expect(listItemEl).toHaveAttribute('aria-selected', 'true');
        expect(listItemEl).toHaveStyle('background: #DEE1EC');
      } else {
        expect(listItemEl).toHaveAttribute('aria-selected', 'false');
      }
    }
  });

  it('Renders with an empty items array', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId, queryByRole, getByRole } = render(
      <Dropdown onChange={mockOnChange}>{null}</Dropdown>,
    );

    expect(mockOnChange).not.toBeCalled();

    const dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent('Select something');
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'false');
    expect(dropdownToggleEl).toHaveAttribute('aria-haspopup', 'listbox');
    expect(dropdownToggleEl).toHaveAttribute('aria-controls');
    expect(dropdownToggleEl).toHaveAttribute('aria-labelledby');
    await within(dropdownToggleEl).findByTitle('Carrot down');

    let listboxEl = queryByRole('listbox');

    expect(listboxEl).not.toBeInTheDocument();

    await userEvent.click(dropdownToggleEl);

    listboxEl = getByRole('listbox');

    const listItemEl = within(listboxEl).getByRole('listitem');

    expect(listItemEl).toHaveAttribute('aria-selected', 'false');
    within(listItemEl).getByText('No items');

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveFocus();
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'true');

    await within(dropdownToggleEl).findByTitle('Carrot up');

    // Items list hides when clicked
    await userEvent.click(within(listItemEl).getByRole('button'));

    expect(queryByRole('listbox')).not.toBeInTheDocument();

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent('Select something');
  });

  it("Chooses an item when it's clicked", async () => {
    const selectedItem = items[2];
    const { user, mockOnChange, getByRole, queryByRole, getByTestId } = setup({
      selectedItem,
    });

    const dropdownEl = getByTestId('dropdown');
    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent(selectedItem.value);

    await user.click(dropdownToggleEl);

    const listItemEls = within(getByRole('listbox')).getAllByRole('button');

    await user.click(listItemEls[0]);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent(getListItemValue(items[0]));
    expect(mockOnChange).toHaveBeenCalledWith({ value: items[0].value });
    expect(queryByRole('listbox')).not.toBeInTheDocument();

    await within(dropdownToggleEl).findByTitle('Carrot down');
  });

  it('Closes when clicked outside', async () => {
    const { user, getByRole, queryByRole } = setup();

    await user.click(getByRole('combobox'));
    getByRole('listbox');

    await user.click(document.body);

    expect(queryByRole('listbox')).not.toBeInTheDocument();

    // Doesn't open up when clicked outside again
    await user.click(document.body);

    expect(queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('Do not trigger onChange if clicked on the same option', async () => {
    const selectedItem = items[2];
    const { user, mockOnChange, getByRole, getByTestId } = setup({
      selectedItem,
    });

    const dropdownEl = getByTestId('dropdown');
    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    await user.click(dropdownToggleEl);

    const listItemEls = within(getByRole('listbox')).getAllByRole('button');

    await user.click(listItemEls[2]);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    await user.click(dropdownToggleEl);
    await user.click(listItemEls[2]);

    expect(mockOnChange).toHaveBeenCalledTimes(0);
  });

  it('Renders with a custom placeholder', () => {
    const { getByTestId } = setup({ placeholder: 'Select something' });

    const dropdownToggleEl = within(getByTestId('dropdown')).getByRole(
      'combobox',
    );
    expect(dropdownToggleEl).toHaveTextContent('Select something');
  });

  it('Renders in the disabled state', async () => {
    const { user, mockOnChange, queryByRole, getByTestId } = setup({
      isDisabled: true,
    });

    const dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent('Select something');
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'false');
    expect(dropdownToggleEl).toHaveAttribute('aria-haspopup', 'listbox');
    expect(dropdownToggleEl).toHaveAttribute('aria-controls');
    expect(dropdownToggleEl).toHaveAttribute('aria-labelledby');
    expect(dropdownToggleEl).toHaveAttribute('disabled');
    await within(dropdownToggleEl).findByTitle('Carrot down');

    expect(queryByRole('listbox')).not.toBeInTheDocument();

    await user.click(dropdownToggleEl);

    expect(mockOnChange).not.toBeCalled();

    expect(queryByRole('listbox')).not.toBeInTheDocument();
    dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).not.toHaveFocus();
    expect(dropdownToggleEl).toHaveTextContent('Select something');
    expect(dropdownToggleEl).toHaveAttribute('disabled');
    await within(dropdownToggleEl).findByTitle('Carrot down');
  });

  it('Closes when changes state to disabled', async () => {
    const { rerender, user, queryByRole, getByTestId } = setup();

    const dropdownToggleEl = within(getByTestId('dropdown')).getByRole(
      'combobox',
    );

    await user.click(dropdownToggleEl);

    expect(queryByRole('listbox')).toBeInTheDocument();

    rerender(
      <Dropdown isDisabled>
        {items.map((item, index) => (
          <DropdownOption key={index} value={item.id}>
            {item.value}
          </DropdownOption>
        ))}
      </Dropdown>,
    );

    expect(queryByRole('listbox')).not.toBeInTheDocument();
  });
});
