import { useCallback, useEffect, useState } from 'react';

import { useDebounceValue } from 'usehooks-ts';

import { Notification } from '@fintech/types';

import { ReadCard, UnreadCard } from './NotificationListCards';
import { NotificationsListWrapper } from './NotificationsListWrapper';
import { NotificationsListProps } from './types';

const DELAY_MS = 2000;

export const NotificationsList = ({
  notifications,
  onRead,
}: NotificationsListProps) => {
  const [readIds, setReadIds] = useState(() => new Set<number>());
  const [debouncedReadIds] = useDebounceValue<Set<number>>(readIds, DELAY_MS);

  const onNotificationRead = useCallback<(arg: Notification) => void>(
    ({ id }) => {
      setReadIds((oldState) => new Set(oldState.add(id)));
    },
    [setReadIds],
  );

  useEffect(() => {
    if (debouncedReadIds.size > 0) {
      notifications.forEach((n) => {
        if (debouncedReadIds.has(n.id)) {
          n.readAt = new Date().toISOString();
        }
      });
      onRead(Array.from(debouncedReadIds));
      setReadIds(new Set());
    }
  }, [debouncedReadIds]);

  return (
    <NotificationsListWrapper>
      {notifications?.map((notification) =>
        notification.readAt ? (
          <ReadCard key={notification.id} notification={notification} />
        ) : (
          <UnreadCard
            key={notification.id}
            notification={notification}
            onRead={onNotificationRead}
          />
        ),
      )}
    </NotificationsListWrapper>
  );
};
