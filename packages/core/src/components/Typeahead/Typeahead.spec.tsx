import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TypeaheadOption } from './components';
import { Typeahead } from './Typeahead';
import { highlightInputMatch } from './utils';

type Item = { id: number; value: string; label?: string };

const items: Item[] = [
  { id: 1, value: 'First' },
  { id: 2, value: 'Second' },
  { id: 3, value: 'Third' },
  { id: 4, value: 'Fourth', label: 'Fourth Label' },
];

describe('Typeahead Component', () => {
  let registerSpy: jest.SpyInstance;
  let setValueSpy: jest.SpyInstance;

  const renderWithForm = (ui: React.ReactElement) => {
    const Component = () => {
      const form = useForm({ defaultValues: {} });
      registerSpy = jest.spyOn(form, 'register');
      setValueSpy = jest.spyOn(form, 'setValue');
      return <FormProvider {...form}>{ui}</FormProvider>;
    };

    return render(<Component />);
  };

  const setup = (
    props: Partial<React.ComponentProps<typeof Typeahead>> = {},
  ) => {
    const mockOnChange = jest.fn();
    const mockOnClearAll = jest.fn();
    const mockOnEmptyChange = jest.fn();
    const mockOnRemoveSelectedClick = jest.fn();
    const ui = (
      <Typeahead
        name="test-typeahead"
        onChange={mockOnChange}
        onClearAll={mockOnClearAll}
        onEmptyChange={mockOnEmptyChange}
        onRemoveSelectedClick={mockOnRemoveSelectedClick}
        renderOption={({ label, input }) => highlightInputMatch(label, input)}
        {...props}>
        {items.map(({ id, value, label }) => (
          <TypeaheadOption key={id} value={id} label={label ?? value}>
            {value}
          </TypeaheadOption>
        ))}
      </Typeahead>
    );
    const user = userEvent.setup();
    const utils = renderWithForm(ui);
    return {
      ...utils,
      user,
      mockOnChange,
      mockOnClearAll,
      mockOnEmptyChange,
      mockOnRemoveSelectedClick,
      registerSpy,
      setValueSpy,
    };
  };

  it('renders with no selection initially and does not call onChange', () => {
    const { mockOnChange } = setup();
    expect(mockOnChange).not.toHaveBeenCalled();

    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens dropdown and shows all options', async () => {
    const { user } = setup();
    const combobox = screen.getByRole('combobox');

    await user.click(combobox);
    const listbox = screen.getByRole('listbox');
    const options = within(listbox).getAllByRole('option');
    expect(options).toHaveLength(items.length);
    options.forEach((opt, i) => {
      expect(opt).toHaveAttribute('aria-selected', 'false');
      expect(opt).toHaveTextContent(items[i].value);
    });
  });

  it('selects and deselects in multiple mode', async () => {
    const defaultSelected = [1];
    const { user, mockOnChange } = setup({
      isMultiple: true,
      defaultSelectedItems: defaultSelected,
    });
    const combobox = screen.getByRole('combobox');

    await user.click(combobox);
    const options = within(screen.getByRole('listbox')).getAllByRole('option');

    // Select second
    await user.click(options[1]);
    expect(mockOnChange).toHaveBeenLastCalledWith(2, true);

    // Deselect second
    await user.click(options[1]);
    expect(mockOnChange).toHaveBeenLastCalledWith(2, false);
  });

  it('selects in single mode and closes dropdown', async () => {
    const { user, mockOnChange } = setup({ isMultiple: false });
    const combobox = screen.getByRole('combobox');

    await user.click(combobox);
    const options = within(screen.getByRole('listbox')).getAllByRole('option');

    await user.click(options[2]);
    expect(mockOnChange).toHaveBeenLastCalledWith(3, true);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('clears all selections when clear-all button is clicked', async () => {
    const defaultSelected = [2, 4];
    const { user, mockOnClearAll, mockOnEmptyChange } = setup({
      isMultiple: true,
      defaultSelectedItems: defaultSelected,
    });
    const combobox = screen.getByRole('combobox');

    const clearBtn = within(combobox).getByTestId('remove-all-button');
    await user.click(clearBtn);

    // click outside
    await user.click(document.body);

    expect(mockOnClearAll).toHaveBeenCalled();
    expect(mockOnEmptyChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('displays placeholder when provided', () => {
    setup({ placeholder: 'Pick one' });
    expect(screen.getByPlaceholderText('Pick one')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const { user } = setup({ isDisabled: true });
    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('closes dropdown when clicking outside', async () => {
    const { user } = setup();
    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(document.body);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('auto-selects an exact match when typing', async () => {
    const { user, mockOnChange, container } = setup({ autoSelect: true });
    const input = container.querySelector(
      '.typeahead-input',
    ) as HTMLInputElement;

    await user.click(input);
    await user.type(input, 'Second');

    expect(mockOnChange).toHaveBeenLastCalledWith(2, true);
  });

  it('does not auto-select if input has no exact match', async () => {
    const { user, mockOnChange, container } = setup({ autoSelect: true });
    const input = container.querySelector(
      '.typeahead-input',
    ) as HTMLInputElement;

    await user.click(input);
    await user.type(input, 'NonExistingLabel');

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('auto-deselect an exact match when typing', async () => {
    const { user, mockOnChange, container } = setup({
      autoSelect: true,
      isMultiple: true,
      defaultSelectedItems: [2],
    });
    const input = container.querySelector(
      '.typeahead-input',
    ) as HTMLInputElement;

    await user.click(input);
    await user.type(input, 'Second');

    expect(mockOnChange).toHaveBeenLastCalledWith(2, false);
  });

  it('renders custom labels correctly', async () => {
    const { user } = setup();
    const combobox = screen.getByRole('combobox');

    await user.click(combobox);
    const options = within(screen.getByRole('listbox')).getAllByRole('option');

    expect(options[3]).toHaveTextContent('Fourth Label');
  });

  it('calls onRemoveSelectedClick when removing selected item', async () => {
    const { user, mockOnRemoveSelectedClick } = setup({
      isMultiple: true,
      defaultSelectedItems: [1, 2],
    });

    const removeIcons = screen.getAllByTitle('Remove');
    const removeButton = removeIcons[0].closest('button');

    await user.click(removeButton!);

    expect(mockOnRemoveSelectedClick).toHaveBeenCalledWith(1);
  });

  it('renders correctly when no children are provided', () => {
    expect(() =>
      renderWithForm(<Typeahead name="test-typeahead" onChange={jest.fn()} />),
    ).not.toThrow();
  });

  it('calls setValue when item is selected', async () => {
    const { user, setValueSpy } = setup();
    const combobox = screen.getByRole('combobox');

    await user.click(combobox);
    const options = within(screen.getByRole('listbox')).getAllByRole('option');
    await user.click(options[1]);

    expect(setValueSpy).toHaveBeenCalledWith('test-typeahead', 2);
  });
});
