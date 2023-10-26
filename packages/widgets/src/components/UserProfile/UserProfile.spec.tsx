import userEvent from '@testing-library/user-event';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('Renders with a user name and email values', async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId } = render(
      <UserProfile
        name="Josh Li"
        email="Josh@gmail.com"
        trigger="Trigger"
        onClick={jest.fn()}
      />,
    );
    await user.click(getByTestId('trigger-button'));

    getByText(/Josh Li/i);
    getByText(/Josh@gmail.com/i);
  });

  it('Renders with a Log out button', async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId } = render(
      <UserProfile
        name="Josh Li"
        email="Josh@gmail.com"
        trigger="Trigger"
        onClick={jest.fn()}
      />,
    );
    await user.click(getByTestId('trigger-button'));

    getByRole('button', { name: new RegExp('Log Out', 'i') });
  });

  it('Renders with click prop', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByRole, getByTestId } = render(
      <UserProfile
        name="Josh Li"
        email="Josh@gmail.com"
        trigger="Trigger"
        onClick={mockOnClick}
      />,
    );
    await user.click(getByTestId('trigger-button'));

    const buttonEl = getByRole('button', { name: new RegExp('Log Out', 'i') });

    await user.click(buttonEl);

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
