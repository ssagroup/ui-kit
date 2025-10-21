import { act } from 'react';

import { fireEvent } from 'storybook/test';

import { screen } from '../../../customTest';

import { NestedTableStory } from './stories/NestedTableStory';

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
});
