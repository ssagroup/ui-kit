import { Meta, StoryObj } from '@storybook/react';
import NotificationCard from './NotificationCard';
import { Button } from '@ssa-ui-kit/core';
import { INotificationCardProps } from './types';

export default {
  title: 'Widgets/NotificationCard',
  component: NotificationCard,
} as Meta<typeof NotificationCard>;

export const Default: StoryObj<typeof NotificationCard> = (
  args: INotificationCardProps,
) => {
  return (
    <div css={{ padding: '20px', background: '#F2F4F7', borderRadius: '20px' }}>
      <NotificationCard
        title={args.title}
        text={args.text}
        isRead={args.isRead}
        badgeColor={args.badgeColor}
        iconName={args.iconName}
        timeAgo={args.timeAgo}>
        <Button
          size="small"
          variant="tertiary"
          text="Ignore"
          css={{
            border: '1px solid #DEE0E8',
            fontWeight: '600',
            padding: '5px 21px',

            ['span']: {
              color: '#656567',
            },
          }}
        />
        <Button
          size="small"
          variant="attention"
          text="Stop bot"
          css={{ padding: '5px 26px' }}
        />
      </NotificationCard>
    </div>
  );
};

Default.args = {
  title: 'CyberVeinToken is Now Available on Exchange',
  text: 'You have an error with Bot name 1. Do you want to stop this bot?',
  isRead: false,
  badgeColor: 'blueLight',
  iconName: 'information',
  timeAgo: '24 min ago',
};
