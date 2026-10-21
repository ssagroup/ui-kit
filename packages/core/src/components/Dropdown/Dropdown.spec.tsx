import { useEffect } from 'react';
import { within } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DropdownOption from '@components/DropdownOption';

import Dropdown from './index';

interface Item {
  id: number;
  value: string;
}

const items = [
  { id: 1, value: 'First Item' },
  { id: 2, value: 'Second Item' },
  { id: 3, value: 'Third Item' },
  { id: 4, value: 'Fourth Item' },
  { id: 5, value: 'Fifth Item' },
  { id: 6, value: 'Sixth Item' },
  { id: 7, value: 'Seventh Item' },
];

const getListItemValue = (item: Item) => item.value;

const LONG_VALUE = 'Two lorem ipsum '.repeat(30).trim();

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
      findByTestId,
    } = setup();

    expect(mockOnChange).not.toBeCalled();

    const dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent('Select something');
    expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'false');
    expect(dropdownToggleEl).toHaveAttribute('aria-haspopup', 'listbox');
    expect(dropdownToggleEl).toHaveAttribute('aria-controls');
    expect(dropdownToggleEl).toHaveAttribute('aria-labelledby');
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

      if (listItem.id === selectedItem.id) {
        expect(listItemEl).toHaveAttribute('aria-selected', 'true');
        expect(listItemEl).toHaveStyle('background: rgba(65, 120, 225, 0.12)');
      } else {
        expect(listItemEl).toHaveAttribute('aria-selected', 'false');
      }
    }
  });

  it('Selected item changed successfully', async () => {
    const selectedItem = items[2];
    const {
      user,
      mockOnChange,
      getByRole,
      queryByRole,
      getByTestId,
      rerender,
    } = setup({
      selectedItem,
    });

    expect(mockOnChange).not.toBeCalled();

    let dropdownEl = getByTestId('dropdown');

    let dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    let listboxEl = queryByRole('listbox');

    await user.click(dropdownToggleEl);

    listboxEl = getByRole('listbox');
    const listItemEls = within(listboxEl).getAllByRole('option');

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    await within(dropdownToggleEl).findByTestId('dropdown-arrow-up');

    for (let i = 0; i < items.length; ++i) {
      const listItem = items[i];
      const listItemEl = listItemEls[i];

      const itemListValue = getListItemValue(listItem);

      await within(listItemEl).findByText(itemListValue);
      expect(listItemEl).toHaveTextContent(itemListValue);

      if (listItem.id === selectedItem.id) {
        expect(listItemEl).toHaveAttribute('aria-selected', 'true');
        expect(listItemEl).toHaveStyle('background: rgba(65, 120, 225, 0.12)');
      } else {
        expect(listItemEl).toHaveAttribute('aria-selected', 'false');
      }
    }

    rerender(
      <Dropdown onChange={mockOnChange} selectedItem={items[0]}>
        {items.map((item, index) => (
          <DropdownOption key={index} value={item.value} />
        ))}
      </Dropdown>,
    );

    dropdownEl = getByTestId('dropdown');
    dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    expect(dropdownToggleEl).toHaveTextContent(getListItemValue(items[0]));
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

    // The toggle closes the empty list
    await userEvent.click(dropdownToggleEl);

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

    const listItemEls = within(getByRole('listbox')).getAllByRole('option');

    await user.click(listItemEls[0]);

    dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveTextContent(getListItemValue(items[0]));
    expect(mockOnChange).toHaveBeenCalledWith({ value: items[0].value });
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
    const selectedItem = items[2];
    const { user, mockOnChange, getByRole, getByTestId } = setup({
      selectedItem,
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
    const { getByTestId } = setup({ placeholder: 'Custom placeholder' });

    const dropdownToggleEl = within(getByTestId('dropdown')).getByRole(
      'combobox',
    );
    expect(dropdownToggleEl).toHaveTextContent('Custom placeholder');
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
    expect(dropdownToggleEl).toHaveAttribute('aria-labelledby');
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
      <Dropdown disabled>
        {items.map((item, index) => (
          <DropdownOption key={index} value={item.id}>
            {item.value}
          </DropdownOption>
        ))}
      </Dropdown>,
    );

    expect(queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('Renders opened', () => {
    const { queryByRole } = setup({ isOpen: true });

    expect(queryByRole('listbox')).toBeInTheDocument();
  });

  it('Renders with "button" type', () => {
    const { getByRole } = setup();

    expect(getByRole('combobox')).toHaveAttribute('type', 'button');
  });

  it('renders name attribute on toggle when provided via dropdownProps.toggleButton', () => {
    const { getByTestId } = setup({
      dropdownProps: {
        toggleButton: {
          name: 'testDropdown',
        },
      },
    });
    const dropdownEl = getByTestId('dropdown');
    const dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    expect(dropdownToggleEl).toHaveAttribute('name', 'testDropdown');
  });

  it('renders name attribute on base when provided via dropdownProps.base', () => {
    const { getByTestId } = setup({
      dropdownProps: {
        base: {
          name: 'testBase',
        },
      },
    });
    const dropdownEl = getByTestId('dropdown');

    expect(dropdownEl).toHaveAttribute('name', 'testBase');
  });

  it('renders data-testid attribute on arrow when provided via dropdownProps.toggleButtonArrow', () => {
    const { getByTestId } = setup({
      dropdownProps: {
        toggleButtonArrow: {
          'data-testid': 'testArrow',
        },
      },
    });
    const dropdownEl = getByTestId('dropdown');
    const arrowIcon = within(dropdownEl).getByTestId('testArrow');

    expect(arrowIcon).toBeInTheDocument();
    expect(arrowIcon).toHaveAttribute('data-testid', 'testArrow');
  });

  it('does not render a label or helper text by default', () => {
    const { queryByText } = setup();

    expect(queryByText('Manager')).not.toBeInTheDocument();
  });

  it('renders a label when provided', () => {
    const { getByText } = setup({ label: 'Manager' });

    expect(getByText('Manager')).toBeInTheDocument();
  });

  it('renders helper text when provided', () => {
    const { getByText } = setup({ helperText: 'Pick a manager' });

    expect(getByText('Pick a manager')).toBeInTheDocument();
  });

  it('renders the error message instead of helper text when errors is provided', () => {
    const { getByText, queryByText } = setup({
      helperText: 'Pick a manager',
      errors: { type: 'required', message: 'Manager is required' },
    });

    expect(getByText('Manager is required')).toBeInTheDocument();
    expect(queryByText('Pick a manager')).not.toBeInTheDocument();
  });

  it('renders no leading icon by default (only the trailing carrot arrow)', () => {
    const { getByTestId } = setup();
    const dropdownToggleEl = within(getByTestId('dropdown')).getByRole(
      'combobox',
    );
    expect(dropdownToggleEl.querySelectorAll('svg').length).toBe(1);
  });

  it('renders the icon prop as a leading icon when no item is selected', () => {
    const { getByTestId } = setup({ icon: 'carrot-down' });
    const dropdownToggleEl = within(getByTestId('dropdown')).getByRole(
      'combobox',
    );
    // Leading icon + trailing carrot arrow
    expect(dropdownToggleEl.querySelectorAll('svg').length).toBe(2);
  });

  describe('width', () => {
    it('shrink-wraps at every level when width is not provided', () => {
      const { getByTestId } = setup();

      const dropdownBaseEl = getByTestId('dropdown');
      const dropdownToggleEl = within(dropdownBaseEl).getByRole('combobox');

      expect(dropdownBaseEl.parentElement).toHaveStyleRule(
        'display',
        'inline-flex',
      );
      expect(dropdownBaseEl).toHaveStyleRule('display', 'inline-block');
      expect(dropdownToggleEl).toHaveStyleRule('width', 'auto');
    });

    it('stretches all three levels, sizing only the outermost one', () => {
      const { getByTestId } = setup({ width: '100%' });

      const dropdownBaseEl = getByTestId('dropdown');
      const dropdownToggleEl = within(dropdownBaseEl).getByRole('combobox');

      // All three levels have to be stretched: the toggle cannot grow past a
      // base that is still sized to its content, and neither can the base.
      expect(dropdownBaseEl.parentElement).toHaveStyleRule('width', '100%');
      expect(dropdownBaseEl).toHaveStyleRule('width', '100%');
      expect(dropdownToggleEl).toHaveStyleRule('width', '100%');
    });

    it('does not compound a percentage width down the nested levels', () => {
      const { getByTestId } = setup({ width: '60%' });

      const dropdownBaseEl = getByTestId('dropdown');
      const dropdownToggleEl = within(dropdownBaseEl).getByRole('combobox');

      // Repeating '60%' at every level would render the base at 60% of the
      // wrapper and the toggle at 60% of that — 21.6% of the container.
      expect(dropdownBaseEl.parentElement).toHaveStyleRule('width', '60%');
      expect(dropdownBaseEl).toHaveStyleRule('width', '100%');
      expect(dropdownToggleEl).toHaveStyleRule('width', '100%');
    });

    it('treats a numeric width as pixels', () => {
      const { getByTestId } = setup({ width: 320 });

      const dropdownBaseEl = getByTestId('dropdown');

      expect(dropdownBaseEl.parentElement).toHaveStyleRule('width', '320px');
      expect(dropdownBaseEl).toHaveStyleRule('width', '100%');
      expect(within(dropdownBaseEl).getByRole('combobox')).toHaveStyleRule(
        'width',
        '100%',
      );
    });

    it('keeps dropdownProps.base working alongside width', () => {
      const { getByTestId } = setup({
        width: '100%',
        dropdownProps: { base: { id: 'my-dropdown', style: { flexGrow: 1 } } },
      });

      const dropdownBaseEl = getByTestId('dropdown');

      expect(dropdownBaseEl).toHaveAttribute('id', 'my-dropdown');
      expect(dropdownBaseEl).toHaveStyle({ flexGrow: '1' });
      expect(dropdownBaseEl.parentElement).toHaveStyleRule('width', '100%');
    });

    it('lets dropdownProps.toggleButton.css override the width', () => {
      const { getByTestId } = setup({
        width: '100%',
        dropdownProps: { toggleButton: { css: { width: 200 } } },
      });

      const dropdownBaseEl = getByTestId('dropdown');

      expect(dropdownBaseEl.parentElement).toHaveStyleRule('width', '100%');
      expect(within(dropdownBaseEl).getByRole('combobox')).toHaveStyleRule(
        'width',
        '200px',
      );
    });
  });

  describe('long content', () => {
    it('ellipsises the selected value instead of wrapping it', () => {
      const { getByTestId } = setup({ selectedItem: { value: LONG_VALUE } });

      const label = within(getByTestId('dropdown')).getByText(LONG_VALUE);

      // The toggle is a fixed 44px, so a wrapping label spills above and below
      // its border instead of being clipped.
      expect(label).toHaveStyleRule('white-space', 'nowrap');
      expect(label).toHaveStyleRule('text-overflow', 'ellipsis');
      expect(label).toHaveStyleRule('overflow', 'hidden');
    });

    it('ellipsises the selected value when a leading icon is rendered', () => {
      const { getByTestId } = setup({
        icon: 'user',
        selectedItem: { value: LONG_VALUE },
      });

      const label = within(getByTestId('dropdown')).getByText(LONG_VALUE);

      expect(label).toHaveStyleRule('text-overflow', 'ellipsis');
    });

    it('lets the label shrink below its intrinsic width', () => {
      const { getByTestId } = setup({ selectedItem: { value: LONG_VALUE } });

      const label = within(getByTestId('dropdown')).getByText(LONG_VALUE);

      // A nowrap flex item reports its full text width as its minimum, which
      // would grow the toggle rather than clip the text.
      expect(label).toHaveStyleRule('min-width', '0');
    });

    it('caps every level at its container so nothing overflows sideways', () => {
      const { getByTestId } = setup({ selectedItem: { value: LONG_VALUE } });

      const dropdownBaseEl = getByTestId('dropdown');
      const dropdownToggleEl = within(dropdownBaseEl).getByRole('combobox');

      // Each level is shrink-to-fit, and a shrink-to-fit box sizes to its
      // min-content when that exceeds the space available. Without a definite
      // width to resolve against, the label has nothing to be clipped by.
      expect(dropdownBaseEl.parentElement).toHaveStyleRule('max-width', '100%');
      expect(dropdownBaseEl).toHaveStyleRule('max-width', '100%');
      expect(dropdownToggleEl).toHaveStyleRule('max-width', '100%');
    });

    it('keeps the arrow at full size next to a truncated label', async () => {
      const { user, getByTestId, findByTestId } = setup({
        selectedItem: { value: LONG_VALUE },
      });

      await user.click(within(getByTestId('dropdown')).getByRole('combobox'));

      const arrow = await findByTestId('dropdown-arrow-up');

      // Flex items shrink before their content overflows, so without this the
      // arrow is squashed rather than the label truncated.
      expect(arrow.parentElement).toHaveStyleRule('flex-shrink', '0');
    });

    it('ellipsises option labels rather than widening the list', async () => {
      const { user, getByTestId, getByRole } = setup();

      await user.click(within(getByTestId('dropdown')).getByRole('combobox'));

      const listboxEl = getByRole('listbox');
      const label = within(listboxEl).getByText(items[0].value);

      expect(label).toHaveStyleRule('white-space', 'nowrap');
      expect(label).toHaveStyleRule('text-overflow', 'ellipsis');
      // `min-width: max-content` used to let one long option stretch the popup
      // far past the viewport.
      expect(listboxEl).toHaveStyleRule('width', '100%');
      expect(listboxEl).not.toHaveStyleRule('min-width', 'max-content');
    });

    it('centres option rows vertically within their highlight band', async () => {
      const { user, getByTestId, getByRole } = setup();

      await user.click(within(getByTestId('dropdown')).getByRole('combobox'));

      const [row] = within(getByRole('listbox')).getAllByRole('option');

      // The row is a fixed height but its line box is shorter; as a plain
      // block the text sat against the top padding edge.
      expect(row).toHaveStyleRule('display', 'flex');
      expect(row).toHaveStyleRule('align-items', 'center');
    });

    it('makes every option label a hover tooltip trigger', async () => {
      const { user, getByTestId, getByRole } = setup();

      await user.click(within(getByTestId('dropdown')).getByRole('combobox'));

      const label = within(getByRole('listbox')).getByText(items[0].value);

      // Tooltip opens on click by default, so both flags are passed
      // explicitly — a click on a row has to select it, not open a tooltip.
      expect(label).toHaveAttribute('aria-haspopup', 'dialog');
      expect(label).toHaveAttribute('aria-expanded', 'false');
    });

    it('skips the tooltip when the option content is not plain text', async () => {
      const mountSpy = jest.fn();
      const Widget = () => {
        useEffect(() => mountSpy(), []);
        return <span>Rich content</span>;
      };

      jest.useFakeTimers();
      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTime.bind(jest),
      });

      const { getByTestId, getByRole, queryAllByText } = render(
        <Dropdown onChange={jest.fn()}>
          <DropdownOption value="rich">
            <Widget />
          </DropdownOption>
        </Dropdown>,
      );

      await user.click(within(getByTestId('dropdown')).getByRole('combobox'));

      const label = within(getByRole('listbox')).getByText('Rich content');
      expect(label).not.toHaveAttribute('aria-haspopup');

      // Hover past the delay: TooltipContent only mounts once open, so this is
      // where a repeated node would become a second, unsynced copy of the
      // component — separate state, a clobbered ref, effects fired twice.
      await user.hover(label);
      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(queryAllByText('Rich content')).toHaveLength(1);
      expect(mountSpy).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });

    it('reveals the full label on hover, after the delay', async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTime.bind(jest),
      });

      const { getByTestId, getByRole, queryAllByRole } = render(
        <Dropdown onChange={jest.fn()}>
          {items.map((item, index) => (
            <DropdownOption key={index} value={item.value} />
          ))}
        </Dropdown>,
      );

      await user.click(within(getByTestId('dropdown')).getByRole('combobox'));

      const label = within(getByRole('listbox')).getByText(items[0].value);
      await user.hover(label);

      expect(queryAllByRole('dialog')).toHaveLength(0);

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      const tooltip = getByRole('dialog');
      expect(tooltip).toHaveTextContent(items[0].value);

      jest.useRealTimers();
    });
  });
  describe('keyboard', () => {
    const activeOption = (toggle: HTMLElement) => {
      const id = toggle.getAttribute('aria-activedescendant');
      return id ? document.getElementById(id) : null;
    };

    it('ArrowDown opens on the first option; arrows move; Enter selects and closes', async () => {
      const { user, mockOnChange, getByRole, queryByRole } = setup();
      const toggle = getByRole('combobox');
      toggle.focus();

      await user.keyboard('{ArrowDown}');
      expect(getByRole('listbox')).toBeInTheDocument();
      expect(toggle).toHaveAttribute('aria-controls', getByRole('listbox').id);
      expect(activeOption(toggle)).toHaveTextContent('First Item');

      await user.keyboard('{ArrowDown}{ArrowDown}');
      expect(activeOption(toggle)).toHaveTextContent('Third Item');
      await user.keyboard('{End}');
      expect(activeOption(toggle)).toHaveTextContent('Seventh Item');
      await user.keyboard('{ArrowDown}');
      expect(activeOption(toggle)).toHaveTextContent('First Item');

      await user.keyboard('{Enter}');
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'First Item' }),
      );
      expect(queryByRole('listbox')).not.toBeInTheDocument();
      expect(toggle).toHaveFocus();
    });

    it('opens on the selected option', async () => {
      const { user, getByRole } = setup({ selectedItem: items[3] });
      const toggle = getByRole('combobox');
      toggle.focus();

      await user.keyboard('{ArrowUp}');
      expect(activeOption(toggle)).toHaveTextContent('Fourth Item');
    });

    it('Space selects without reopening the list', async () => {
      const { user, mockOnChange, getByRole, queryByRole } = setup();
      const toggle = getByRole('combobox');
      toggle.focus();

      await user.keyboard('{ArrowDown}{ArrowDown}');
      await user.keyboard(' ');
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'Second Item' }),
      );
      expect(queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('Enter and Space on a closed toggle open the list', async () => {
      const { user, getByRole, queryByRole } = setup();
      const toggle = getByRole('combobox');
      toggle.focus();

      await user.keyboard('{Enter}');
      expect(getByRole('listbox')).toBeInTheDocument();
      await user.keyboard('{Escape}');
      expect(queryByRole('listbox')).not.toBeInTheDocument();
      await user.keyboard(' ');
      expect(getByRole('listbox')).toBeInTheDocument();
    });

    it('Escape and Tab close without selecting', async () => {
      const { user, mockOnChange, getByRole, queryByRole } = setup();
      const toggle = getByRole('combobox');
      toggle.focus();

      await user.keyboard('{ArrowDown}{Escape}');
      expect(queryByRole('listbox')).not.toBeInTheDocument();
      expect(toggle).not.toHaveAttribute('aria-activedescendant');

      await user.keyboard('{ArrowDown}');
      await user.tab();
      expect(queryByRole('listbox')).not.toBeInTheDocument();
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('skips disabled options, which also ignore clicks', async () => {
      const mockOnChange = jest.fn();
      const user = userEvent.setup();
      const { getByRole } = render(
        <Dropdown onChange={mockOnChange}>
          <DropdownOption value="a" />
          <DropdownOption value="b" disabled />
          <DropdownOption value="c" />
        </Dropdown>,
      );
      const toggle = getByRole('combobox');
      toggle.focus();

      await user.keyboard('{ArrowDown}{ArrowDown}');
      expect(activeOption(toggle)).toHaveTextContent('c');

      await user.click(getByRole('option', { name: 'b' }));
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('clicking an option keeps focus on the toggle', async () => {
      const { user, getByRole } = setup();
      const toggle = getByRole('combobox');

      await user.click(toggle);
      await user.click(getByRole('option', { name: 'Second Item' }));
      expect(toggle).toHaveFocus();
    });

    it('forwards className and data-testid from DropdownOption to the row', async () => {
      const user = userEvent.setup();
      const { getByRole, getByTestId } = render(
        <Dropdown onChange={jest.fn()}>
          <DropdownOption value="a" className="row-a" data-testid="row-a" />
        </Dropdown>,
      );

      await user.click(getByRole('combobox'));
      expect(getByTestId('row-a')).toHaveClass('row-a');
    });
  });
});
