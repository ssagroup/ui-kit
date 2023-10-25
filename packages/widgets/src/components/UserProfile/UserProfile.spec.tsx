import userEvent from '@testing-library/user-event';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('Renders with a user name and email values', async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId } = render(
      <UserProfile name="Josh Li" email="Josh@gmail.com" trigger="Trigger" />,
    );
    await user.click(getByTestId('trigger-button'));

    getByText(/Josh Li/i);
    getByText(/Josh@gmail.com/i);
  });

  it('Renders with a Log out link button', async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId } = render(
      <UserProfile name="Josh Li" email="Josh@gmail.com" trigger="Trigger" />,
    );
    await user.click(getByTestId('trigger-button'));

    getByRole('button', { name: new RegExp('Log Out', 'i') });
  });
});
