import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { NotificationCard } from '@ssa-ui-kit/core';
import {
  UnreadNotificationCardProps,
  ReadNotificationCardProps,
} from './types';

const TYPE_INFO = 'Informational';

export const UnreadCard = ({
  notification,
  onRead,
}: UnreadNotificationCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver({
    threshold: 0.8,
    freezeOnceVisible: true,
  });

  useEffect(() => {
    const isVisible = !!entry?.isIntersecting;
    if (!notification.readAt && isVisible) {
      onRead(notification);
    }
  }, [entry]);

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
