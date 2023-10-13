import userEvent from '@testing-library/user-event';
import { Button } from '@ssa-ui-kit/core';
import NotificationCard from './NotificationCard';

describe('NotificationCard', () => {
  it('Renders with indicator (Unread state)', () => {
    const { getByTestId } = render(
      <NotificationCard
        title="Title"
        text="Text"
        isRead={false}
        badgeColor="blueLight"
        iconName="information"
        time={Date.now() - 1200000}
      />,
    );

    getByTestId('indicator-left');
  });

  it('Renders without indicator (Read state)', () => {
    const { queryByTestId } = render(
      <NotificationCard
        title="Title"
        text="Text"
        isRead={true}
        badgeColor="blueLight"
        iconName="information"
        time={Date.now() - 1200000}
      />,
    );

    expect(queryByTestId('indicator-left')).not.toBeInTheDocument();
  });

  it('Renders with badge and icon', () => {
    const { getByTestId } = render(
      <NotificationCard
        title="Title"
        text="Text"
        isRead={true}
        badgeColor="blueLight"
        iconName="information"
        time={Date.now() - 1200000}
      />,
    );

    getByTestId('badge');
    expect(getByTestId('badge')).toHaveTextContent(/information/i);
  });

  it('Renders with title and sub-text', () => {
    const { getByText } = render(
      <NotificationCard
        title="Title"
        text="Text"
        isRead={true}
        badgeColor="blueLight"
        iconName="information"
        time={Date.now() - 1200000}
      />,
    );

    getByText(/title/i);
    getByText(/text/i);
  });

  it('Renders with children prop', () => {
    const { getByText, getAllByRole } = render(
      <NotificationCard
        title="Title"
        text="Text"
        isRead={true}
        badgeColor="blueLight"
        iconName="information"
        time={Date.now() - 1200000}>
        <Button text="test" />
        <Button text="test" />
        Children Content
      </NotificationCard>,
    );

    getByText(/children content/i);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('Renders with passed time value', () => {
    const { getByText } = render(
      <NotificationCard
        title="Title"
        text="Text"
        isRead={true}
        badgeColor="blueLight"
        iconName="information"
        time={Date.now() - 1200000}
      />,
    );

    getByText(/20 mins ago/i);
  });

  it('Renders with passed onClick prop', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <NotificationCard
        title="Title"
        text="Text"
        isRead={true}
        badgeColor="blueLight"
        iconName="information"
        time={Date.now() - 1200000}
        onClick={mockOnClick}
      />,
    );

    const notification = getByTestId('notification');

    await user.click(notification);

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
