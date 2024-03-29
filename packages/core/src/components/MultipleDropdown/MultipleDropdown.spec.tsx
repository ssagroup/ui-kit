import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import DropdownOption from '@components/DropdownOption';

import MultipleDropdown from '.';
import { DynamicallyChangedItems } from './stories/MultipleDropdown.stories';

interface Item {
  value: number;
  label: string;
  subText: string;
}

const items = [
  { value: 1, label: 'First Item', subText: 'Sub text 1' },
  { value: 2, label: 'Second Item', subText: 'Sub text 2' },
  { value: 3, label: 'Third Item', subText: 'Sub text 3' },
  { value: 4, label: 'Fourth Item', subText: 'Sub text 4' },
  { value: 5, label: 'Fifth Item', subText: 'Sub text 5' },
  { value: 6, label: 'Sixth Item', subText: 'Sub text 6' },
  { value: 7, label: 'Seventh Item', subText: 'Sub text 7' },
];
const selectedItems = [items[2], items[4]];
const selectedItemsValues = selectedItems.map((item) => item.value);
const placeholder = 'Strategy';

const getListItemValue = (item: Item) => item.label;

describe('MultipleDropdown', () => {
  function setup(props = {}) {
    const mockOnChange = jest.fn();

    return {
      user: userEvent.setup(),
      mockOnChange,
      ...render(
        <MultipleDropdown isMultiple onChange={mockOnChange} {...props}>
          {items.map((item, index) => (
            <DropdownOption key={index} value={item.value}>
              {item.label}
            </DropdownOption>
          ))}
        </MultipleDropdown>,
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
    const { user, mockOnChange, getByRole, queryByRole, getByTestId } = setup({
      selectedItems,
      label: placeholder,
    });

    expect(mockOnChange).not.toBeCalled();

    const dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent(
      placeholder + ': ' + selectedItems[0].label,
    );
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

      if (selectedItemsValues.includes(listItem.value)) {
        expect(listItemEl).toHaveAttribute('aria-selected', 'true');
      } else {
        expect(listItemEl).toHaveAttribute('aria-selected', 'false');
      }
    }
  });

  it('Renders with an empty items array', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId, queryByRole, getByRole } = render(
      <MultipleDropdown isMultiple onChange={mockOnChange}>
        {null}
      </MultipleDropdown>,
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

    expect(within(listItemEl).getByRole('button')).toHaveTextContent(
      'No items',
    );

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent('Select something');
  });

  it("Chooses an item when it's clicked [isMultiple = true]", async () => {
    const { user, mockOnChange, getByRole, queryByRole, getByTestId } = setup({
      selectedItems,
      label: placeholder,
    });

    const dropdownEl = getByTestId('dropdown');
    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent(
      'Strategy: Third Item+1Carrot down',
    );

    await user.click(dropdownToggleEl);

    const listItemEls = within(getByRole('listbox')).getAllByRole('button');

    await user.click(listItemEls[0]);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent(getListItemValue(items[0]));
    expect(mockOnChange).toHaveBeenCalledWith(1, true);
    expect(queryByRole('listbox')).toBeInTheDocument();

    await within(dropdownToggleEl).findByTitle('Carrot up');
  });

  it("Chooses an item when it's clicked [isMultiple = false]", async () => {
    const { user, mockOnChange, getByRole, queryByRole, getByTestId } = setup({
      selectedItems: [items[2]],
      label: placeholder,
      isMultiple: false,
    });

    const dropdownEl = getByTestId('dropdown');
    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent('Third ItemCarrot down');

    await user.click(dropdownToggleEl);

    const listItemEls = within(getByRole('listbox')).getAllByRole('button');

    await user.click(listItemEls[0]);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent(getListItemValue(items[0]));
    expect(mockOnChange).toHaveBeenCalledWith(1, true);
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
    const { user, mockOnChange, getByRole, getByTestId } = setup({
      selectedItems: [items[2]],
      label: placeholder,
      isMultiple: false,
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
    const { getByTestId } = setup({
      label: 'Strategy',
      placeholder: 'Choose at least one option',
    });

    const dropdownToggleEl = within(getByTestId('dropdown')).getByRole(
      'combobox',
    );
    expect(dropdownToggleEl).toHaveTextContent('Choose at least one option');
  });

  it('Renders with a hidden placeholder', () => {
    const { getByTestId } = setup({
      label: 'Strategy',
      showPlaceholder: false,
    });

    const dropdownToggleEl = within(getByTestId('dropdown')).getByRole(
      'combobox',
    );
    expect(dropdownToggleEl).toHaveTextContent('StrategyCarrot down');
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
      <MultipleDropdown isMultiple isDisabled>
        {items.map((item, index) => (
          <DropdownOption key={index} value={item.value}>
            {item.label}
          </DropdownOption>
        ))}
      </MultipleDropdown>,
    );

    expect(queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('Renders opened', () => {
    const { queryByRole } = setup({ isOpen: true });

    expect(queryByRole('listbox')).toBeInTheDocument();
  });

  it('New item should be rendered correctly', async () => {
    const args = {
      isDisabled: false,
      isMultiple: true,
      selectedItems: [],
      label: 'Strategy',
    };
    const mockOnChange = jest.fn();
    const { getByTestId, getByText, getByRole } = render(
      <DynamicallyChangedItems {...args} />,
    );

    expect(mockOnChange).not.toBeCalled();

    const dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    await userEvent.click(dropdownToggleEl);

    let listItemEls = within(getByRole('listbox')).getAllByRole('button');
    expect(listItemEls.length).toEqual(3);

    const updateItemsButton = getByText('Update items');
    await userEvent.click(updateItemsButton);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    await userEvent.click(dropdownToggleEl);

    listItemEls = within(getByRole('listbox')).getAllByRole('button');
    expect(listItemEls.length).toEqual(4);
  });
});
