import userEvent from '@testing-library/user-event';
import { ButtonGroup } from './ButtonGroup';
import { items } from './helpers';

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
      <ButtonGroup
        items={items}
        onClick={(item) => item}
        selectedItem={items[1]}
      />,
    );

    const itemsEls = getAllByRole('button');
    expect(itemsEls.length).toBe(items.length);

    for (const item of items) {
      getByRole('button', { name: item.text });
    }

    const activeItem = getByRole('button', { pressed: true });
    expect(activeItem.textContent).toBe(items[1].text);
  });
});
