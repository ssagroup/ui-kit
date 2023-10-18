import userEvent from '@testing-library/user-event';
import { ButtonGroup } from './ButtonGroup';

const items = [
  { id: 1, text: 'All (10)' },
  { id: 2, text: 'Running (117)' },
  { id: 3, text: 'Stopped (2)' },
];

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
});
