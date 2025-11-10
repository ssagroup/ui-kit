import userEvent from '@testing-library/user-event';

import { StoryComponent } from './stories/StoryComponent';

describe('AccountKeys', () => {
  it('Renders with title', () => {
    const { getByText } = render(<StoryComponent onDelete={jest.fn()} />);

    getByText('Account Name');
  });

  it('Renders with delete button', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByRole } = render(<StoryComponent onDelete={mockOnClick} />);

    const deleteButton = getByRole('button', { name: 'Bin' });
    await user.click(deleteButton);
    expect(mockOnClick).toBeCalledTimes(1);
  });

  it('Renders with API key and hidden Secret key', () => {
    const { getByText } = render(<StoryComponent onDelete={jest.fn()} />);

    getByText('123456789012345678901234567890');
    getByText('******');
  });

  it('Clicks on hidden/unhidden secret key', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByRole, getByText } = render(
      <StoryComponent onDelete={mockOnClick} />,
    );

    const invisibleIcon = getByRole('button', { name: 'Invisible' });
    await user.click(invisibleIcon);
    getByText('1234567890');

    const visibleIcon = getByRole('button', { name: 'Visible' });
    await user.click(visibleIcon);
    getByText('******');
  });
});
