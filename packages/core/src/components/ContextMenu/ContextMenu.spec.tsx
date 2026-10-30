import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

import { ContextMenu } from './ContextMenu';
import {
  ContextMenuEntry,
  ContextMenuIncludeExcludeEntry,
  ContextMenuItem,
} from './types';
import {
  getContextMenuOptionId,
  getNextActiveValue,
  getSteppedIndex,
  nextIncludeExcludeType,
} from './utils';
import { screen, within } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';

const items: ContextMenuItem<string>[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
  { value: 'date', label: 'Date' },
];

const groups: ContextMenuEntry<string>[] = [
  {
    id: 'fruit',
    label: 'Fruit',
    items: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    id: 'veg',
    label: 'Vegetables',
    items: [{ value: 'carrot', label: 'Carrot' }],
  },
];

// Label tooltips put aria-haspopup / aria-expanded on the label span: the known
// kit-wide Tooltip role="dialog" issue, tracked separately.
const a11y = (container: Element) =>
  checkA11y(container, { rules: { 'aria-allowed-attr': { enabled: false } } });

const activeOption = () => {
  const list = screen.getByRole('listbox');
  const id = list.getAttribute('aria-activedescendant');
  return id ? document.getElementById(id) : null;
};

describe('ContextMenu', () => {
  describe('utils', () => {
    it('steps over disabled options and wraps around', () => {
      const enabled = [true, false, true];
      expect(getSteppedIndex(enabled, -1, 1)).toBe(0);
      expect(getSteppedIndex(enabled, -1, -1)).toBe(2);
      expect(getSteppedIndex(enabled, 0, 1)).toBe(2);
      expect(getSteppedIndex(enabled, 2, 1)).toBe(0);
      expect(getSteppedIndex([false], -1, 1)).toBe(-1);
    });

    it('getNextActiveValue walks options across groups', () => {
      expect(getNextActiveValue(groups, null, 'ArrowDown')).toBe('apple');
      expect(getNextActiveValue(groups, 'banana', 'ArrowDown')).toBe('carrot');
      expect(getNextActiveValue(groups, 'apple', 'ArrowUp')).toBe('carrot');
      expect(getNextActiveValue(items, 'banana', 'ArrowDown')).toBe('date');
      expect(getNextActiveValue(items, 'banana', 'End')).toBe('date');
      expect(getNextActiveValue(items, 'banana', 'Home')).toBe('apple');
      expect(getNextActiveValue(items, 'banana', 'Enter')).toBeUndefined();
      expect(getNextActiveValue([], null, 'ArrowDown')).toBeNull();
    });

    it('getContextMenuOptionId escapes any value into a valid, distinct id', () => {
      expect(getContextMenuOptionId('m', 'a-b1')).toBe('m-option-a-b1');
      expect(getContextMenuOptionId('m', 'a b')).toBe('m-option-a_20_b');
      expect(getContextMenuOptionId('m', 'a_20_b')).not.toBe(
        getContextMenuOptionId('m', 'a b'),
      );
      expect(getContextMenuOptionId('m', 'a b')).not.toMatch(/\s/);
    });

    it('getContextMenuOptionId keeps the number 1 and the string "1" apart', () => {
      expect(getContextMenuOptionId('m', 1)).not.toBe(
        getContextMenuOptionId('m', '1'),
      );
      expect(getContextMenuOptionId('m', -1.5)).toMatch(/^[\w-]+$/);
    });

    it('cycles include → exclude → none, and toggles selectOnly rows', () => {
      expect(nextIncludeExcludeType(undefined, false)).toBe('include');
      expect(nextIncludeExcludeType('include', false)).toBe('exclude');
      expect(nextIncludeExcludeType('exclude', false)).toBeUndefined();
      expect(nextIncludeExcludeType(undefined, true)).toBe('selected');
      expect(nextIncludeExcludeType('selected', true)).toBeUndefined();
    });
  });

  it('renders a listbox of options with no a11y violations', async () => {
    const { container } = render(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="single"
        defaultValue="banana"
        items={items}
      />,
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[2]).toHaveAttribute('aria-disabled', 'true');
    expect(await a11y(container)).toHaveNoViolations();
  });

  it('single: selects on click and fires onChange + onAction', async () => {
    const onChange = jest.fn();
    const onAction = jest.fn();
    render(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="single"
        items={items}
        onChange={onChange}
        onAction={onAction}
      />,
    );

    await userEvent.click(screen.getByRole('option', { name: 'Banana' }));

    expect(onChange).toHaveBeenCalledWith('banana');
    expect(onAction).toHaveBeenCalledWith('banana');
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('ignores clicks on disabled options', async () => {
    const onChange = jest.fn();
    render(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="single"
        items={items}
        onChange={onChange}
      />,
    );

    await userEvent.click(screen.getByRole('option', { name: 'Cherry' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('multiple: toggles values and renders checkboxes', async () => {
    const onChange = jest.fn();
    render(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="multiple"
        defaultValue={['apple']}
        items={items}
        onChange={onChange}
      />,
    );

    expect(screen.getByRole('listbox')).toHaveAttribute(
      'aria-multiselectable',
      'true',
    );
    await userEvent.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onChange).toHaveBeenLastCalledWith(['apple', 'banana'], 'banana');
    await userEvent.click(screen.getByRole('option', { name: 'Apple' }));
    expect(onChange).toHaveBeenLastCalledWith(['banana'], 'apple');

    // The checkbox only pictures the state: hidden from the a11y tree.
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('respects a controlled value', async () => {
    const Controlled = () => {
      const [value, setValue] = useState<string | null>('apple');
      return (
        <>
          <ContextMenu
            aria-label="Fruit"
            selectionMode="single"
            items={items}
            value={value}
            onChange={setValue}
          />
          <button onClick={() => setValue(null)}>Clear</button>
        </>
      );
    };
    render(<Controlled />);

    await userEvent.click(screen.getByRole('option', { name: 'Date' }));
    expect(screen.getByRole('option', { name: 'Date' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(
      screen
        .getAllByRole('option')
        .filter((o) => o.getAttribute('aria-selected') === 'true'),
    ).toHaveLength(0);
  });

  it.each(['multiple', 'includeExclude'] as const)(
    '%s: a controlled value of undefined reads as nothing selected',
    async (selectionMode) => {
      const onChange = jest.fn();
      render(
        <ContextMenu
          aria-label="Fruit"
          selectionMode={selectionMode}
          items={items}
          value={undefined}
          onChange={onChange}
        />,
      );

      expect(
        screen
          .getAllByRole('option')
          .filter((o) => o.getAttribute('aria-selected') === 'true'),
      ).toHaveLength(0);
      // Enter works in both modes (an include / exclude row body ignores clicks).
      screen.getByRole('listbox').focus();
      await userEvent.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalledTimes(1);
    },
  );

  it('renders the number 1 and the string "1" as separate options', () => {
    render(
      <ContextMenu<string | number>
        aria-label="Mixed"
        selectionMode="single"
        items={[
          { value: 1, label: 'Number one' },
          { value: '1', label: 'String one' },
        ]}
      />,
    );
    const [first, second] = screen.getAllByRole('option');
    expect(first.id).not.toBe(second.id);
  });

  describe('keyboard', () => {
    it('focus highlights the selected option, arrows skip disabled ones', async () => {
      const onChange = jest.fn();
      render(
        <ContextMenu
          aria-label="Fruit"
          selectionMode="single"
          defaultValue="banana"
          items={items}
          onChange={onChange}
        />,
      );

      await userEvent.tab();
      expect(screen.getByRole('listbox')).toHaveFocus();
      expect(activeOption()).toHaveTextContent('Banana');

      await userEvent.keyboard('{ArrowDown}');
      expect(activeOption()).toHaveTextContent('Date');

      await userEvent.keyboard('{ArrowDown}');
      expect(activeOption()).toHaveTextContent('Apple');

      await userEvent.keyboard('{ArrowUp}');
      expect(activeOption()).toHaveTextContent('Date');

      await userEvent.keyboard('{Home}');
      expect(activeOption()).toHaveTextContent('Apple');

      await userEvent.keyboard('{End}');
      expect(activeOption()).toHaveTextContent('Date');

      await userEvent.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalledWith('date');
    });

    it('focus highlights the first enabled option when nothing is selected', async () => {
      render(
        <ContextMenu
          aria-label="Fruit"
          selectionMode="single"
          items={[{ value: 'x', label: 'X', disabled: true }, ...items]}
        />,
      );

      await userEvent.tab();
      expect(activeOption()).toHaveTextContent('Apple');
    });

    it('typing jumps to the next option starting with the text', async () => {
      render(
        <ContextMenu aria-label="Fruit" selectionMode="single" items={items} />,
      );

      await userEvent.tab();
      await userEvent.keyboard('d');
      expect(activeOption()).toHaveTextContent('Date');
      // Disabled options are not found.
      await userEvent.keyboard('c');
      expect(activeOption()).toHaveTextContent('Date');
    });

    it('Space chooses the highlighted option', async () => {
      const onChange = jest.fn();
      render(
        <ContextMenu
          aria-label="Fruit"
          selectionMode="multiple"
          items={items}
          onChange={onChange}
        />,
      );

      await userEvent.tab();
      await userEvent.keyboard(' ');
      expect(onChange).toHaveBeenCalledWith(['apple'], 'apple');
    });
  });

  it('pointer movement moves the highlight; leaving clears it', () => {
    render(
      <ContextMenu aria-label="Fruit" selectionMode="single" items={items} />,
    );

    const date = screen.getByRole('option', { name: 'Date' });
    fireEvent.mouseMove(date);
    expect(date).toHaveAttribute('data-active');
    fireEvent.mouseLeave(screen.getByRole('listbox'));
    expect(date).not.toHaveAttribute('data-active');
  });

  it('leaving the list keeps a highlight set from the keyboard', async () => {
    render(
      <ContextMenu aria-label="Fruit" selectionMode="single" items={items} />,
    );

    fireEvent.mouseMove(screen.getByRole('option', { name: 'Apple' }));
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    fireEvent.mouseLeave(screen.getByRole('listbox'));
    expect(activeOption()).toHaveTextContent('Banana');
  });

  it('a controlled host that ignores hover still gets keyboard highlights scrolled into view', () => {
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const { rerender } = render(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="single"
        items={items}
        activeValue="apple"
      />,
    );
    scrollIntoView.mockClear();

    fireEvent.mouseMove(screen.getByRole('option', { name: 'Date' }));
    rerender(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="single"
        items={items}
        activeValue="banana"
      />,
    );
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    // @ts-expect-error -- restore jsdom's missing method
    delete Element.prototype.scrollIntoView;
  });

  it('names groups whose id contains spaces', () => {
    render(
      <ContextMenu
        aria-label="Food"
        selectionMode="single"
        items={[{ id: 'my fruit', label: 'Fruit', items: [items[0]] }]}
      />,
    );
    expect(screen.getByRole('group', { name: 'Fruit' })).toBeInTheDocument();
  });

  it('can be driven by a controlled activeValue', () => {
    const onActiveValueChange = jest.fn();
    render(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="single"
        items={items}
        activeValue="date"
        onActiveValueChange={onActiveValueChange}
      />,
    );

    expect(activeOption()).toHaveTextContent('Date');
    fireEvent.mouseMove(screen.getByRole('option', { name: 'Apple' }));
    expect(onActiveValueChange).toHaveBeenCalledWith('apple');
    expect(activeOption()).toHaveTextContent('Date');
  });

  it('renders groups as labelled groups', async () => {
    const { container } = render(
      <ContextMenu aria-label="Food" selectionMode="single" items={groups} />,
    );

    const fruit = screen.getByRole('group', { name: 'Fruit' });
    expect(within(fruit).getAllByRole('option')).toHaveLength(2);
    expect(screen.getByRole('group', { name: 'Vegetables' })).toBeVisible();
    expect(await a11y(container)).toHaveNoViolations();
  });

  it('keyboard navigation crosses group boundaries', async () => {
    render(
      <ContextMenu aria-label="Food" selectionMode="single" items={groups} />,
    );

    await userEvent.tab();
    await userEvent.keyboard('{End}');
    expect(activeOption()).toHaveTextContent('Carrot');
    await userEvent.keyboard('{ArrowUp}');
    expect(activeOption()).toHaveTextContent('Banana');
  });

  describe('includeExclude', () => {
    const filters: ContextMenuItem<string>[] = [
      { value: 'f1', label: 'Filter 1' },
      { value: 'g1', label: 'Group 1', selectOnly: true },
    ];

    const setup = (
      defaultValue: ContextMenuIncludeExcludeEntry<string>[] = [],
    ) => {
      const onChange = jest.fn();
      const view = render(
        <ContextMenu
          aria-label="Filters"
          selectionMode="includeExclude"
          items={filters}
          defaultValue={defaultValue}
          onChange={onChange}
        />,
      );
      const row = (name: string) =>
        screen.getByRole('option', { name: new RegExp(name) });
      const control = (name: string, type: string) =>
        row(name).querySelector(`[data-type="${type}"]`) as HTMLElement;
      return { ...view, onChange, row, control };
    };

    it('+ includes, − excludes, clicking the active control clears', async () => {
      const { onChange, control, row } = setup();

      await userEvent.click(control('Filter 1', 'include'));
      expect(onChange).toHaveBeenLastCalledWith(
        [{ value: 'f1', type: 'include' }],
        'f1',
      );
      expect(row('Filter 1')).toHaveAccessibleName('Filter 1 , included');

      await userEvent.click(control('Filter 1', 'exclude'));
      expect(onChange).toHaveBeenLastCalledWith(
        [{ value: 'f1', type: 'exclude' }],
        'f1',
      );

      await userEvent.click(control('Filter 1', 'exclude'));
      expect(onChange).toHaveBeenLastCalledWith([], 'f1');
    });

    it('clicking the row body of an include / exclude row does nothing', async () => {
      const { onChange, row } = setup();
      await userEvent.click(row('Filter 1'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('selectOnly rows toggle on click', async () => {
      const { onChange, row } = setup();
      await userEvent.click(row('Group 1'));
      expect(onChange).toHaveBeenLastCalledWith(
        [{ value: 'g1', type: 'selected' }],
        'g1',
      );
      expect(row('Group 1')).toHaveAttribute('aria-selected', 'true');
    });

    it('Enter cycles none → include → exclude → none', async () => {
      const { onChange } = setup();

      await userEvent.tab();
      await userEvent.keyboard('{Enter}');
      expect(onChange).toHaveBeenLastCalledWith(
        [{ value: 'f1', type: 'include' }],
        'f1',
      );
      await userEvent.keyboard('{Enter}');
      expect(onChange).toHaveBeenLastCalledWith(
        [{ value: 'f1', type: 'exclude' }],
        'f1',
      );
      await userEvent.keyboard('{Enter}');
      expect(onChange).toHaveBeenLastCalledWith([], 'f1');
    });

    it('has no a11y violations', async () => {
      const { container } = setup([{ value: 'f1', type: 'include' }]);
      expect(await a11y(container)).toHaveNoViolations();
    });
  });

  describe('selectionMode none', () => {
    it('renders a menu of menuitems that fire onAction', async () => {
      const onAction = jest.fn();
      const { container } = render(
        <ContextMenu aria-label="Period" items={items} onAction={onAction} />,
      );

      expect(screen.getByRole('menu')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('menuitem', { name: 'Apple' }));
      expect(onAction).toHaveBeenCalledWith('apple');
      expect(
        screen.getByRole('menuitem', { name: 'Apple' }),
      ).not.toHaveAttribute('aria-selected');
      expect(await a11y(container)).toHaveNoViolations();
    });
  });

  it('renders the empty state', () => {
    render(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="single"
        items={[]}
        emptyState="Nothing here"
      />,
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders avatar, status, description and custom content', () => {
    render(
      <ContextMenu
        aria-label="People"
        selectionMode="single"
        items={[
          {
            value: 'ann',
            label: 'Ann',
            avatar: <span data-testid="avatar" />,
            status: 'red',
            description: 'July, 25th',
            endContent: <span data-testid="end" />,
          },
        ]}
      />,
    );
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('end')).toBeInTheDocument();
    expect(screen.getByText('July, 25th')).toBeInTheDocument();
  });

  it('renderItem replaces the row content', () => {
    render(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="single"
        defaultValue="apple"
        items={items}
        renderItem={(item, { selected }) => (
          <b>
            {item.value}
            {selected ? '!' : ''}
          </b>
        )}
      />,
    );
    expect(screen.getByText('apple!')).toBeInTheDocument();
  });

  it('applies maxHeight', () => {
    render(
      <ContextMenu
        aria-label="Fruit"
        selectionMode="single"
        items={items}
        maxHeight={100}
      />,
    );
    expect(screen.getByRole('listbox')).toHaveStyle({ maxHeight: '100px' });
  });
});
