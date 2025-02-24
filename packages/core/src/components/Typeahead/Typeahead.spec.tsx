import { within, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Typeahead } from './Typeahead';
import { highlightInputMatch } from './utils';
import { TypeaheadOption } from './components';
import { DynamicallyChangedItems } from './Typeahead.stories';

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

const items = [
  { id: 1, value: 'First' },
  { id: 2, value: 'Second' },
  { id: 3, value: 'Third' },
  { id: 4, label: 'Fourth', value: 4 },
  { id: 5, value: 'Fifth' },
  { id: 6, value: 'Sixth' },
];

const selectedItems = [items[0], items[4]];

const getListItemValue = (item: (typeof items)[0]) => item.value;
const getListItemLabel = (item: (typeof items)[0]) => item.label || item.value;

describe('Typeahead', () => {
  const originalConsoleWarn = console.warn;
  function setup(props = {}) {
    const mockOnChange = jest.fn();

    return {
      user: userEvent.setup(),
      mockOnChange,
      ...render(
        <Typeahead
          isDisabled={false}
          name={'typeahead-dropdown'}
          label="Label"
          register={jest.fn()}
          setValue={mockOnChange}
          validationSchema={{
            required: 'Required',
          }}
          renderOption={({ label, input }) => highlightInputMatch(label, input)}
          {...props}>
          {items.map(({ value, id }) => (
            <TypeaheadOption key={id} value={id} label={value}>
              {value}
            </TypeaheadOption>
          ))}
        </Typeahead>,
      ),
    };
  }

  beforeEach(() => {
    console.warn = jest.fn();
  });

  afterEach(() => {
    console.warn = originalConsoleWarn;
  });

  it('Renders without a selected item', async () => {
    const { user, mockOnChange, getByRole, queryByRole, getByTestId } = setup();

    expect(mockOnChange).toBeCalledWith('typeahead-dropdown', undefined, {
      shouldDirty: false,
    });

    const mainElement = getByTestId('typeahead');

    let toggleElement = within(mainElement).getByRole('combobox');
    expect(screen.getByPlaceholderText('Select something'));
    expect(toggleElement).toHaveAttribute('aria-expanded', 'false');
    expect(toggleElement).toHaveAttribute('aria-haspopup', 'dialog');
    expect(toggleElement).toHaveAttribute('aria-controls');
    expect(toggleElement).toHaveAttribute('aria-labelledby');

    let listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();

    let inputEl = screen.queryByTestId('typeahead-input');
    await user.click(inputEl as HTMLElement);

    listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('option');
    expect(listItemEls.length).toBe(items.length);

    toggleElement = within(mainElement).getByRole('combobox');
    inputEl = screen.queryByTestId('typeahead-input');
    expect(inputEl).toHaveFocus();
    expect(toggleElement).toHaveAttribute('aria-expanded', 'true');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];
      expect(listItemEl).toHaveAttribute('aria-selected', 'false');
      const itemListValue = getListItemValue(listItem);
      expect(listItemEl).toHaveTextContent(`${itemListValue}`);
      await within(listItemEl).findByText(itemListValue);
    }
  });

  it('Renders with a selected item', async () => {
    const selectedIDs = selectedItems.map((item) => item.id);
    const { user, mockOnChange, getByRole, queryByRole, getByTestId } = setup({
      initialSelectedItems: selectedIDs,
      isMultiple: true,
      label: 'Label',
    });

    expect(mockOnChange).toBeCalledWith('typeahead-dropdown', selectedIDs, {
      shouldDirty: false,
    });

    let mainElement = getByTestId('typeahead');

    let toggleElement = within(mainElement).getByRole('combobox');
    expect(
      screen.queryByPlaceholderText('Select something'),
    ).not.toBeInTheDocument();
    expect(toggleElement).toHaveAttribute('aria-expanded', 'false');
    expect(toggleElement).toHaveAttribute('aria-haspopup', 'dialog');
    expect(toggleElement).toHaveAttribute('aria-controls');
    expect(toggleElement).toHaveAttribute('aria-labelledby');

    mainElement = getByTestId('typeahead');
    toggleElement = within(mainElement).getByRole('combobox');
    for (let i = 0; i < selectedItems.length; i++) {
      const tokenValue = selectedItems[i].value;
      within(toggleElement).getByText(tokenValue);
    }

    let listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();

    let inputEl = screen.queryByTestId('typeahead-input');
    await user.click(inputEl as HTMLElement);

    listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('option');
    expect(listItemEls.length).toBe(items.length);

    toggleElement = within(mainElement).getByRole('combobox');
    inputEl = screen.queryByTestId('typeahead-input');
    expect(inputEl).toHaveFocus();
    expect(toggleElement).toHaveAttribute('aria-expanded', 'true');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];
      expect(listItemEl).toHaveAttribute(
        'aria-selected',
        `${selectedIDs.includes(listItem.id)}`,
      );
      const itemListValue = getListItemValue(listItem);
      expect(listItemEl).toHaveTextContent(`${itemListValue}`);
      await within(listItemEl).findByText(itemListValue);
    }
  });

  it('Renders with an empty items array', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId, queryByRole } = render(
      <Typeahead
        isMultiple
        name={'typeahead-dropdown'}
        label="Label"
        register={jest.fn()}
        setValue={mockOnChange}
      />,
    );

    expect(mockOnChange).toBeCalledWith('typeahead-dropdown', [], {
      shouldDirty: false,
    });

    let mainElement = getByTestId('typeahead');

    let toggleElement = within(mainElement).getByRole('combobox');
    expect(
      screen.queryByPlaceholderText('Select something'),
    ).toBeInTheDocument();
    expect(toggleElement).toHaveAttribute('aria-expanded', 'false');
    expect(toggleElement).toHaveAttribute('aria-haspopup', 'dialog');
    expect(toggleElement).toHaveAttribute('aria-controls');
    expect(toggleElement).toHaveAttribute('aria-labelledby');

    mainElement = getByTestId('typeahead');
    toggleElement = within(mainElement).getByRole('combobox');

    let listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();

    const inputEl = screen.queryByTestId('typeahead-input');
    await userEvent.click(inputEl as HTMLElement);

    listboxEl = queryByRole('listbox');
    const listItemEl = within(listboxEl as HTMLElement).getByRole('option');

    expect(listItemEl).toHaveAttribute('aria-selected', 'false');
    within(listItemEl).getByText('No matches found');
    expect(inputEl).toHaveFocus();
    expect(toggleElement).toHaveAttribute('aria-expanded', 'true');
  });

  it("Chooses an item when it's clicked [isMultiple = true]", async () => {
    const selectedIDs = selectedItems.map((item) => item.id);
    const { user, mockOnChange, getByRole, getByTestId } = setup({
      initialSelectedItems: selectedIDs,
      isMultiple: true,
      label: 'Label',
    });

    expect(mockOnChange).toBeCalledWith('typeahead-dropdown', selectedIDs, {
      shouldDirty: false,
    });

    const mainElement = getByTestId('typeahead');

    let toggleElement = within(mainElement).getByRole('combobox');

    expect(toggleElement).toHaveTextContent('FirstRemoveFifthRemoveRemove');

    const inputEl = screen.queryByTestId('typeahead-input');
    await user.click(inputEl as HTMLElement);

    const listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('option');
    await user.click(listItemEls[0]);

    toggleElement = within(mainElement).getByRole('combobox');

    expect(toggleElement).toHaveTextContent('FifthRemoveRemove');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];
      expect(listItemEl).toHaveAttribute(
        'aria-selected',
        `${selectedIDs.includes(listItem.id)}`,
      );
      const itemListValue = getListItemValue(listItem);
      expect(listItemEl).toHaveTextContent(`${itemListValue}`);
      await within(listItemEl).findByText(itemListValue);
    }
  });

  it("Chooses an item when it's clicked [isMultiple = false]", async () => {
    const selectedIDs = [selectedItems[0].id];
    const { user, mockOnChange, getByRole } = setup({
      initialSelectedItems: selectedIDs,
      isMultiple: false,
      label: 'Label',
    });

    expect(mockOnChange).lastCalledWith('typeahead-dropdown', selectedIDs[0], {
      shouldDirty: true,
    });

    let inputEl = screen.queryByTestId('typeahead-input');
    expect(inputEl).toHaveValue('First');
    await user.click(inputEl as HTMLElement);

    let listboxEl = getByRole('listbox');
    let listItemEls = within(listboxEl).getAllByRole('option');
    await user.click(listItemEls[1]);

    inputEl = screen.queryByTestId('typeahead-input');
    expect(inputEl).toHaveValue('Second');

    await user.click(inputEl as HTMLElement);

    listboxEl = getByRole('listbox');
    listItemEls = within(listboxEl).getAllByRole('option');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];
      expect(listItemEl).toHaveAttribute(
        'aria-selected',
        `${[2].includes(listItem.id)}`,
      );
      const itemListValue = getListItemValue(listItem);
      expect(listItemEl).toHaveTextContent(`${itemListValue}`);
      await within(listItemEl).findByText(itemListValue);
    }
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

  it('Toggle option if clicked on the same option', async () => {
    const selectedIDs = [selectedItems[0].id];
    const { user, getByRole, getByTestId } = setup({
      initialSelectedItems: selectedIDs,
      isMultiple: false,
      label: 'Label',
    });

    const mainElement = getByTestId('typeahead');
    const toggleElement = within(mainElement).getByRole('combobox');

    let inputEl = screen.queryByTestId('typeahead-input');
    expect(inputEl).toHaveValue('First');

    for (let i = 0; i < 2; i++) {
      await user.click(toggleElement);

      const listboxEl = getByRole('listbox');
      const listItemEls = within(listboxEl).getAllByRole('option');

      await user.click(listItemEls[0]);

      inputEl = screen.queryByTestId('typeahead-input');
      expect(inputEl).toHaveValue(i === 0 ? '' : 'First');
    }
  });

  it('Renders with a custom placeholder', () => {
    setup({
      placeholder: 'Choose at least one option',
    });

    expect(screen.getByPlaceholderText('Choose at least one option'));
  });

  it('Renders without any placeholder', () => {
    setup({
      placeholder: null,
    });

    expect(screen.getByTestId('typeahead-input')).not.toHaveAttribute(
      'placeholder',
      '',
    );
  });

  it('Renders in the disabled state', async () => {
    const selectedIDs = selectedItems.map((item) => item.id);
    const { user, mockOnChange, queryByRole, getByTestId } = setup({
      initialSelectedItems: selectedIDs,
      isMultiple: true,
      isDisabled: true,
      label: 'Label',
    });

    expect(mockOnChange).toBeCalledWith('typeahead-dropdown', selectedIDs, {
      shouldDirty: false,
    });

    let mainElement = getByTestId('typeahead');

    let toggleElement = within(mainElement).getByRole('combobox');
    expect(
      screen.queryByPlaceholderText('Select something'),
    ).not.toBeInTheDocument();
    expect(toggleElement).toHaveAttribute('disabled');

    mainElement = getByTestId('typeahead');
    toggleElement = within(mainElement).getByRole('combobox');

    let listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();

    const inputEl = screen.queryByTestId('typeahead-input');
    await user.click(inputEl as HTMLElement);

    listboxEl = queryByRole('listbox');
    expect(listboxEl).not.toBeInTheDocument();
  });

  it('Closes when changes state to disabled', async () => {
    const { rerender, user, queryByRole, getByTestId } = setup();

    const mainElement = getByTestId('typeahead');
    const toggleElement = within(mainElement).getByRole('combobox');

    await user.click(toggleElement);

    expect(queryByRole('listbox')).toBeInTheDocument();

    rerender(
      <Typeahead
        isDisabled
        name={'typeahead-dropdown'}
        label="Label"
        register={jest.fn()}
        setValue={jest.fn()}
        validationSchema={{
          required: 'Required',
        }}
        renderOption={({ label, input }) => highlightInputMatch(label, input)}>
        {items.map(({ value, id }) => (
          <TypeaheadOption key={id} value={id} label={value}>
            {value}
          </TypeaheadOption>
        ))}
      </Typeahead>,
    );

    expect(queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('Renders opened', () => {
    const { queryByRole } = setup({ isOpen: true });

    expect(queryByRole('listbox')).toBeInTheDocument();
  });

  it('New item should be rendered correctly', async () => {
    const { getByTestId, getByText, getByRole } = render(
      <DynamicallyChangedItems initialSelectedItems={[]} />,
    );

    const mainElement = getByTestId('typeahead');
    const toggleElement = within(mainElement).getByRole('combobox');

    await userEvent.click(toggleElement);

    let listboxEl = getByRole('listbox');
    let listItemEls = within(listboxEl).getAllByRole('option');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];
      expect(listItemEl).toHaveAttribute('aria-selected', `false`);
      const itemListLabel = getListItemLabel(listItem);
      expect(listItemEl).toHaveTextContent(`${itemListLabel}`);
      // await within(listItemEl).findByText(itemListLabel);
    }

    const updateItemsButton = getByText('Update items');
    await userEvent.click(updateItemsButton);

    await userEvent.click(toggleElement);

    listboxEl = getByRole('listbox');
    listItemEls = within(listboxEl).getAllByRole('option');
    expect(listItemEls[listItemEls.length - 1]).toHaveTextContent(
      'New item #7',
    );
  });

  it('"Remove all" functionality should be worked', async () => {
    const selectedIDs = selectedItems.map((item) => item.id);
    const { mockOnChange, getByRole, getByTestId } = setup({
      initialSelectedItems: selectedIDs,
      isMultiple: true,
      label: 'Label',
    });

    expect(mockOnChange).toBeCalledWith('typeahead-dropdown', selectedIDs, {
      shouldDirty: false,
    });

    let mainElement = getByTestId('typeahead');
    let toggleElement = within(mainElement).getByRole('combobox');

    expect(toggleElement).toHaveTextContent('FirstRemoveFifthRemoveRemove');

    const crossAllButton =
      within(toggleElement).getByTestId('remove-all-button');
    await userEvent.click(crossAllButton);

    mainElement = getByTestId('typeahead');
    toggleElement = within(mainElement).getByRole('combobox');

    expect(toggleElement).toHaveTextContent('');

    await userEvent.click(toggleElement);
    const listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('option');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];
      expect(listItemEl).toHaveAttribute('aria-selected', `false`);
      const itemListValue = getListItemValue(listItem);
      expect(listItemEl).toHaveTextContent(`${itemListValue}`);
      await within(listItemEl).findByText(itemListValue);
    }
  });

  it('Helper text should be displayed', () => {
    const selectedIDs = selectedItems.map((item) => item.id);
    const { getByTestId } = setup({
      initialSelectedItems: selectedIDs,
      isMultiple: true,
      label: 'Label',
      helperText: 'Helper text',
    });

    expect(getByTestId('helper-text')).toBeInTheDocument();
  });

  it('Error should be displayed', () => {
    const selectedIDs = selectedItems.map((item) => item.id);

    const additionalProps = {
      initialSelectedItems: selectedIDs,
      isMultiple: true,
      label: 'Label',
      error: {
        type: 'required',
        message: 'Error message',
      },
    };

    const { getByTestId } = setup(additionalProps);
    expect(getByTestId('helper-text')).toBeInTheDocument();
  });
});
