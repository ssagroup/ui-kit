import { act } from 'react';
import { fireEvent } from 'storybook/test';
import {
  NestedTableCollapsedStory,
  NestedTableStory,
} from './stories/NestedTableStory';
import { screen } from '../../../customTest';

describe('NestedTable', () => {
  it('Render NestedTable', () => {
    render(<NestedTableStory />);

    const table = screen.getByRole('table');
    const cells = screen.queryAllByRole('cell');
    const toggleIcons = screen.queryAllByTestId('toggle-icon');
    const rows = screen.queryAllByRole('row');
    const collapsedRows = rows.filter((item) =>
      item.classList.contains('collapsed'),
    );

    expect(table).toBeInTheDocument();
    expect(cells.length).toEqual(60);
    expect(toggleIcons.length).toEqual(4);
    expect(collapsedRows.length).toEqual(0);
  });

  it('Should change collapsing correctly', () => {
    render(<NestedTableStory />);

    const toggleIcons = screen.queryAllByTestId('toggle-icon');
    const firstToggleIcon = toggleIcons.at(0);
    act(() => {
      fireEvent.click(firstToggleIcon as Element);
    });

    const rows = screen.queryAllByRole('row');

    const collapsedRows = rows.filter((item) =>
      item.classList.contains('collapsed'),
    );

    expect(collapsedRows.length).toEqual(2);
  });

  it('Should respect defaultCollapsed from the table', () => {
    render(<NestedTableCollapsedStory />);

    const rows = screen.queryAllByRole('row');
    const collapsedRows = rows.filter((item) =>
      item.classList.contains('collapsed'),
    );
    const toggleIcons = screen.queryAllByTestId('toggle-icon');

    // First group (3 rows) inherits defaultCollapsed; the whole group,
    // sub-header included, carries the `collapsed` class.
    expect(collapsedRows.length).toEqual(3);
    // Second group opts out with defaultCollapsed={false}; single-row group
    // gets no toggle at all.
    expect(toggleIcons.length).toEqual(2);
    expect(toggleIcons.at(0)).toHaveAttribute('data-type', 'collapsed');
    expect(toggleIcons.at(1)).toHaveAttribute('data-type', 'expanded');
  });

  it('Should toggle a group that started collapsed', () => {
    render(<NestedTableCollapsedStory />);

    const firstToggleIcon = screen.queryAllByTestId('toggle-icon').at(0);
    act(() => {
      fireEvent.click(firstToggleIcon as Element);
    });

    const rows = screen.queryAllByRole('row');
    const collapsedRows = rows.filter((item) =>
      item.classList.contains('collapsed'),
    );

    expect(collapsedRows.length).toEqual(0);
  });
});
