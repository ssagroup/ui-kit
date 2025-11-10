import { useRef } from 'react';

import { NotificationCard } from '@ssa-ui-kit/core';

import {
  ReadNotificationCardProps,
  UnreadNotificationCardProps,
} from './types';

const TYPE_INFO = 'Informational';

export const UnreadCard = ({ notification }: UnreadNotificationCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <NotificationCard
      ref={ref}
      title={notification.title}
      text={notification.text}
      isRead={Boolean(notification.readAt)}
      type={notification.type || TYPE_INFO}
      time={notification.creationTime}
      css={{ cursor: 'default' }}
    />
  );
};

export const ReadCard = ({ notification }: ReadNotificationCardProps) => (
  <NotificationCard
    title={notification.title}
    text={notification.text}
    isRead={Boolean(notification.readAt)}
    type={notification.type || TYPE_INFO}
    time={notification.creationTime}
    css={{ cursor: 'default' }}
  />
);
