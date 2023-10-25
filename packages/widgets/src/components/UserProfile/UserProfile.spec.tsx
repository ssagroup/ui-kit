import userEvent from '@testing-library/user-event';
import { StoryComponent } from './stories/StoryComponent';

describe('UserProfile', () => {
  it('Renders with a user name and email values', async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId } = render(<StoryComponent />);
    await user.click(getByTestId('trigger-button'));

    getByText(/Josh Li/i);
    getByText(/Josh@gmail.com/i);
  });

  it('Renders with a Log out link button', async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId } = render(<StoryComponent />);
    await user.click(getByTestId('trigger-button'));

    const linkBtn = getByRole('link', { name: new RegExp('Log Out', 'i') });
    expect(linkBtn).toHaveAttribute('href', '/sing-up');
  });
});
