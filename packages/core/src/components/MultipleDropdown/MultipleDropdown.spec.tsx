import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import DropdownOption from '@components/DropdownOption';
import DropdownOptionGroup from '@components/DropdownOptionGroup';

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
      findByTestId,
    } = setup();

    expect(mockOnChange).not.toBeCalled();

    const dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent('Select something');
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'false');
    expect(dropdownToggleEl).toHaveAttribute('aria-haspopup', 'listbox');
    expect(dropdownToggleEl).toHaveAttribute('aria-controls');
    expect(dropdownToggleEl).not.toHaveAttribute('aria-labelledby');
    findByTestId('dropdown-arrow-down');

    let listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();

    await user.click(dropdownToggleEl);

    listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('option');
    expect(listItemEls.length).toBe(items.length);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveFocus();
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'true');
    findByTestId('dropdown-arrow-up');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];
      expect(listItemEl).toHaveAttribute('aria-selected', 'false');
      const itemListValue = getListItemValue(listItem);
      expect(listItemEl).toHaveTextContent(itemListValue);
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
    expect(dropdownToggleEl).not.toHaveAttribute('aria-labelledby');
    await within(dropdownToggleEl).findByTestId('dropdown-arrow-down');

    let listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();

    await user.click(dropdownToggleEl);

    listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('option');
    expect(listItemEls.length).toBe(items.length);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveFocus();
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'true');
    await within(dropdownToggleEl).findByTestId('dropdown-arrow-up');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];

      const itemListValue = getListItemValue(listItem);

      await within(listItemEl).findByText(itemListValue);
      expect(listItemEl).toHaveTextContent(itemListValue);

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
    expect(dropdownToggleEl).not.toHaveAttribute('aria-labelledby');
    await within(dropdownToggleEl).findByTestId('dropdown-arrow-down');

    let listboxEl = queryByRole('listbox');

    expect(listboxEl).not.toBeInTheDocument();

    await userEvent.click(dropdownToggleEl);

    listboxEl = getByRole('listbox');

    expect(within(listboxEl).queryByRole('option')).not.toBeInTheDocument();
    within(listboxEl).getByText('No items');

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveFocus();
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'true');

    await within(dropdownToggleEl).findByTestId('dropdown-arrow-up');

    // Clicking the empty state picks nothing
    await userEvent.click(within(listboxEl).getByText('No items'));

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

    expect(dropdownToggleEl).toHaveTextContent('Strategy: Third Item+1');
    within(dropdownToggleEl).getByTestId('dropdown-arrow-down');

    await user.click(dropdownToggleEl);

    const listItemEls = within(getByRole('listbox')).getAllByRole('option');

    await user.click(listItemEls[0]);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent(getListItemValue(items[0]));
    expect(mockOnChange).toHaveBeenCalledWith(1, true);
    expect(queryByRole('listbox')).toBeInTheDocument();

    await within(dropdownToggleEl).findByTestId('dropdown-arrow-up');
  });

  it("Chooses an item when it's clicked [isMultiple = false]", async () => {
    const { user, mockOnChange, getByRole, queryByRole, getByTestId } = setup({
      selectedItems: [items[2]],
      label: placeholder,
      isMultiple: false,
    });

    const dropdownEl = getByTestId('dropdown');
    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent('Third Item');
    within(dropdownToggleEl).getByTestId('dropdown-arrow-down');

    await user.click(dropdownToggleEl);

    const listItemEls = within(getByRole('listbox')).getAllByRole('option');

    await user.click(listItemEls[0]);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent(getListItemValue(items[0]));
    expect(mockOnChange).toHaveBeenCalledWith(1, true);
    expect(queryByRole('listbox')).not.toBeInTheDocument();

    await within(dropdownToggleEl).findByTestId('dropdown-arrow-down');
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

    const listItemEls = within(getByRole('listbox')).getAllByRole('option');

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
    expect(dropdownToggleEl).toHaveTextContent('Strategy');
    within(dropdownToggleEl).getByTestId('dropdown-arrow-down');
  });

  it('Renders in the disabled state', async () => {
    const { user, mockOnChange, queryByRole, getByTestId } = setup({
      disabled: true,
    });

    const dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent('Select something');
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'false');
    expect(dropdownToggleEl).toHaveAttribute('aria-haspopup', 'listbox');
    expect(dropdownToggleEl).toHaveAttribute('aria-controls');
    expect(dropdownToggleEl).not.toHaveAttribute('aria-labelledby');
    expect(dropdownToggleEl).toHaveAttribute('disabled');
    await within(dropdownToggleEl).findByTestId('dropdown-arrow-down');

    expect(queryByRole('listbox')).not.toBeInTheDocument();

    await user.click(dropdownToggleEl);

    expect(mockOnChange).not.toBeCalled();

    expect(queryByRole('listbox')).not.toBeInTheDocument();
    dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).not.toHaveFocus();
    expect(dropdownToggleEl).toHaveTextContent('Select something');
    expect(dropdownToggleEl).toHaveAttribute('disabled');
    await within(dropdownToggleEl).findByTestId('dropdown-arrow-down');
  });

  it('Closes when changes state to disabled', async () => {
    const { rerender, user, queryByRole, getByTestId } = setup();

    const dropdownToggleEl = within(getByTestId('dropdown')).getByRole(
      'combobox',
    );

    await user.click(dropdownToggleEl);

    expect(queryByRole('listbox')).toBeInTheDocument();

    rerender(
      <MultipleDropdown isMultiple disabled>
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
      disabled: false,
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

    let listItemEls = within(getByRole('listbox')).getAllByRole('option');
    expect(listItemEls.length).toEqual(3);

    const updateItemsButton = getByText('Update items');
    await userEvent.click(updateItemsButton);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    await userEvent.click(dropdownToggleEl);

    listItemEls = within(getByRole('listbox')).getAllByRole('option');
    expect(listItemEls.length).toEqual(4);
  });

  describe('keyboard', () => {
    it('ArrowDown opens on the first selected option; arrows move', async () => {
      const { user, getByRole } = setup({ selectedItems });
      const toggle = getByRole('combobox');

      toggle.focus();
      await user.keyboard('{ArrowDown}');

      const options = within(getByRole('listbox')).getAllByRole('option');
      expect(toggle).toHaveAttribute('aria-activedescendant', options[2].id);

      await user.keyboard('{ArrowDown}');
      expect(toggle).toHaveAttribute('aria-activedescendant', options[3].id);

      await user.keyboard('{Home}');
      expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);

      await user.keyboard('{End}');
      expect(toggle).toHaveAttribute('aria-activedescendant', options[6].id);
      expect(toggle).toHaveFocus();
    });

    it('Enter and Space toggle the highlighted option and keep the list open', async () => {
      const { user, mockOnChange, getByRole } = setup({ selectedItems });
      const toggle = getByRole('combobox');

      toggle.focus();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');
      expect(mockOnChange).toHaveBeenLastCalledWith(3, false);
      expect(getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{ArrowDown}');
      await user.keyboard(' ');
      expect(mockOnChange).toHaveBeenLastCalledWith(4, true);
      expect(getByRole('listbox')).toBeInTheDocument();

      const options = within(getByRole('listbox')).getAllByRole('option');
      expect(options[2]).toHaveAttribute('aria-selected', 'false');
      expect(options[3]).toHaveAttribute('aria-selected', 'true');
    });

    it('Enter picks and closes in single-select mode', async () => {
      const { user, mockOnChange, getByRole, queryByRole } = setup({
        isMultiple: false,
      });
      const toggle = getByRole('combobox');

      toggle.focus();
      await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

      expect(mockOnChange).toHaveBeenCalledWith(2, true);
      expect(queryByRole('listbox')).not.toBeInTheDocument();
      expect(toggle).toHaveTextContent('Second Item');
    });

    it('Enter closes instead of picking an option that is no longer listed', async () => {
      const { user, mockOnChange, getByRole, queryByRole, rerender } = setup();
      const toggle = getByRole('combobox');

      toggle.focus();
      await user.keyboard('{ArrowDown}');
      // The highlighted first option disappears while the list is open.
      rerender(
        <MultipleDropdown isMultiple onChange={mockOnChange}>
          {items.slice(1).map((item) => (
            <DropdownOption key={item.value} value={item.value}>
              {item.label}
            </DropdownOption>
          ))}
        </MultipleDropdown>,
      );
      expect(toggle).not.toHaveAttribute('aria-activedescendant');

      await user.keyboard('{Enter}');
      expect(mockOnChange).not.toHaveBeenCalled();
      expect(queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('Escape and Tab close the list', async () => {
      const { user, getByRole, queryByRole } = setup();
      const toggle = getByRole('combobox');

      toggle.focus();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Escape}');
      expect(queryByRole('listbox')).not.toBeInTheDocument();
      expect(toggle).not.toHaveAttribute('aria-activedescendant');

      await user.keyboard('{ArrowDown}');
      await user.tab();
      expect(queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('wires the toggle to the list it controls', async () => {
      const { user, getByRole } = setup();
      const toggle = getByRole('combobox');

      await user.click(toggle);

      expect(getByRole('listbox')).toHaveAttribute(
        'id',
        toggle.getAttribute('aria-controls'),
      );
      expect(getByRole('listbox')).toHaveAttribute(
        'aria-multiselectable',
        'true',
      );
    });
  });

  describe('width', () => {
    it('shrink-wraps at both levels when width is not provided', () => {
      const { getByTestId } = setup();

      const dropdownBaseEl = getByTestId('dropdown');
      const dropdownToggleEl = within(dropdownBaseEl).getByRole('combobox');

      expect(dropdownBaseEl).toHaveStyleRule('display', 'inline-block');
      expect(dropdownBaseEl).toHaveStyleRule('min-width', '180px');
      expect(dropdownToggleEl).toHaveStyleRule('width', 'auto');
      expect(dropdownToggleEl).toHaveStyleRule('max-width', '250px');
    });

    it('applies width to the base and stretches the toggle to fill it', () => {
      const { getByTestId } = setup({ width: '100%' });

      const dropdownBaseEl = getByTestId('dropdown');
      const dropdownToggleEl = within(dropdownBaseEl).getByRole('combobox');

      expect(dropdownBaseEl).toHaveStyleRule('width', '100%');
      expect(dropdownToggleEl).toHaveStyleRule('width', '100%');
    });

    it('does not compound a percentage width onto the toggle', () => {
      const { getByTestId } = setup({ width: '60%' });

      const dropdownBaseEl = getByTestId('dropdown');
      const dropdownToggleEl = within(dropdownBaseEl).getByRole('combobox');

      // Repeating '60%' would render the toggle at 60% of an already-60% base.
      expect(dropdownBaseEl).toHaveStyleRule('width', '60%');
      expect(dropdownToggleEl).toHaveStyleRule('width', '100%');
    });

    it('clears the min-width and max-width caps that would fight the width', () => {
      const { getByTestId } = setup({ width: 120 });

      const dropdownBaseEl = getByTestId('dropdown');
      const dropdownToggleEl = within(dropdownBaseEl).getByRole('combobox');

      expect(dropdownBaseEl).toHaveStyleRule('width', '120px');
      expect(dropdownBaseEl).toHaveStyleRule('min-width', '0');
      expect(dropdownToggleEl).toHaveStyleRule('width', '100%');
      expect(dropdownToggleEl).toHaveStyleRule('max-width', 'none');
    });
  });

  describe('groups', () => {
    it('renders groups and toggles options inside them', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const { getByRole, getAllByRole } = render(
        <MultipleDropdown
          label="Food"
          selectedItems={[{ value: 'apple' }]}
          onChange={onChange}>
          <DropdownOptionGroup label="Fruits">
            <DropdownOption value="apple" label="Apple" />
            <DropdownOption value="banana" label="Banana" />
          </DropdownOptionGroup>
          <DropdownOptionGroup label="Vegetables">
            <DropdownOption value="carrot" label="Carrot" />
          </DropdownOptionGroup>
        </MultipleDropdown>,
      );

      expect(getByRole('combobox')).toHaveTextContent('Food: Apple');

      await user.click(getByRole('combobox'));
      expect(getAllByRole('group')).toHaveLength(2);
      expect(getByRole('option', { name: 'Apple' })).toHaveAttribute(
        'aria-selected',
        'true',
      );

      await user.click(getByRole('option', { name: 'Carrot' }));

      expect(onChange).toHaveBeenCalledWith('carrot', true);
      expect(getByRole('option', { name: 'Carrot' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
  });
});
