import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import { StoryComponent } from './stories/StoryComponent';
import { notificationData } from './helpers';

describe('NotificationMenu', () => {
  it('Renders with button group', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<StoryComponent />);
    await user.click(getByTestId('trigger-button'));
    const buttonGroup = getByTestId('button-group');

    notificationData.groupButtonItems.forEach((item) => {
      within(buttonGroup).getByRole('button', { name: item.text });
    });
  });

  it('Renders with list of notifications', async () => {
    const user = userEvent.setup();
    const { getByTestId, getAllByTestId } = render(<StoryComponent />);
    await user.click(getByTestId('trigger-button'));

    const notificationEls = getAllByTestId('notification');
    const notificationArr = notificationData.notificationItems;

    expect(notificationEls.length).toBe(notificationArr.length);

    for (let i = 0; i < notificationEls.length; i++) {
      expect(notificationEls[i]).toHaveTextContent(notificationArr[i].text);
    }
  });

  it('Marks all notifications as read after clicking on the button', async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId, queryAllByTestId } = render(
      <StoryComponent />,
    );
    await user.click(getByTestId('trigger-button'));

    const buttonEl = getByRole('button', {
      name: new RegExp('Mark all as read', 'i'),
    });
    await user.click(buttonEl);
    const unreadBtn = getByRole('button', {
      name: 'Unread',
    });

    const indicatorEls = queryAllByTestId('indicator-left');

    expect(indicatorEls.length).toBe(0);
    expect(unreadBtn).toHaveAttribute('disabled');
    expect(buttonEl).not.toBeInTheDocument();
  });

  it('Renders with link button', async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId } = render(<StoryComponent />);
    await user.click(getByTestId('trigger-button'));

    getByRole('link', {
      name: new RegExp('View all notification', 'i'),
    });
  });
});
