import userEvent from '@testing-library/user-event';
import { Button } from '@ssa-ui-kit/core';
import { NotificationCard } from './NotificationCard';
import { INotificationCardProps } from './types';

const commonProps: Pick<
  INotificationCardProps,
  'title' | 'text' | 'badgeColor' | 'iconName' | 'time'
> = {
  title: 'Title',
  text: 'Text',
  badgeColor: 'blueLight',
  iconName: 'information',
  time: Date.now() - 1200000,
};

describe('NotificationCard', () => {
  it('Renders with indicator (Unread state)', () => {
    const { getByTestId } = render(
      <NotificationCard {...commonProps} isRead={false} />,
    );

    getByTestId('indicator-left');
  });

  it('Renders without indicator (Read state)', () => {
    const { queryByTestId } = render(
      <NotificationCard {...commonProps} isRead={true} />,
    );

    expect(queryByTestId('indicator-left')).not.toBeInTheDocument();
  });

  it('Renders with badge and icon', () => {
    const { getByTestId } = render(
      <NotificationCard {...commonProps} isRead={false} />,
    );

    getByTestId('badge');
    expect(getByTestId('badge')).toHaveTextContent(/information/i);
  });

  it('Renders with title and sub-text', () => {
    const { getByText } = render(
      <NotificationCard {...commonProps} isRead={false} />,
    );

    getByText(/title/i);
    getByText(/text/i);
  });

  it('Renders with children prop', () => {
    const { getByText, getAllByRole } = render(
      <NotificationCard {...commonProps} isRead={false}>
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
      <NotificationCard {...commonProps} isRead={false} />,
    );

    getByText(/20 mins ago/i);
  });

  it('Renders with passed onClick prop', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <NotificationCard
        {...commonProps}
        isRead={false}
        onClick={mockOnClick}
      />,
    );

    const notification = getByTestId('notification');

    await user.click(notification);

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
