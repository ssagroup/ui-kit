import userEvent from '@testing-library/user-event';

import { TreeView } from './TreeView';
import { TreeItem } from './types';

const items: TreeItem[] = [
  {
    id: 'education',
    label: 'Education',
    iconName: 'education',
    items: [
      { id: 'courses', label: 'Courses' },
      {
        id: 'certifications',
        label: 'Certifications',
        items: [
          { id: 'internal', label: 'Internal' },
          { id: 'external', label: 'External' },
        ],
      },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    items: [{ id: 'offices', label: 'Offices' }],
  },
  { id: 'employee', label: 'Employee', iconName: 'employee' },
];

const setup = (ui: React.ReactElement) => ({
  user: userEvent.setup(),
  ...render(ui),
});

describe('Component: TreeView', () => {
  it('renders only the top level until a branch is expanded', () => {
    const { getByText, queryByText } = setup(<TreeView items={items} />);

    getByText('Education');
    getByText('Employee');
    expect(queryByText('Courses')).toBeNull();
  });

  it('expands and collapses a branch from the row', async () => {
    const { user, getByText, queryByText } = setup(<TreeView items={items} />);

    await user.click(getByText('Education'));
    getByText('Courses');

    await user.click(getByText('Education'));
    expect(queryByText('Courses')).toBeNull();
  });

  it('leaves the row inert for expansion when toggleOnItemClick is false', async () => {
    const { user, getByText, queryByText, getAllByRole } = setup(
      <TreeView items={items} toggleOnItemClick={false} />,
    );

    await user.click(getByText('Education'));
    expect(queryByText('Courses')).toBeNull();

    await user.click(getAllByRole('button', { name: 'Expand' })[0]);
    getByText('Courses');
  });

  it('reports selection as an array and replaces it in single mode', async () => {
    const onSelectedIdsChange = jest.fn();
    const { user, getByText } = setup(
      <TreeView items={items} onSelectedIdsChange={onSelectedIdsChange} />,
    );

    await user.click(getByText('Employee'));
    expect(onSelectedIdsChange).toHaveBeenLastCalledWith(
      ['employee'],
      expect.objectContaining({ id: 'employee' }),
    );

    await user.click(getByText('Education'));
    expect(onSelectedIdsChange).toHaveBeenLastCalledWith(
      ['education'],
      expect.objectContaining({ id: 'education' }),
    );
  });

  it('accumulates and removes ids in multiple mode', async () => {
    const onSelectedIdsChange = jest.fn();
    const { user, getByText } = setup(
      <TreeView
        items={items}
        selectionMode="multiple"
        onSelectedIdsChange={onSelectedIdsChange}
      />,
    );

    await user.click(getByText('Employee'));
    await user.click(getByText('Education'));
    expect(onSelectedIdsChange).toHaveBeenLastCalledWith(
      ['employee', 'education'],
      expect.anything(),
    );

    await user.click(getByText('Employee'));
    expect(onSelectedIdsChange).toHaveBeenLastCalledWith(
      ['education'],
      expect.anything(),
    );
  });

  it('expands the ancestors of a selection made on mount', () => {
    const { getByText } = setup(
      <TreeView items={items} defaultSelectedIds={['external']} />,
    );

    // Two levels of ancestor open, so the deep selection is visible at once.
    getByText('Certifications');
    getByText('External');
  });

  it('expands ancestors when a controlled selection moves', () => {
    const { rerender, queryByText, getByText } = setup(
      <TreeView items={items} selectedIds={[]} />,
    );

    expect(queryByText('Offices')).toBeNull();

    rerender(<TreeView items={items} selectedIds={['offices']} />);
    getByText('Offices');
  });

  it('collapses same-parent siblings in single expand mode', async () => {
    const { user, getByText, queryByText } = setup(
      <TreeView items={items} expandMode="single" />,
    );

    await user.click(getByText('Education'));
    getByText('Courses');

    await user.click(getByText('Company'));
    getByText('Offices');
    expect(queryByText('Courses')).toBeNull();
  });

  it('keeps a controlled expansion under the caller’s control', async () => {
    const onExpandedIdsChange = jest.fn();
    const { user, getByText, queryByText } = setup(
      <TreeView
        items={items}
        expandedIds={[]}
        onExpandedIdsChange={onExpandedIdsChange}
      />,
    );

    await user.click(getByText('Education'));

    expect(onExpandedIdsChange).toHaveBeenCalledWith(['education']);
    expect(queryByText('Courses')).toBeNull();
  });

  it('ignores clicks on a disabled node', async () => {
    const onSelectedIdsChange = jest.fn();
    const { getByText, queryByText } = setup(
      <TreeView
        items={[{ ...items[0], disabled: true }]}
        onSelectedIdsChange={onSelectedIdsChange}
      />,
    );

    // The row is inert via `pointer-events: none`, which user-event refuses to
    // click through — so the check is deliberately disabled to prove the
    // handlers stay silent even if an event does reach the row.
    await userEvent
      .setup({ pointerEventsCheck: 0 })
      .click(getByText('Education'));

    expect(onSelectedIdsChange).not.toHaveBeenCalled();
    expect(queryByText('Courses')).toBeNull();
  });

  it('leaves the icon column out unless reserveIconSpace asks for it', () => {
    const { container, rerender } = render(<TreeView items={items} />);

    // `Company` has no icon of its own.
    const row = () =>
      container.querySelectorAll('.ssa-tree__item--level-1')[1] as HTMLElement;
    expect(row().querySelector('.ssa-tree__icon')).toBeNull();

    rerender(<TreeView items={items} reserveIconSpace />);

    expect(row().querySelector('.ssa-tree__icon')).not.toBeNull();
  });

  it('paints the selected row with activeColor', () => {
    const { getByText } = render(
      <TreeView
        items={items}
        defaultSelectedIds={['employee']}
        activeColor="rgb(255, 0, 0)"
      />,
    );

    expect(getByText('Employee').closest('.ssa-tree__row')).toHaveStyle({
      color: 'rgb(255, 0, 0)',
    });
  });

  it('keeps auto-expansion working when the caller repeats an expanded id', () => {
    const { getByText } = render(
      <TreeView
        items={items}
        // A duplicate in the caller's own list must not make the merge look
        // like a no-op and swallow the selection's ancestors.
        defaultExpandedIds={['company', 'company']}
        defaultSelectedIds={['courses']}
      />,
    );

    getByText('Courses');
    getByText('Offices');
  });

  describe('tree semantics', () => {
    it('exposes tree roles with level and expansion state', async () => {
      const { user, getByRole, getAllByRole, getByText } = setup(
        <TreeView items={items} aria-label="Sections" />,
      );

      getByRole('tree', { name: 'Sections' });

      const education = getAllByRole('treeitem')[0];
      expect(education).toHaveAttribute('aria-level', '1');
      expect(education).toHaveAttribute('aria-expanded', 'false');

      // Clicked on the row rather than the treeitem itself: user-event
      // dispatches on the element it is given, and the handler lives on the
      // row inside the li.
      await user.click(getByText('Education'));
      expect(getByRole('treeitem', { name: /Education/ })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(getByRole('group')).toBeInTheDocument();
    });

    it('moves focus with the arrow keys and opens with ArrowRight', async () => {
      const { user, getByRole, getAllByRole } = setup(
        <TreeView items={items} />,
      );

      const education = getAllByRole('treeitem')[0];
      education.focus();

      await user.keyboard('{ArrowRight}');
      expect(getByRole('treeitem', { name: /Education/ })).toHaveAttribute(
        'aria-expanded',
        'true',
      );

      await user.keyboard('{ArrowDown}');
      expect(getByRole('treeitem', { name: 'Courses' })).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(getByRole('treeitem', { name: /Education/ })).toHaveFocus();
    });

    it('keeps exactly one row in the tab order', () => {
      const { getAllByRole } = setup(<TreeView items={items} />);

      const tabbable = getAllByRole('treeitem').filter(
        (item) => item.getAttribute('tabindex') === '0',
      );
      expect(tabbable).toHaveLength(1);
    });
  });

  describe('list semantics', () => {
    it('drops the tree roles and leaves the chevron focusable', () => {
      const { queryByRole, getAllByRole } = setup(
        <TreeView items={items} semantics="list" />,
      );

      expect(queryByRole('tree')).toBeNull();
      expect(queryByRole('treeitem')).toBeNull();
      expect(getAllByRole('button', { name: 'Expand' })[0]).not.toHaveAttribute(
        'tabindex',
        '-1',
      );
    });
  });

  describe('renderItem', () => {
    it('hands the row its state and working handlers', async () => {
      const { user, getByText, getByTestId } = setup(
        <TreeView
          items={items}
          renderItem={({ item, level, isSelected, itemProps }) => (
            <div {...itemProps} data-testid={`row-${item.id}`}>
              {`${item.label} L${level}${isSelected ? ' selected' : ''}`}
            </div>
          )}
        />,
      );

      expect(getByTestId('row-education')).toHaveTextContent('Education L1');

      await user.click(getByText('Education L1'));
      expect(getByTestId('row-education')).toHaveTextContent(
        'Education L1 selected',
      );
      expect(getByTestId('row-courses')).toHaveTextContent('Courses L2');
    });
  });
});
