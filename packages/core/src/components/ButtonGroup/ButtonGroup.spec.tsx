import { useEffect, useState } from 'react';
import userEvent from '@testing-library/user-event';
import Icon from '@components/Icon';
import { ButtonGroup } from './ButtonGroup';
import { ButtonGroupButton } from './ButtonGroupButton';
import theme from '@themes/main';
import { items } from './helpers';
import { ButtonItem } from './styles';
import { ButtonGroupItem, ButtonGroupProps } from './types';

describe('ButtonGroup', () => {
  it('Renders all buttons', () => {
    const { getAllByRole, getByRole } = render(
      <ButtonGroup items={items} onClick={(item) => item} />,
    );

    const itemsEls = getAllByRole('button');
    expect(itemsEls.length).toBe(items.length);

    for (const item of items) {
      getByRole('button', { name: item.text });
    }

    const activeItem = getByRole('button', { pressed: true });
    expect(activeItem.textContent).toBe(items[0].text);
  });

  it('Calls onClick handlers when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    const { getByRole } = render(
      <ButtonGroup items={items} onClick={mockOnClick} />,
    );

    for (const item of items) {
      const buttonEl = getByRole('button', {
        name: item.text,
      });
      await user.click(buttonEl);
      expect(mockOnClick).toHaveBeenCalledWith(item);
    }

    expect(mockOnClick).toBeCalledTimes(items.length);
  });

  it('Renders with the selected item', () => {
    const { getAllByRole, getByRole } = render(
      <ButtonGroup items={items} onClick={(item) => item} value={items[1]} />,
    );

    const itemsEls = getAllByRole('button');
    expect(itemsEls.length).toBe(items.length);

    for (const item of items) {
      getByRole('button', { name: item.text });
    }

    const activeItem = getByRole('button', { pressed: true });
    expect(activeItem.textContent).toBe(items[1].text);
  });

  it('Tracks its own selection without an onClick handler', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<ButtonGroup items={items} />);

    await user.click(getByRole('button', { name: items[1].text }));

    expect(getByRole('button', { pressed: true }).textContent).toBe(
      items[1].text,
    );
  });

  it('Accepts a bare id as value', () => {
    const { getByRole } = render(
      <ButtonGroup
        items={items}
        onClick={(item) => item}
        value={items[1].id}
      />,
    );

    expect(getByRole('button', { pressed: true }).textContent).toBe(
      items[1].text,
    );
  });

  it('Accepts a bare id as defaultValue and still moves on click', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <ButtonGroup items={items} defaultValue={items[1].id} />,
    );

    expect(getByRole('button', { pressed: true }).textContent).toBe(
      items[1].text,
    );

    await user.click(getByRole('button', { name: items[0].text }));

    expect(getByRole('button', { pressed: true }).textContent).toBe(
      items[0].text,
    );
  });

  it('Stays controlled when value is an id — ignores clicks the parent drops', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <ButtonGroup items={items} value={items[0].id} onClick={() => {}} />,
    );

    await user.click(getByRole('button', { name: items[1].text }));

    expect(getByRole('button', { pressed: true }).textContent).toBe(
      items[0].text,
    );
  });

  it('Treats an id and the whole item as equivalent', () => {
    const byId = render(<ButtonGroup items={items} value={items[1].id} />);
    const idPressed = byId.getByRole('button', { pressed: true }).textContent;
    byId.unmount();

    const byItem = render(<ButtonGroup items={items} value={items[1]} />);
    const itemPressed = byItem.getByRole('button', {
      pressed: true,
    }).textContent;

    expect(idPressed).toBe(itemPressed);
  });

  it('Renders an empty group instead of crashing when items is missing', () => {
    const { queryAllByRole } = render(<ButtonGroup />);

    expect(queryAllByRole('button')).toHaveLength(0);
  });

  it('Preselects the first item when items arrive after the first render', async () => {
    const AsyncItems = () => {
      const [asyncItems, setAsyncItems] = useState<ButtonGroupItem[]>([]);

      useEffect(() => {
        setAsyncItems(items);
      }, []);

      return <ButtonGroup items={asyncItems} />;
    };

    const { findByRole, getByRole } = render(<AsyncItems />);
    await findByRole('button', { name: items[0].text });

    expect(getByRole('button', { pressed: true }).textContent).toBe(
      items[0].text,
    );
  });

  it('Keeps the user’s choice when items are replaced later', async () => {
    const user = userEvent.setup();

    const ReloadableItems = () => {
      const [asyncItems, setAsyncItems] = useState(items);

      return (
        <>
          <ButtonGroup items={asyncItems} />
          <button onClick={() => setAsyncItems([...items])}>reload</button>
        </>
      );
    };

    const { getByRole } = render(<ReloadableItems />);

    await user.click(getByRole('button', { name: items[1].text }));
    await user.click(getByRole('button', { name: 'reload' }));

    expect(getByRole('button', { pressed: true }).textContent).toBe(
      items[1].text,
    );
  });

  describe('composed children', () => {
    const renderComposed = (props: Partial<ButtonGroupProps> = {}) =>
      render(
        <ButtonGroup {...props}>
          <ButtonGroupButton id="all">All</ButtonGroupButton>
          <ButtonGroupButton id="running">Running</ButtonGroupButton>
          <ButtonGroupButton id="stopped" disabled>
            Stopped
          </ButtonGroupButton>
        </ButtonGroup>,
      );

    it('Renders one button per child and ignores items', () => {
      const { getAllByRole, getByRole } = render(
        <ButtonGroup items={items}>
          <ButtonGroupButton id="all">All</ButtonGroupButton>
        </ButtonGroup>,
      );

      expect(getAllByRole('button')).toHaveLength(1);
      getByRole('button', { name: 'All' });
    });

    it('Tracks selection through the group', async () => {
      const user = userEvent.setup();
      const { getByRole, queryByRole } = renderComposed();

      expect(queryByRole('button', { pressed: true })).not.toBeInTheDocument();

      await user.click(getByRole('button', { name: 'Running' }));

      expect(getByRole('button', { pressed: true }).textContent).toBe(
        'Running',
      );
    });

    it('Preselects from defaultValue', () => {
      const { getByRole } = renderComposed({ defaultValue: 'running' });

      expect(getByRole('button', { pressed: true }).textContent).toBe(
        'Running',
      );
    });

    it('Honours a controlled value and does not move on its own', async () => {
      const user = userEvent.setup();
      const { getByRole } = renderComposed({ value: 'all', onClick: () => {} });

      await user.click(getByRole('button', { name: 'Running' }));

      expect(getByRole('button', { pressed: true }).textContent).toBe('All');
    });

    it("Reports the clicked button's id and label to the group's onClick", async () => {
      const user = userEvent.setup();
      const onGroupClick = jest.fn();
      const { getByRole } = renderComposed({ onClick: onGroupClick });

      await user.click(getByRole('button', { name: 'Running' }));

      expect(onGroupClick).toHaveBeenCalledWith({
        id: 'running',
        text: 'Running',
        disabled: false,
      });
    });

    it('Fires the per-button onClick as well', async () => {
      const user = userEvent.setup();
      const onButtonClick = jest.fn();
      const { getByRole } = render(
        <ButtonGroup>
          <ButtonGroupButton id="all" onClick={onButtonClick}>
            All
          </ButtonGroupButton>
        </ButtonGroup>,
      );

      await user.click(getByRole('button', { name: 'All' }));

      expect(onButtonClick).toHaveBeenCalledTimes(1);
    });

    it('Renders non-string children and reports text from the text prop', async () => {
      const user = userEvent.setup();
      const onGroupClick = jest.fn();
      const { getByRole, container } = render(
        <ButtonGroup onClick={onGroupClick}>
          <ButtonGroupButton id="all" text="All">
            <Icon name="archive" />
            <span>All</span>
          </ButtonGroupButton>
        </ButtonGroup>,
      );

      expect(container.querySelectorAll('svg')).toHaveLength(1);

      await user.click(getByRole('button', { name: 'All' }));

      expect(onGroupClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'all', text: 'All' }),
      );
    });

    it('Does not select a disabled button', async () => {
      const user = userEvent.setup();
      const onGroupClick = jest.fn();
      const { getByRole, queryByRole } = renderComposed({
        onClick: onGroupClick,
      });

      await user.click(getByRole('button', { name: 'Stopped' }));

      expect(onGroupClick).not.toHaveBeenCalled();
      expect(queryByRole('button', { pressed: true })).not.toBeInTheDocument();
    });

    it('Throws when a button is used outside a group', () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() =>
        render(<ButtonGroupButton id="all">All</ButtonGroupButton>),
      ).toThrow('ButtonGroupButton must be rendered inside a ButtonGroup');

      consoleError.mockRestore();
    });
  });
  describe('content modes', () => {
    it('Renders an icon-only button labelled by ariaLabel, with no text', () => {
      const { getByRole, container } = render(
        <ButtonGroup
          items={[
            { id: 'list', icon: <Icon name="archive" />, ariaLabel: 'List' },
          ]}
        />,
      );

      const buttonEl = getByRole('button', { name: 'List' });

      expect(container.querySelectorAll('svg')).toHaveLength(1);
      expect(buttonEl.textContent).toBe('');
    });

    it('Squares an icon-only button off, and keeps label padding otherwise', () => {
      const { getByRole } = render(
        <ButtonGroup
          items={[
            { id: 'list', icon: <Icon name="archive" />, ariaLabel: 'List' },
            { id: 'all', text: 'All' },
          ]}
        />,
      );

      const iconOnlyEl = getByRole('button', { name: 'List' });
      const labelledEl = getByRole('button', { name: 'All' });

      expect(iconOnlyEl).toHaveStyleRule('padding', '8px');
      expect(iconOnlyEl).toHaveStyleRule('min-width', '40px');
      expect(iconOnlyEl).toHaveStyleRule('height', '40px');
      expect(labelledEl).toHaveStyleRule('padding', '8px 16px');
    });

    it('Renders icon and label together when both are given', () => {
      const { getByRole, container } = render(
        <ButtonGroup
          items={[{ id: 'all', icon: <Icon name="archive" />, text: 'All' }]}
        />,
      );

      const buttonEl = getByRole('button', { name: 'All' });

      expect(container.querySelectorAll('svg')).toHaveLength(1);
      expect(buttonEl.textContent).toBe('All');
      // Not the icon-only square: the label keeps its horizontal padding.
      expect(buttonEl).toHaveStyleRule('padding', '8px 16px');
    });

    it('Reports an icon-only item’s ariaLabel as its text', async () => {
      const user = userEvent.setup();
      const onGroupClick = jest.fn();
      const { getByRole } = render(
        <ButtonGroup
          onClick={onGroupClick}
          items={[
            { id: 'list', icon: <Icon name="archive" />, ariaLabel: 'List' },
          ]}
        />,
      );

      await user.click(getByRole('button', { name: 'List' }));

      expect(onGroupClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'list', text: 'List' }),
      );
    });

    it('Reports ariaLabel for an item whose text is an empty string', async () => {
      const user = userEvent.setup();
      const onGroupClick = jest.fn();
      // What `label || ''` yields. It renders as icon-only, so it has to report
      // as icon-only too.
      const { getByRole } = render(
        <ButtonGroup
          onClick={onGroupClick}
          items={[
            {
              id: 'list',
              icon: <Icon name="archive" />,
              text: '',
              ariaLabel: 'List',
            },
          ]}
        />,
      );

      const buttonEl = getByRole('button', { name: 'List' });
      expect(buttonEl).toHaveStyleRule('padding', '8px');

      await user.click(buttonEl);

      expect(onGroupClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'list', text: 'List' }),
      );
    });

    it('Hands back the caller’s own item object when it has text', async () => {
      const user = userEvent.setup();
      const onGroupClick = jest.fn();
      const ownItem = { id: 'all', text: 'All', href: '/all' };
      const { getByRole } = render(
        <ButtonGroup onClick={onGroupClick} items={[ownItem]} />,
      );

      await user.click(getByRole('button', { name: 'All' }));

      expect(onGroupClick.mock.calls[0][0]).toBe(ownItem);
    });

    it('Supports icon-only composed children', async () => {
      const user = userEvent.setup();
      const onGroupClick = jest.fn();
      const { getByRole } = render(
        <ButtonGroup onClick={onGroupClick}>
          <ButtonGroupButton
            id="list"
            icon={<Icon name="archive" />}
            aria-label="List"
          />
        </ButtonGroup>,
      );

      const buttonEl = getByRole('button', { name: 'List' });
      expect(buttonEl).toHaveStyleRule('padding', '8px');

      await user.click(buttonEl);

      expect(onGroupClick).toHaveBeenCalledWith({
        id: 'list',
        text: 'List',
        disabled: false,
      });
    });

    it('Reports aria-label when a composed button’s text is an empty string', async () => {
      const user = userEvent.setup();
      const onGroupClick = jest.fn();
      const { getByRole } = render(
        <ButtonGroup onClick={onGroupClick}>
          <ButtonGroupButton
            id="list"
            icon={<Icon name="archive" />}
            text=""
            aria-label="List"
          />
        </ButtonGroup>,
      );

      await user.click(getByRole('button', { name: 'List' }));

      expect(onGroupClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'list', text: 'List' }),
      );
    });

    it('Treats a composed icon with children as icon + label', () => {
      const { getByRole, container } = render(
        <ButtonGroup>
          <ButtonGroupButton id="all" icon={<Icon name="archive" />}>
            All
          </ButtonGroupButton>
        </ButtonGroup>,
      );

      const buttonEl = getByRole('button', { name: 'All' });

      expect(container.querySelectorAll('svg')).toHaveLength(1);
      expect(buttonEl).toHaveStyleRule('padding', '8px 16px');
    });

    it('Falls back to icon-only when a conditional child renders nothing', () => {
      const showLabel = false;

      const { getByRole } = render(
        <ButtonGroup>
          <ButtonGroupButton
            id="list"
            icon={<Icon name="archive" />}
            aria-label="List">
            {showLabel && <span>List</span>}
          </ButtonGroupButton>
        </ButtonGroup>,
      );

      expect(getByRole('button', { name: 'List' })).toHaveStyleRule(
        'padding',
        '8px',
      );
    });

    it('Mutes the icon of a disabled button', () => {
      const { getByRole } = render(
        <ButtonGroup
          items={[
            {
              id: 'list',
              icon: <Icon name="archive" />,
              ariaLabel: 'List',
              disabled: true,
            },
          ]}
        />,
      );

      expect(getByRole('button', { name: 'List' })).toHaveStyleRule(
        'opacity',
        '0.4',
        // Only the disabled rule sets opacity on an icon.
        { target: 'svg' },
      );
    });
  });

  describe('design alignment', () => {
    // These read the style function rather than the DOM: `toHaveStyleRule`
    // resolves to the highest-specificity rule matching the element, so a
    // hover/focus rule always shadows the resting and selected ones it is
    // meant to sit above.
    const buttonItemStyles = ButtonItem(theme).styles;

    it('Rounds only the outer corners of the strip', () => {
      expect(buttonItemStyles).toContain('border-radius: 0;');
      expect(buttonItemStyles).toMatch(
        /&:first-of-type\s*\{\s*border-radius: 8px 0 0 8px;/,
      );
      expect(buttonItemStyles).toMatch(
        /&:last-child\s*\{\s*border-radius: 0 8px 8px 0;/,
      );
    });

    it('Lightens the unselected buttons and marks the selected one', () => {
      expect(buttonItemStyles).toContain(
        `background: ${theme.palette.secondary.light};`,
      );
      expect(buttonItemStyles).toMatch(
        new RegExp(
          `&\\.active\\s*\\{[^}]*background: ${theme.palette.secondary.main.replace(
            /[()]/g,
            '\\$&',
          )};`,
        ),
      );
    });

    it('Marks the selected label by colour alone, so the strip cannot jump', () => {
      const [resting, active] = buttonItemStyles.split('&.active');

      expect(resting).toContain('font-size: 13.33px;');
      expect(resting).toContain('font-weight: 500;');
      expect(resting).toContain(`color: ${theme.colors.greyDarker80};`);

      expect(active).toContain(`color: ${theme.colors.greyDarker};`);
      // A face that changes with selection resizes the button under the cursor.
      expect(active).not.toContain('font-size');
      expect(active).not.toContain('font-weight');
    });
  });
});
